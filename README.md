# 🔐 Digital Document Locker

A secure, modern web application to store and manage your important personal documents including ID Cards, Driving Licenses, and Bike Details. Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Prisma**.

## 📋 Features

✅ **Dashboard** - Overview of all saved documents with quick access
✅ **ID Card Management** - Store CNIC/ID card details with dates
✅ **Driving License** - Manage driving license information and expiry dates
✅ **Bike Details** - Store bike/vehicle registration and technical information
✅ **Add/Edit Forms** - Easy-to-use forms for adding and updating documents
✅ **Responsive Design** - Works beautifully on desktop, tablet, and mobile
✅ **Fast API Routes** - Next.js backend for seamless data operations
✅ **SQLite Database** - Lightweight, file-based database with Prisma ORM

## 📁 Project Structure

```
document-locker/
├── app/
│   ├── api/
│   │   └── documents/
│   │       ├── id-card/route.ts
│   │       ├── driving-license/route.ts
│   │       └── bike-details/route.ts
│   ├── documents/
│   │   ├── id-card/page.tsx
│   │   ├── driving-license/page.tsx
│   │   └── bike-details/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (Dashboard)
├── components/
│   ├── Navbar.tsx
│   ├── DocumentCard.tsx
│   └── Icons.tsx
├── prisma/
│   └── schema.prisma (Database schema)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
└── .env.local
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Basic knowledge of React and Next.js

### Step 1: Install Dependencies

```bash
cd document-locker
npm install
```

### Step 2: Set Up Database

```bash
npx prisma db push
```

This command:
- Creates a local SQLite database (`prisma/dev.db`)
- Sets up the database schema with tables for IdCard, DrivingLicense, and BikeDetails

### Step 3: Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Step 4: Start Using the App

1. Open the dashboard at `http://localhost:3000`
2. Click "Add Document" or navigate to any document section
3. Fill in the details and click "Save"
4. View all documents on the dashboard

## 🗄️ Database Schema

### IdCard Model
```prisma
- id: String (unique identifier)
- fullName: String
- idNumber: String (unique)
- dateOfBirth: String
- issueDate: String
- expiryDate: String
- frontImage: String (optional for future photo uploads)
- backImage: String (optional for future photo uploads)
- createdAt: DateTime
- updatedAt: DateTime
```

### DrivingLicense Model
```prisma
- id: String
- licenseNumber: String (unique)
- category: String (Motorcycle, Car, Truck, Bus)
- issueDate: String
- expiryDate: String
- licensingAuthority: String
- createdAt: DateTime
- updatedAt: DateTime
```

### BikeDetails Model
```prisma
- id: String
- bikeModel: String
- registrationNumber: String (unique)
- engineNumber: String
- chassisNumber: String
- tokenTaxPaidUpTo: String
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔌 API Endpoints

### ID Card
- `GET /api/documents/id-card` - Fetch saved ID card
- `POST /api/documents/id-card` - Create new ID card
- `PUT /api/documents/id-card` - Update existing ID card

### Driving License
- `GET /api/documents/driving-license` - Fetch saved license
- `POST /api/documents/driving-license` - Create new license
- `PUT /api/documents/driving-license` - Update license

### Bike Details
- `GET /api/documents/bike-details` - Fetch saved bike details
- `POST /api/documents/bike-details` - Create new bike details
- `PUT /api/documents/bike-details` - Update bike details

## 🎨 UI Components

### Navbar
- Navigation with app branding (DocLock)
- Links to Dashboard and Add Document sections

### DocumentCard
- Displays document information in a card format
- Shows key fields with nice formatting
- Edit button to modify existing documents
- Add button to create new documents

### Pages
- **Dashboard** (`/`) - Main overview page
- **ID Card Form** (`/documents/id-card`)
- **Driving License Form** (`/documents/driving-license`)
- **Bike Details Form** (`/documents/bike-details`)

## 📝 Usage Examples

### Adding an ID Card

1. Click "Add Document" in navbar
2. Select "National ID Card" 
3. Fill in the form:
   - Full Name
   - ID Number
   - Date of Birth
   - Issue Date
   - Expiry Date
4. Click "Save ID Card"
5. View on dashboard

### Updating Bike Details

1. Click on "Bike Details" card on dashboard
2. Edit button opens the form pre-filled with existing data
3. Modify any field
4. Click "Save Bike Details"

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm build

# Start production server
npm start

# Setup database
npx prisma db push

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## 🔒 Security Notes

⚠️ **Important:** This is a local-only application. For production:
1. Use proper authentication
2. Encrypt sensitive data before storing
3. Use a production database
4. Add input validation and sanitization
5. Consider using environment variables for sensitive configs

## 💡 Tips & Tricks

1. **View Database Directly**: Run `npm run prisma:studio` to open Prisma Studio and see/edit data
2. **Reset Database**: Delete `prisma/dev.db` and run `npx prisma db push` again
3. **Date Format**: Use YYYY-MM-DD format for all dates
4. **Unique Fields**: ID Number, License Number, and Registration Number must be unique

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Delete existing database and recreate
rm prisma/dev.db
npx prisma db push
```

### Prisma Client Errors
```bash
# Regenerate Prisma client
npx prisma generate
```

### Port Already in Use
```bash
# Run on different port
npm run dev -- -p 3001
```

## 📚 Project Structure Recap

| Folder | Purpose |
|--------|---------|
| `/app` | Next.js App Router pages and layouts |
| `/app/api` | Backend API routes (REST endpoints) |
| `/app/documents` | Document form pages |
| `/components` | Reusable React components |
| `/prisma` | Database schema and migrations |

## 🚀 Next Steps (Optional Enhancements)

- [ ] Add image upload for ID card front/back
- [ ] Add authentication (NextAuth.js)
- [ ] Add export to PDF functionality
- [ ] Add multiple documents storage
- [ ] Add search and filter
- [ ] Add data backup/export
- [ ] Add dark mode toggle
- [ ] Add print functionality

## 📄 License

This project is open-source and available for personal use.

## 🤝 Support

For issues or questions, check the troubleshooting section or create an issue.

---

**Happy securing! 🔐**
