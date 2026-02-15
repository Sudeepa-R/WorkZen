"use client";

import React, { useState, Suspense, useEffect } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { PlusOutlined } from '@ant-design/icons';
import { Tabs, Badge, ConfigProvider, Select } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const statusFilter = searchParams.get('status');
    const dateFilter = searchParams.get('dueDate');

    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                {/* Title and Create Button - More compact on mobile */}
                <div className="flex flex-row items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Tasks</h1>
                    </div>
                    <button
                        onClick={() => {
                            setEditingTask(null);
                            setIsModalOpen(true);
                        }}
                        suppressHydrationWarning
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#5EA500] text-white text-sm font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-sm cursor-pointer"
                    >
                        <PlusOutlined />
                        <span className="hidden sm:inline">Create Task</span>
                        <span className="inline sm:hidden">New</span>
                    </button>
                </div>

                {/* Tabs Filter - Status (Visible on all devices) */}
                <div className="mt-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-gray-100 overflow-x-auto no-scrollbar">
                    {mounted && (
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5EA500',
                                    borderRadius: 8,
                                },
                                components: {
                                    Tabs: {
                                        titleFontSize: 14,
                                        itemSelectedColor: '#5EA500',
                                        itemHoverColor: '#5EA500',
                                        inkBarColor: '#5EA500',
                                    }
                                }
                            }}
                        >
                            <Tabs
                                activeKey={statusFilter || 'all'}
                                onChange={(key) => handleFilterChange('status', key)}
                                className="status-tabs"
                                items={[
                                    {
                                        key: 'all',
                                        label: (
                                            <div className="flex items-center gap-2 pb-1">
                                                <span>All Tasks</span>
                                                <Badge
                                                    count={tasks.length}
                                                    showZero
                                                    color={(!statusFilter || statusFilter === 'all') ? '#5EA500' : '#d9d9d9'}
                                                    className="scale-90"
                                                />
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'pending',
                                        label: (
                                            <div className="flex items-center gap-2 pb-1">
                                                <span>Pending</span>
                                                <Badge
                                                    count={tasks.filter(t => t.status === 'pending').length}
                                                    showZero
                                                    color={statusFilter === 'pending' ? '#5EA500' : '#d9d9d9'}
                                                    className="scale-90"
                                                />
                                            </div>
                                        ),
                                    },
                                    {
                                        key: 'completed',
                                        label: (
                                            <div className="flex items-center gap-2 pb-1">
                                                <span>Completed</span>
                                                <Badge
                                                    count={tasks.filter(t => t.status === 'completed').length}
                                                    showZero
                                                    color={statusFilter === 'completed' ? '#5EA500' : '#d9d9d9'}
                                                    className="scale-90"
                                                />
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </ConfigProvider>
                    )}
                </div>

                {/* Inline Filters - Mobile/Tablet Only (Due Date) */}
                <div className="lg:hidden mb-6">
                    {mounted && (
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#5EA500',
                                },
                            }}
                        >
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Due Date</label>
                                <Select
                                    size="large"
                                    className="w-full"
                                    onChange={(value) => handleFilterChange('dueDate', value)}
                                    value={dateFilter || 'all'}
                                    options={[
                                        { value: 'all', label: 'Any Date' },
                                        { value: 'today', label: 'Today' },
                                        { value: 'week', label: 'This Week' },
                                        { value: 'overdue', label: 'Overdue' },
                                    ]}
                                />
                            </div>
                        </ConfigProvider>
                    )}
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
