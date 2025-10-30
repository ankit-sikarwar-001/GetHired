import React from "react";
import { Briefcase, Users, Rocket, Target, Heart } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="bg-white text-gray-800">
                {/* Hero Section */}
                <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <h1 className="text-5xl font-bold mb-3">About GetHired</h1>
                    <p className="max-w-2xl mx-auto text-lg opacity-90">
                        Building bridges between talent and opportunity with innovation,
                        transparency, and technology.
                    </p>
                </section>

                {/* Who We Are */}
                <section className="py-16 px-6 md:px-20 text-center">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                        Who We Are
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        <span className="font-semibold text-purple-700">GetHired</span> is a
                        next-generation recruitment platform created for developers, engineers,
                        and tech enthusiasts. We make the hiring process smarter, faster, and
                        human-friendly — connecting passionate talent with growing
                        organizations.
                    </p>
                </section>

                {/* Mission and Vision */}
                <section className="py-16 bg-gray-50 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
                    <div className="rounded-xl shadow p-8 bg-white border border-gray-100">
                        <Rocket className="w-10 h-10 text-purple-600 mb-3" />
                        <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Empower professionals to find their dream jobs and enable companies
                            to discover top talent with an easy, efficient, and transparent
                            recruitment experience.
                        </p>
                    </div>
                    <div className="rounded-xl shadow p-8 bg-white border border-gray-100">
                        <Target className="w-10 h-10 text-indigo-600 mb-3" />
                        <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To become India’s most trusted job platform where innovation meets
                            opportunity — helping every individual and company reach their
                            fullest potential.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 px-6 md:px-20 text-center bg-white">
                    <h2 className="text-3xl font-semibold mb-12">Our Core Values</h2>
                    <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm border hover:shadow-md transition">
                            <Briefcase className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                We embrace technology to simplify hiring and career growth.
                            </p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm border hover:shadow-md transition">
                            <Users className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                            <p className="text-gray-600">
                                Success happens when employers and job seekers grow together.
                            </p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm border hover:shadow-md transition">
                            <Heart className="w-10 h-10 text-pink-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                            <p className="text-gray-600">
                                We value honesty, fairness, and accountability in every step.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Join the Future of Smart Hiring
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto mb-8">
                        Whether you're hiring or job hunting, GetHired is here to power your
                        journey. Let’s build the workforce of tomorrow.
                    </p>
                    <button onClick={() => navigate("/", scrollTo(0, 0))} className="bg-white text-purple-700 font-semibold cursor-pointer px-8 py-3 rounded-full shadow hover:bg-gray-100 transition">
                        Get Started
                    </button>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
