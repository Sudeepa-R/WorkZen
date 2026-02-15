"use client";

import React from 'react';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/dashboard?${params.toString()}`);
    };

    return (
        <aside className="hidden lg:block w-72 bg-[#f8fff8] border-r border-[#e6f4e6] h-full p-8 shadow-[inset_-1px_0_0_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-10">
                <FilterOutlined className="text-[#5EA500] text-lg" />
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">Filters</h2>
            </div>

            <div className="space-y-8">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 uppercase tracking-wider text-xs">Status</label>
                    <div className="relative">
                        <select
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            value={searchParams.get('status') || 'all'}
                            className="w-full appearance-none bg-white border border-[#e6f4e6] text-gray-700 py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:border-[#5EA500] focus:ring-2 focus:ring-[#5EA500]/20 transition-all cursor-pointer hover:border-[#5EA500]/50"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <DownOutlined className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5EA500] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5 uppercase tracking-wider text-xs">Due Date</label>
                    <div className="relative">
                        <select
                            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
                            value={searchParams.get('dueDate') || 'all'}
                            className="w-full appearance-none bg-white border border-[#e6f4e6] text-gray-700 py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:border-[#5EA500] focus:ring-2 focus:ring-[#5EA500]/20 transition-all cursor-pointer hover:border-[#5EA500]/50"
                        >
                            <option value="all">Any Date</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="overdue">Overdue</option>
                        </select>
                        <DownOutlined className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5EA500] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
