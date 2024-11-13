"use client";

import {
  useConnection,
  useWallet,
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useCallback, useMemo } from "react";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useCluster } from "../clusters/cluster-data-access";

require("@solana/wallet-adapter-react-ui/styles.css");
// require("./../../wallet-button.css");

export const WalletButton = () => {
  const { publicKey } = useWallet();

  return (
    <WalletMultiButton>
      {publicKey
        ? publicKey.toString().slice(0, 4) +
          ".." +
          publicKey.toString().slice(-4)
        : "Connect Solana"}
    </WalletMultiButton>
  );
};

export function SolanaProvider({ children }) {
  const { cluster } = useCluster();
  const endpoint = useMemo(() => cluster.endpoint, [cluster]);
  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      // Add other wallet adapters as needed
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
