import React from 'react';
import TaskCard from '@/components/TaskCard';

export default function Dashboard() {
    const dummyTasks = [
        {
            id: 1,
            title: "Task Title 1",
            description: "Description of the task goes here. It includes details about the task."
        },
        {
            id: 2,
            title: "Task Title 2",
            description: "Description of the task goes here. It includes details about the task."
        },
        {
            id: 3,
            title: "Task Title 3",
            description: "Description of the task goes here. It includes details about the task."
        }
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dummyTasks.map(task => (
                    <TaskCard key={task.id} title={task.title} description={task.description} />
                ))}
            </div>
        </div>
    );
}
