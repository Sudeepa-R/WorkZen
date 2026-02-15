"use client";

import React, { useEffect } from 'react';
import { SearchOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Header() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        fetchUserData();
    }, [user.name]);

    const fetchUserData = () => {
        if (typeof window !== "undefined") {
            const storedProfile = localStorage.getItem("userProfile");
            if (storedProfile) {
                const data = JSON.parse(storedProfile);
                setUser({
                    name: data.name,
                    email: data.email
                });
            }
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        cookies.remove("token", { path: "/" });
        router.push('/login');
    };

    return (
        <header className="flex items-center justify-between p-4 md:p-6 lg:p-8 bg-white/80 backdrop-blur-md border-b border-[#e6f4e6] sticky top-0 z-40">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <h1 className="text-xl md:text-2xl font-black text-[#5EA500] tracking-tight"><span className="text-black">Work</span>Zen</h1>

                {/* Search Bar - Hidden on very small screens */}
                {/* <div className="hidden sm:flex bg-gray-50 rounded-xl px-3 md:px-4 py-2 md:py-2.5 items-center gap-2 md:gap-3 w-full max-w-xs md:max-w-md border border-gray-100 focus-within:border-[#5EA500] focus-within:ring-2 focus-within:ring-[#5EA500]/20 transition-all ml-2 md:ml-4 lg:ml-8">
                    <SearchOutlined className="text-gray-400 text-sm md:text-base" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="bg-transparent border-none focus:outline-none text-xs md:text-sm w-full text-gray-700 placeholder-gray-400"
                    />
                </div> */}
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="relative w-auto h-8 md:h-10 flex items-center justify-center px-2 md:px-3 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 text-red-500 transition-colors cursor-pointer"
                    title="Logout"
                >
                    <LogoutOutlined className="text-base md:text-xl" />
                    <span className="hidden md:inline ml-2">Logout</span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 lg:pl-6 border-l border-gray-100">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#5EA500] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5EA500]/20 cursor-pointer">
                        <UserOutlined className="text-sm md:text-lg" />
                    </div>
                </div>
            </div>
        </header>
    );
}
