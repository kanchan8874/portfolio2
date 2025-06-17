import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-950 to-purple-800 text-white py-4 px-8 shadow-lg z-10">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">Kanchan kushwaha</div>

        <div className="md:hidden">
          <button className="text-3xl" onClick={toggleMenu}>
            {menuOpen ? (
              <span>&#10005;</span> // Close icon
            ) : (
              <span>&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>

        <div className="hidden md:flex space-x-8 items-center font-semibold">
          <a href="#home" className="cursor-pointer hover:text-yellow-500">
            Home
          </a>
          <a href="#about" className="cursor-pointer hover:text-yellow-500">
            About
          </a>
          <a href="#skills" className="cursor-pointer hover:text-yellow-500">
            Skills
          </a>
          <a href="#projects" className="cursor-pointer hover:text-yellow-500">
            Projects
          </a>
          <a href="#contact" className="cursor-pointer hover:text-yellow-500">
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu - Visible when menuOpen is true */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 right-0 w-2/4 bg-gradient-to-r from-blue-800 to-purple-700 py-4 px-8 space-y-4`}
      >
        <a href="#home" className="block cursor-pointer hover:text-blue-300">
          Home
        </a>
        <a href="#about" className="block cursor-pointer hover:text-blue-300">
          About
        </a>
        <a href="#skills" className="block cursor-pointer hover:text-blue-300">
            Skills
        </a>
        <a href="#projects" className="block cursor-pointer hover:text-blue-300">
          Projects
        </a>
        <a href="#contact" className="block cursor-pointer hover:text-blue-300">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
