"use client"
import React, { useState } from 'react'
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    ArrowRightOutlined,
    LoadingOutlined
} from '@ant-design/icons'

import { useRouter } from 'next/navigation';

import { authApi } from '@/api/auth.api';
import Cookies from "universal-cookie";
import { message, notification } from 'antd';
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    // Dummy credentials pre-filled
    const [email, setEmail] = useState('demo@workzen.com');
    const [password, setPassword] = useState('password123');
    const [username, setUsername] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Clear errors/states if needed, or keep dummy data for convenience
        if (!isLogin) {
            // Switching to Login, maybe restore dummy?
            setEmail('demo@workzen.com');
            setPassword('password123');
        } else {
            // Switching to Signup
            setEmail('');
            setPassword('');
        }
        setUsername('');
    }

    const fetchUserProfile = async (userId: string) => {
        authApi.getProfile(userId)
            .then((profile) => {
                localStorage.setItem("userProfile", JSON.stringify(profile));
            })
            .catch((err) => {
                message.error('Failed to fetch user profile');
                console.error("Failed to fetch user profile", err);
            });
    }

    // Redirect to dashboard on login submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const res = await authApi.login({ email, password });
                if (res.token) {
                    cookies.set("token", res.token, {
                        path: "/",
                        maxAge: 7 * 24 * 60 * 60,
                        secure: true,
                        sameSite: "strict"
                    });
                    message.success('Login successful! Redirecting to dashboard...');
                    const decoded = jwtDecode(res.token) as any;
                    await fetchUserProfile(decoded.id);
                    router.push('/dashboard');
                }
            } else {
                await authApi.register({ email, password, name: username });
                message.success('Registration successful! Please log in.');
                setIsLogin(true);
            }
        } catch (err: any) {
            const errorMsg = err?.response?.data?.message || err?.message || 'An error occurred';
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
        console.log("Submitted", { isLogin, email, password, username });
        // if (isLogin) {
        //     router.push('/dashboard');
        // }
    };


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
            {/* Subtle Green Background Blobs - Simplified */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-lime-200/40 blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-[60px]" />
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-[400px] p-6 mx-4">
                {/* Logo Area */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
                        Mini Task Tracker
                    </h1>
                    <p className="text-gray-500 text-sm">Simplify your workflow.</p>
                </div>

                {/* Clean White Card */}
                <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl shadow-lime-900/5 p-8 relative overflow-hidden">

                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username (Signup Only) */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className={`relative group ${focusedField === 'username' ? 'scale-[1.01]' : ''} transition-transform duration-200`}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                                    <UserOutlined
                                        style={{
                                            fontSize: '18px',
                                            color: focusedField === 'username' ? '#65a30d' : '#9ca3af'
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-lime-500 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className={`relative group ${focusedField === 'email' ? 'scale-[1.01]' : ''} transition-transform duration-200`}>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                                <MailOutlined
                                    style={{
                                        fontSize: '18px',
                                        color: focusedField === 'email' ? '#65a30d' : '#9ca3af'
                                    }}
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-lime-500 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Password */}
                        <div className={`relative group ${focusedField === 'password' ? 'scale-[1.01]' : ''} transition-transform duration-200`}>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-50">
                                <LockOutlined
                                    style={{
                                        fontSize: '18px',
                                        color: focusedField === 'password' ? '#65a30d' : '#9ca3af'
                                    }}
                                />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-lime-500 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Forgot Password (Login Only) */}
                        {/* {isLogin && (
                            <div className="flex justify-end">
                                <a href="#" className="text-xs text-gray-500 hover:text-lime-600 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )} */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.01] shadow-md shadow-lime-500/20 active:scale-[0.99] cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoadingOutlined className="animate-spin text-white" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRightOutlined className="text-sm" />
                                </>
                            )}
                        </button>
                    </form>


                    {/* Footer toggle */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleMode}
                                className="ml-1 text-lime-600 hover:text-lime-700 font-medium transition-colors hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}



