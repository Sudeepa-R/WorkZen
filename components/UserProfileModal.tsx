"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseOutlined, UserOutlined, MailOutlined, KeyOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        email: string;
        createdAt: string;
    };
}

export default function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const handleLogout = () => {
        // In a real app, you would clear cookies/storage here
        router.push('/login');
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-fade-in-up relative">
                {/* Header Background */}
                <div className="h-32 bg-gradient-to-br from-[#5EA500] to-[#3f6e00] relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all backdrop-blur-sm"
                    >
                        <CloseOutlined className="text-lg" />
                    </button>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                </div>

                <div className="px-6 pb-6">
                    {/* Avatar - Overlapping */}
                    <div className="relative -mt-16 mb-4 flex justify-center">
                        <div className="w-28 h-28 bg-white p-1.5 rounded-full shadow-lg">
                            <div className="w-full h-full bg-[#f0f9f0] rounded-full flex items-center justify-center text-5xl font-bold text-[#5EA500] border border-[#e6f4e6]">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </div>

                    {/* User Name & Role */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                        <p className="text-[#5EA500] font-medium bg-[#5EA500]/10 px-3 py-1 rounded-full inline-block text-xs">
                            Product Designer
                        </p>
                    </div>

                    {/* Info List */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100/50 hover:border-[#5EA500]/30 transition-colors group">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5EA500] transition-colors">
                                <MailOutlined />
                            </div>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                                <p className="text-sm font-semibold text-gray-700 truncate" title={user.email}>{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100/50 hover:border-[#5EA500]/30 transition-colors group">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5EA500] transition-colors">
                                <KeyOutlined />
                            </div>
                            <div className="ml-3">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Password</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100/50 hover:border-[#5EA500]/30 transition-colors group">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5EA500] transition-colors">
                                <CalendarOutlined />
                            </div>
                            <div className="ml-3">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Joined</p>
                                <p className="text-sm font-semibold text-gray-700">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
                    >
                        <LogoutOutlined />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
