Live Server

Server URL: https://freelance-server-beta.vercel.app

Tech Stack

Node.js, Express.js, MongoDB Atlas, Mongoose, CORS, Dotenv

Key Features
1. Complete Job CRUD API

The backend provides robust endpoints to create, read, update, and delete jobs. Each operation is validated, secured, and optimized to ensure fast interactions with the MongoDB database.

2. Task Acceptance System for Users

Users can accept tasks posted by others, with each acceptance stored separately for tracking. The API allows clients to fetch accepted tasks and remove them when the task is completed or canceled.

3. Protected Routes & Authorization

The server restricts access based on user email or auth state passed from the client. It prevents users from accepting their own tasks and ensures only owners can modify or delete their posted jobs.

4. Advanced Sorting & Filtering Capabilities

APIs support sorting jobs by posted date/time and filtering by category, user email, or keywords. This enables a high-performance search experience similar to freelance marketplaces.

5. Clean Error Handling & Express Architecture

The backend includes centralized error handling and modular routing for easy scaling. Every API response is structured, consistent, and ready for frontend consumption without additional formatting.
