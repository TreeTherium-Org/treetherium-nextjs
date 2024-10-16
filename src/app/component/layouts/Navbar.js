"use client"; 

import React from "react";
import Image from 'next/image'; // For optimized image handling in Next.js
import Link from 'next/link';   // For routing

const Navbar = () => {
    return (
        <div className="ba-navbar">
            <div className="ba-navbar-user">
                <div className="menu-close">
                    <i className="la la-times" />
                </div>
                <div className="thumb">
                    {/* Using Image component for optimized loading */}
                    <Image src="/assets/img/user.png" alt="user" width={50} height={50} />
                </div>
                <div className="details">
                    <h5>Raduronto kelax</h5>
                    <p>ID: 99883323</p>
                </div>
            </div>
            <div className="ba-add-balance-title">
                <h5>Add Balance</h5>
                <p>$458786.00</p>
            </div>
            <div className="ba-add-balance-title style-two">
                <h5>Deposit</h5>
                <i className="fa fa-plus" />
            </div>
            <div className="ba-main-menu">
                <h5>Menu</h5>
                <ul>
                    {/* Using Next.js Link component */}
                    <li><Link href="/Analytics">Analytics</Link></li>
                    <li><Link href="/all-pages">Pages</Link></li>
                    <li><Link href="/components">Components</Link></li>
                    <li><Link href="/carts">My Cart</Link></li>
                    <li><Link href="/user-setting">Setting</Link></li>
                    <li><Link href="/notification">Notification</Link></li>
                    <li><Link href="/signup">Logout</Link></li>
                </ul>
                <Link className="btn btn-purple" href="/user-setting">View Profile</Link>
            </div>
        </div>
    );
};

export default Navbar;
