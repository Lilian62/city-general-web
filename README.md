# City General AppliancesElectric LTD - Inventory Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed for **City General Appliances**. This platform allows clients to browse electrical products by category and enables administrators to manage inventory through a secure dashboard.

##  Features

### Client Side

* **Dynamic Hero Section:** Supports high-quality background images or videos managed via the admin panel.
* **Categorized Catalog:** Products are automatically grouped into specific electrical categories.
* **Interactive Product Cards:** "Read More" functionality for descriptions to keep the UI clean.
* **WhatsApp Integration:** A floating enquiry button that links directly to `+254 796 988 033`.

### Admin Side

* **Secure Login:** Password-protected portal with a modern, centered UI.
* **Content Management:** Update the homepage welcome text and hero media instantly.
* **Inventory Control:** Full CRUD (Create, Read, Delete) capabilities for products including image uploads.
* **Search & Filter:** Quickly find specific inventory items by name or category.

---

##  Tech Stack

* **Frontend:** React.js, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **File Handling:** Multer (for product images and hero videos)

---

##  Installation & Setup

### 1. Prerequisites

* [Node.js](https://nodejs.org/) installed
* [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally

### 2. Backend Setup

```bash
cd backend
npm install
# Ensure your MongoDB is running on localhost:27017
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

project-root/
│
├── backend/                # Server-side logic (Node.js/Express or Python/Flask)
│   ├── config/             # Database connection settings
│   ├── controllers/        # Logic for uploading, deleting, and updating products
│   ├── models/             # Database schemas (Product, Category, Feedback)
│   ├── routes/             # API endpoints (e.g., /api/products)
│   ├── uploads/            # Folder where product images are stored
│   └── server.js           # Main entry point for the backend
│
├── frontend/               # Client-side (React, Vue, or HTML/CSS/JS)
│   ├── public/             # Static assets (WhatsApp icon, logos)
│   │   └── assets/
│   │       └── icons/      # WhatsApp and Star icons
│   └── src/
│       ├── components/     # Reusable UI parts
│       │   ├── Navbar.js
│       │   ├── ProductCard.js
│       │   ├── StarRating.js
│       │   └── WhatsAppButton.js
│       ├── pages/          # Main views
│       │   ├── HomePage.js
│       │   ├── CategoryPage.js
│       │   └── AdminDashboard.js # Where you upload/edit/delete items
│       └── App.js          # Main frontend logic
│
├── .env                    # Secret keys and database URLs
├── .gitignore              # Files to ignore (like node_modules)
└── README.md               # Project documentation



## Admin Credentials

* **Login URL:** `http://localhost:3000/admin`
* **Password:** in the .env file 


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

