import React from 'react';
import { CalendarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    dueDate: string;
    owner: string;
    createdAt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEdit: (task: any) => void;
    onDelete: (id: number) => void;
}

export default function TaskCard({ id, title, description, status = 'pending', dueDate, owner, createdAt, onEdit, onDelete }: TaskCardProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const displayStatus = status || 'pending';

    const handleEditClick = () => {
        onEdit({ id, title, description, status, dueDate, owner, createdAt });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${displayStatus === 'completed'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                    {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                    <ClockCircleOutlined /> {formatDate(createdAt)}
                </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-1" title={title}>{title}</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2 flex-grow">{description}</p>

            <div className="border-t border-gray-50 pt-4 mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2" title="Due Date">
                        <CalendarOutlined className="text-[#5EA500]" />
                        <span>{formatDate(dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-2" title="Owner">
                        <UserOutlined className="text-[#5EA500]" />
                        <span>{owner}</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        onClick={handleEditClick}
                        suppressHydrationWarning
                        className="flex-1 py-1.5 bg-[#5EA500] text-white text-xs font-medium rounded-md hover:bg-[#4a8000] transition-colors cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        suppressHydrationWarning
                        className="flex-1 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
