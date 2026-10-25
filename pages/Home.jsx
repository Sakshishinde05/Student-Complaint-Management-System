
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Clock } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Student Complaint <br className="hidden md:block" />
                        Management System
                    </h1>
                    <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto mb-10">
                        A streamlined platform for students to report issues and for administrators to resolve them efficiently.
                        Transparent, fast, and secure.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg transition-transform transform hover:scale-105"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-40 hover:bg-opacity-50 md:py-4 md:text-lg md:px-10 backdrop-blur-sm transition-transform transform hover:scale-105"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Why use our platform?
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Designed to make campus life better for everyone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Reporting</h3>
                            <p className="text-gray-600">
                                Submit complaints in seconds with our user-friendly interface. Categorize issues for faster resolution.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Tracking</h3>
                            <p className="text-gray-600">
                                Monitor the status of your complaints in real-time. Get notified when your issue is resolved.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                            <p className="text-gray-600">
                                Your data is secure. Complaints are handled with confidentiality and professionalism.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <span className="font-bold text-2xl">ComplaintSys</span>
                            <p className="mt-2 text-gray-400 text-sm">Making campus voices heard.</p>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Student Complaint Management System. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
