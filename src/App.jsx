import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Building, MapPin, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const JobTracker = () => {
  // Load jobs from localStorage or use default data
  const getInitialJobs = () => {
    try {
      const savedJobs = localStorage.getItem('jobTrackerJobs');
      if (savedJobs) {
        return JSON.parse(savedJobs);
      }
    } catch (error) {
      console.error('Error loading jobs from localStorage:', error);
    }
    
    // Default sample data if no saved data exists
    return [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Frontend Developer',
        location: 'San Francisco, CA',
        salary: '$80,000 - $100,000',
        status: 'applied',
        appliedDate: '2024-06-15',
        followUpDate: '2025-07-01',
        notes: 'Applied through LinkedIn',
        contactEmail: 'hr@techcorp.com',
        jobUrl: 'https://techcorp.com/careers'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Engineer',
        location: 'Remote',
        salary: '$90,000 - $120,000',
        status: 'interview',
        appliedDate: '2024-06-10',
        followUpDate: '2024-06-28',
        notes: 'Phone screening completed, technical interview scheduled',
        contactEmail: 'hiring@startupxyz.com',
        jobUrl: 'https://startupxyz.com/jobs'
      }
    ];
  };

  const [jobs, setJobs] = useState(getInitialJobs);

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  // Save jobs to localStorage whenever jobs array changes
  useEffect(() => {
    try {
      localStorage.setItem('jobTrackerJobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  }, [jobs]);

  // Load filter and sort preferences from localStorage
  const [filter, setFilter] = useState(() => {
    try {
      return localStorage.getItem('jobTrackerFilter') || 'all';
    } catch (error) {
      console.error(error);
      return 'all';
    }
  });
  
  const [sortBy, setSortBy] = useState(() => {
    try {
      return localStorage.getItem('jobTrackerSort') || 'appliedDate';
    } catch (error) {
      console.error(error);
      return 'appliedDate';
    }
  });

  // Save filter preference when it changes
  useEffect(() => {
    try {
      localStorage.setItem('jobTrackerFilter', filter);
    } catch (error) {
      console.error('Error saving filter preference:', error);
    }
  }, [filter]);

  // Save sort preference when it changes
  useEffect(() => {
    try {
      localStorage.setItem('jobTrackerSort', sortBy);
    } catch (error) {
      console.error('Error saving sort preference:', error);
    }
  }, [sortBy]);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied',
    appliedDate: '',
    followUpDate: '',
    notes: '',
    contactEmail: '',
    jobUrl: ''
  });

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: '#dbeafe', textColor: '#1e40af', icon: Clock },
    { value: 'interview', label: 'Interview', color: '#fef3c7', textColor: '#d97706', icon: AlertCircle },
    { value: 'offer', label: 'Offer', color: '#d1fae5', textColor: '#059669', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', color: '#fee2e2', textColor: '#dc2626', icon: XCircle }
  ];

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      salary: '',
      status: 'applied',
      appliedDate: '',
      followUpDate: '',
      notes: '',
      contactEmail: '',
      jobUrl: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...formData, id: editingJob.id }
          : job
      ));
      setEditingJob(null);
    } else {
      const newJob = {
        ...formData,
        id: Date.now()
      };
      setJobs([...jobs, newJob]);
    }
    
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  // Export data function
  const exportData = () => {
    try {
      const dataStr = JSON.stringify(jobs, null, 2);
      const dataBlob = new Blob([dataStr], {type: 'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  // Import data function
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedJobs = JSON.parse(e.target.result);
        if (Array.isArray(importedJobs)) {
          if (window.confirm('This will replace all current data. Continue?')) {
            setJobs(importedJobs);
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  // Clear all data function
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL job applications? This cannot be undone.')) {
      if (window.confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        setJobs([]);
        try {
          localStorage.removeItem('jobTrackerJobs');
          localStorage.removeItem('jobTrackerFilter');
          localStorage.removeItem('jobTrackerSort');
        } catch (error) {
          console.error('Error clearing localStorage:', error);
        }
        alert('All data has been cleared.');
      }
    }
  };

  const getStatusConfig = (status) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'appliedDate') {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    } else if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const getUpcomingReminders = () => {
    const today = new Date();
    const upcoming = jobs.filter(job => {
      if (!job.followUpDate) return false;
      const followUp = new Date(job.followUpDate);
      const diffTime = followUp - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });
    return upcoming;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const upcomingReminders = getUpcomingReminders();

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    maxWidth: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    statIcon: {
      borderRadius: '50%',
      padding: '12px',
      marginRight: '16px'
    },
    statLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '4px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#111827'
    },
    reminders: {
      backgroundColor: '#fefce8',
      border: '1px solid #facc15',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px'
    },
    reminderTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ca8a04',
      marginBottom: '8px'
    },
    reminderItem: {
      display: 'flex',
      alignItems: 'center',
      color: '#a16207',
      marginBottom: '8px'
    },
    controls: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px',
      alignItems: 'center'
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500'
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: 'white',
      fontSize: '14px'
    },
    jobsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '24px'
    },
    jobCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      position: 'relative'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    jobTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '4px'
    },
    jobCompany: {
      fontSize: '16px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    jobDetails: {
      marginBottom: '16px'
    },
    jobDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#6b7280'
    },
    jobActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '6px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      backgroundColor: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px'
    },
    form: {
      display: 'grid',
      gap: '16px'
    },
    formGroup: {
      display: 'grid',
      gap: '4px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '14px'
    },
    textarea: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '80px',
      resize: 'vertical'
    },
    formActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    },
    cancelButton: {
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      backgroundColor: 'white',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Job Application Tracker</h1>
          <p style={styles.subtitle}>Manage your job applications and stay organized</p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          {statusOptions.map(status => {
            const count = jobs.filter(job => job.status === status.value).length;
            const Icon = status.icon;
            return (
              <div key={status.value} style={styles.statCard}>
                <div style={{...styles.statIcon, backgroundColor: status.color}}>
                  <Icon size={24} color={status.textColor} />
                </div>
                <div>
                  <p style={styles.statLabel}>{status.label}</p>
                  <p style={styles.statValue}>{count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reminders */}
        {upcomingReminders.length > 0 && (
          <div style={styles.reminders}>
            <h3 style={styles.reminderTitle}>Upcoming Reminders</h3>
            <div>
              {upcomingReminders.map(job => (
                <div key={job.id} style={styles.reminderItem}>
                  <Calendar size={16} style={{marginRight: '8px'}} />
                  <span>Follow up with {job.company} on {formatDate(job.followUpDate)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={styles.controls}>
          <button
            onClick={() => setShowForm(true)}
            style={styles.button}
          >
            <Plus size={16} />
            Add Job Application
          </button>
          
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.select}
            >
              <option value="appliedDate">Sort by Date</option>
              <option value="company">Sort by Company</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>

          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginLeft: 'auto'}}>
            <button
              onClick={exportData}
              style={{...styles.actionButton, backgroundColor: '#10b981', color: 'white', border: 'none'}}
            >
              Export Data
            </button>
            <label style={{...styles.actionButton, cursor: 'pointer', margin: 0}}>
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{display: 'none'}}
              />
            </label>
            <button
              onClick={clearAllData}
              style={{...styles.actionButton, backgroundColor: '#ef4444', color: 'white', border: 'none'}}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Job Applications Grid */}
        <div style={styles.jobsGrid}>
          {sortedJobs.map(job => {
            const statusConfig = getStatusConfig(job.status);
            return (
              <div key={job.id} style={styles.jobCard}>
                <div style={styles.jobHeader}>
                  <div>
                    <h3 style={styles.jobTitle}>{job.position}</h3>
                    <p style={styles.jobCompany}>
                      <Building size={16} />
                      {job.company}
                    </p>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusConfig.color,
                    color: statusConfig.textColor
                  }}>
                    {statusConfig.label}
                  </span>
                </div>

                <div style={styles.jobDetails}>
                  {job.location && (
                    <div style={styles.jobDetail}>
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div style={styles.jobDetail}>
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div style={styles.jobDetail}>
                    <Calendar size={16} />
                    <span>Applied: {formatDate(job.appliedDate)}</span>
                  </div>
                  {job.followUpDate && (
                    <div style={styles.jobDetail}>
                      <Clock size={16} />
                      <span>Follow up: {formatDate(job.followUpDate)}</span>
                    </div>
                  )}
                  {job.notes && (
                    <div style={{...styles.jobDetail, marginTop: '12px'}}>
                      <span style={{fontSize: '13px', fontStyle: 'italic'}}>{job.notes}</span>
                    </div>
                  )}
                </div>

                <div style={styles.jobActions}>
                  <button
                    onClick={() => handleEdit(job)}
                    style={styles.actionButton}
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    style={{...styles.actionButton, color: '#dc2626', borderColor: '#fca5a5'}}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                  {job.jobUrl && (
                    <button
                      onClick={() => window.open(job.jobUrl, '_blank')}
                      style={styles.actionButton}
                    >
                      <Eye size={14} />
                      View Job
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {sortedJobs.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            <p>No job applications found. Add your first application to get started!</p>
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>
                {editingJob ? 'Edit Job Application' : 'Add Job Application'}
              </h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., $60,000 - $80,000"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    style={styles.input}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Applied Date *</label>
                  <input
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Follow-up Date</label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Contact Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Job URL</label>
                  <input
                    type="url"
                    value={formData.jobUrl}
                    onChange={(e) => setFormData({...formData, jobUrl: e.target.value})}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    style={styles.textarea}
                    placeholder="Any additional notes about this application..."
                  />
                </div>
                
                <div style={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingJob(null);
                      resetForm();
                    }}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button type="submit" style={styles.button}>
                    {editingJob ? 'Update Application' : 'Add Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTracker;