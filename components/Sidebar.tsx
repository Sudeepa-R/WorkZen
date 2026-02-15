"use client";

import React from 'react';
import { PlusOutlined, DownOutlined, FilterOutlined } from '@ant-design/icons';
import { Tabs, Badge, ConfigProvider, Select } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                {mounted && (
                    <>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5 uppercase tracking-wider text-xs">Status</label>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#5EA500',
                                    },
                                }}
                            >
                                <Select
                                    className="w-full"
                                    style={{ height: '48px' }}
                                    onChange={(value) => handleFilterChange('status', value)}
                                    value={searchParams.get('status') || 'all'}
                                    options={[
                                        { value: 'all', label: 'All Statuses' },
                                        { value: 'pending', label: 'Pending' },
                                        { value: 'completed', label: 'Completed' },
                                    ]}
                                />
                            </ConfigProvider>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5 uppercase tracking-wider text-xs">Due Date</label>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: '#5EA500',
                                    },
                                }}
                            >
                                <Select
                                    className="w-full"
                                    style={{ height: '48px' }}
                                    onChange={(value) => handleFilterChange('dueDate', value)}
                                    value={searchParams.get('dueDate') || 'all'}
                                    options={[
                                        { value: 'all', label: 'Any Date' },
                                        { value: 'today', label: 'Today' },
                                        { value: 'week', label: 'This Week' },
                                        { value: 'overdue', label: 'Overdue' },
                                    ]}
                                />
                            </ConfigProvider>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
