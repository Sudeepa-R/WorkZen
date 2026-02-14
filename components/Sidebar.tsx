import React from 'react';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#f0f9f0] border-r border-[#e0f2e0] h-full p-6 hidden lg:block">
            <div className="flex items-center gap-2 mb-8">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category:</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:border-lime-500 cursor-pointer">
                            <option>All</option>
                            <option>Work</option>
                            <option>Personal</option>
                            <option>Urgent</option>
                        </select>
                        <DownOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority:</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:border-lime-500 cursor-pointer">
                            <option>All</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <DownOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
