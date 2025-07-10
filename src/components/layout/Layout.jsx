import React from 'react';
import Footer from '../Footer'; // Adjust path as needed

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white">
      {/* Optional: Navbar or Sidebar here */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
