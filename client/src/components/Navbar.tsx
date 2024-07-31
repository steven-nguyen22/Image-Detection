import React from "react";
import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";

function Navbar() {
  return (
    <header className="padding-x py-8 absolute z-10 w-full bg-white">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img
            src={headerLogo}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[129px] h-[29px]"
          />
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          <li className="font-montserrat leading-normal text-lg text-slate-gray">
            Home
          </li>
          <li>About Us</li>
          <li>Products</li>
          <li>Contact Us</li>
        </ul>
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a href="/">Sign in</a>
          <span>/</span>
          <a href="/">Explore now</a>
        </div>
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
