// TODO : move other css into global.css
import "./globals.css";
import "../../public/assets/css/responsive.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/components/_buttons.css";
import "../../public/assets/demo/css/demo.css";
import "../../public/assets/css/vendor.css";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Welcome to Treetherium",
  description: "Tokenizing tree planting world wide",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
    appleTouchIcon: { sizes: "180x180", url: "/apple-touch-icon.png" },
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
