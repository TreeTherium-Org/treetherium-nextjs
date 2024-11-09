import { useState } from 'react';
import Image from 'next/image';
import Section from "../layouts/Section";
import { useRouter } from 'next/router';

const MyForestPage = () => {
    const router = useRouter();
    const [hasPlanted, setHasPlanted] = useState(null);

    const handleYesClick = () => {
        setHasPlanted(true);
        router.push('/planted-forest'); // Redirect to the planted forest page
    };

    const handleNoClick = () => {
        setHasPlanted(false);
        router.push('/lets-start-planting'); // Redirect to the lets start planting page
    };

    return (
        <Section allNotification={false} searchPopup={true} title="My Forest">
            <div style={containerStyle}>
                <main style={mainStyle}>
                    <p style={questionStyle}>Have you planted any trees yet?</p>
                    <div style={buttonGroupStyle}>
                        <button style={buttonStyle} onClick={handleYesClick}>Yes</button>
                        <button style={buttonStyle} onClick={handleNoClick}>No</button>
                    </div>
                    <div style={cardStyle}>
                        <div style={circleStyle}>
                            <Image
                                src="/assets/img/my-project.png"
                                alt="My Projects"
                                width={100}
                                height={100}
                                style={{ borderRadius: '20px' }}
                            />
                        </div>
                        <p style={projectTextStyle}>My Projects</p>
                    </div>
                </main>
                <footer style={footerStyle}>
                    <div style={footerIconStyle}>
                        <i className="fa fa-home" />
                        <span>Home</span>
                    </div>
                    <div style={footerIconStyle}>
                        <i className="fa fa-bars" />
                        <span>Menu</span>
                    </div>
                    <div style={footerIconStyle}>
                        <i className="fa fa-question-circle" />
                        <span>FAQ</span>
                    </div>
                    <div style={footerIconStyle}>
                        <i className="fa fa-user" />
                        <span>Profile</span>
                    </div>
                </footer>
            </div>
        </Section>
    );
};

export default MyForestPage;

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#F0F4E3', // Light green background
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#6A9A30', // Dark green header
    color: '#fff',
    fontSize: '20px',
};

const logoStyle = {
    marginRight: '10px',
};

const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
};

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
};

const questionStyle = {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#4F4F4F',
    fontWeight: '400',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '50px',
};

const buttonStyle = {
    padding: '10px 25px',
    backgroundColor: '#778B28',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid #c1b3a8',
    backgroundColor: '#f7f4f1',
    borderRadius: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: '180px',
    justifyContent: 'center',
    gap: '10px'
};

const circleStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
};

const projectTextStyle = {
    fontSize: '16px',
    color: '#4F4F4F',
    fontWeight: 'bold',
    marginBottom: '10px',
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#6A9A30', // Dark green footer
    padding: '10px 0',
    color: '#fff',
};

const footerIconStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '16px',
};
