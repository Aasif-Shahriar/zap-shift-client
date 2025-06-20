// src/pages/Home/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 hover:bg-[#CAEB66] duration-300 shadow-md border hover:shadow-lg transition-all">
      <div className="card-body text-center items-center">
        <Icon className="text-4xl text-secondary mb-3" />
        <h2 className="card-title text-2xl font-bold">{title}</h2>
        <p className=" text-gray-600 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
