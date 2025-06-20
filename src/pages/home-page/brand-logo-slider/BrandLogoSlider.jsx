// components/BrandLogoSlider.jsx
import React from "react";
import Marquee from "react-fast-marquee";

// Import logos from your assets folder
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/amazon_vector.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/start-people 1.png";
import brand7 from "../../../assets/brands/start.png";


const logos = [
  { src: brand1, alt: "Slack" },
  { src: brand2, alt: "Zoom" },
  { src: brand3, alt: "Google" },
  { src: brand4, alt: "Microsoft" },
  { src: brand5, alt: "Shopify" },
  { src: brand6, alt: "HubSpot" },
  { src: brand7, alt: "Airbnb" },
];

const BrandLogoSlider = () => {
  return (
    <div className=" my-20 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        We've helped thousands of sales teams
      </h2>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="flex items-center space-x-6"
      >
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className="h-8 mx-10 grayscale hover:grayscale-0 transition duration-300"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default BrandLogoSlider;
