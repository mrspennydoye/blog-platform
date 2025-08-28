# **Blog Platform \- A Modern Next.js Application**

This project is a full-stack blog platform built with Next.js, designed to showcase a mastery of modern frontend architecture, best practices, and a deep understanding of the React ecosystem. It serves as a technical demonstration of building a feature-rich, scalable, and performant web application from the ground up.

## **Live Demo**

\[Link to your live deployment on Vercel or another platform\]

## **Core Features**

* **Complete Authentication Flow:** Secure user registration and login using JWT.  
* **Full CRUD for Articles:** Authenticated users can create, read, update, and delete their own articles.  
* **Interactive Commenting System:** Logged-in users can post and delete comments on articles in real-time.  
* **User Profiles:** Viewable user profiles with their articles and information.  
* **Tagging System:** Articles can be tagged, and users can filter articles by tag.  
* **Optimistic UI Updates:** Smooth user experience when favoriting articles or following users.  
* **PWA Enabled:** The application is a fully capable Progressive Web App, ready for offline support and installation on mobile devices.  
* **Light & Dark Mode:** Theme toggling with user preference saved to local storage.

## **Architectural Decisions & Tech Stack**

The technology stack was chosen to reflect modern, efficient, and scalable web development standards.

* **Framework:** **Next.js 15 (App Router)**  
  * *Why?* The App Router enables a powerful combination of Server Components and Client Components, allowing for optimal performance. Data-heavy pages are rendered on the server to improve load times and SEO, while interactive UI remains on the client.  
* **State Management:** **Redux Toolkit with RTK Query**  
  * *Why?* Redux Toolkit simplifies state management logic. RTK Query provides a robust, declarative solution for data fetching, caching, and state synchronization, eliminating the need for manual async thunks and reducing boilerplate significantly.  
* **Styling:** **Tailwind CSS**  
  * *Why?* A utility-first CSS framework that allows for rapid development of custom designs directly in the markup, ensuring consistency and maintainability without leaving the component file.  
* **API Communication:** **Axios**  
  * *Why?* A reliable, promise-based HTTP client for both the browser and Node.js. An Axios instance is configured with interceptors to automatically attach the auth token to requests and handle global error states like 401 Unauthorized.  
* **Testing:** **Jest & React Testing Library**  
  * *Why?* This combination is the industry standard for testing React applications. It encourages testing application behavior from a user's perspective, ensuring that components work as intended in a real-world scenario.  
* **Linting & Formatting:** **ESLint**  
  * *Why?* To enforce consistent code style and catch potential errors early in the development process, leading to a cleaner and more maintainable codebase.

## **Project Structure**

The codebase is organized into a modular and intuitive structure that separates concerns and makes navigation and development straightforward.

/src  
├── app/              \# Next.js App Router: Contains all pages and layouts.  
│   ├── (auth)/       \# Route group for authentication pages (login, register).  
│   ├── (main)/       \# Route group for main application pages.  
│   └── api/          \# API route handlers (if any).  
├── components/       \# Shared and reusable React components.  
│   ├── ui/           \# Generic, low-level UI elements (Button, Card, Input).  
│   └── ...           \# Feature-specific components (PostList, CommentForm).  
├── lib/              \# Core logic, services, and external API interactions.  
│   └── api/          \# API service layer abstracting direct Axios calls.  
├── store/            \# Redux state management.  
│   ├── api/          \# RTK Query API slice definitions.  
│   └── slices/       \# Redux Toolkit state slices.  
├── styles/           \# Global SCSS files.  
└── types/            \# TypeScript type definitions and interfaces.

## **Getting Started**

Follow these instructions to set up and run the project on your local machine.

### **Prerequisites**

* Node.js (v18.18.0 or newer)  
* A package manager like npm or yarn.

### **Installation & Setup**

1. **Clone the repository:**  
   git clone https://github.com/your-username/blog-platform.git  
   cd blog-platform

2. **Install dependencies:**  
   npm install

3. Set up environment variables:  
   Create a .env.local file in the root of the project and add the API base URL:  
   NEXT\_PUBLIC\_API\_URL=https://conduit-api.learnwebdriverio.com/api

### **Running the Application**

To start the development server:

npm run dev

The application will be available at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## **Available Scripts**

* npm run dev: Starts the Next.js development server with Turbopack.  
* npm run build: Creates a production-ready build of the application.  
* npm run start: Starts the application in production mode.  
* npm run lint: Runs ESLint to check for code quality and style issues.  
* npm test: Runs the test suite using Jest.

## **Future Enhancements**

To further demonstrate the scalability of this architecture, the following features could be implemented:

* **Server Actions:** Refactor form submissions (create/edit post, comments) to use Next.js Server Actions for a more seamless and performant mutation handling.  
* **Expanded Test Coverage:** Increase test coverage with integration tests for user flows and end-to-end tests using Playwright.  
* **Pagination with Server Components:** Convert the pagination logic to use URL search parameters, allowing the main posts page to remain a Server Component for faster initial loads.  
* **WebSockets:** Implement real-time notifications for new comments or favorited articles.