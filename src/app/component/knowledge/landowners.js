import Section from '../../component/layouts/Section.js';

const Landowners = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'Landowners'}>
            <div className="pd-top-36">
                <div className="container">
                    <h3 className="form-title">
                        &quot;tokenize your land now&quot;
                    </h3>
                </div>
            </div>
            <div style={styles.card}>
                <img
                    style={styles.cardImgTop}
                    src="/assets/img/landowners.png"
                    alt="Tree Image"
                />
                <div style={styles.cardBody}>
                    <div style={styles.divider} />
                    <p style={styles.paragraph}>Welcome, Land Owners</p>
                    <p style={styles.paragraph}>We invite landowners to join TreeTherium and make their land available for tree-planting projects. With TreeTherium, you can help the environment while benefiting from the trees planted on your land.</p>
                    <p style={styles.title}>How to Plant Your Land</p>
                    <p style={styles.paragraph}>Getting started is simple! Join TreeTherium, register your land, and we’ll guide you through the process of bringing new life to your land with tree-planting projects.</p>
                    <p style={styles.title}>Land NFT</p>
                    <p style={styles.paragraph}>Each plot of land will receive a unique NFT. This digital certificate verifies ownership of your land within the TreeTherium platform, helping track tree growth and rewards.</p>
                    <p style={styles.title}>Land Planting Rewards</p>
                    <p style={styles.paragraph}>Earn 10 $SEEDZ tokens for making your land available for tree planting. These tokens represent your contribution to global reforestation.</p>
                    <p style={styles.title}>Planted Tree Rewards</p>
                    <p style={styles.paragraph}>As a landowner, you’ll receive rewards equivalent to 15% of the trees planted on your land, adding value with every new tree.</p>
                    <p style={styles.title}>Benefits for $SEEDZ Token Holders</p>
                    <p style={styles.paragraph}>Owning $SEEDZ tokens grants access to our DAO (decentralized autonomous organization, the entity which governs TreeTherium) , where you can participate in decisions shaping TreeTherium’s future. Together, we’re building a green community.</p>
                    <p style={styles.title}>Benefits for $SEEDZ Token Holders</p>
                    <p style={styles.paragraph}>As the landowner, you retain ownership of both the land and the trees, including the trees’ economic value, such as fruits, seeds, and timber.</p>
                    <p style={styles.title}>Data Sharing</p>
                    <p style={styles.paragraphLast}>You’ll receive detailed data on all planted trees on your land, empowering you with insights into their growth, species, and environmental impact.</p>
                </div>
            </div>
        </Section>
    );
}

export default Landowners;

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