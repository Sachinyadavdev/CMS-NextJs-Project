# CMS Next.js Project

This is a Content Management System (CMS) built with Next.js, TypeScript, and Tailwind CSS. It provides a flexible platform for managing website content, layouts, and user authentication.

## Features
- Dynamic page rendering
- Admin panel for content management
- User authentication (login, logout, register)
- Layout and section editing
- Media uploads
- MySQL database integration
- Migration scripts for layouts and data

## Project Structure
- `app/` - Main application pages and routes
- `components/` - Reusable React components
- `contexts/` - React context providers
- `hooks/` - Custom React hooks
- `data/` - JSON data files
- `lib/` - Utility libraries and database logic
- `public/` - Static assets and uploads
- `scripts/` - Migration and utility scripts
- `utils/` - API utilities

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Create a `.env.local` file for your database and other secrets.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup
- MySQL is used for persistent storage.
- Migration scripts are available in the `scripts/` folder.
- Example SQL schema: `raus_cms.sql`

## Scripts
- `scripts/migrate-layouts.js` - Migrate layout data
- `scripts/migrate-to-mysql.ts` - Migrate data to MySQL
- `scripts/migrate-versions.js` - Migrate versioned layouts

## Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- MySQL

## License
MIT
