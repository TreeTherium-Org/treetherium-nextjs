import Section from '../../component/layouts/Section.js';
import Link from 'next/link';

const KnowledgeBase = () => {
    return (
    <Section allNotification={false} searchPopup={true} title={'Knowledge Base'}>
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;knowledge empowers people&quot;
          </h3>
        </div>
        <div style={styles.card}>
                <h3 style={styles.title}>TreeTherium</h3>
                <div style={styles.divider} />
                <h3 style={styles.page}>
                <Link
                    href="/what-is-treetherium"
                ><span className="underline-text">What is TreeTherium</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/why-solana"
                ><span className="underline-text">Why Solana</span></Link>
                </h3>
                <h3 style={styles.paragraph}>
                <Link
                    href="/investors"
                ><span className="underline-text">Investors</span></Link>
                </h3>
                <h3 style={styles.title}>Blockchain & Crypto</h3>
                <div style={styles.divider} />
                <h3 style={styles.page}>
                <Link
                    href="/nfts-tree-planting"
                ><span className="underline-text">NFT's & Tree Planting</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/what-is-crypto"
                ><span className="underline-text">What Is Crypto</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/what-is-a-crypto-wallet"
                ><span className="underline-text">What Is A Crypto Wallet</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/what-is-blockchain"
                ><span className="underline-text">What Is Blockchain</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/create-a-phantom-wallet"
                ><span className="underline-text">Create A Phantom Wallet</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/create-a-jupiter-account"
                ><span className="underline-text">Create A Jupiter Account</span></Link>
                </h3>
                <h3 style={styles.paragraph}>
                <Link
                    href="/create-a-raydium-account"
                ><span className="underline-text">Create A Raydium Account</span></Link>
                </h3>

                <h3 style={styles.title}>Reforestation</h3>
                <div style={styles.divider} />
                <h3 style={styles.paragraph}>
                <Link
                    href="/landowners"
                ><span className="underline-text">Landowners</span></Link>
                </h3>

                <h3 style={styles.title}>Tree Planting</h3>
                <div style={styles.divider} />
                <h3 style={styles.page}>
                <Link
                    href="/tree-planting-general"
                ><span className="underline-text">Tree Planting General</span></Link>
                </h3>
            </div>
        </div>
    </Section> 
    );
}

export default KnowledgeBase;

const styles = {
    body: {
        activeModal: {
            overflowY: 'hidden',
        },
    },
    card: {
        backgroundColor: '#fff', /* White background for the card */
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', /* Soft shadow */
        textAlign: 'left', /* Left-align content */
        padding: '1.25rem', /* Inner padding */
        maxWidth: '100%', /* Max width for the card */
        margin: '21px 20px 100px',
    },
    title: {
        fontSize: '1.125em',
        fontWeight: 700,
        color: '#4F3738',
        padding: '5px 34px',
        marginBottom: '0px',
    },
    divider: {
        width: '100%',
        height: '4px',
        margin: '0 0 32px',
        borderRadius: '50px',
        backgroundColor: '#e7e1ee',
    },
    paragraph: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 39px 55px',
        marginBottom: '0px',
    },
    page: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 11px 55px',
        marginBottom: '0px',
    },
    btn: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    modal: {
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
        zIndex: 999,
    },
    overlay: {
        background: 'rgba(49, 49, 49, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
