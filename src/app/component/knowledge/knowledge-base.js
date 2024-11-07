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
                    href="/"
                ><span className="underline-text">What is TreeTherium</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">Why Solana</span></Link>
                </h3>
                <h3 style={styles.paragraph}>
                <Link
                    href="/"
                ><span className="underline-text">Investors</span></Link>
                </h3>
                <h3 style={styles.title}>Blockchain & Crypto</h3>
                <div style={styles.divider} />
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">NFT's & Tree Planting</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">What is a crypto wallet</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">What Is Blockchain</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">Create A Phantom Wallet</span></Link>
                </h3>
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">Create A Jupiter Account</span></Link>
                </h3>
                <h3 style={styles.paragraph}>
                <Link
                    href="/"
                ><span className="underline-text">Create A Raydium Account</span></Link>
                </h3>

                <h3 style={styles.title}>Reforestation</h3>
                <div style={styles.divider} />
                <h3 style={styles.page}>
                <Link
                    href="/"
                ><span className="underline-text">Landowner</span></Link>
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
        padding: '20px', /* Inner padding */
        maxWidth: '400px', /* Max width for the card */
        margin: '21px 20px 100px',
    },
    title: {
        fontSize: '1.125em',
        fontWeight: 700,
        color: '#4F3738',
        padding: '9px 34px',
        marginBottom: '0px',
    },
    divider: {
        width: '100%',
        height: '5px',
        margin: '0 0 32px',
        borderRadius: '50px',
        backgroundColor: '#e7e1ee',
    },
    paragraph: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 40px 55px',
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
};
