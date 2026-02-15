"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (task: any) => void;
    currentUser: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any; // If provided, we are in Edit mode
}

export default function TaskModal({ isOpen, onClose, onSave, currentUser, initialData }: TaskModalProps) {
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [owner, setOwner] = useState(currentUser);

    const isEditMode = !!initialData;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset fields when modal opens/closes or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setTitle(initialData.title);
                setDescription(initialData.description);
                setStatus(initialData.status);
                setDueDate(initialData.dueDate);
                setOwner(initialData.owner);
            } else {
                // Reset for Create mode
                setTitle('');
                setDescription('');
                setStatus('pending');
                setDueDate('');
                setOwner(currentUser);
            }
        }
    }, [isOpen, initialData, currentUser]);

    if (!isOpen || !mounted) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = {
            id: initialData ? initialData.id : Date.now(),
            title,
            description,
            status,
            dueDate,
            owner,
            createdAt: initialData ? initialData.createdAt : new Date().toISOString()
        };
        onSave(taskData);
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#f8fff8]">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                        <CloseOutlined className="text-lg" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Redesign Homepage"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500] text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500] bg-white text-gray-700"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
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
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500] text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details about this task..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5EA500] focus:ring-1 focus:ring-[#5EA500] text-gray-700 placeholder-gray-400"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-[#5EA500] text-white font-medium rounded-lg hover:bg-[#4a8000] transition-colors shadow-md shadow-[#5EA500]/20 cursor-pointer"
                        >
                            {isEditMode ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
