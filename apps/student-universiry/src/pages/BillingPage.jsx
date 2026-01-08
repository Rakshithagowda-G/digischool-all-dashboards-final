import React from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { DashboardNavbar } from '@/components/ui/dashboard-navbar';
import {
    CreditCard,
    Download,
    AlertCircle,
    ArrowUp,
    ArrowDown,
    Calendar,
    MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BillingPage() {
    const { darkMode } = useDarkMode();

    const bgColor = darkMode ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-100';
    const cardBg = darkMode ? 'bg-[#111c44]' : 'bg-white';
    const textColor = darkMode ? 'text-white' : 'text-slate-900';
    const subText = darkMode ? 'text-slate-400' : 'text-slate-500';
    const borderColor = darkMode ? 'border-[#2b3674]' : 'border-slate-200';

    return (
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
            <div
                className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden ${bgColor}`}
                style={darkMode ? { backgroundImage: "url(/img/body-background.png)" } : {}}
            >
                {/* Navbar */}
                <div className="px-6 pt-4">
                    <DashboardNavbar />
                </div>

                {/* Main Content Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Breadcrumb & Title */}
                    <div className="flex flex-col gap-1">
                        <div className={`flex items-center gap-2 text-sm ${subText}`}>
                            <span>Home</span>
                            <span>/</span>
                            <span className={textColor}>Payment</span>
                        </div>
                        <h1 className={`text-2xl font-bold ${textColor}`}>Payment</h1>
                    </div>

                    {/* Top Section: Card | Pending | Receipts */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Column (Card & Pending) */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Credit Card Widget */}
                                <div className="relative h-56 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
                                    }}>
                                    <div className="flex justify-between items-start z-10">
                                        <h3 className="text-white font-bold text-lg">EduLearn</h3>
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                                        </div>
                                    </div>

                                    <div className="z-10 mt-4">
                                        <div className="text-white/80 text-xl font-mono tracking-wider">7812 2139 0823 7916</div>
                                    </div>

                                    <div className="flex justify-between items-end z-10 mt-auto">
                                        <div className="flex gap-6">
                                            <div>
                                                <div className="text-white/60 text-xs uppercase">Valid Thru</div>
                                                <div className="text-white font-medium">05/24</div>
                                            </div>
                                            <div>
                                                <div className="text-white/60 text-xs uppercase">CVV</div>
                                                <div className="text-white font-medium">09X</div>
                                            </div>
                                        </div>
                                        <div className="w-10 h-6 bg-white/20 rounded-md"></div>
                                    </div>

                                    {/* Background Decor */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                </div>

                                {/* Pending Fees Widget */}
                                <div className={`${cardBg} rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-sm ${subText}`}>Pending Fees</p>
                                            <h3 className={`text-3xl font-bold ${textColor}`}>$1,250</h3>
                                        </div>
                                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-100'}`}>
                                            <CreditCard className={`w-5 h-5 ${textColor}`} />
                                        </div>
                                    </div>

                                    {/* Small Chart Line Decor */}
                                    <div className="absolute right-6 top-16">
                                        <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
                                            <path d="M0 35C10 35 20 10 30 10C40 10 50 30 60 30C70 30 80 5 90 5" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>

                                    <div className="mt-auto">
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${subText}`}>Newest</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold ${textColor}`}>Tuition Fee</p>
                                                    <p className={`text-xs ${subText}`}>Today, 16:36</p>
                                                </div>
                                            </div>
                                            <span className={`font-bold ${textColor}`}>$1,250</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Warning Alert */}
                            <div className="bg-red-500 rounded-2xl p-6 shadow-md flex items-center justify-between relative overflow-hidden">
                                <div className="z-10 flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                                        <AlertCircle className="w-5 h-5" />
                                        <span>Pending Payment</span>
                                    </div>
                                    <p className="text-white/90 text-sm">
                                        You have ₹5,000 pending. Please make the payment by January 31, 2024 to avoid late fees.
                                    </p>
                                </div>
                                {/* Background decor */}
                                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                            </div>

                            {/* Table: Fee Breakdown */}
                            <div className={`${cardBg} rounded-2xl p-6 shadow-md`}>
                                <h3 className={`text-lg font-bold mb-6 ${textColor}`}>Fee Breakdown</h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className={`text-left text-xs uppercase tracking-wider ${subText} border-b ${borderColor}`}>
                                                <th className="pb-4 font-medium pl-2">Category</th>
                                                <th className="pb-4 font-medium">Amount</th>
                                                <th className="pb-4 font-medium">Paid</th>
                                                <th className="pb-4 font-medium">Pending</th>
                                                <th className="pb-4 font-medium">Due Date</th>
                                                <th className="pb-4 font-medium pr-2 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className={`divide-y ${darkMode ? 'divide-[#2b3674]' : 'divide-slate-200'}`}>
                                            {[
                                                { name: 'Tuition Fee', amount: '₹15,000', paid: '₹15,000', pending: '₹0', date: '2024-01-15', status: 'Paid', statusColor: 'bg-emerald-500' },
                                                { name: 'Sports Fee', amount: '₹2,000', paid: '₹2,000', pending: '₹0', date: '2024-01-15', status: 'Paid', statusColor: 'bg-emerald-500' },
                                                { name: 'Lab Fee', amount: '₹3,000', paid: '₹3,000', pending: '₹0', date: '2024-01-15', status: 'Paid', statusColor: 'bg-emerald-500' },
                                                { name: 'Library Fee', amount: '₹1,000', paid: '₹1,000', pending: '₹0', date: '2024-01-15', status: 'Paid', statusColor: 'bg-emerald-500' },
                                                { name: 'Activity Fee', amount: '₹2,000', paid: '₹0', pending: '₹2,000', date: '2024-01-31', status: 'Pending', statusColor: 'bg-red-500' },
                                                { name: 'Examination Fee', amount: '₹3,000', paid: '₹0', pending: '₹3,000', date: '2024-01-31', status: 'Pending', statusColor: 'bg-red-500' },
                                            ].map((row, idx) => (
                                                <tr key={idx} className={`group hover:bg-slate-50/5 transition-colors`}>
                                                    <td className={`py-4 pl-2 font-bold ${textColor}`}>{row.name}</td>
                                                    <td className={`py-4 ${subText}`}>{row.amount}</td>
                                                    <td className="py-4 text-emerald-500 font-medium">{row.paid}</td>
                                                    <td className="py-4 text-red-500 font-medium">{row.pending}</td>
                                                    <td className={`py-4 ${subText}`}>{row.date}</td>
                                                    <td className="py-4 pr-2 text-right">
                                                        <span className={`inline-block px-3 py-1 rounded-md text-xs text-white font-bold ${row.statusColor}`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Receipts & History) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">

                            {/* Fee Receipts */}
                            <div className={`${cardBg} rounded-2xl p-6 shadow-md`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`text-lg font-bold ${textColor}`}>Fee Receipts</h3>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                                        VIEW ALL
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { date: 'March, 01, 2024', id: '#TUI-415646', amount: '$1200' },
                                        { date: 'February, 10, 2024', id: '#LAB-126749', amount: '$250' },
                                        { date: 'April, 05, 2024', id: '#BUS-103578', amount: '$120' },
                                        { date: 'June, 25, 2023', id: '#LIB-415646', amount: '$50' },
                                        { date: 'March, 01, 2023', id: '#TUI-803481', amount: '$1100' },
                                    ].map((receipt, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div>
                                                <h4 className={`text-sm font-bold ${textColor}`}>{receipt.date}</h4>
                                                <p className={`text-xs ${subText}`}>{receipt.id}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-sm font-bold ${textColor}`}>{receipt.amount}</span>
                                                <button className={`flex items-center gap-1 text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-700'} bg-transparent hover:bg-slate-50/10 px-2 py-1 rounded transition-colors`}>
                                                    <Download className="w-3 h-3" /> PDF
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment History */}
                            <div className={`${cardBg} rounded-2xl p-6 shadow-md flex-1`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={`text-lg font-bold ${textColor}`}>Payment History</h3>
                                    <div className={`flex items-center gap-2 text-xs font-medium ${subText}`}>
                                        <Calendar className="w-4 h-4" />
                                        <span>01 - 30 March 2024</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <p className={`text-xs font-bold uppercase tracking-wider ${subText}`}>Newest</p>

                                    {[
                                        { title: 'Tuition Fee', date: '27 March 2024, at 12:30 PM', amount: '- $1,200', type: 'out', color: 'text-red-500' },
                                        { title: 'Scholarship', date: '27 March 2024, at 04:30 AM', amount: '+ $500', type: 'in', color: 'text-emerald-500' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full border ${darkMode ? 'border-red-500/20' : 'border-red-500/10'} flex items-center justify-center`}>
                                                    {item.type === 'out' ? <ArrowDown className="w-5 h-5 text-red-500" /> : <ArrowUp className="w-5 h-5 text-emerald-500" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-bold ${textColor}`}>{item.title}</h4>
                                                    <p className={`text-xs ${subText}`}>{item.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${item.color}`}>{item.amount}</span>
                                        </div>
                                    ))}

                                    <p className={`text-xs font-bold uppercase tracking-wider ${subText} mt-6`}>Yesterday</p>
                                    {[
                                        { title: 'Bus Fee Refund', date: '26 March 2024, at 13:45 PM', amount: '+ $50', type: 'in', color: 'text-emerald-500' },
                                        { title: 'Lab Deposit Return', date: '26 March 2024, at 12:30 PM', amount: '+ $100', type: 'in', color: 'text-emerald-500' },
                                        { title: 'Library Deposit', date: '26 March 2024, at 08:30 AM', amount: '+ $50', type: 'in', color: 'text-emerald-500' },
                                        { title: 'Exam Fee', date: '26 March 2024, at 05:00 AM', amount: 'Pending', type: 'pending', color: 'text-gray-400' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full border ${borderColor} flex items-center justify-center`}>
                                                    {item.type === 'in' ? <ArrowUp className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-gray-400" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-bold ${textColor}`}>{item.title}</h4>
                                                    <p className={`text-xs ${subText}`}>{item.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${item.color}`}>{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
