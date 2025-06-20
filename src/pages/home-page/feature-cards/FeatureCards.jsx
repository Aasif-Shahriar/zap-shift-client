// components/FeatureCards.jsx
import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import deliveryImg1 from "../../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    text: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: trackingImg,
    aos: "fade-up",
  },
  {
    title: "100% Safe Delivery",
    text: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: deliveryImg1,
    aos: "fade-up",
  },
  {
    title: "24/7 Call Center Support",
    text: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: deliveryImg1,
    aos: "fade-up",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl p-6 shadow-sm"
            data-aos={feature.aos}
            data-aos-delay={index * 100} 
          >
            {/* Image */}
            <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="h-24 md:h-full object-contain"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-dashed bg-gray-300 mx-6 h-full border-l border-gray-300 border-dashed"></div>

            {/* Content */}
            <div className="w-full md:w-3/4">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
