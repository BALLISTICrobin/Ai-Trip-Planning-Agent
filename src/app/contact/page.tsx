'use client';

import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    ChatBubbleLeftRightIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: EnvelopeIcon,
            title: 'Email Us',
            details: 'support@tripplanner.com',
            description: 'Send us an email anytime'
        },
        {
            icon: PhoneIcon,
            title: 'Call Us',
            details: '+1 (555) 123-4567',
            description: '24/7 customer support'
        },
        {
            icon: MapPinIcon,
            title: 'Visit Us',
            details: '123 Travel Street, Adventure City, AC 12345',
            description: 'Our headquarters'
        },
        {
            icon: ClockIcon,
            title: 'Business Hours',
            details: 'Mon-Fri: 9AM-6PM EST',
            description: 'We\'re here to help'
        }
    ];

    const faqItems = [
        {
            question: 'How accurate are the AI-generated itineraries?',
            answer: 'Our AI uses real-time data and millions of travel patterns to create highly accurate itineraries. We have a 99% satisfaction rate among our users.'
        },
        {
            question: 'Can I modify the suggested itinerary?',
            answer: 'While our current version provides complete itineraries, we\'re working on customization features. Contact us for specific modifications.'
        },
        {
            question: 'Do you handle bookings for flights and hotels?',
            answer: 'Currently, we provide detailed recommendations and links to trusted booking partners. Direct booking features are coming soon!'
        },
        {
            question: 'Is there a cost for using TripPlanner?',
            answer: 'Our basic trip planning service is completely free. Premium features with advanced customization will be available in future updates.'
        }
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form after showing success
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="hero min-h-[50vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
                    <div className="hero-content text-center max-w-4xl">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Contact Us
                            </h1>
                            <p className="text-xl md:text-2xl text-base-content/80 max-w-3xl">
                                Have questions about your travel plans? We're here to help make your journey unforgettable.
                            </p>
                            <div className="text-4xl">📞</div>
                        </div>
                    </div>
                </div>

                <div className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">

                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <Card
                                        key={index}
                                        hoverable
                                        shadow="md"
                                        className="text-center h-full hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="space-y-4">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                                <Icon className="w-8 h-8 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-bold">{info.title}</h3>
                                            <p className="font-semibold text-primary">{info.details}</p>
                                            <p className="text-sm text-base-content/70">{info.description}</p>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Contact Form */}
                            <Card
                                title="Send us a Message"
                                subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
                                shadow="xl"
                            >
                                {submitted ? (
                                    <div className="text-center space-y-4 py-8">
                                        <div className="text-6xl">✅</div>
                                        <h3 className="text-2xl font-bold text-success">Message Sent!</h3>
                                        <p className="text-base-content/70">
                                            Thank you for contacting us. We'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Your Name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                required
                                            />
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <Input
                                            label="Subject"
                                            placeholder="How can we help you?"
                                            value={formData.subject}
                                            onChange={(e) => handleInputChange('subject', e.target.value)}
                                            required
                                        />

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-medium">
                                                    Message *
                                                </span>
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered w-full h-32 transition-all duration-200 focus:scale-[1.02]"
                                                placeholder="Tell us about your travel plans or any questions you have..."
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            loading={isSubmitting}
                                            disabled={isSubmitting}
                                            className="w-full"
                                        >
                                            {isSubmitting ? 'Sending Message...' : 'Send Message'}
                                        </Button>
                                    </form>
                                )}
                            </Card>

                            {/* FAQ Section */}
                            <div className="space-y-6">
                                <Card shadow="md" className="bg-gradient-to-br from-primary/5 to-secondary/5">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                            <QuestionMarkCircleIcon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-primary">Frequently Asked Questions</h2>
                                        <p className="text-base-content/70">
                                            Quick answers to common questions about TripPlanner
                                        </p>
                                    </div>
                                </Card>

                                <div className="space-y-4">
                                    {faqItems.map((faq, index) => (
                                        <div key={index} className="collapse collapse-arrow bg-base-100 shadow-md">
                                            <input type="radio" name="faq-accordion" />
                                            <div className="collapse-title text-lg font-medium">
                                                {faq.question}
                                            </div>
                                            <div className="collapse-content">
                                                <p className="text-base-content/70">{faq.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Action Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card hoverable shadow="md" className="text-center">
                                        <div className="space-y-3">
                                            <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary mx-auto" />
                                            <h3 className="font-bold">Live Chat</h3>
                                            <p className="text-sm text-base-content/70">
                                                Chat with our support team
                                            </p>
                                            <Button size="sm" variant="outline" className="w-full">
                                                Start Chat
                                            </Button>
                                        </div>
                                    </Card>

                                    <Card hoverable shadow="md" className="text-center">
                                        <div className="space-y-3">
                                            <QuestionMarkCircleIcon className="w-8 h-8 text-secondary mx-auto" />
                                            <h3 className="font-bold">Help Center</h3>
                                            <p className="text-sm text-base-content/70">
                                                Browse our help articles
                                            </p>
                                            <Button size="sm" variant="outline" className="w-full">
                                                Visit Help Center
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}