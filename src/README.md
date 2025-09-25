 Book Finder

Overview
Book Finder is a React-based web application designed for college students like Alex** who want to search and explore books easily. The app fetches data from the Open Library API and displays book details in a clean, user-friendly interface.  

It showcases React skills, API integration, responsive design, and effective UX



 Features

1. Search Books by Title
   - Users can type any book title in the search bar.
   - Displays results including cover image, title, author(s), and first published year.

2. Default Random Books
   - On page load, the app shows 18 random books from popular topics.
   - Ensures the UI is attractive and populated even before searching.

3.Dynamic Book Covers
   - Fetches book covers using `cover_i` or `ISBN`.
   - Displays placeholder if no cover is available.

4. Responsive Design
   - Uses CSS Grid to show 6 books per row on desktop.
   - Adapts to smaller screens for tablets and mobile devices.

5. Error Handling
   - Shows a message if no books are found.
   - Handles network errors gracefully.

6. Performance Optimized
   - Fetches default books in parallel using `Promise.all`.
   - Limits displayed books to 18 for faster loading and cleaner layout.

7. Interactive UI
   - Hover effects on book cards.
   - Clean and modern design using plain CSS.

---

Technology Stack

- **Frontend Framework:** React (Functional Components + Hooks)  
- **State Management:** React `useState` & `useEffect`  
- **Styling:** Plain CSS  
- **API:** [Open Library Search API](https://openlibrary.org/search.json?title={bookTitle})  
- **Data Fetching:** `fetch` API  

 
