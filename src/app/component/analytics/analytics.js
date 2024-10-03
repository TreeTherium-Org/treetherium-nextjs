// src/app/component/analytics/index.js
import GeographicalDistribution from './geographical-distribution';
import CardMetrics from './card-metrics';
import NFTTransaction from './nft-transaction';
import TotalTreePlanted from './total-tree-planted';
import Section from "../layouts/Section";

const AnalyticsPage = () => {
    return (
        <Section allNotification={false} searchPopup={false} title={'Analytics'}>
            <CardMetrics className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />
            <NFTTransaction />
            <TotalTreePlanted />
            <GeographicalDistribution />
        </Section>
    );
};

export default AnalyticsPage;
