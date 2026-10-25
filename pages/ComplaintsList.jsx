import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ComplaintsList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/complaints');
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Complaints</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {complaints.length === 0 ? (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No complaints found.</li>
                    ) : (
                        complaints.map((complaint) => (
                            <li key={complaint._id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 truncate">{complaint.title}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                                {complaint.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 mr-6">
                                                Category: {complaint.category}
                                            </p>
                                            <p className="flex items-center text-sm text-gray-500">
                                                Priority: {complaint.priority}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>Submitted on {format(new Date(complaint.createdAt), 'MMM d, yyyy')}</p>
                                        </div>
                                    </div>
                                    {complaint.adminRemark && (
                                        <div className="mt-2 bg-gray-50 p-2 rounded text-sm text-gray-700 border-l-4 border-blue-500">
                                            <strong>Admin Remark:</strong> {complaint.adminRemark}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ComplaintsList;
