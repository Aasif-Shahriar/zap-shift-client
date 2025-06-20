import React from "react";
import merchant from '../../../assets/location-merchant.png'


const BeMerchant = () => {
  return (
    <div data-aos="zoom-in" className=" bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-secondary p-5 md:p-10 lg:p-20 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={merchant}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-base-100 font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6 text-sm md:text-lg text-base-300">
           We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn btn-primary text-black rounded-full">Become a Merchant</button>
          <button className="btn btn-primary btn-outline rounded-full md:ms-5 text-primary hover:text-black">Earn With A ProFast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
