# Digital Document Locker - Complete Setup Guide

## 📌 Overview
This guide walks you through setting up and running the Digital Document Locker application from scratch.

## Step 1: Verify Project Structure ✅

Make sure all files are in place:

```
e:/document-locker/
├── app/
│   ├── api/documents/
│   │   ├── id-card/route.ts
│   │   ├── driving-license/route.ts
│   │   └── bike-details/route.ts
│   ├── documents/
│   │   ├── id-card/page.tsx
│   │   ├── driving-license/page.tsx
│   │   └── bike-details/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── DocumentCard.tsx
│   └── Icons.tsx
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── .env.local
├── .gitignore
└── README.md
```

## Step 2: Install Dependencies 📦

Open a terminal in the project directory and run:

```bash
cd e:\document-locker
npm install
```

This installs:
- React 19 & React DOM
- Next.js 15
- Prisma Client & CLI
- Tailwind CSS & PostCSS
- Lucide React icons

**Expected Time**: 2-5 minutes

## Step 3: Setup Prisma Database 🗄️

The project uses SQLite database with Prisma ORM.

### Create Database:

```bash
npx prisma db push
```

This command:
- ✅ Creates `prisma/dev.db` (SQLite database file)
- ✅ Sets up all tables (IdCard, DrivingLicense, BikeDetails)
- ✅ Configures the database schema

**Output should show**: "✓ Prisma schema valid"

### (Optional) View Database GUI:

```bash
npm run prisma:studio
```

This opens a visual interface to see database tables.

## Step 4: Start Development Server 🚀

```bash
npm run dev
```

**Wait for message**: "- ready started server on 0.0.0.0:3000, url: http://localhost:3000"

## Step 5: Open in Browser 🌐

Navigate to: **http://localhost:3000**

You should see:
- A navbar with "DocLock" logo
- Dashboard with three empty document cards (ID, License, Bike)
- Message: "No documents added yet"
- Button: "Add Your First Document"

## Step 6: Test the Application ✨

### Add ID Card:

1. Click **"Add Your First Document"** button
2. Fill in the form:
   - Full Name: `John Doe`
   - ID Number: `42101-1234567-1`
   - Date of Birth: `1990-01-15`
   - Issue Date: `2015-06-20`
   - Expiry Date: `2025-06-20`
3. Click **"Save ID Card"**
4. You'll be redirected to dashboard
5. See the card now displays your ID information

### Add Driving License:

1. Click on the **"Driving License"** card
2. Fill in the form:
   - License Number: `DL-2023-12345`
   - Category: `Motorcycle`
   - Issue Date: `2020-05-10`
   - Expiry Date: `2025-05-10`
   - Authority: `Punjab Traffic Police`
3. Click **"Save License"**

### Add Bike Details:

1. Click on the **"Bike Details"** card
2. Fill in the form:
   - Bike Model: `Honda CG 125`
   - Registration: `LEV-26-1234`
   - Engine Number: `ENG123456`
   - Chassis Number: `CHAS654321`
   - Token Tax Paid Up To: `2025-12-31`
3. Click **"Save Bike Details"**

### Edit Documents:

1. Go back to dashboard
2. Click **"Edit"** button on any card
3. Modify the fields
4. Click **"Save"** to update

## Step 7: Understanding the Tech Stack 🛠️

### Frontend
- **React 19** - UI library
- **Next.js 15 (App Router)** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Next.js API Routes** - `/app/api` endpoints
- **Prisma ORM** - Database management

### Database
- **SQLite** - Lightweight file-based database
- **File Location**: `prisma/dev.db`

### UI Components
- **Lucide React** - Icons
- **Custom Components** - Navbar, DocumentCard, Icons

## Step 8: Useful Commands 📋

```bash
# Development
npm run dev                           # Start dev server
npm run build                         # Build for production
npm start                            # Start prod server

# Database
npx prisma db push                   # Sync database
npx prisma generate                  # Generate Prisma client
npm run prisma:studio                # Open database GUI

# Cleanup
rm prisma/dev.db                     # Delete database
npx prisma db push                   # Recreate it
```

## Step 9: Project Architecture 🏗️

### Pages (Frontend)
```
/                                    # Dashboard (all documents)
/documents/id-card                   # ID Card form
/documents/driving-license           # License form
/documents/bike-details              # Bike details form
```

### API Routes (Backend)
```
GET/POST/PUT  /api/documents/id-card
GET/POST/PUT  /api/documents/driving-license
GET/POST/PUT  /api/documents/bike-details
```

### How Data Flows

1. **User fills form** → Component state updates
2. **User clicks Save** → POST/PUT request to API
3. **API Route receives data** → Validates & saves to Prisma
4. **Prisma writes to SQLite** → Database updated
5. **API returns response** → Component redirects to dashboard
6. **Dashboard fetches data** → Shows updated cards

## Step 10: Customization Examples 🎨

### Change App Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: "#yourcolor",
      secondary: "#anothercolor",
    },
  },
}
```

### Add More Fields to ID Card

1. Update `prisma/schema.prisma`:
```prisma
model IdCard {
  // ... existing fields
  fatherName String?      // New field
  motherName String?      // New field
}
```

2. Run:
```bash
npx prisma db push
```

3. Update form in `app/documents/id-card/page.tsx` with new fields

### Change Database Location

Edit `.env.local`:
```
DATABASE_URL="file:./path/to/your/database.db"
```

## Troubleshooting 🔧

### Problem: "Port 3000 is already in use"
```bash
npm run dev -- -p 3001
```

### Problem: "Prisma Client not found"
```bash
npx prisma generate
```

### Problem: "Database errors"
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
```

### Problem: "Changes not appearing"
```bash
# Hard refresh browser
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

## File Descriptions 📄

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main dashboard |
| `app/layout.tsx` | Root layout wrapper |
| `app/globals.css` | Global styles |
| `components/Navbar.tsx` | Top navigation bar |
| `components/DocumentCard.tsx` | Card component for each document |
| `components/Icons.tsx` | SVG icons for documents |
| `app/api/documents/*` | Backend API routes |
| `prisma/schema.prisma` | Database schema definition |
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS config |

## Next Steps 🚀

1. **Deploy to Vercel**: `npm install -g vercel && vercel`
2. **Add Authentication**: Integrate NextAuth.js
3. **Add Images**: Implement photo upload for ID cards
4. **Add Export**: Generate PDF reports
5. **Add Search**: Filter and search documents
6. **Add Backup**: Export data to JSON/CSV

## Performance Tips ⚡

- Database is SQLite (local file) - super fast
- API routes auto-cache on Vercel
- Tailwind CSS is optimized and minified
- Images can be optimized with Next.js Image component

## Security Reminders 🔒

⚠️ For production use:
1. Add authentication & authorization
2. Encrypt sensitive data
3. Use environment variables for secrets
4. Validate all user inputs
5. Use HTTPS
6. Add rate limiting
7. Regular security audits

---

**You're all set! Happy using Digital Document Locker! 🔐**

For more help, check README.md or visit Next.js docs at https://nextjs.org/docs
