# 🚀 World-Class Dynamic MERN Portfolio

A stunning, award-winning portfolio website built with the MERN stack, featuring dynamic content management, dark/light themes, and premium animations.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Dynamic-blue)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🎨 **Modern UI/UX** - Sleek design inspired by Apple, Vercel, and award-winning portfolios
- 🌓 **Dark/Light Theme** - Seamless theme switching with system preference detection
- 🎭 **Advanced Animations** - Framer Motion + GSAP for smooth transitions
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🔄 **Dynamic Content** - All content managed through MongoDB (no hardcoded data)
- 🎯 **Glassmorphism** - Modern glass effects and gradients
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and caching
- 🔒 **Production Ready** - Fully configured for deployment

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email service

## 📁 Project Structure

```
portfolio2/
├── server/                 # Backend server
│   ├── models/            # MongoDB models
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── About.js
│   │   ├── Social.js
│   │   └── Testimonial.js
│   ├── routes/            # API routes
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── about.js
│   │   ├── socials.js
│   │   ├── testimonials.js
│   │   └── contact.js
│   ├── index.js           # Server entry point
│   └── package.json
├── src/                   # Frontend React app
│   ├── components/        # React components
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── context/           # React contexts
│   │   └── ThemeContext.js
│   ├── services/          # API services
│   │   └── api.js
│   ├── config/            # Configuration
│   │   └── constants.js
│   ├── App.js
│   └── index.js
├── public/                # Static files
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio2
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud) - update MONGODB_URI in server/.env
   ```

6. **Seed the database (optional)**
   ```bash
   cd server
   node seed.js
   cd ..
   ```

7. **Start the development servers**

   Option 1: Run both servers separately
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   npm start
   ```

   Option 2: Run both with concurrently
   ```bash
   npm run dev
   ```

8. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 MongoDB Collections

### Projects
- `title` - Project title
- `description` - Short description
- `longDescription` - Detailed description
- `image` - Project image URL
- `techStack` - Array of technologies
- `category` - Project category (web, mobile, etc.)
- `liveLink` - Live demo URL
- `githubLink` - GitHub repository URL
- `featured` - Boolean for featured projects
- `order` - Display order

### Skills
- `name` - Skill name
- `icon` - Icon identifier (e.g., "FaReact")
- `category` - frontend, backend, database, tools, other
- `proficiency` - Skill level (0-100)
- `color` - Icon color
- `order` - Display order

### About
- `name` - Your name
- `title` - Your title/role
- `tagline` - Short tagline
- `bio` - Full bio
- `profileImage` - Profile image URL
- `email`, `location`, `degree`, `freelance` - Contact info
- `highlights` - Array of achievement highlights

### Socials
- `platform` - Social platform name
- `url` - Profile URL
- `icon` - Icon identifier
- `color` - Icon color
- `order` - Display order
- `active` - Boolean

### Testimonials
- `name` - Client name
- `role` - Client role
- `company` - Company name
- `content` - Testimonial text
- `avatar` - Avatar image URL
- `rating` - Rating (1-5)
- `featured` - Boolean
- `order` - Display order

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### About
- `GET /api/about` - Get about info
- `PUT /api/about` - Update about info

### Socials
- `GET /api/socials` - Get all social links
- `POST /api/socials` - Create social link
- `PUT /api/socials/:id` - Update social link
- `DELETE /api/socials/:id` - Delete social link

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/featured` - Get featured testimonials
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Contact
- `POST /api/contact` - Send contact message

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ }
}
```

### Fonts
The project uses Inter and Poppins fonts. Change in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont...');
```

### Content
All content is managed through MongoDB. Update your database to change content without code changes.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to Vercel or Netlify
3. Set `REACT_APP_API_URL` environment variable

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in server `.env`

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 👨‍💻 Author

**Kanchan Kushwaha**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 🙏 Acknowledgments

- Design inspiration from Apple, Vercel, and Awwwards
- Icons from React Icons
- Animations powered by Framer Motion and GSAP

---

Made with ❤️ using the MERN stack
