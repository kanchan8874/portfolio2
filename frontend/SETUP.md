# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

### 3. Environment Variables

**Root `.env` file:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Server `.env` file (in `server/` directory):**
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development

# Email Configuration (optional - for contact form)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

### 4. Seed Database (Optional)

```bash
cd server
node seed.js
cd ..
```

This will populate your database with sample data.

### 5. Start Development Servers

**Option 1: Run separately**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm start
```

**Option 2: Run together**
```bash
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string
- Verify network access if using Atlas

### Port Already in Use
- Change `PORT` in `server/.env`
- Update `REACT_APP_API_URL` in root `.env`

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### CORS Issues
- Ensure backend is running
- Check API URL in frontend `.env`

## 📝 Next Steps

1. **Customize Content**: Update MongoDB collections with your data
2. **Update Images**: Replace images in `src/assets/`
3. **Configure Email**: Set up email service for contact form
4. **Deploy**: Follow deployment guide in README.md

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ }
}
```

### Update Personal Info
Use MongoDB or update directly in `server/seed.js` and re-seed.

---

Need help? Check the main README.md for detailed documentation.

