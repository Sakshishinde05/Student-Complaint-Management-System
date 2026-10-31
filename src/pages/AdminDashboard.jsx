import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('complaints'); // 'complaints' or 'users'
    const [filter, setFilter] = useState('All');
    const [remarkText, setRemarkText] = useState({});

    useEffect(() => {
        fetchComplaints();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredComplaints(complaints);
        } else {
            setFilteredComplaints(complaints.filter(c => c.status === filter));
        }
    }, [filter, complaints]);

    const fetchComplaints = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/complaints');
            setComplaints(data);
            setFilteredComplaints(data);
        } catch (error) {
            toast.error('Failed to fetch complaints');
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/users');
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}/status`, {
                status: newStatus,
            });
            toast.success('Status updated');
            fetchComplaints();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const submitRemark = async (id) => {
        if (!remarkText[id]) return;
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}/status`, {
                adminRemark: remarkText[id],
            });
            toast.success('Remark added');
            fetchComplaints();
            setRemarkText({ ...remarkText, [id]: '' });
        } catch (error) {
            toast.error('Failed to add remark');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Resolved': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex space-x-4">
                    <div className="flex bg-gray-200 rounded-lg p-1">
                        <button
                            onClick={() => setView('complaints')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${view === 'complaints' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Complaints
                        </button>
                        <button
                            onClick={() => setView('users')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${view === 'users' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                            Users
                        </button>
                    </div>
                </div>
            </div>

            {view === 'complaints' ? (
                <>
                    <div className="flex justify-end mb-4 space-x-2">
                        {['All', 'Pending', 'In Progress', 'Resolved'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {filteredComplaints.length === 0 ? (
                                <li className="px-4 py-4 text-center text-gray-500">No complaints found.</li>
                            ) : (
                                filteredComplaints.map((complaint) => (
                                    <li key={complaint._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-blue-600">{complaint.title}</h3>
                                                <div className="text-sm text-gray-500">
                                                    {complaint.student?.name} ({complaint.student?.studentId}) - {complaint.student?.department}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                                                    {complaint.status}
                                                </span>
                                                <select
                                                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                                    value={complaint.status}
                                                    onChange={(e) => updateStatus(complaint._id, e.target.value)}
                                                >
                                                    <option>Pending</option>
                                                    <option>In Progress</option>
                                                    <option>Resolved</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-sm text-gray-700">
                                            <p>{complaint.description}</p>
                                        </div>

                                        <div className="mt-2 sm:flex sm:justify-between text-sm text-gray-500">
                                            <p>Category: <strong>{complaint.category}</strong></p>
                                            <p>Priority: <strong>{complaint.priority}</strong></p>
                                            <p>Date: {format(new Date(complaint.createdAt), 'MMM d, yyyy HH:mm')}</p>
                                        </div>

                                        <div className="mt-4 border-t pt-4">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add Admin Remark..."
                                                    className="flex-1 text-sm border-gray-300 rounded-md shadow-sm p-1 border focus:ring-blue-500 focus:border-blue-500"
                                                    value={remarkText[complaint._id] || ''}
                                                    onChange={(e) => setRemarkText({ ...remarkText, [complaint._id]: e.target.value })}
                                                />
                                                <button
                                                    onClick={() => submitRemark(complaint._id)}
                                                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                                                >
                                                    Save Remark
                                                </button>
                                            </div>
                                            {complaint.adminRemark && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    <strong>Current Remark:</strong> {complaint.adminRemark}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                )))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Registered Users</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">List of all students and admins.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <li key={user._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role}
                                            </span>
                                            {user.studentId && <span className="text-xs text-gray-500 mt-1">ID: {user.studentId}</span>}
                                            {user.department && <span className="text-xs text-gray-500">Dept: {user.department}</span>}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {users.length === 0 && <li className="px-4 py-4 text-center text-gray-500">No users found.</li>}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
