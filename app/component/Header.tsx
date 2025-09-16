import { useState, useEffect } from 'react';

const Header = () => {

  return (
<header className="py-3 px-10 flex items-center fixed top-0 w-full justify-between z-40 text-white">
<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
  <div className="flex flex-grow basis-0">
    <a href="./">
    <svg
    className="h-6 w-28 transition-colors duration-500"
    viewBox="0 0 342 35"
    xmlns="http://www.w3.org/2000/svg"
    ><path
    d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
    fill="currentColor"></path></svg
    >
    </a>
  </div>
      <nav className="hidden xl:block sm:hidden">
    <ul
      className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2"
    >
      <li><a href="#model-s">New Drops</a></li>
      <li><a href="#model-3">T-Shirts</a></li>
      <li><a href="#model-x">Shorts</a></li>
      <li><a href="#model-y">Hoodies</a></li>
      <li><a href="#powerwall">Jackets</a></li>
      <li><a href="#accesorios">Accessories</a></li>
    </ul>
  </nav>
  <nav className="flex flex-grow justify-end basis-0">
    <ul
      className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2"
    >
      <li className="hidden xl:block sm:hidden"><a href="#">Tienda</a></li>
      <li className="hidden xl:block sm:hidden"><a href="#">Cuenta</a></li>
      <li><a id="menu-btn" href="#">Menú</a></li>
    </ul>
  </nav>
</nav>
</header>
  );
};

export default Header;
