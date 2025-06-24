# UNCP Social Work Network

A social networking platform designed specifically for students in the Department of Social Work at UNCP (University of North Carolina at Pembroke).

## Features

- **Student Profiles**: Personal profiles with pictures, interests, and graduation year
- **UNCP Email Verification**: Only active students with @uncp.edu emails can register
- **Direct Messaging**: Real-time communication between students
- **Group Collaboration**: Create and join groups for class projects
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React, React Router, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer for profile pictures
- **Deployment**: GitHub Pages (frontend) + Render (backend)

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-work-social.git
cd social-work-social
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# In server directory, create .env file
cp server/.env.example server/.env
# Edit .env with your values
```

4. Run the application:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
social-work-social/
├── client/               # React frontend
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── context/     # React context for state
│       └── utils/       # Utility functions
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── uploads/         # Profile picture storage
└── package.json         # Root package file
```

## Features in Detail

### User Authentication
- Secure registration with UNCP email validation
- JWT-based authentication
- Password hashing with bcrypt

### User Profiles
- Upload profile pictures
- Add bio and interests
- Display graduation year
- View other students' profiles

### Messaging System
- Real-time messaging with Socket.IO
- Message history
- User search functionality
- Online status indicators

### Group Features
- Create groups for projects
- Invite classmates to groups
- Group chat functionality
- Project name association

## Contributing

This is a prototype project for UNCP's Department of Social Work. For questions or contributions, please contact the development team.

## License

This project is proprietary to UNCP Department of Social Work.
