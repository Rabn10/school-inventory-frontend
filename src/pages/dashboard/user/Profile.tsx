import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../plugins/axios";
import { toast } from "react-toastify";

interface IUserDataProps {
    id: null | number;
    name: string;
    email: string;
}

const Profile = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [userData, setUserData] = useState<IUserDataProps>({
        id: null,
        name: '',
        email: ''
    });

    // const [formData, setFormData] = useState<IUserDataProps>({
    //     // id: null,
    //     name: '',
    //     email: ''
    // });

    const loadData = async () => {
        try {
            let response: any = await axios.get(`/user/${id}`);
            setUserData(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response: any = await axios.put(`/user/${userData.id}`, userData);
            if (response.data.status === 1) {
                toast.success(response.data.message);
                navigate('/dashboard');
            }

        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
                <form onSubmit={updateUser} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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

export default Profile;