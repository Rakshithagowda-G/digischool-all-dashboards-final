import LibraryBook from '../models/library.book.model.js';
import path from 'path';
import fs from 'fs';

/**
 * Get all library books filtered by education level
 * GET /api/student/library/books?educationLevel=middle
 */
export const getLibraryBooks = async (req, res) => {
    try {
        const { educationLevel } = req.query;

        if (!educationLevel) {
            return res.status(400).json({
                error: 'educationLevel query parameter is required (primary, middle, or university)'
            });
        }

        // Validate education level
        const validLevels = ['primary', 'middle', 'university'];
        if (!validLevels.includes(educationLevel.toLowerCase())) {
            return res.status(400).json({
                error: 'Invalid educationLevel. Must be primary, middle, or university'
            });
        }

        const books = await LibraryBook.find({
            educationLevel: educationLevel.toLowerCase()
        }).sort({ createdAt: -1 });

        res.json(books);
    } catch (error) {
        console.error('Error fetching library books:', error);
        res.status(500).json({ error: 'Failed to fetch library books' });
    }
};

/**
 * Get library books by subject
 * GET /api/student/library/books/subject?educationLevel=middle&subject=Math
 */
export const getLibraryBooksBySubject = async (req, res) => {
    try {
        const { educationLevel, subject } = req.query;

        if (!educationLevel || !subject) {
            return res.status(400).json({
                error: 'Both educationLevel and subject query parameters are required'
            });
        }

        const books = await LibraryBook.find({
            educationLevel: educationLevel.toLowerCase(),
            subject: { $regex: new RegExp(subject, 'i') }
        }).sort({ title: 1 });

        res.json(books);
    } catch (error) {
        console.error('Error fetching library books by subject:', error);
        res.status(500).json({ error: 'Failed to fetch library books' });
    }
};

/**
 * Get unique subjects for an education level
 * GET /api/student/library/subjects?educationLevel=middle
 */
export const getLibrarySubjects = async (req, res) => {
    try {
        const { educationLevel } = req.query;

        if (!educationLevel) {
            return res.status(400).json({
                error: 'educationLevel query parameter is required'
            });
        }

        const subjects = await LibraryBook.distinct('subject', {
            educationLevel: educationLevel.toLowerCase()
        });

        res.json(subjects.sort());
    } catch (error) {
        console.error('Error fetching library subjects:', error);
        res.status(500).json({ error: 'Failed to fetch library subjects' });
    }
};

/**
 * Get a single book by ID
 * GET /api/student/library/books/:bookId
 */
export const getLibraryBookById = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await LibraryBook.findOne({ bookId });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error('Error fetching library book:', error);
        res.status(500).json({ error: 'Failed to fetch library book' });
    }
};

/**
 * Search library books
 * GET /api/student/library/search?educationLevel=middle&query=math
 */
export const searchLibraryBooks = async (req, res) => {
    try {
        const { educationLevel, query } = req.query;

        if (!educationLevel || !query) {
            return res.status(400).json({
                error: 'Both educationLevel and query parameters are required'
            });
        }

        const searchRegex = new RegExp(query, 'i');

        const books = await LibraryBook.find({
            educationLevel: educationLevel.toLowerCase(),
            $or: [
                { title: searchRegex },
                { subject: searchRegex },
                { author: searchRegex },
                { description: searchRegex }
            ]
        }).sort({ title: 1 });

        res.json(books);
    } catch (error) {
        console.error('Error searching library books:', error);
        res.status(500).json({ error: 'Failed to search library books' });
    }
};

/**
 * Get new arrivals (latest 4 books) by education level
 * GET /api/student/library/books/new-arrivals?educationLevel=middle
 */
export const getNewArrivals = async (req, res) => {
    try {
        const { educationLevel } = req.query;

        if (!educationLevel) {
            return res.status(400).json({
                error: 'educationLevel query parameter is required (primary, middle, or university)'
            });
        }

        // Validate education level
        const validLevels = ['primary', 'middle', 'university'];
        if (!validLevels.includes(educationLevel.toLowerCase())) {
            return res.status(400).json({
                error: 'Invalid educationLevel. Must be primary, middle, or university'
            });
        }

        const books = await LibraryBook.find({
            educationLevel: educationLevel.toLowerCase()
        })
            .sort({ createdAt: -1 })
            .limit(4);

        res.json(books);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({ error: 'Failed to fetch new arrivals' });
    }
};

/**
 * Download book PDF
 * GET /api/student/library/books/download/:bookId
 */
export const downloadBookPdf = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Find the book in database
        const book = await LibraryBook.findOne({ bookId });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // For now, since PDFs are not actually stored, return book info
        // In production, you would read the actual PDF file from pdfPath
        // const filePath = path.join(__dirname, '..', book.pdfPath);

        // Check if file exists
        // if (!fs.existsSync(filePath)) {
        //     return res.status(404).json({ error: 'PDF file not found' });
        // }

        // Set headers for PDF download
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `attachment; filename="${book.title}.pdf"`);

        // Send the file
        // return res.sendFile(filePath);

        // Temporary response until actual PDFs are stored
        res.json({
            message: 'PDF download endpoint ready',
            bookId: book.bookId,
            title: book.title,
            pdfPath: book.pdfPath,
            note: 'Actual PDF files need to be uploaded to the server or cloud storage'
        });
    } catch (error) {
        console.error('Error downloading book PDF:', error);
        res.status(500).json({ error: 'Failed to download book PDF' });
    }
};
