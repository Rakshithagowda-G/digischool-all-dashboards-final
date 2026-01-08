import React, { useState, useEffect } from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { getLibraryBooks, getLibraryNewArrivals, downloadBookPdf } from '../lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

function ELibraryPage() {
  const [allBooks, setAllBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [booksData, newArrivalsData] = await Promise.all([
          getLibraryBooks('middle'),
          getLibraryNewArrivals('middle')
        ]);

        setAllBooks(Array.isArray(booksData) ? booksData : []);
        setNewArrivals(Array.isArray(newArrivalsData) ? newArrivalsData : []);
      } catch (err) {
        console.error('Error fetching library data:', err);
        setError(err.message || 'Failed to load library books');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryData();
  }, []);

  const handleBookClick = async (bookId) => {
    try {
      const response = await downloadBookPdf(bookId);
      console.log('Book download:', response);
      // In production, this would trigger actual PDF download
      // For now, just log the response
    } catch (err) {
      console.error('Error downloading book:', err);
    }
  };

  const renderBookCard = (book, index, keyPrefix) => (
    <article
      className="book-card max-w-[180px] mx-auto w-full cursor-pointer hover:opacity-80 transition-opacity"
      key={`${keyPrefix}-${book.bookId}-${index}`}
      onClick={() => handleBookClick(book.bookId)}
    >
      <div className="book-cover mb-2 sm:mb-3">
        <img
          src={book.coverImage || '/img/book1.png'}
          alt={book.title}
          loading="lazy"
          className="w-full aspect-[3/4] object-cover rounded-md"
          onError={(e) => {
            e.target.src = '/img/book1.png';
          }}
        />
      </div>
      <p className="book-title text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {book.title}
      </p>
      <p className="book-author text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {book.author || book.subject}
      </p>
    </article>
  );

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
              <p className="text-lg font-medium text-gray-600">Loading Library...</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  if (error) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center p-8">
              <AlertCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-800">Error</h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-8 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          {/* Static Navbar at top */}
          <DashboardNavbar />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide">
            <div className="library-page">
              {/* New Arrivals Section */}
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>New uploads</h2>
                {newArrivals.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {newArrivals.map((book, index) => renderBookCard(book, index, 'new'))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No new arrivals available</p>
                )}
              </section>

              {/* Continue Reading Section - Hidden for now as it requires reading history */}
              {/* This section would need additional backend support for tracking reading history */}

              {/* All Books Section */}
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>All</h2>
                {allBooks.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {allBooks.map((book, index) => renderBookCard(book, index, 'all'))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No books available</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ELibraryPage;
