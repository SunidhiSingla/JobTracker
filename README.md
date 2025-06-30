# Job Application Tracker

A comprehensive React-based job application tracking system that helps you manage your job search process with persistent data storage and intuitive organization features.

## 🌟 Features

### 📊 Dashboard Overview
- **Status Statistics**: Visual cards showing counts for Applied, Interview, Offer, and Rejected applications
- **Color-coded Status Indicators**: Easy-to-identify status badges with icons
- **Upcoming Reminders**: Automatic alerts for follow-up dates within 7 days

### 📝 Job Management
- **Add Applications**: Comprehensive form with all essential job details
- **Edit Applications**: Update any information with ease
- **Delete Applications**: Remove applications with confirmation dialogs
- **External Links**: Direct access to job postings and company websites

### 🔍 Organization & Filtering
- **Status Filtering**: View applications by status (All, Applied, Interview, Offer, Rejected)
- **Smart Sorting**: Sort by application date, company name, or status
- **Real-time Updates**: Instant filtering and sorting without page refresh

### 💾 Data Persistence
- **LocalStorage Integration**: All data automatically saved to browser storage
- **Session Persistence**: Data remains after browser restart
- **Preference Memory**: Filter and sort preferences remembered between sessions

### 📤 Data Management
- **Export Functionality**: Download all data as JSON backup file
- **Import Capability**: Restore data from previously exported files
- **Clear All Data**: Complete data reset with safety confirmations
- **Error Handling**: Graceful fallback for localStorage issues

### 📅 Reminder System
- **Automatic Detection**: Identifies upcoming follow-up dates
- **Visual Alerts**: Prominent reminder section on dashboard
- **Date Management**: Easy date input and formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
2. **Install dependencies**:
   ```bash
   npm install lucide-react
   # or
   yarn add lucide-react
   ```

3. npm run dev

## 📱 Usage Guide

### Adding a New Job Application

1. Click the **"Add Job Application"** button
2. Fill in the required fields:
   - **Company Name** (required)
   - **Position** (required)
   - **Applied Date** (required)
3. Add optional information:
   - Location
   - Salary range
   - Contact email
   - Job URL
   - Personal notes
4. Select application status
5. Set follow-up date for reminders
6. Click **"Add Application"**

### Managing Applications

- **Edit**: Click the "Edit" button on any job card
- **Delete**: Click the "Delete" button (requires confirmation)
- **View Job**: Click "View Job" to open external job posting
- **Filter**: Use status dropdown to show specific application types
- **Sort**: Use sort dropdown to organize by date, company, or status

### Data Backup & Restore

#### Exporting Data
1. Click **"Export Data"** button
2. Save the downloaded JSON file to your computer
3. File includes all applications with timestamp in filename

#### Importing Data
1. Click **"Import Data"** button
2. Select your previously exported JSON file
3. Confirm replacement of current data
4. All applications will be restored

#### Clearing Data
1. Click **"Clear All"** button
2. Confirm action twice (safety feature)
3. All data will be permanently removed
   
## 🔧 Technical Details

### Dependencies
- **React**: Core framework (18.8+ for hooks support)
- **lucide-react**: Icon library for UI elements

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **LocalStorage**: Required for data persistence
- **ES6+ Features**: Uses modern JavaScript features

### Storage Format
- **Key**: `jobTrackerJobs`
- **Format**: JSON array of job objects
- **Backup**: Regular exports recommended

## 🔒 Privacy & Security

- **Local Storage Only**: No data sent to external servers
- **Browser-based**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **Export Control**: You control your data exports

## 📞 Support

For issues or questions:
1. Check browser console for error messages
2. Verify all dependencies are installed
3. Test in different browser if issues persist
4. Export data regularly as backup

---

**Happy Job Hunting! 🎯**

*Keep track of your applications and land your dream job with organized, persistent tracking.*
