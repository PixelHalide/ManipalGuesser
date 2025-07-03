'use client';

import { useState } from "react";

interface FormProps {
    onSubmit?: (result: any) => void;
}

function Form ({onSubmit}: FormProps) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            "name":name,
            "message":message
        };

        try {
            const response = await fetch(`${API_URL}/form`, {
                method: "POST",
                headers: {'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong on the server.');
            }

            const result = await response.json();

            if (onSubmit) {
                onSubmit(result);
            }

            setName('');
            setMessage('');

        } catch (e){
            console.error('Error submitting item:', e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-[#383838] dark:text-neutral-200 rounded shadow max-w-md">
            <label className="block mb-2">Username</label>
            <input
                required
                type="text"
                className="border p-2 w-full mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-2">Message</label>
            <textarea
                required
                className="border p-2 w-full mb-4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="bg-green-600 hover:bg-green-700 transition-all duration-400 hover:scale-108 shadow-lg text-white py-2 px-4 rounded">
                Submit
            </button>

        </form>
    );
}

export default Form;