import Section from "../layouts/Section";
import Link from 'next/link';

const ListTrees = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'Transaction'}>
            {/* transaction start */}
            <div className="transaction-area pd-top-36">
                <div className="container">
                    <div className="section-title">
                        <h3 className="title">List of Trees</h3>
                    </div>
                    <ul className="transaction-inner">
                        <li className="ba-single-transaction style-two">
                            <div className="thumb">
                                <img src="/assets/img/icon/2.png" alt="img" />
                            </div>
                            <div className="details">
                                <h5>Namecheap Inc.</h5>
                                <p>Domain Purchase</p>
                                <h5 className="amount">-$130</h5>
                            </div>
                        </li>
                        <li className="ba-single-transaction style-two">
                            <div className="thumb">
                                <img src="/assets/img/icon/3.png" alt="img" />
                            </div>
                            <div className="details">
                                <h5>Namecheap Inc.</h5>
                                <p>Domain Purchase</p>
                                <h5 className="amount">-$160</h5>
                            </div>
                        </li>
                        <li className="ba-single-transaction style-two">
                            <div className="thumb">
                                <img src="/assets/img/icon/4.png" alt="img" />
                            </div>
                            <div className="details">
                                <h5>Namecheap Inc.</h5>
                                <p>Domain Purchase</p>
                                <h5 className="amount">-$890</h5>
                            </div>
                        </li>
                        <li className="ba-single-transaction style-two">
                            <div className="thumb">
                                <img src="/assets/img/icon/5.png" alt="img" />
                            </div>
                            <div className="details">
                                <h5>Namecheap Inc.</h5>
                                <p>Domain Purchase</p>
                                <h5 className="amount">-$1,000</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* transaction End */}

            <div className="btn-wrap mg-top-40 mg-bottom-40">
                <div className="container">
                    <Link href="/transaction"  className="btn-large btn-blue w-100">
                       Add new tree <i className="fa fa-angle-double-right" />
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default ListTrees;
