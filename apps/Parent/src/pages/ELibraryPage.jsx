import React from 'react';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';

const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    cover: '/img/book1.png'
  },
  {
    title: 'The Book of Joy',
    author: 'Author name',
    cover: '/img/book2.png'
  },
  {
    title: 'Teaspoon of Earth',
    author: 'Author name',
    cover: '/img/book3.png'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: '/img/book1.png'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: '/img/book2.png'
  }
];

const newUploads = Array.from({ length: 5 }, (_, index) => books[index % books.length]);
const continueReading = Array.from({ length: 5 }, (_, index) => books[index % books.length]);
const allBooks = Array.from({ length: 15 }, (_, index) => books[index % books.length]);

function ELibraryPage() {
  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          {/* Static Navbar at top */}
          <DashboardNavbar />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 relative scrollbar-hide">
            <div className="library-page">
              {/* New uploads Section */}
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>New uploads</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {newUploads.map((book, index) => (
                    <article className="book-card max-w-[180px] mx-auto w-full" key={`new-${book.title}-${index}`}>
                      <div className="book-cover mb-2 sm:mb-3">
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading="lazy"
                          className="w-full aspect-[3/4] object-cover rounded-md"
                        />
                      </div>
                      <p className="book-title text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</p>
                      <p className="book-author text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.author}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Continue Reading Section */}
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Continue Reading</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {continueReading.map((book, index) => (
                    <article className="book-card max-w-[180px] mx-auto w-full" key={`continue-${book.title}-${index}`}>
                      <div className="book-cover mb-2 sm:mb-3">
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading="lazy"
                          className="w-full aspect-[3/4] object-cover rounded-md"
                        />
                      </div>
                      <p className="book-title text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</p>
                      <p className="book-author text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.author}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* All Section */}
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>All</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {allBooks.map((book, index) => (
                    <article className="book-card max-w-[180px] mx-auto w-full" key={`all-${book.title}-${index}`}>
                      <div className="book-cover mb-2 sm:mb-3">
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading="lazy"
                          className="w-full aspect-[3/4] object-cover rounded-md"
                        />
                      </div>
                      <p className="book-title text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.title}</p>
                      <p className="book-author text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{book.author}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default ELibraryPage;
