import React from 'react';

interface TaskCardProps {
    title: string;
    description: string;
}

export default function TaskCard({ title, description }: TaskCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-3">{description}</p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-lime-500 text-white text-xs font-medium rounded-md hover:bg-lime-600 transition-colors">
                        Edit
                    </button>
                    <button className="px-4 py-1.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-300 transition-colors">
                        Delete
                    </button>
                </div>
                <div className="w-3 h-3 rounded-full bg-lime-500" title="Active"></div>
            </div>
        </div>
    );
}
