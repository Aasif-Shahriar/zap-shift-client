import React from 'react';
import Banner from '../banner/Banner';
import HowItWorks from '../how-it-works-section/HowItWorks';
import Services from '../services-section/Services';
import BrandLogoSlider from '../brand-logo-slider/BrandLogoSlider';
import FeatureCards from '../feature-cards/FeatureCards';
import BeMerchant from '../be-merchant/BeMerchant';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItWorks></HowItWorks>
           <Services></Services>
           <BrandLogoSlider></BrandLogoSlider>
           <FeatureCards></FeatureCards>
           <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;