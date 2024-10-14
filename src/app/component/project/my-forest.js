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
        <Section allNotification={false} searchPopup={true} title={'My Forest Page'}>
            <div style={containerStyle}>
                <main style={mainStyle}>
                    <p>Have you planted any trees yet?</p>
                    <div style={buttonGroupStyle}>
                        <button style={buttonStyle} onClick={handleYesClick}>Yes</button>
                        <button style={buttonStyle} onClick={handleNoClick}>No</button>
                    </div>
                    <div style={cardStyle}>
                        <div style={circleStyle}>
                            <Image
                                src="/assets/img/blog/1.png"
                                alt="My Projects"
                                width={100}
                                height={100}
                                style={{ borderRadius: '50%' }}
                            />
                        </div>
                        <p>My Projects</p>
                    </div>
                </main>
            </div>
        </Section>
    );
};

export default MyForestPage;

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
};

const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '100px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#A3A830',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
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
