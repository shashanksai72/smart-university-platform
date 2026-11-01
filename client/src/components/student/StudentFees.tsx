import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Clock, Download, Printer, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FeeRecord } from '../../types';

export const StudentFees: React.FC = () => {
  const { user } = useAuth();
  const { feeRecords, payFee } = useData();
  const [selectedFeeToPay, setSelectedFeeToPay] = useState<FeeRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Simulated Net Banking');
  const [selectedReceipt, setSelectedReceipt] = useState<FeeRecord | null>(null);

  const totalFee = feeRecords.reduce((acc, f) => acc + f.totalAmount, 0);
  const paidFee = feeRecords.reduce((acc, f) => acc + f.paidAmount, 0);
  const pendingFee = feeRecords.reduce((acc, f) => acc + f.balance, 0);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeToPay) return;

    payFee(selectedFeeToPay.id, paymentMethod);
    setSelectedFeeToPay(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & KPI Summary */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Campus Bursar & Fee Reconciliation</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Fee Details & Digital Receipts</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Semester tuition fees, laboratory charges, and examination dues with verifiable simulated payment receipts.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-[11px] max-w-xs">
            <span className="font-bold">Sandbox Environment:</span> Payments are processed through simulated campus banking
            stubs for evaluation purposes.
          </div>
        </div>

        {/* Financial KPI Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Assessment</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">${totalFee.toLocaleString()}.00</p>
            <p className="text-[11px] text-slate-500 mt-1">Academic Year 2026 - 2027</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Amount Paid</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              ${paidFee.toLocaleString()}.00
            </p>
            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1">Verified cleared</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase">Pending Balance</p>
            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
              ${pendingFee.toLocaleString()}.00
            </p>
            <p className="text-[11px] text-rose-700/80 dark:text-rose-400/80 mt-1">Due November 25, 2026</p>
          </div>
        </div>
      </div>

      {/* Fee Invoices Breakdown Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Fee Invoices & Ledger</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Itemized invoice ledger and payment history</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {feeRecords.map(fee => (
                <tr key={fee.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{fee.title}</p>
                    <p className="text-[10px] text-slate-400">{fee.academicYear}</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">${fee.totalAmount.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">${fee.paidAmount.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-slate-500">{fee.dueDate}</td>
                  <td className="py-3.5 px-4">
                    {fee.status === 'PAID' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PAID</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        <span>PENDING</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {fee.status === 'PAID' ? (
                      <button
                        onClick={() => setSelectedReceipt(fee)}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1"
                      >
                        <Printer className="w-3 h-3" />
                        <span>View Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedFeeToPay(fee)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-sm transition-all"
                      >
                        Simulate Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Payment Modal */}
      {selectedFeeToPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Simulate Fee Clearance</h3>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">{selectedFeeToPay.title}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              ${selectedFeeToPay.balance.toFixed(2)}
            </p>

            <form onSubmit={handleSimulatePayment} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Select Simulated Gateway
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-blue-50/50">
                    <input
                      type="radio"
                      name="method"
                      checked={paymentMethod === 'Simulated Net Banking'}
                      onChange={() => setPaymentMethod('Simulated Net Banking')}
                    />
                    <span>Institutional Net Banking (Simulated)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-blue-50/50">
                    <input
                      type="radio"
                      name="method"
                      checked={paymentMethod === 'Simulated University Card'}
                      onChange={() => setPaymentMethod('Simulated University Card')}
                    />
                    <span>Campus Debit / Credit Card (Simulated)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFeeToPay(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/25"
                >
                  Clear Fee Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border-2 border-emerald-500/40 shadow-2xl">
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Official E-Receipt
              </span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">SMART UNIVERSITY BURSAR</h4>
              <p className="text-[11px] text-slate-400">Receipt Ref: {selectedReceipt.receiptNo || 'REC-SU-2026-9081'}</p>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{user?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="font-mono text-slate-800 dark:text-slate-100">{user?.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee Component:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedReceipt.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date Paid:</span>
                <span className="text-slate-800 dark:text-slate-100">{selectedReceipt.paidDate || '2026-09-28'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="text-slate-800 dark:text-slate-100">{selectedReceipt.method || 'Net Banking'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-black">
                <span>Amount Paid:</span>
                <span className="text-emerald-600">${selectedReceipt.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
