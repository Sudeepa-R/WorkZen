"use client";

import React, { useState, Suspense } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal'; // Updated import
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

function DashboardContent() {
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get('status');
    const dateFilter = searchParams.get('dueDate');

    const [isModalOpen, setIsModalOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingTask, setEditingTask] = useState<any>(null); // State for the task being edited

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
            // Update existing task
            setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
        } else {
            // Create new task
            setTasks([taskData, ...tasks]);
        }
        setEditingTask(null); // Reset edit state
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

    const filteredTasks = tasks.filter(task => {
        // Status Filter
        if (statusFilter && statusFilter !== 'all' && task.status !== statusFilter) {
            return false;
        }

        // Date Filter
        if (dateFilter && dateFilter !== 'all') {
            const taskDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
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
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
                <button
                    onClick={() => {
                        setEditingTask(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5EA500] text-white text-sm font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-sm"
                >
                    <PlusOutlined />
                    <span>Create Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
