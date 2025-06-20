import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared-component/navbar/Navbar';
import Footer from '../pages/shared-component/footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-[1500px] mx-auto px-2 space-y-10'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;