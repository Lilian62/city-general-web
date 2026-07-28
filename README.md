# City General Electric LTD - Inventory Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for **City General Electric LTD**. This platform allows clients to browse electrical products by category and enables administrators to manage inventory through a secure dashboard.

![City General Electric](https://img.shields.io/badge/City%20General-Electric%20LTD-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)

---

## Features

### Client Side
- **Dynamic Hero Section** - High-quality background images/videos managed via admin panel
- **Categorized Catalog** - Products grouped into electrical categories
- **Interactive Product Cards** - "See More" with hover animations
- **Product Search** - Real-time filtering by product name
- **WhatsApp Integration** - Floating enquiry button
- **Trusted Brands Section** - Partner brands with authentic colors
- **Responsive Design** - Works on all devices

### Admin Side
- **Secure Login** - Password-protected portal
- **Content Management** - Update hero text and media
- **Inventory Control** - Full CRUD operations with image uploads
- **Search & Filter** - Find items by name or category

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, React Router DOM, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **File Handling** | Multer |
| **Styling** | CSS-in-JS, Flexbox, Grid |
| **Deployment** | Vercel (Frontend), Render/Heroku (Backend) |

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally

### Backend Setup
```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start

```

The application should now be running at `http://localhost:3000`.

---

##  Project Structure

city-general-web/
├── backend/
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── uploads/             # Product images
│   ├── .env                 # Environment variables
│   └── server.js            # Main entry point
├── frontend/
│   ├── public/
│   │   └── images/products/ # Product images
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Main views
│       ├── App.js           # Main React component
│       └── index.js         # Entry point
└── README.md



## Admin Credentials

* **Login URL:** `http://localhost:3000/admin`
* **Password:** in the .env file 

API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get product by ID
GET	/api/products/slug/:slug	Get product by slug
GET	/api/products/settings	Get site settings
POST	/api/products	Create new product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product

##  Support & Enquiries

For technical support or product enquiries, contact City General Electric LTD at **+254 796 988 033**.

---

Moving from a local environment to a live server is a big step. Since your project uses a **MERN stack** (MongoDB, Express, React, Node), **Render** is currently one of the most reliable and beginner-friendly platforms for free hosting.

Here is the "Deployment" section . It breaks down the process into the three main parts: Database, Backend, and Frontend.

---

##  Deployment Guide (Render)

### 1. Database (MongoDB Atlas)

Since your local MongoDB won't work on a live server, you need a cloud database:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster and a Database User.
3. In **Network Access**, allow access from "0.0.0.0/0" (anywhere).
4. Get your **Connection String** (looks like `mongodb+srv://username:password@cluster...`).

### 2. Backend Deployment

1. **Prepare `server.js**`: Ensure your port is dynamic:
`const PORT = process.env.PORT || 5000;`
2. **Environment Variables**: On Render, create a new **Web Service** and add these secret keys:
* `MONGO_URI`: (Your MongoDB Atlas string)
* `NODE_ENV`: `production`


3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`

### 3. Frontend Deployment

1. **Update URLs**: In your React files, change `http://localhost:5000` to your live Backend URL (provided by Render).
2. **Build Command**: `npm install && npm run build`
3. **Publish Directory**: `build` (for Create React App) or `dist` (for Vite).

---

###  Important Note on File Uploads

Currently, your project saves images/videos to a local `/uploads` folder. **Render (and Heroku) delete these files every time the server restarts.**

To make your images permanent on a live site, you have two choices:

* **Option A:** Use **Cloudinary** (Recommended). It’s a free service that stores your images and gives you a permanent URL to save in MongoDB.
* **Option B:** Use a "Persistent Disk" on Render (this usually costs a few dollars per month).

