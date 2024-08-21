import React from "react";
import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="padding-x py-8 absolute z-10 w-full bg-white">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img
            src="./logo2.svg"
            alt="logo"
            width={129}
            height={30}
            className="w-[129px] h-[30px] object-cover mx-auto"
          />
        </a>
        <ul className="flex-1 flex justify-end items-center gap-16 max-lg:hidden">
          <li>
            <Link
              to="/"
              className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/fileupload"
              className="font-montserrat leading-normal text-lg text-slate-gray"
            >
              Get Started
            </Link>
          </li>

          {/* <li>Products</li>
          <li>Contact Us</li> */}
        </ul>
        {/* <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a href="/">Sign in</a>
          <span>/</span>
          <a href="/">Explore now</a>
        </div> */}
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
