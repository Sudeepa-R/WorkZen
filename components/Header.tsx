"use client";

import React, { useState } from 'react';
import { SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import UserProfileModal from './UserProfileModal';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Dummy user data
    const user = {
        name: "John Doe",
        email: "john.doe@workzen.com",
        createdAt: "2023-01-15T09:00:00Z"
    };

    return (
        <header className="flex items-center justify-between p-8 bg-white/80 backdrop-blur-md border-b border-[#e6f4e6] sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1">
                <h1 className="text-2xl font-black text-[#5EA500] tracking-tight hidden lg:block">WorkZen</h1>
                <div className="bg-gray-50 rounded-xl px-4 py-2.5 flex items-center gap-3 w-full max-w-md border border-gray-100 focus-within:border-[#5EA500] focus-within:ring-2 focus-within:ring-[#5EA500]/20 transition-all ml-8">
                    <SearchOutlined className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks, projects..."
                        className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 hover:text-[#5EA500] transition-colors">
                    <BellOutlined className="text-xl" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <button
                    onClick={() => setIsProfileOpen(true)}
                    className="flex items-center gap-3 pl-6 border-l border-gray-100 hover:opacity-80 transition-opacity"
                >
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">Product Designer</p>
                    </div>
                    <div className="w-10 h-10 bg-[#5EA500] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5EA500]/20">
                        <UserOutlined className="text-lg" />
                    </div>
                </button>
            </div>

            <UserProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
            />
        </header>
    );
}
