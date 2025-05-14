# sihone-utility-billing-app
# 💧 Sihobe Utility Billing App

A fullstack utility billing platform for managing apartments, meter readings, invoices, and payments. Built with **Node.js (Express)**, **React (Material UI)**, and **MySQL**, deployed on **DigitalOcean**.

---

## ⚙️ Tech Stack

- **Frontend**: React + Material UI + React Router + Axios
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: MySQL
- **Deployment**: DigitalOcean App Platform
- **Features**:
  - Apartment & tenant management
  - Meter reading entry
  - Auto-generated invoices
  - Payment tracking
  - Settings control (fees, rates, payment options)
  - Invoice preview & print

---

## 📁 Project Structure

sihobe-utility-billing-app/
├── client/ # React frontend
├── server/ # Express backend
├── .do/ # DigitalOcean deploy config


---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/sihobe-utility-billing-app.git
cd sihobe-utility-billing-app
```

### 2. Setup MySQL Database
Create a MySQL database and run the provided schema file:

```bash
mysql -u root -p sihobe_utility < u209577136_utility_manage.sql
```

### 3. Environment Variables
Create .env in /server/:

PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=sihobe_utility


### 4. Run the App Locally
## Backend
```bash
cd server
npm install
npm run dev
```

## Frontend
```bash
cd client
npm install
npm start
```

Frontend runs at http://localhost:3000, backend at http://localhost:8000/api

### 🛠 TODO
- Admin authentication
- PDF invoice export
- Payment receipts
- Email invoice feature

### 📄 License
MIT © Austin Takam
