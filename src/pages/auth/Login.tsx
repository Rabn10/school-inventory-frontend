const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        //   value={email}
                        //   onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        //   value={password}
                        //   onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm mt-4">
                        Don't have an account?{' '}
                        <a
                            href="/register"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;