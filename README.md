# Job Application Tracker

A comprehensive React-based job application tracking system that helps you manage your job search process with persistent data storage and intuitive organization features.

![Job Tracker Dashboard](https://via.placeholder.com/800x400?text=Job+Tracker+Dashboard)

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

3. **Copy the JobTracker component** into your React project

4. **Import and use the component**:
   ```jsx
   import JobTracker from './components/JobTracker';
   
   function App() {
     return (
       <div className="App">
         <JobTracker />
       </div>
     );
   }
   ```

### Alternative Setup (No Installation Required)
- Copy the complete component code
- Paste into a new React component file
- The component includes all necessary styling and functionality

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

## 🎨 Customization

### Styling
The component uses inline styles for maximum portability. To customize:

1. **Colors**: Modify the `statusOptions` array colors
2. **Layout**: Adjust the `styles` object properties
3. **Responsive Design**: Update grid template columns in `jobsGrid`

### Status Options
Add or modify application statuses in the `statusOptions` array:

```javascript
const statusOptions = [
  { 
    value: 'custom', 
    label: 'Custom Status', 
    color: '#custom-bg-color', 
    textColor: '#custom-text-color', 
    icon: CustomIcon 
  }
];
```

### Form Fields
Add new fields by:
1. Adding to `formData` initial state
2. Adding form input in the modal
3. Adding display in job cards
4. Updating the handleSubmit function

## 🔧 Technical Details

### Dependencies
- **React**: Core framework (16.8+ for hooks support)
- **lucide-react**: Icon library for UI elements

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **LocalStorage**: Required for data persistence
- **ES6+ Features**: Uses modern JavaScript features

### Storage Format
- **Key**: `jobTrackerJobs`
- **Format**: JSON array of job objects
- **Backup**: Regular exports recommended

## 🛠️ Development

### File Structure
```
src/
  components/
    JobTracker.js       # Main component file
  App.js               # App component
  index.js             # Entry point
```

### Adding Features
1. **New Status Types**: Add to `statusOptions` array
2. **Additional Fields**: Extend `formData` object
3. **Custom Sorting**: Add options to `sortBy` logic
4. **Integration**: Connect to backend APIs by replacing localStorage calls

### Testing
- Test localStorage functionality in different browsers
- Verify export/import with various data sizes
- Check responsive design on mobile devices
- Test error handling with invalid data

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
