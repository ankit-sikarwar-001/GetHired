import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-16 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Branding Section */}
                <div>
                    <h2 className="text-2xl font-bold ">
                        Get<span className="text-[#F83002]">Hired</span>
                    </h2>
                    <p className="text-sm mt-3">
                        No.1 Recruitment Website for developers, engineers and tech enthusiasts. Land your dream job today.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
                        <li><a href="/jobs" className="hover:text-purple-600 transition">Jobs</a></li>
                        <li><a href="/browse" className="hover:text-purple-600 transition">Browse</a></li>
                        <li><a href="/login" className="hover:text-purple-600 transition">Login</a></li>
                        <li><a href="/signup" className="hover:text-purple-600 transition">Sign Up</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-purple-600 transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-purple-600 transition">Contact</a></li>
                        <li><a href="/faq" className="hover:text-purple-600 transition">FAQs</a></li>
                        <li><a href="/privacy" className="hover:text-purple-600 transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-purple-600 transition">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-purple-600 hover:text-purple-800 transition"><FaFacebookF /></a>
                        <a href="#" className="text-purple-600 hover:text-purple-800 transition"><FaTwitter /></a>
                        <a href="#" className="text-purple-600 hover:text-purple-800 transition"><FaLinkedinIn /></a>
                        <a href="#" className="text-purple-600 hover:text-purple-800 transition"><FaInstagram /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center py-4 border-t text-sm bg-gray-50">
                &copy; {new Date().getFullYear()} GetHired. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
