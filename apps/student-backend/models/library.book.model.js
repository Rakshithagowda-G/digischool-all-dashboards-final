import mongoose from 'mongoose';

const libraryBookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    educationLevel: {
        type: String,
        required: true,
        enum: ['primary', 'middle', 'university'],
        lowercase: true
    },
    pdfPath: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        default: '',
        trim: true
    },
    author: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    pages: {
        type: Number,
        default: 0
    },
    publishedYear: {
        type: Number,
        default: new Date().getFullYear()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'library_books',
    timestamps: false
});

// Index for faster queries
libraryBookSchema.index({ educationLevel: 1 });
libraryBookSchema.index({ subject: 1 });
libraryBookSchema.index({ bookId: 1 });

const LibraryBook = mongoose.model('LibraryBook', libraryBookSchema);

export default LibraryBook;
