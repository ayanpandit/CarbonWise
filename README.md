# 🌱 CarbonWise - Carbon Footprint Calculator

A modern, full-stack web application for tracking and reducing your carbon footprint with real-time analytics and gamification.

## 📁 Project Structure

```
CarbonWise/
├── frontend/          # React application with Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── lib/           # Utility libraries (Supabase client)
│   │   └── assets/        # Images, videos, styles
│   ├── package.json
│   └── .env              # Frontend environment variables
├── database/          # Database setup and documentation
│   ├── SUPABASE_SETUP.sql    # Complete database setup script
│   └── README.md             # Database setup guide
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Database Setup
1. Go to your Supabase dashboard
2. Open SQL Editor
3. Run the script from `database/SUPABASE_SETUP.sql`
4. Set up your environment variables in `frontend/.env`

### 3. Environment Variables
Create `frontend/.env` with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## ✨ Features

### 🔐 **Authentication System**
- User registration and login
- Profile management with picture uploads
- Password change functionality
- Secure session management

### 📊 **Carbon Tracking**
- Carbon footprint calculator
- Activity logging and tracking
- Real-time statistics
- Progress visualization

### 👤 **User Profiles**
- Complete profile management
- Avatar uploads to Supabase Storage
- Personal stats and achievements
- Privacy settings

### 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly navigation
- Adaptive layouts
- Mobile profile dropdown with full functionality

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Context API

## 📱 Mobile Features

The mobile navbar now includes:
- Full profile dropdown with stats
- Carbon saved, tracked days, and level display
- Complete menu options:
  - Edit Profile
  - My Dashboard  
  - My Activities
  - Preferences
  - Sign Out

## 🔒 Security

- Row Level Security (RLS) on all database tables
- Secure file uploads with user-specific access
- JWT-based authentication
- Input validation and sanitization

## 📈 Database

The application uses Supabase with:
- **Profiles table**: User information and stats
- **Activities table**: Carbon tracking data
- **Storage bucket**: Profile pictures and files
- **Real-time updates**: Live data synchronization

## 🎨 Design

- Modern gradient backgrounds
- Smooth animations and transitions
- Glassmorphism effects
- Consistent color scheme
- Accessible UI components

## 📞 Support

For setup help, check the `database/README.md` file or refer to the detailed setup guide.

---

Built with ❤️ for a sustainable future 🌍
