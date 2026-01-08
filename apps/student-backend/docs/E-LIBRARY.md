# E-Library Feature - Student Database

## Overview

The E-Library feature has been added to the existing `student_db` MongoDB database as a new collection called `library_books`. This collection stores PDF books that are shared across all students but filtered by education level (primary, middle, university).

## Database Structure

### Collection: `library_books`

**Location:** `student_db.library_books`

**Schema:**
```javascript
{
  bookId: String (unique, required),
  title: String (required),
  subject: String (required),
  educationLevel: String (enum: ['primary', 'middle', 'university'], required),
  pdfPath: String (required),
  coverImage: String (optional),
  author: String (optional),
  description: String (optional),
  pages: Number (default: 0),
  publishedYear: Number (default: current year),
  createdAt: Date (default: now)
}
```

**Indexes:**
- `educationLevel` (for fast filtering)
- `subject` (for subject-based queries)
- `bookId` (unique identifier)

## API Endpoints

Base URL: `http://localhost:3002/api/student/library`

### 1. Get All Books by Education Level
```
GET /api/student/library/books?educationLevel=middle
```

**Query Parameters:**
- `educationLevel` (required): `primary`, `middle`, or `university`

**Response:**
```json
[
  {
    "bookId": "LIB_MID_001",
    "title": "Algebra Fundamentals",
    "subject": "Mathematics",
    "educationLevel": "middle",
    "pdfPath": "/library/middle/math/algebra-fundamentals.pdf",
    "coverImage": "https://...",
    "author": "Dr. Robert Williams",
    "description": "Master the basics of algebra...",
    "pages": 280,
    "publishedYear": 2023,
    "createdAt": "2024-01-08T..."
  }
]
```

### 2. Get Books by Subject
```
GET /api/student/library/books/subject?educationLevel=middle&subject=Math
```

**Query Parameters:**
- `educationLevel` (required): `primary`, `middle`, or `university`
- `subject` (required): Subject name (case-insensitive, partial match)

### 3. Get Unique Subjects
```
GET /api/student/library/subjects?educationLevel=middle
```

**Query Parameters:**
- `educationLevel` (required): `primary`, `middle`, or `university`

**Response:**
```json
[
  "Computer Science",
  "English",
  "Geography",
  "History",
  "Mathematics",
  "Science"
]
```

### 4. Get Single Book by ID
```
GET /api/student/library/books/LIB_MID_001
```

**Response:**
```json
{
  "bookId": "LIB_MID_001",
  "title": "Algebra Fundamentals",
  ...
}
```

### 5. Search Books
```
GET /api/student/library/search?educationLevel=middle&query=algebra
```

**Query Parameters:**
- `educationLevel` (required): `primary`, `middle`, or `university`
- `query` (required): Search term (searches in title, subject, author, description)

## Seeded Data

The database has been seeded with **25 books** across three education levels:

### Primary Level (5 books)
- Fun with Numbers - Grade 1 (Mathematics)
- My First English Reader (English)
- Science Explorers - Living Things (Science)
- Colors and Shapes Around Us (Art)
- Our World - Social Studies (Social Studies)

### Middle School (6 books)
- Algebra Fundamentals (Mathematics)
- English Grammar and Composition (English)
- Physical Science - Matter and Energy (Science)
- World History - Ancient Civilizations (History)
- Introduction to Computer Science (Computer Science)
- Geography - Our Planet Earth (Geography)

### University Level (10 books)
- Advanced Calculus and Analysis (Mathematics)
- Data Structures and Algorithms (Computer Science)
- Organic Chemistry - Principles and Mechanisms (Chemistry)
- Modern Physics - Quantum Mechanics (Physics)
- Microeconomics - Theory and Applications (Economics)
- Database Management Systems (Computer Science)
- Literary Analysis - Shakespeare and Beyond (English Literature)
- Artificial Intelligence - A Modern Approach (Computer Science)
- Cell Biology and Genetics (Biology)
- World History - 20th Century (History)

