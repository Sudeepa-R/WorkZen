"use client";

import React, { useState, Suspense } from 'react';
import TaskCard from '@/components/TaskCard';
import CreateTaskModal from '@/components/CreateTaskModal';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get('status');
    const dateFilter = searchParams.get('dueDate');

    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleSaveTask = (newTask: any) => {
        setTasks([newTask, ...tasks]);
    };

    const filteredTasks = tasks.filter(task => {
        // Status Filter
        if (statusFilter && statusFilter !== 'all' && task.status !== statusFilter) {
            return false;
        }

        // Date Filter (Simplified logic for demo)
        if (dateFilter && dateFilter !== 'all') {
            const taskDate = new Date(task.dueDate);
            const today = new Date();

            if (dateFilter === 'today') {
                return taskDate.toDateString() === today.toDateString();
            }
            if (dateFilter === 'overdue') {
                return taskDate < today && task.status !== 'completed';
            }
            if (dateFilter === 'week') {
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                return taskDate >= today && taskDate <= nextWeek;
            }
            // 'week' logic omitted for brevity in this step, but can be added
        }

        return true;
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5EA500] text-white text-sm font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-sm"
                >
                    <PlusOutlined />
                    <span>Create Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <TaskCard key={task.id} {...task as any} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No tasks match your filters.
                    </div>
                )}
            </div>

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                currentUser="John Doe"
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
