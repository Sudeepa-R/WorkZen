"use client";

import React, { useState, Suspense } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const statusFilter = searchParams.get('status');
    const dateFilter = searchParams.get('dueDate');

    const [isModalOpen, setIsModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingTask, setEditingTask] = useState<any>(null);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Redesign Homepage",
            description: "Update the homepage layout to match the new branding guidelines. Focus on the hero section and navigation.",
            status: "pending",
            dueDate: "2023-11-15",
            owner: "Alex Johnson",
            createdAt: "2023-11-01T10:00:00Z"
        },
        {
            id: 2,
            title: "API Integration",
            description: "Connect the frontend with the new user authentication API. Handle token storage and refresh logic.",
            status: "completed",
            dueDate: "2023-10-30",
            owner: "Sam Smith",
            createdAt: "2023-10-20T14:30:00Z"
        },
        {
            id: 3,
            title: "Q4 Marketing Plan",
            description: "Draft the marketing strategy for the upcoming quarter. Include budget allocation and key performance indicators.",
            status: "pending",
            dueDate: "2023-12-01",
            owner: "Sarah Williams",
            createdAt: "2023-11-05T09:15:00Z"
        }
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSaveTask = (taskData: any) => {
        if (editingTask) {
            setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
        } else {
            setTasks([taskData, ...tasks]);
        }
        setEditingTask(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditTask = (task: any) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (id: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/dashboard?${params.toString()}`);
    };

    const filteredTasks = tasks.filter(task => {
        if (statusFilter && statusFilter !== 'all' && task.status !== statusFilter) {
            return false;
        }

        if (dateFilter && dateFilter !== 'all') {
            const taskDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const taskDateOnly = new Date(taskDate);
            taskDateOnly.setHours(0, 0, 0, 0);

            if (dateFilter === 'today') {
                return taskDateOnly.getTime() === today.getTime();
            }
            if (dateFilter === 'overdue') {
                return taskDateOnly < today && task.status !== 'completed';
            }
            if (dateFilter === 'week') {
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                return taskDateOnly >= today && taskDateOnly <= nextWeek;
            }
        }

        return true;
    });

    return (
        <div className="flex flex-col h-full">
            {/* Fixed Header Section with Create Task and Filters */}
            <div className="flex-shrink-0 bg-white pb-4 md:pb-6">
                {/* Title and Create Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Task List</h1>
                    <button
                        onClick={() => {
                            setEditingTask(null);
                            setIsModalOpen(true);
                        }}
                        suppressHydrationWarning
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5EA500] text-white text-sm font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-sm cursor-pointer"
                    >
                        <PlusOutlined />
                        <span>Create Task</span>
                    </button>
                </div>

                {/* Inline Filters - Mobile/Tablet Only */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Status Filter */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Status</label>
                        <div className="relative">
                            <select
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                value={statusFilter || 'all'}
                                className="w-full appearance-none bg-white border border-[#e6f4e6] text-gray-700 py-2.5 px-3 rounded-lg shadow-sm focus:outline-none focus:border-[#5EA500] focus:ring-2 focus:ring-[#5EA500]/20 transition-all cursor-pointer hover:border-[#5EA500]/50 text-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            <DownOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5EA500] pointer-events-none" />
                        </div>
                    </div>

                    {/* Due Date Filter */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Due Date</label>
                        <div className="relative">
                            <select
                                onChange={(e) => handleFilterChange('dueDate', e.target.value)}
                                value={dateFilter || 'all'}
                                className="w-full appearance-none bg-white border border-[#e6f4e6] text-gray-700 py-2.5 px-3 rounded-lg shadow-sm focus:outline-none focus:border-[#5EA500] focus:ring-2 focus:ring-[#5EA500]/20 transition-all cursor-pointer hover:border-[#5EA500]/50 text-sm"
                            >
                                <option value="all">Any Date</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="overdue">Overdue</option>
                            </select>
                            <DownOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5EA500] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Task Cards Section */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                {...task as any}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No tasks match your filters.
                        </div>
                    )}
                </div>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
                currentUser="John Doe"
                initialData={editingTask}
            />
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<div className="p-8">Loading tasks...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
