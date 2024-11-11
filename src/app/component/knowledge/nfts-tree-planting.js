import Section from '../../component/layouts/Section.js';

const NFT = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'NFT\'s & Tree Planting'}>
            <div className="pd-top-36">
                <div className="container">
                    <h3 className="form-title">
                        &quot;immutable digital ownership&quot;
                    </h3>
                </div>
            </div>
            <div style={styles.card}>
                <img
                    style={styles.cardImgTop}
                    src="/assets/img/nfts-tree-planting.png"
                    alt="Tree Image"
                />
                <div style={styles.cardBody}>
                    <div style={styles.divider} />
                    <p style={styles.paragraph}>At TreeTherium, both land plots and individual trees are represented by unique NFTs. Each plot of land approved for planting receives its own NFT, which certifies its role in our reforestation network. On top of that, each tree planted on this land is minted as a separate NFT, creating a digital record for every tree’s journey from seedling to maturity. This dual NFT provides complete transparency and ensures that every part of your impact is verifiable on the blockchain.</p>
                    <p style={styles.title}>NFT is value</p>
                    <p style={styles.paragraph}>By owning an NFT tied to a specific plot or individual tree, you gain access to detailed data about each tree’s health, growth rate, and environmental impact. This allows you to follow the progress of your trees directly on the TreeTherium platform, making the digital ownership of trees a meaningful and engaging experience.</p>
                    <p style={styles.title}>NFT rewards</p>
                    <p style={styles.paragraph}>These NFTs also come with rewards. As your trees grow, you may receive rewards in $TREEZ or $SEEDZ tokens, letting you earn while contributing to positive environmental change. This approach makes it easy to support reforestation and participate in a sustainable, green economy.</p>
                    <p style={styles.title}>Start planting and make an Impact</p>
                    <p style={styles.paragraph}>Join TreeTherium today to tokenize your own land or garden and tree NFTs. Plant trees, and grow a lasting impact on our planet. Register now and be part of a greener future!</p>
                </div>
            </div>
        </Section>
    );
}

export default NFT;

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