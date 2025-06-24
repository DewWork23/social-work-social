# Deployment Guide for UNCP Social Work Network

This guide will help you deploy the application with the backend on Render (free tier) and frontend on GitHub Pages.

## Prerequisites
- GitHub account
- Render account (sign up at render.com)
- MongoDB Atlas account for cloud database (mongodb.com)

## Step 1: Set up MongoDB Atlas

1. Sign up for MongoDB Atlas at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier)
3. Set up database access (create a user)
4. Set up network access (allow from anywhere: 0.0.0.0/0)
5. Get your connection string (will look like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Step 2: Deploy Backend to Render

1. Push your code to GitHub
2. Sign up for Render at https://render.com
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure the service:
   - Name: `uncp-social-work-backend`
   - Environment: `Node`
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Select Free plan

6. Add Environment Variables in Render:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secure string (generate one)
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://[your-github-username].github.io/social-work-social`

7. Deploy! Your backend URL will be: `https://uncp-social-work-backend.onrender.com`

## Step 3: Deploy Frontend to GitHub Pages

1. Update the production environment file:
   ```bash
   cd client
   # Edit .env.production
   REACT_APP_API_URL=https://uncp-social-work-backend.onrender.com
   REACT_APP_SOCKET_URL=https://uncp-social-work-backend.onrender.com
   ```

2. Update the homepage in client/package.json:
   ```json
   "homepage": "https://[your-github-username].github.io/social-work-social"
   ```

3. Build and deploy:
   ```bash
   cd client
   npm run deploy
   ```

4. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

## Step 4: Update CORS Settings

After deployment, update your backend environment variable in Render:
- `CLIENT_URL`: Your actual GitHub Pages URL

## Accessing Your Application

- Frontend: `https://[your-github-username].github.io/social-work-social`
- Backend API: `https://uncp-social-work-backend.onrender.com`

## Important Notes

1. **Free Tier Limitations**:
   - Render free tier services spin down after 15 minutes of inactivity
   - First request after inactivity may take 30-60 seconds
   - Consider upgrading for production use

2. **Security**:
   - Change the JWT_SECRET to a secure random string
   - Keep your .env files secure and never commit them
   - Update CORS settings to only allow your GitHub Pages URL

3. **Custom Domain** (Optional):
   - You can add a custom domain to both GitHub Pages and Render
   - Follow their respective documentation for setup

## Troubleshooting

1. **CORS Errors**: Make sure CLIENT_URL in backend matches your GitHub Pages URL
2. **API Connection Failed**: Check that REACT_APP_API_URL is set correctly
3. **Images Not Loading**: Ensure the API URL includes the protocol (https://)
4. **Authentication Issues**: Verify JWT_SECRET is the same in production

## Local Development

To run locally after deployment:
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm start
```