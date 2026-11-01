import React, { useState } from 'react';
import { BookOpen, Search, Filter, CheckCircle2, Clock, RotateCcw, BookmarkPlus, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StudentLibrary: React.FC = () => {
  const { books, bookTransactions, borrowBook, returnBook } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [message, setMessage] = useState<string | null>(null);

  const categories = ['ALL', 'Artificial Intelligence', 'Systems Engineering', 'Computer Science', 'Algorithms'];

  const filteredBooks = books.filter(b => {
    const matchesCategory = selectedCategory === 'ALL' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const handleBorrow = (bookId: string) => {
    const success = borrowBook(bookId);
    if (success) {
      setMessage('Book borrowed successfully! Due in 30 days.');
    } else {
      setMessage('Unable to borrow book: No physical or digital copies currently available.');
    }
    setTimeout(() => setMessage(null), 3500);
  };

  const handleReturn = (txId: string) => {
    returnBook(txId);
    setMessage('Book returned successfully to Central Library inventory.');
    setTimeout(() => setMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Central Digital & Physical Library</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Digital Library Hub</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Explore 40,000+ textbooks, reference publications, e-books, and manage your active loans.
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              {bookTransactions.filter(t => t.status === 'BORROWED').length} / 3 Books Borrowed
            </span>
            <p className="text-[11px] text-slate-400">Quota: Up to 3 books for 30 days</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, or ISBN..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </div>

      {/* Active Borrowed Books Card */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">My Active Book Loans</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Books currently issued to your library account</p>

        {bookTransactions.length === 0 ? (
          <p className="text-xs text-slate-400">You currently have no borrowed books.</p>
        ) : (
          <div className="space-y-3">
            {bookTransactions.map(tx => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.bookTitle}</p>
                  <p className="text-slate-400 text-[11px]">ISBN: {tx.isbn}</p>
                  <div className="flex items-center space-x-3 text-slate-500 mt-1">
                    <span>Issued: {tx.borrowDate}</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">Due: {tx.dueDate}</span>
                    <span>Late Fine: $0.00</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {tx.status === 'BORROWED' ? (
                    <button
                      onClick={() => handleReturn(tx.id)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Return Book</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-[11px]">
                      Returned on {tx.returnDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Catalog Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Available Catalog ({filteredBooks.length} titles)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBooks.map(b => (
            <div
              key={b.id}
              className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <img
                  src={b.coverUrl}
                  alt={b.title}
                  className="w-full h-36 object-cover rounded-2xl mb-3 shadow-md"
                />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {b.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 line-clamp-2">{b.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{b.author}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{b.shelfLocation}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {b.availableCopies} / {b.totalCopies} left
                </span>

                <button
                  onClick={() => handleBorrow(b.id)}
                  disabled={b.availableCopies === 0}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    b.availableCopies > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {b.availableCopies > 0 ? 'Borrow' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
