import React from 'react';
import bookingTruck from '../../../assets/bookingIcon.png'

const HowItWorks = () => {
    return (
        <div className='max-w-7xl mx-auto mt-16'>
            <h2 className='text-3xl font-extrabold mb-5'>How it Works</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='bg-base-200 rounded-lg shadow p-8 space-y-3'>
                    {/* icon */}
                    <div>
                        <img src={bookingTruck} alt="" />
                    </div>
                    {/* title */}
                    <p className='text-xl font-bold'>Booking Pick & Drop</p>
                    {/* content */}
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-base-200 rounded-lg shadow p-8 space-y-3'>
                    {/* icon */}
                    <div>
                        <img src={bookingTruck} alt="" />
                    </div>
                    {/* title */}
                    <p className='text-xl font-bold'>Cash On Delivery</p>
                    {/* content */}
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-base-200 rounded-lg shadow p-8 space-y-3'>
                    {/* icon */}
                    <div>
                        <img src={bookingTruck} alt="" />
                    </div>
                    {/* title */}
                    <p className='text-xl font-bold'>Delivery Hub</p>
                    {/* content */}
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='bg-base-200 rounded-lg shadow p-8 space-y-3'>
                    {/* icon */}
                    <div>
                        <img src={bookingTruck} alt="" />
                    </div>
                    {/* title */}
                    <p className='text-xl font-bold'>Booking SME & Corporate</p>
                    {/* content */}
                    <p>From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;