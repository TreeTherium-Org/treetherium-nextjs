import Section from "../layouts/Section";
import Link from 'next/link';

const TreeDetails = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'Tree Details'}>
            {/*start fetch data*/}
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">Tree Title</h3>
                    </div>
                    <div className="about-content-inner p-0">
                        <img className="w-100" src="/assets/img/other/2.png" alt="img" />
                    </div>
                    <div className="about-content-inner">
                        <h5>Project Name</h5>
                        <p>Description</p>
                    </div>
                </div>
            </div>
            {/* transaction End */}
        </Section>
    );
};

export default TreeDetails;
