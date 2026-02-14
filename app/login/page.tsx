"use client"
import React, { useState } from 'react'
import Link from 'next/link'

function Page() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false, username: false });
    const [signupError, setSignupError] = useState('');

    // Validation logic
    const isEmailInvalid = touched.email && (!email || !email.includes('@'));
    const isPasswordInvalid = touched.password && !password;
    const isUsernameInvalid = !isLogin && touched.username && !username;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true, username: !isLogin });

        // Mock error for signup to match the image
        if (!isLogin && email === 'existing@example.com') {
            setSignupError('Error: This email is already associated with an existing account.');
            return;
        }

        if (email && password && email.includes('@') && (isLogin || username)) {
            console.log(isLogin ? 'Login submitted' : 'Signup submitted', { email, password, username });
            setSignupError('');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Reset states
        setEmail('');
        setPassword('');
        setUsername('');
        setTouched({ email: false, password: false, username: false });
        setSignupError('');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-[400px] p-6 bg-white rounded-lg border-1 border-gray-200 shadow-lg ">
                <h1 className="text-2xl font-light text-black mb-8 text-center">
                    {isLogin ? 'Login to TaskManager' : 'Create Your Account'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field - Only for Signup */}
                    {!isLogin && (
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className="block text-sm text-gray-800"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
                                placeholder="Enter your username"
                                className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors placeholder:text-gray-400
                                    ${isUsernameInvalid
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-gray-200 focus:border-gray-400'
                                    }
                                `}
                            />
                            {isUsernameInvalid && (
                                <p className="text-xs text-red-500">
                                    Invalid username
                                </p>
                            )}  
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors placeholder:text-gray-400
                                ${isEmailInvalid
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-gray-200 focus:border-gray-400'
                                }
                            `}
                        />
                        {isEmailInvalid && (
                            <p className="text-xs text-red-500">
                                Invalid email address
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                            placeholder="Enter your password"
                            className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors placeholder:text-gray-400 
                                ${isPasswordInvalid
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-gray-200 focus:border-gray-400'
                                }
                            `}
                        />
                        {isPasswordInvalid && (
                            <p className="text-xs text-red-500">
                                Password is required
                            </p>
                        )}
                    </div>

                    {/* Signup Error Message */}
                    {!isLogin && signupError && (
                        <p className="text-xs text-red-500">
                            {signupError}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 text-white bg-lime-500 hover:bg-lime-600 rounded-lg transition-colors font-medium cursor-pointer"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-600 mt-4 cursor-pointer">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={toggleMode}
                            className="text-lime-500 hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
