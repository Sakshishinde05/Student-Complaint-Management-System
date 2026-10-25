import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, List, User } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
    });

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/complaints');
                const total = data.length;
                const pending = data.filter(c => c.status === 'Pending').length;
                const inProgress = data.filter(c => c.status === 'In Progress').length;
                const resolved = data.filter(c => c.status === 'Resolved').length;
                setStats({ total, pending, inProgress, resolved });
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
                <p className="mt-2 text-gray-600">Here's an overview of your complaint history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Complaints</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                        <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pending}</dd>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.inProgress}</dd>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Resolved</dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.resolved}</dd>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/complaint-form" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                    <div className="px-4 py-5 sm:p-6 flex items-center">
                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <PlusCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dt className="text-lg font-medium text-gray-900 truncate">File a New Complaint</dt>
                            <dd className="mt-1 text-sm text-gray-500">Submit a new issue to the administration.</dd>
                        </div>
                    </div>
                </Link>
                <Link to="/complaints" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
                    <div className="px-4 py-5 sm:p-6 flex items-center">
                        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                            <List className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dt className="text-lg font-medium text-gray-900 truncate">View My Complaints</dt>
                            <dd className="mt-1 text-sm text-gray-500">Check the status of your submitted complaints.</dd>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
