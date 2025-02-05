# Blog Website Frontend

This is the frontend repository for the Blog Website built using the MERN stack. The frontend is developed with Vite and React, providing a fast and modern development experience. The backend is maintained in a separate repository and uses JWT for user authentication.

## Features
- User authentication with JWT
- Rich text editor for creating and editing blog posts (React-Quill)
- Notifications for user actions (React-Toastify)
- Icons for UI enhancements (React-Icons)

## Technologies Used
- React.js (with Vite)
- React-Toastify
- React-Quill
- Axios (for API requests)
- React Router DOM (for navigation)

## Installation

### Prerequisites
Make sure you have Node.js and npm installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-frontend-repo.git
   cd your-frontend-repo
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api  # Update with your backend URL
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Backend Repository
The backend for this project is maintained in a separate repository. Make sure the backend server is running before testing authentication and API calls.

## Contributing
Feel free to contribute to the project by creating pull requests or opening issues.

## License
This project is licensed under the MIT License.

---

### Author
Developed by [Your Name](https://github.com/your-username).

