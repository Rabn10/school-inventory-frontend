import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../plugins/axios";
import { toast } from "react-toastify";

// interface IUserDataProps {
//     id: null | number;
//     name: string;
//     email: string;
// }

const ChangePassword = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [changePassword, setChangePassword] = useState({
        current_password: '',
        password: ''
    });

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response: any = await axios.post(`/user/changePassword`, changePassword);
            if (response.data.status === 1) {
                toast.success(response.data.message);
                navigate('/dashboard');
            } else {
                toast.error(response.data.message);
                navigate(`/change-password/${id}`); // Redirect to change password page on error
            }

        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Current Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={changePassword.current_password}
                            onChange={(e) => setChangePassword({ ...changePassword, current_password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={changePassword.password}
                            onChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;