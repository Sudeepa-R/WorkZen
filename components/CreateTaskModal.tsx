"use client";

import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (task: any) => void;
    currentUser: string;
}

export default function CreateTaskModal({ isOpen, onClose, onSave, currentUser }: CreateTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [owner, setOwner] = useState(currentUser);

    // Reset fields when modal opens/closes or currentUser changes
    React.useEffect(() => {
        if (isOpen) {
            setOwner(currentUser);
            setStatus('pending');
        }
    }, [isOpen, currentUser]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title,
            description,
            status,
            dueDate,
            owner,
            createdAt: new Date().toISOString()
        };
        onSave(newTask);
        onClose();
        // Reset form
        setTitle('');
        setDescription('');
        setStatus('pending');
        setDueDate('');
        setOwner('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8fff8]">
                    <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <CloseOutlined className="text-lg" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Redesign Homepage"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <input
                                type="text"
                                value="Pending"
                                disabled
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Owner</label>
                            <input
                                type="text"
                                value={owner}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-[#5EA500]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                        <input
                            type="date"
                            required
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details about this task..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500]"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-[#5EA500] text-white font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-md shadow-[#5EA500]/20"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
