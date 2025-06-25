import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { successToast } from "../../common/toast";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const res = await axios.post('http://localhost:8000/api/register', formData);
            console.log("toast called", res.data.message);
            toast.success(res.data.message);
            // Redirect after successful registration
            navigate('/');
        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-green-600 hover:text-green-800 font-medium"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;