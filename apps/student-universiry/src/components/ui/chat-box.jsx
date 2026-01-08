import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatBox = ({ isOpen, onClose }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [message, setMessage] = useState('');

    const predefinedQuestions = [
        "How can I check my attendance?",
        "Where can I find my course materials?",
        "How do I submit assignments?",
        "When is the next webinar?",
        "How can I contact my instructor?"
    ];

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setMessage(question);
    };

    const handleSend = () => {
        if (message.trim()) {
            // Handle sending message
            console.log('Sending message:', message);
            setMessage('');
            setSelectedQuestion(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1D8CF8] to-[#1678FF] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-lg">Support Chat</h3>
                            <p className="text-white/80 text-xs">We're here to help! 😊</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Chat Content */}
                <div className="p-6 max-h-[500px] overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
                    {/* Welcome Message */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                            <p className="text-sm text-slate-700 leading-relaxed">
                                👋 Hello! How can we help you today? Select a question below or type your own.
                            </p>
                        </div>
                    </div>

                    {/* Predefined Questions */}
                    <div className="space-y-3 mb-6">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                            Quick Questions
                        </p>
                        {predefinedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestionClick(question)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-200",
                                    "border border-slate-200 hover:border-[#1D8CF8]",
                                    "bg-white hover:bg-blue-50",
                                    "text-sm text-slate-700 hover:text-[#1D8CF8]",
                                    "shadow-sm hover:shadow-md",
                                    "transform hover:-translate-y-0.5",
                                    selectedQuestion === question && "bg-blue-50 border-[#1D8CF8] text-[#1D8CF8]"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">💬</span>
                                    <span className="font-medium">{question}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message here..."
                            className={cn(
                                "flex-1 px-4 py-3 rounded-xl",
                                "border border-slate-300 focus:border-[#1D8CF8]",
                                "focus:outline-none focus:ring-2 focus:ring-[#1D8CF8]/20",
                                "text-sm text-slate-700 placeholder-slate-400",
                                "transition-all duration-200"
                            )}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim()}
                            className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                "bg-gradient-to-r from-[#1D8CF8] to-[#1678FF]",
                                "hover:from-[#1A7FE6] hover:to-[#1567E5]",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "transition-all duration-200 shadow-lg hover:shadow-xl",
                                "transform hover:scale-105 active:scale-95"
                            )}
                        >
                            <Send className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
