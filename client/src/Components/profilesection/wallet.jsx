import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Profilesidebar from './Profilesidebar';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Wallet() {
    const [balance, setBalance] = useState(1250.00);
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2023-06-21', amount: -50.00, description: 'Purchase at Store A' },
        { id: 2, date: '2023-06-19', amount: 100.00, description: 'Refund from Store B' },
        { id: 3, date: '2023-06-18', amount: -30.00, description: 'Purchase at Store C' },
        { id: 4, date: '2023-06-17', amount: 200.00, description: 'Added Funds' },
    ]);

    useEffect(() => {
        Aos.init({ duration: 1500 });

        // Fetch initial data for balance and transactions
        // Replace the following lines with your API calls
        // setBalance(fetchBalanceFromAPI());
        // setTransactions(fetchTransactionsFromAPI());
    }, []);

    const navigate = useNavigate();

    const handleViewHistory = () => {
        // Navigate to the transaction history page if needed
        navigate('/transaction-history');
    };

    const handleAddFunds = () => {
        // Show a toast notification for adding funds
        toast.success('Add funds functionality not implemented yet!');
    };

    return (
        <>
            <Navbar />
            <div className="font-sans bg-white md:px-24 px-8 py-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Sidebar */}
                    <Profilesidebar />

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 mt-12">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-blue-600">Wallet Balance</h2>
                            </div>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <button onClick={handleViewHistory} className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600">
                                    View History
                                </button>
                                <button onClick={handleAddFunds} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                                    Add Funds
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                                <p>Tip: Use your wallet balance to get exclusive discounts!</p>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h3>
                                <ul>
                                    {transactions.map(transaction => (
                                        <li key={transaction.id} className="mb-3">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{transaction.date}</span>
                                                <span className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="text-gray-600">{transaction.description}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Wallet;
