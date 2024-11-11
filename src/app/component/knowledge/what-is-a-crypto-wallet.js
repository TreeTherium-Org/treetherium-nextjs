import Section from '../../component/layouts/Section.js';

const WhatIsACryptoWallet = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'What Is A Crypto Wallet'}>
            <div className="pd-top-36">
                <div className="container">
                    <h3 className="form-title">
                        &quot;your keys your wallet&quot;
                    </h3>
                </div>
            </div>
            <div style={styles.card}>
                <img
                    style={styles.cardImgTop}
                    src="/assets/img/what-is-a-crypto-wallet.png"
                    alt="Tree Image"
                />
                <div style={styles.cardBody}>
                    <div style={styles.divider} />
                    <p style={styles.paragraph}>A crypto wallet is a digital tool that allows you to securely store, manage, and use cryptocurrencies like Bitcoin, Ethereum, and TreeTherium tokens. Unlike a physical wallet, a crypto wallet doesn’t store the actual coins. Instead, it stores the private keys—unique codes that give you access to your cryptocurrency on the blockchain.</p>
                    <p style={styles.title}>How Do Crypto Wallets Work?</p>
                    <p style={styles.paragraph}>Crypto wallets work by generating a pair of keys: a public key, which acts like an address you can share to receive funds, and a private key, which is your personal code to access your funds. Think of the private key as your password—it’s essential to keep it safe, as anyone with access to it can control your crypto assets.</p>
                    <p style={styles.title}>Types of Crypto Wallets</p>
                    <p style={styles.paragraph}>There are two main types of crypto wallets: hot wallets and cold wallets. Hot wallets are connected to the internet, making them convenient for quick access and transactions. Cold wallets, on the other hand, are offline and offer enhanced security, ideal for long-term storage of larger amounts.</p>
                    <p style={styles.title}>Why Do You Need a Crypto Wallet?</p>
                    <p style={styles.paragraphLast}>A crypto wallet gives you full control of your digital assets without relying on a bank or third party. It enables you to send, receive, and manage your cryptocurrency, empowering you to take part in the decentralized world of digital finance.</p>
                </div>
            </div>
        </Section>
    );
}

export default WhatIsACryptoWallet;

const styles = {
    card: {
        backgroundColor: '#fff', /* White background for the card */
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', /* Soft shadow */
        borderRadius: '10px 10px 0 0',
        textAlign: 'left', /* Left-align content */
        padding: '0', /* Inner padding */
        maxWidth: '100%', /* Max width for the card */
        margin: '21px 20px 100px',
    },
    cardImgTop: {
        height: '253px',
        borderRadius: '10px 10px 0 0',
        objectFit: 'cover',
        width: '100%',
    },
    cardBody: {
        padding: '0 20px',
    },
    title: {
        fontSize: "1.125em",
        fontWeight: 700,
        color: "#4F3738",
        padding: "0 0 8px",
        marginBottom: "0px",
        textTransform: 'capitalize'
      },
    divider: {
        width: '100%',
        height: '4px',
        margin: '15px 0 11px',
        borderRadius: '50px',
        backgroundColor: '#e7e1ee',
    },
    paragraph: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 15px',
        marginBottom: '0px',
    },
    paragraphLast: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 25px',
        marginBottom: '0px',
    },
    // Adding a responsive layout to make sure the text and dividers adjust well to screen size
    '@media (min-width: 600px)': {
        card: {
            maxWidth: '80%',   // Limit card width on medium screens
        },
    },
    '@media (min-width: 1024px)': {
        card: {
            maxWidth: '600px',  // Limit card width on larger screens
        },
        title: {
            fontSize: '1.5rem',
        },
        page: {
            fontSize: '1.125rem',
        },
        paragraph: {
            fontSize: '1.125rem',
        },
    },
};