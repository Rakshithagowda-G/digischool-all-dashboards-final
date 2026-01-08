import express from 'express';
import * as libraryController from '../controllers/library.controller.js';

const router = express.Router();

/**
 * E-Library Routes
 * Base path: /api/student/library
 */

// Get all books for an education level
router.get('/books', libraryController.getLibraryBooks);

// Get new arrivals (latest 4 books)
router.get('/books/new-arrivals', libraryController.getNewArrivals);

// Get books by subject
router.get('/books/subject', libraryController.getLibraryBooksBySubject);

// Download book PDF
router.get('/books/download/:bookId', libraryController.downloadBookPdf);

// Search books
router.get('/search', libraryController.searchLibraryBooks);

// Get unique subjects for an education level
router.get('/subjects', libraryController.getLibrarySubjects);

// Get a single book by ID
router.get('/books/:bookId', libraryController.getLibraryBookById);

export default router;