## Running the Seed Script

To populate the `library_books` collection:

```bash
cd student-backend
node scripts/seedLibraryBooks.js
```

**Output:**
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB successfully
🗑️  Clearing existing library_books collection...
✅ Cleared existing data
📚 Inserting library books...
✅ Successfully inserted 25 books

📊 Books by Education Level:
   Primary: 5 books
   Middle: 6 books
   University: 10 books
   Total: 25 books

📖 Subjects covered: Art, Biology, Chemistry, Computer Science, Economics, English, English Literature, Geography, History, Mathematics, Physics, Science, Social Studies

✨ Library books seeding completed successfully!
```

## Files Created/Modified

### New Files:
1. `models/library.book.model.js` - Mongoose model for library books
2. `controllers/library.controller.js` - API controller functions
3. `routes/library.routes.js` - Express routes
4. `scripts/seedLibraryBooks.js` - Seed script for sample data
5. `docs/E-LIBRARY.md` - This documentation file

### Modified Files:
1. `app.js` - Added library routes registration

## Design Decisions

1. **Separate Collection:** Books are stored in their own collection (`library_books`) rather than embedded in student documents, allowing for:
   - Shared resources across all students
   - Easier management and updates
   - Better scalability

2. **Education Level Filtering:** Books are filtered by `educationLevel` to ensure students only see age-appropriate content.

3. **No Student-Specific Data:** The library is READ-only for students. No borrowing, favorites, or reading history is tracked (can be added later if needed).

4. **Local PDF Paths:** Currently using local file paths (`pdfPath`). This can be easily migrated to cloud storage (S3, Azure Blob, etc.) in the future.

5. **Flexible Search:** The search endpoint searches across multiple fields (title, subject, author, description) for better discoverability.

## Future Enhancements

Potential features that can be added:

1. **Reading History:** Track which books a student has viewed
2. **Favorites/Bookmarks:** Allow students to save favorite books
3. **Download Tracking:** Monitor PDF downloads
4. **Categories/Tags:** Add additional categorization beyond subjects
5. **Cloud Storage:** Migrate PDFs to cloud storage with signed URLs
6. **Admin Upload:** Create admin interface for uploading new books
7. **Pagination:** Add pagination for large book lists
8. **Ratings/Reviews:** Allow students to rate and review books

## Testing the API

### Using cURL:

```bash
# Get all middle school books
curl "http://localhost:3002/api/student/library/books?educationLevel=middle"

# Get subjects for middle school
curl "http://localhost:3002/api/student/library/subjects?educationLevel=middle"

# Search for math books
curl "http://localhost:3002/api/student/library/search?educationLevel=middle&query=math"

# Get a specific book
curl "http://localhost:3002/api/student/library/books/LIB_MID_001"
```

### Using Postman:

1. Import the base URL: `http://localhost:3002`
2. Create requests for each endpoint
3. Add query parameters as needed
4. Test with different education levels

## Integration with Frontend

To integrate with the Middle School Student dashboard:

```javascript
// In lib/api.js
export const getLibraryBooks = (educationLevel = 'middle') =>
    fetch(`${API_BASE_URL}/library/books?educationLevel=${educationLevel}`)
        .then(handleResponse);

export const searchLibraryBooks = (educationLevel = 'middle', query) =>
    fetch(`${API_BASE_URL}/library/search?educationLevel=${educationLevel}&query=${query}`)
        .then(handleResponse);

export const getLibrarySubjects = (educationLevel = 'middle') =>
    fetch(`${API_BASE_URL}/library/subjects?educationLevel=${educationLevel}`)
        .then(handleResponse);
```

## Notes

- The `library_books` collection is part of the existing `student_db` database
- No new database was created
- Existing collections remain unchanged
- The feature is fully backward compatible
- All endpoints are READ-only for students
- Education level validation ensures data integrity
