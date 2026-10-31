import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, LayoutDashboard, FileText, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl text-blue-600">ComplaintSystem</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <LayoutDashboard className="w-4 h-4 mr-1" />
                                    Dashboard
                                </Link>
                                {user.role === 'student' && (
                                    <Link to="/complaints" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                        <FileText className="w-4 h-4 mr-1" />
                                        My Complaints
                                    </Link>
                                )}
                                <Link to={user.role === 'admin' ? '/admin-dashboard' : '/dashboard'} className="flex items-center space-x-2 ml-4 hover:text-blue-600 transition-colors cursor-pointer">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
