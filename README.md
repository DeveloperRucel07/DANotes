# Notes App

A modern, responsive note-taking application built with Angular 20 and Firebase Firestore.

## Features

- **Create Notes**: Add new notes with title and content.
- **Edit Notes**: Inline editing of existing notes.
- **Delete Notes**: Move notes to trash or permanently delete them.
- **Favorite Notes**: Mark notes as favorites for quick access.
- **Trash Management**: View and restore notes from trash.
- **Filtering**: Filter notes by all or favorites.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Real-time Sync**: Data synchronized with Firebase Firestore.

## Tech Stack

- **Frontend**: Angular 20 (Standalone Components)
- **Backend**: Firebase Firestore
- **Styling**: SCSS
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Firebase Account (for Firestore setup)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd notes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore Database.
   - Update `src/app/app.config.ts` with your Firebase configuration.

4. Run the application:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:4200`.

## Scripts

- `npm start`: Start the development server
- `npm run build`: Build the project for production
- `npm run watch`: Build and watch for changes
- `npm test`: Run unit tests

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with Angular and Firebase.
- Icons from various sources (see assets folder).
