import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/Footer";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <div className="bg-white text-gray-800">
                {/* Hero Section */}
                <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
                    <p className="max-w-2xl mx-auto text-lg opacity-90">
                        Have questions or feedback? We're always here to help you!
                    </p>
                </section>

                {/* Contact Info + Form */}
                <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-gray-600">
                            We'd love to hear from you. Reach out for support, feedback, or
                            partnership opportunities.
                        </p>

                        <div className="flex items-center gap-3">
                            <Mail className="text-purple-600" />
                            <p>support@gethired.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-purple-600" />
                            <p>+91 98765 43210</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-purple-600" />
                            <p>Gurugram, Haryana, India</p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-50 rounded-xl p-8 shadow border"
                    >
                        <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                        <div className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <Textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                            <Button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </section>
            </div>
            <Footer />
        </>

    );
};

export default ContactUs;
