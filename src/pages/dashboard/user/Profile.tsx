import { Box, Text } from "@mantine/core";

const Profile = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // value={formData.email}
                        // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // value={formData.password}
                        // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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