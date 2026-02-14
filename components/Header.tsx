import React from 'react';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
                <MenuOutlined className="text-xl text-gray-600 cursor-pointer lg:hidden" />
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                    Work<span className="text-lime-600">Zen</span>
                </h1>
            </div>

            <div className="relative hidden md:block w-96">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-lime-500 focus:bg-white transition-all"
                />
                <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 font-bold text-sm border border-lime-200">
                    JD
                </div>
            </div>
        </header>
    );
}
