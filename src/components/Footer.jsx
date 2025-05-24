import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center">
      <p>&copy; {new Date().getFullYear()} CarbonWise. All rights reserved.</p>
      <p className="text-sm mt-2">Made with ❤️ using React & Tailwind CSS</p>
    </footer>
  );
};

export default Footer;
