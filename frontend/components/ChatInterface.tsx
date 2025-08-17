'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import apiClient from '@/lib/api';
import toast from 'react-hot-toast';

export default function ChatInterface() {
  const { messages, addMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/chat/ask', { question: input });
      const assistantMessage = { role: 'assistant' as const, content: response.data.answer };
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error asking question:', error);
      toast.error('Failed to get an answer. Please try again.');
      // Optional: remove the user's message if the API call fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Message Display Area */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">B</div>
              )}
              <div
                className={`max-w-lg p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">B</div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-xl">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your documents..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-blue-600 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
