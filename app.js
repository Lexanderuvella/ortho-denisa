// Ortho-Denisa Orthodontist Practice Management System
class OrthoDenisaApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.patients = [];
        this.appointments = [];
        this.treatments = [];
        this.searchResults = [];
        this.isSearchActive = false;
        this.selectedFiles = [];
        this.uploadInProgress = false;
        this.smartUploadFiles = [];
        this.aiAnalysisResults = [];
        this.init();
    }

    init() {
        console.log('🦷 Initializing Ortho-Denisa App...');
        this.loadSampleData();
        this.setupEventListeners();
        
        // Load dashboard immediately
        this.loadDashboard();
        
        console.log(' App initialized successfully!');
    }

    setupEventListeners() {
        // Navigation - Add delay to ensure DOM is ready
        setTimeout(() => {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const page = item.getAttribute('data-page');
                    this.navigateToPage(page);
                });
            });

            // Global search functionality
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.handleGlobalSearch(e.target.value);
                });
                
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.clearSearch();
                    }
                    if (e.key === 'Enter') {
                        this.executeSearch();
                    }
                });
            }
        }, 100);
    }

    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        this.currentPage = page;
        this.loadPageContent(page);
    }

    loadPageContent(page) {
        const mainContent = document.getElementById('mainContent');
        
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'patients':
                this.loadPatientsPage();
                break;
            case 'appointments':
                this.loadAppointmentsPage();
                break;
            case 'treatments':
                this.loadTreatmentsPage();
                break;
            case 'billing':
                this.loadBillingPage();
                break;
            case 'inventory':
                this.loadInventoryPage();
                break;
            case 'collaborators':
                this.loadCollaboratorsPage();
                break;
            case 'reports':
                this.loadReportsPage();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
            case 'help':
                this.loadHelpPage();
                break;
            default:
                this.loadDashboard();
        }
    }

    loadDashboard() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div id="dashboardPage" class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Dashboard</h1>
                        <p class="page-subtitle">Welcome back, Dr. Denisa! Here's your practice overview.</p>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-secondary" onclick="app.showImportModal()">
                            <i class="fas fa-upload"></i>
                            Import Clients
                        </button>
                        <button class="btn btn-primary" onclick="app.showAppointmentModal()">
                            <i class="fas fa-plus"></i>
                            New Appointment
                        </button>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Today's Appointments</div>
                            <div class="stat-icon primary">
                                <i class="fas fa-calendar-day"></i>
                            </div>
                        </div>
                        <div class="stat-value">12</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+2 from yesterday</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Active Patients</div>
                            <div class="stat-icon success">
                                <i class="fas fa-user-friends"></i>
                            </div>
                        </div>
                        <div class="stat-value">248</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+15 this month</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Monthly Revenue</div>
                            <div class="stat-icon warning">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div class="stat-value">$24,580</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+8.2% from last month</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Treatment Completion</div>
                            <div class="stat-icon info">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                        <div class="stat-value">94%</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+2% this week</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <div class="quick-action" onclick="app.showNewPatientModal()">
                        <i class="fas fa-user-plus"></i>
                        <div class="quick-action-title">Add New Patient</div>
                        <div class="quick-action-desc">Register a new patient</div>
                    </div>
                    <div class="quick-action" onclick="app.showAppointmentModal()">
                        <i class="fas fa-calendar-plus"></i>
                        <div class="quick-action-title">Schedule Appointment</div>
                        <div class="quick-action-desc">Book new appointment</div>
                    </div>
                    <div class="quick-action" onclick="app.navigateToPage('treatments')">
                        <i class="fas fa-teeth-open"></i>
                        <div class="quick-action-title">Treatment Plans</div>
                        <div class="quick-action-desc">Manage treatment plans</div>
                    </div>
                    <div class="quick-action" onclick="app.navigateToPage('billing')">
                        <i class="fas fa-receipt"></i>
                        <div class="quick-action-title">Billing</div>
                        <div class="quick-action-desc">Process payments</div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Activity</h3>
                    </div>
                    <div class="card-body">
                        <div id="recentActivity">
                            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                                <div class="loading"></div>
                                <p style="margin-top: 1rem;">Loading recent activity...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Load the recent activity after the HTML is rendered
        this.loadRecentActivity();
        this.updateDashboardStats();
    }

    loadPatientsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Patient Management</h1>
                        <p class="page-subtitle">Manage your patient records</p>
                    </div>
                    <button class="btn btn-primary" onclick="app.showNewPatientModal()">
                        <i class="fas fa-plus"></i>
                        Add New Patient
                    </button>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Patient List</h3>
                    </div>
                    <div class="card-body">
                        ${this.renderPatientsTable()}
                    </div>
                </div>
            </div>
        `;
    }

    loadAppointmentsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Appointments</h1>
                        <p class="page-subtitle">Manage scheduling</p>
                    </div>
                    <button class="btn btn-primary" onclick="app.showAppointmentModal()">
                        <i class="fas fa-plus"></i>
                        New Appointment
                    </button>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Today's Schedule</h3>
                    </div>
                    <div class="card-body">
                        ${this.renderTodaySchedule()}
                    </div>
                </div>
            </div>
        `;
    }

    loadTreatmentsPage() {
        this.currentTreatmentTab = this.currentTreatmentTab || 'braces';
        this.currentViewMode = this.currentViewMode || 'grid';
        this.treatmentPhotos = this.treatmentPhotos || this.loadSampleTreatmentPhotos();
        
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Treatment Gallery</h1>
                        <p class="page-subtitle">Progress photos and treatment documentation</p>
                    </div>
                    <button class="btn btn-primary" onclick="app.showUploadModal()">
                        <i class="fas fa-camera"></i>
                        Upload Progress Photos
                    </button>
                </div>

                <!-- Treatment Type Tabs -->
                <div class="treatment-tabs" style="display: flex; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 2px solid var(--border-color);">
                    <button class="treatment-tab ${this.currentTreatmentTab === 'braces' ? 'active' : ''}" onclick="app.switchTreatmentTab('braces')" style="padding: 1rem 1.5rem; border: none; background: ${this.currentTreatmentTab === 'braces' ? 'var(--primary-color)' : 'transparent'}; color: ${this.currentTreatmentTab === 'braces' ? 'white' : 'var(--text-primary)'}; border-radius: var(--radius-md) var(--radius-md) 0 0; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                        <i class="fas fa-teeth"></i>
                        Braces (${this.getTreatmentPhotoCount('braces')})
                    </button>
                    <button class="treatment-tab ${this.currentTreatmentTab === 'invisalign' ? 'active' : ''}" onclick="app.switchTreatmentTab('invisalign')" style="padding: 1rem 1.5rem; border: none; background: ${this.currentTreatmentTab === 'invisalign' ? 'var(--primary-color)' : 'transparent'}; color: ${this.currentTreatmentTab === 'invisalign' ? 'white' : 'var(--text-primary)'}; border-radius: var(--radius-md) var(--radius-md) 0 0; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                        <i class="fas fa-eye-slash"></i>
                        Invisalign (${this.getTreatmentPhotoCount('invisalign')})
                    </button>
                    <button class="treatment-tab ${this.currentTreatmentTab === 'retainers' ? 'active' : ''}" onclick="app.switchTreatmentTab('retainers')" style="padding: 1rem 1.5rem; border: none; background: ${this.currentTreatmentTab === 'retainers' ? 'var(--primary-color)' : 'transparent'}; color: ${this.currentTreatmentTab === 'retainers' ? 'white' : 'var(--text-primary)'}; border-radius: var(--radius-md) var(--radius-md) 0 0; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                        <i class="fas fa-shield-alt"></i>
                        Retainers (${this.getTreatmentPhotoCount('retainers')})
                    </button>
                    <button class="treatment-tab ${this.currentTreatmentTab === 'all' ? 'active' : ''}" onclick="app.switchTreatmentTab('all')" style="padding: 1rem 1.5rem; border: none; background: ${this.currentTreatmentTab === 'all' ? 'var(--primary-color)' : 'transparent'}; color: ${this.currentTreatmentTab === 'all' ? 'white' : 'var(--text-primary)'}; border-radius: var(--radius-md) var(--radius-md) 0 0; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">
                        <i class="fas fa-images"></i>
                        All Photos (${this.getTreatmentPhotoCount('all')})
                    </button>
                </div>

                <!-- Filter and Sort Controls -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 500; margin-right: 0.5rem;">Filter by Patient:</label>
                            <select id="patientFilter" onchange="app.filterTreatmentPhotos()" style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                <option value="">All Patients</option>
                                ${this.patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 500; margin-right: 0.5rem;">Progress Stage:</label>
                            <select id="stageFilter" onchange="app.filterTreatmentPhotos()" style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                <option value="">All Stages</option>
                                <option value="before">Before Treatment</option>
                                <option value="progress">Progress Check</option>
                                <option value="adjustment">Post-Adjustment</option>
                                <option value="completion">Treatment Complete</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <label style="font-size: 0.875rem; font-weight: 500;">Sort by:</label>
                        <select id="sortOrder" onchange="app.filterTreatmentPhotos()" style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="patient">By Patient</option>
                            <option value="stage">By Stage</option>
                        </select>
                        <button class="btn btn-secondary" onclick="app.toggleViewMode()" style="padding: 0.5rem 0.75rem;" title="Toggle View Mode">
                            <i class="fas ${this.currentViewMode === 'grid' ? 'fa-th' : 'fa-list'}" id="viewModeIcon"></i>
                        </button>
                    </div>
                </div>

                <!-- Photo Gallery -->
                <div id="photoGallery">
                    ${this.renderTreatmentGallery()}
                </div>
            </div>
        `;
    }

    loadBillingPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Billing</h1>
                        <p class="page-subtitle">Manage payments</p>
                    </div>
                </div>
                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Outstanding</div>
                            <div class="stat-icon warning">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div class="stat-value">$12,450</div>
                    </div>
                </div>
            </div>
        `;
    }

    loadInventoryPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Inventory Management</h1>
                        <p class="page-subtitle">Track supplies and equipment</p>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-secondary" onclick="app.showMaterialsModal()">
                            <i class="fas fa-list"></i>
                            Materials List
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Add Item
                        </button>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Low Stock Items</div>
                            <div class="stat-icon warning">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                        </div>
                        <div class="stat-value">8</div>
                        <div class="stat-change">
                            <span>Items need reordering</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Total Items</div>
                            <div class="stat-icon info">
                                <i class="fas fa-boxes"></i>
                            </div>
                        </div>
                        <div class="stat-value">156</div>
                        <div class="stat-change">
                            <span>In inventory</span>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Current Inventory</h3>
                    </div>
                    <div class="card-body">
                        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                            <i class="fas fa-boxes" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p>Inventory tracking coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadReportsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Reports & Analytics</h1>
                        <p class="page-subtitle">Practice performance and insights</p>
                    </div>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                </div>

                <div class="dashboard-grid">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Revenue Trends</h3>
                        </div>
                        <div class="card-body">
                            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                                <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                <p>Revenue chart coming soon...</p>
                            </div>
                        </div>
                    </div>

                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Patient Demographics</h3>
                        </div>
                        <div class="card-body">
                            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                                <i class="fas fa-chart-pie" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                <p>Demographics chart coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadSettingsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Settings</h1>
                        <p class="page-subtitle">Configure your practice settings</p>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Practice Information</h3>
                        </div>
                        <div class="card-body">
                            <form style="display: grid; gap: 1rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Practice Name</label>
                                    <input type="text" value="Ortho-Denisa Orthodontics" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Doctor Name</label>
                                    <input type="text" value="Dr. Denisa" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Contact Email</label>
                                    <input type="email" value="info@orthodenisa.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                </div>
                                <button type="submit" class="btn btn-primary" style="justify-self: start;">Save Changes</button>
                            </form>
                        </div>
                    </div>

                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Appointment Settings</h3>
                        </div>
                        <div class="card-body">
                            <div style="display: grid; gap: 1rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default Appointment Duration</label>
                                    <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                        <option>30 minutes</option>
                                        <option selected>45 minutes</option>
                                        <option>60 minutes</option>
                                        <option>90 minutes</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Working Hours</label>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                        <input type="time" value="09:00" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                        <input type="time" value="17:00" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">🤖 Auto-Schedule Settings</h3>
                        </div>
                        <div class="card-body">
                            <div style="padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: 1rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <i class="fas fa-magic" style="color: var(--warning-color);"></i>
                                    <strong>Smart Scheduling for Braces Patients</strong>
                                </div>
                                <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">
                                    Automatically schedule follow-up appointments for braces patients with one click!
                                </p>
                            </div>
                            
                            <div style="display: grid; gap: 1rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Auto-Schedule Interval</label>
                                    <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                        <option>1 week</option>
                                        <option selected>2 weeks</option>
                                        <option>3 weeks</option>
                                        <option>4 weeks</option>
                                        <option>6 weeks</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default Auto-Schedule Type</label>
                                    <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                        <option selected>Adjustment</option>
                                        <option>Follow-up</option>
                                        <option>Check-up</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Default Duration</label>
                                    <select style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                        <option>30 minutes</option>
                                        <option selected>45 minutes</option>
                                        <option>60 minutes</option>
                                    </select>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" id="skipWeekends" checked style="margin: 0;">
                                    <label for="skipWeekends" style="margin: 0; font-weight: 500;">Skip weekends (auto-move to Monday)</label>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" id="keepSameTime" checked style="margin: 0;">
                                    <label for="keepSameTime" style="margin: 0; font-weight: 500;">Keep same time as previous appointment</label>
                                </div>
                            </div>
                            
                            <div style="margin-top: 1.5rem; padding: 1rem; background: rgb(34 197 94 / 0.1); border-radius: var(--radius-md); border-left: 4px solid var(--success-color);">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <i class="fas fa-lightbulb" style="color: var(--success-color);"></i>
                                    <strong style="color: var(--success-color);">How it works:</strong>
                                </div>
                                <ul style="margin: 0; padding-left: 1rem; font-size: 0.875rem;">
                                    <li>Only appears for patients with "Braces" treatment</li>
                                    <li>Calculates next appointment based on last appointment date</li>
                                    <li>Automatically skips weekends if enabled</li>
                                    <li>Uses same time slot as previous appointment</li>
                                    <li>Gives you option to modify before confirming</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadHelpPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Help & Support</h1>
                        <p class="page-subtitle">Get help with using Ortho-Denisa</p>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Quick Start Guide</h3>
                        </div>
                        <div class="card-body">
                            <div style="display: grid; gap: 1rem;">
                                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                                    <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
                                    <div>
                                        <div style="font-weight: 500;">Add Your First Patient</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Start by adding patient information</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                                    <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
                                    <div>
                                        <div style="font-weight: 500;">Schedule Appointments</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Book and manage appointments</div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                                    <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
                                    <div>
                                        <div style="font-weight: 500;">Manage Your Team</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Add collaborators and assign roles</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">Contact Support</h3>
                        </div>
                        <div class="card-body">
                            <div style="text-align: center; padding: 2rem;">
                                <i class="fas fa-headset" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                                <h4 style="margin-bottom: 0.5rem;">Need Help?</h4>
                                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Our support team is here to help you</p>
                                <div style="display: grid; gap: 0.5rem;">
                                    <div><strong>Email:</strong> support@orthodenisa.com</div>
                                    <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                                    <div><strong>Hours:</strong> Mon-Fri 9AM-5PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPatientsTable() {
        if (this.patients.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>No Patients Yet</h3>
                    <p>Add your first patient to get started</p>
                    <button class="btn btn-primary" onclick="app.showNewPatientModal()" style="margin-top: 1rem;">
                        <i class="fas fa-plus"></i>
                        Add First Patient
                    </button>
                </div>
            `;
        }

        return `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border-color);">
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Patient</th>
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Age</th>
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Treatment</th>
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Status</th>
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Contact</th>
                            <th style="text-align: left; padding: 1rem; font-weight: 600; background: var(--bg-secondary);">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.patients.map(patient => `
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 1rem;">
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
                                            ${patient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div style="font-weight: 500;">${patient.name}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">ID: ${patient.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 1rem;">${patient.age}</td>
                                <td style="padding: 1rem;">
                                    <span style="padding: 0.25rem 0.75rem; background: var(--primary-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                        ${patient.treatment || 'Not assigned'}
                                    </span>
                                </td>
                                <td style="padding: 1rem;">
                                    <span style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; background: ${patient.status === 'Active' ? 'rgb(34 197 94 / 0.1); color: var(--success-color)' : 'rgb(156 163 175 / 0.1); color: var(--text-muted)'};">
                                        ${patient.status}
                                    </span>
                                </td>
                                <td style="padding: 1rem;">
                                    <div style="font-size: 0.875rem;">
                                        <div>${patient.email || 'No email'}</div>
                                        <div style="color: var(--text-muted);">${patient.phone || 'No phone'}</div>
                                    </div>
                                </td>
                                <td style="padding: 1rem;">
                                    <div style="display: flex; gap: 0.5rem;">
                                        <button class="btn btn-secondary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="View Details" onclick="app.viewPatientDetails(${patient.id})">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-primary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="Edit Patient" onclick="app.editPatient(${patient.id})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-success" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="Schedule Appointment" onclick="app.showAppointmentModalForPatient(${patient.id})">
                                            <i class="fas fa-calendar-plus"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderTodaySchedule() {
        const today = this.getTodayDate();
        const todayAppointments = this.appointments.filter(apt => apt.date === today);
        
        if (todayAppointments.length === 0) {
            return `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <i class="fas fa-calendar-day" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No appointments today</p>
                    <button class="btn btn-primary" onclick="app.showAppointmentModal()" style="margin-top: 1rem;">
                        <i class="fas fa-plus"></i>
                        Schedule First Appointment
                    </button>
                </div>
            `;
        }

        return `
            <div style="display: grid; gap: 1rem;">
                ${todayAppointments.map(apt => {
                    const patient = this.patients.find(p => p.id === apt.patientId) || {};
                    const isCompleted = apt.status === 'Completed';
                    const isRescheduled = apt.status === 'Rescheduled';
                    
                    return `
                    <div class="appointment-card" id="apt-${apt.id}" style="border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); overflow: hidden; transition: all 0.3s ease;">
                        <!-- Main appointment bar - clickable to expand -->
                        <div class="appointment-header" onclick="app.toggleAppointment(${apt.id})" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; cursor: pointer; ${isCompleted ? 'background: rgb(34 197 94 / 0.1);' : isRescheduled ? 'background: rgb(251 191 36 / 0.1);' : ''}">
                            <div style="font-weight: 600; color: var(--primary-color); min-width: 60px;">${apt.time}</div>
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                    <span style="font-weight: 500;">${apt.patientName}</span>
                                    ${isCompleted ? '<span style="padding: 0.125rem 0.5rem; background: var(--success-color); color: white; border-radius: 9999px; font-size: 0.625rem; font-weight: 500;">COMPLETED</span>' : ''}
                                    ${isRescheduled ? '<span style="padding: 0.125rem 0.5rem; background: var(--warning-color); color: white; border-radius: 9999px; font-size: 0.625rem; font-weight: 500;">RESCHEDULED</span>' : ''}
                                </div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">${apt.type}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">${apt.duration} minutes</div>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button class="btn btn-secondary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="Call Patient" onclick="event.stopPropagation(); app.callPatient('${apt.patientName}', '${apt.patientId}')">
                                    <i class="fas fa-phone"></i>
                                </button>
                                <button class="btn btn-success" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="Mark Complete" onclick="event.stopPropagation(); app.markAppointmentComplete(${apt.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-warning" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;" title="Reschedule" onclick="event.stopPropagation(); app.rescheduleAppointment(${apt.id})">
                                    <i class="fas fa-calendar-alt"></i>
                                </button>
                            </div>
                            <div style="color: var(--text-muted); font-size: 1rem;">
                                <i class="fas fa-chevron-down expand-icon" id="icon-${apt.id}" style="transition: transform 0.3s ease;"></i>
                            </div>
                        </div>
                        
                        <!-- Expanded details - hidden by default -->
                        <div class="appointment-details" id="details-${apt.id}" style="display: none; padding: 0 1rem 1rem 1rem; border-top: 1px solid var(--border-color); background: var(--bg-primary);">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem;">
                                <!-- Patient Information -->
                                <div>
                                    <h4 style="margin: 0 0 0.75rem 0; color: var(--primary-color); font-size: 0.875rem; font-weight: 600;">👤 Patient Details</h4>
                                    <div style="display: grid; gap: 0.5rem; font-size: 0.875rem;">
                                        <div><strong>Name:</strong> ${apt.patientName}</div>
                                        <div><strong>Age:</strong> ${patient.age || 'Unknown'} years old</div>
                                        <div><strong>Treatment:</strong> ${patient.treatment || 'Not assigned'}</div>
                                        <div><strong>Email:</strong> ${patient.email || 'Not provided'}</div>
                                        <div><strong>Phone:</strong> ${patient.phone || 'Not provided'}</div>
                                    </div>
                                </div>
                                
                                <!-- Appointment Information -->
                                <div>
                                    <h4 style="margin: 0 0 0.75rem 0; color: var(--primary-color); font-size: 0.875rem; font-weight: 600;">📅 Appointment Details</h4>
                                    <div style="display: grid; gap: 0.5rem; font-size: 0.875rem;">
                                        <div><strong>Date:</strong> ${apt.date}</div>
                                        <div><strong>Time:</strong> ${apt.time}</div>
                                        <div><strong>Type:</strong> ${apt.type}</div>
                                        <div><strong>Duration:</strong> ${apt.duration} minutes</div>
                                        <div><strong>Status:</strong> <span style="color: ${isCompleted ? 'var(--success-color)' : isRescheduled ? 'var(--warning-color)' : 'var(--primary-color)'}; font-weight: 500;">${apt.status}</span></div>
                                        ${apt.originalDate ? `<div><strong>Original Date:</strong> ${apt.originalDate}</div>` : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Notes Section -->
                            ${apt.notes ? `
                                <div style="margin-top: 1rem;">
                                    <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color); font-size: 0.875rem; font-weight: 600;">📝 Notes</h4>
                                    <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.875rem; font-style: italic;">
                                        "${apt.notes}"
                                    </div>
                                </div>
                            ` : ''}
                            
                            <!-- Completion Details -->
                            ${isCompleted ? `
                                <div style="margin-top: 1rem; padding: 0.75rem; background: rgb(34 197 94 / 0.1); border-radius: var(--radius-sm); border-left: 4px solid var(--success-color);">
                                    <h4 style="margin: 0 0 0.5rem 0; color: var(--success-color); font-size: 0.875rem; font-weight: 600;">✅ Completion Details</h4>
                                    <div style="font-size: 0.875rem;">
                                        <div><strong>Completed:</strong> ${new Date(apt.completedAt).toLocaleString()}</div>
                                        <div><strong>Completed by:</strong> ${apt.completedBy}</div>
                                        ${apt.completionNotes ? `<div><strong>Notes:</strong> ${apt.completionNotes}</div>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <!-- Action Buttons -->
                            <div style="display: flex; gap: 0.75rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                                <button class="btn btn-secondary" onclick="app.callPatient('${apt.patientName}', '${apt.patientId}')" style="flex: 1;">
                                    <i class="fas fa-phone"></i>
                                    Call Patient
                                </button>
                                ${!isCompleted ? `
                                    <button class="btn btn-success" onclick="app.markAppointmentComplete(${apt.id})" style="flex: 1;">
                                        <i class="fas fa-check"></i>
                                        Mark Complete
                                    </button>
                                ` : ''}
                                ${!isCompleted ? `
                                    <button class="btn btn-warning" onclick="app.rescheduleAppointment(${apt.id})" style="flex: 1;">
                                        <i class="fas fa-calendar-alt"></i>
                                        Reschedule
                                    </button>
                                ` : ''}
                                ${patient.treatment === 'Braces' && !isCompleted ? `
                                    <button class="btn btn-info" onclick="app.autoScheduleNextAppointment(${apt.patientId})" style="flex: 1;">
                                        <i class="fas fa-magic"></i>
                                        Auto Schedule Next
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderTreatmentCards() {
        const treatments = [
            { name: 'Braces', count: 45, icon: 'fas fa-teeth' },
            { name: 'Invisalign', count: 32, icon: 'fas fa-eye-slash' },
            { name: 'Retainers', count: 28, icon: 'fas fa-shield-alt' }
        ];

        return treatments.map(treatment => `
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">${treatment.name}</div>
                    <div class="stat-icon primary">
                        <i class="${treatment.icon}"></i>
                    </div>
                </div>
                <div class="stat-value">${treatment.count}</div>
            </div>
        `).join('');
    }

    loadSampleData() {
        this.patients = [
            { id: 1, name: 'John Smith', age: 16, email: 'john@email.com', treatment: 'Braces', status: 'Active', nextAppt: '2024-01-20' },
            { id: 2, name: 'Sarah Johnson', age: 14, email: 'sarah@email.com', treatment: 'Invisalign', status: 'Active', nextAppt: '2024-01-22' }
        ];

        this.appointments = [
            { 
                id: 1, 
                patientId: 1,
                patientName: 'John Smith', 
                date: this.getTodayDate(), 
                time: '09:00', 
                type: 'Adjustment',
                duration: '45',
                status: 'Scheduled',
                notes: 'Regular adjustment appointment'
            },
            { 
                id: 2, 
                patientId: 2,
                patientName: 'Sarah Johnson', 
                date: this.getTodayDate(), 
                time: '10:30', 
                type: 'Consultation',
                duration: '60',
                status: 'Scheduled',
                notes: 'Initial consultation for Invisalign'
            },
            { 
                id: 3, 
                patientId: 1,
                patientName: 'John Smith', 
                date: this.getTodayDate(), 
                time: '14:00', 
                type: 'Follow-up',
                duration: '30',
                status: 'Scheduled',
                notes: 'Check progress after adjustment'
            }
        ];
    }

    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    updateDashboardStats() {
        // Update stats dynamically
        console.log('📊 Dashboard stats updated');
    }

    loadRecentActivity() {
        const activityContainer = document.getElementById('recentActivity');
        if (activityContainer) {
            setTimeout(() => {
                activityContainer.innerHTML = `
                    <div style="display: grid; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                            <div style="width: 40px; height: 40px; background: var(--success-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div>
                                <div style="font-weight: 500;">New patient registered</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">Sarah Johnson - 2 hours ago</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                            <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div>
                                <div style="font-weight: 500;">Appointment completed</div>
                                <div style="font-size: 0.875rem; color: var(--text-secondary);">John Smith - 4 hours ago</div>
                            </div>
                        </div>
                    </div>
                `;
            }, 1000);
        }
    }

    loadCollaboratorsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Team Collaborators</h1>
                        <p class="page-subtitle">Manage your practice team and permissions</p>
                    </div>
                    <button class="btn btn-primary" onclick="app.showAddCollaboratorModal()">
                        <i class="fas fa-user-plus"></i>
                        Add Team Member
                    </button>
                </div>

                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Active Team Members</div>
                            <div class="stat-icon primary">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <div class="stat-value">5</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+1 this month</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-title">Roles Assigned</div>
                            <div class="stat-icon success">
                                <i class="fas fa-user-tag"></i>
                            </div>
                        </div>
                        <div class="stat-value">4</div>
                        <div class="stat-change">
                            <span>Different roles</span>
                        </div>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">Team Members</h3>
                    </div>
                    <div class="card-body">
                        ${this.renderCollaboratorsTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderCollaboratorsTable() {
        const collaborators = [
            { name: 'Dr. Denisa', role: 'Orthodontist', email: 'denisa@orthodenisa.com', status: 'Active', avatar: 'DR' },
            { name: 'Sarah Martinez', role: 'Dental Assistant', email: 'sarah@orthodenisa.com', status: 'Active', avatar: 'SM' },
            { name: 'Mike Johnson', role: 'Office Manager', email: 'mike@orthodenisa.com', status: 'Active', avatar: 'MJ' },
            { name: 'Lisa Chen', role: 'Hygienist', email: 'lisa@orthodenisa.com', status: 'Active', avatar: 'LC' },
            { name: 'Tom Wilson', role: 'Receptionist', email: 'tom@orthodenisa.com', status: 'Inactive', avatar: 'TW' }
        ];

        return `
            <div style="display: grid; gap: 1rem;">
                ${collaborators.map(person => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary);">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <div style="width: 50px; height: 50px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                                ${person.avatar}
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 0.25rem;">${person.name}</div>
                                <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.25rem;">${person.role}</div>
                                <div style="color: var(--text-muted); font-size: 0.75rem;">${person.email}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; background: ${person.status === 'Active' ? 'rgb(34 197 94 / 0.1); color: var(--success-color)' : 'rgb(156 163 175 / 0.1); color: var(--text-muted)'};">
                                ${person.status}
                            </span>
                            <div style="display: flex; gap: 0.5rem;">
                                <button class="btn btn-secondary" style="padding: 0.375rem 0.75rem; font-size: 0.75rem;">Edit</button>
                                <button class="btn btn-danger" style="padding: 0.375rem 0.75rem; font-size: 0.75rem; background: var(--danger-color); color: white;">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showNewPatientModal() {
        document.getElementById('patientModal').style.display = 'block';
        this.setupPatientForm();
    }

    closePatientModal() {
        document.getElementById('patientModal').style.display = 'none';
        document.getElementById('patientForm').reset();
    }

    setupPatientForm() {
        const form = document.getElementById('patientForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewPatient();
        };
    }

    addNewPatient() {
        // Validate required fields
        const name = document.getElementById('patientName').value.trim();
        const age = document.getElementById('patientAge').value;
        
        if (!name) {
            alert('❌ Patient name is required!');
            return;
        }
        
        if (!age || age < 1 || age > 100) {
            alert('❌ Please enter a valid age (1-100)!');
            return;
        }

        const formData = {
            id: Date.now(), // Use timestamp for unique ID
            name: name,
            age: parseInt(age),
            gender: document.getElementById('patientGender').value,
            email: document.getElementById('patientEmail').value.trim(),
            phone: document.getElementById('patientPhone').value.trim(),
            treatment: document.getElementById('patientTreatment').value,
            notes: document.getElementById('patientNotes').value.trim(),
            status: 'Active',
            nextAppt: 'Not scheduled',
            dateAdded: new Date().toISOString().split('T')[0]
        };

        // Add to patients array
        this.patients.push(formData);
        console.log('👤 New patient added:', formData);
        console.log('📊 Total patients:', this.patients.length);
        
        // Close modal and reset form
        this.closePatientModal();
        
        // Show success message
        alert(`✅ Patient "${formData.name}" added successfully!\n\nPatient ID: ${formData.id}\nTotal patients: ${this.patients.length}`);
        
        // Refresh the patients page to show the new patient
        if (this.currentPage === 'patients') {
            this.loadPatientsPage();
        }
        
        // Update dashboard stats if on dashboard
        if (this.currentPage === 'dashboard') {
            this.loadDashboard();
        }
    }

    showAppointmentModal() {
        document.getElementById('appointmentModal').style.display = 'block';
        this.setupAppointmentForm();
        this.populatePatientSelect();
    }

    closeAppointmentModal() {
        document.getElementById('appointmentModal').style.display = 'none';
        document.getElementById('appointmentForm').reset();
    }

    setupAppointmentForm() {
        const form = document.getElementById('appointmentForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewAppointment();
        };
        
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('appointmentDate').value = today;
    }

    populatePatientSelect() {
        const select = document.getElementById('appointmentPatient');
        select.innerHTML = '<option value="">Select Patient</option>';
        
        this.patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = patient.name;
            select.appendChild(option);
        });
    }

    addNewAppointment() {
        const patientId = parseInt(document.getElementById('appointmentPatient').value);
        const patient = this.patients.find(p => p.id === patientId);
        
        const appointmentData = {
            id: this.appointments.length + 1,
            patientId: patientId,
            patientName: patient ? patient.name : 'Unknown',
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            type: document.getElementById('appointmentType').value,
            duration: document.getElementById('appointmentDuration').value,
            notes: document.getElementById('appointmentNotes').value,
            status: 'Scheduled'
        };

        this.appointments.push(appointmentData);
        this.closeAppointmentModal();
        
        // Show success message
        alert(`✅ Appointment scheduled for ${appointmentData.patientName} on ${appointmentData.date} at ${appointmentData.time}!`);
        
        // Refresh the page if we're on appointments page
        if (this.currentPage === 'appointments') {
            this.loadAppointmentsPage();
        }
    }

    viewPatientDetails(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            alert('❌ Patient not found!');
            return;
        }

        const patientAppointments = this.appointments.filter(apt => apt.patientId === patientId);
        const appointmentCount = patientAppointments.length;
        const nextAppointment = patientAppointments.find(apt => new Date(apt.date) >= new Date());
        const completedAppointments = patientAppointments.filter(apt => apt.status === 'Completed').length;

        // Show the view modal
        document.getElementById('viewPatientModal').style.display = 'block';
        
        // Populate the modal content
        const content = document.getElementById('viewPatientContent');
        content.innerHTML = `
            <div style="display: grid; gap: 1.5rem;">
                <!-- Patient Header -->
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                    <div style="width: 80px; height: 80px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.5rem;">
                        ${patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">${patient.name}</h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <span style="padding: 0.25rem 0.75rem; background: var(--primary-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                ID: ${patient.id}
                            </span>
                            <span style="padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; background: ${patient.status === 'Active' ? 'rgb(34 197 94 / 0.1); color: var(--success-color)' : 'rgb(156 163 175 / 0.1); color: var(--text-muted)'};">
                                ${patient.status}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Personal Information -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">👤 Personal Info</h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div><strong>Age:</strong> ${patient.age} years old</div>
                            <div><strong>Gender:</strong> ${patient.gender || 'Not specified'}</div>
                            <div><strong>Date Added:</strong> ${patient.dateAdded || 'Unknown'}</div>
                            ${patient.lastModified ? `<div><strong>Last Modified:</strong> ${patient.lastModified}</div>` : ''}
                        </div>
                    </div>

                    <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">📞 Contact Info</h4>
                        <div style="display: grid; gap: 0.75rem;">
                            <div><strong>Email:</strong> ${patient.email || 'Not provided'}</div>
                            <div><strong>Phone:</strong> ${patient.phone || 'Not provided'}</div>
                        </div>
                    </div>
                </div>

                <!-- Treatment Information -->
                <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">🦷 Treatment Info</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div><strong>Current Treatment:</strong> ${patient.treatment || 'Not assigned'}</div>
                        <div><strong>Next Appointment:</strong> ${nextAppointment ? `${nextAppointment.date} at ${nextAppointment.time}` : 'None scheduled'}</div>
                    </div>
                </div>

                <!-- Appointment Statistics -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--primary-color);">${appointmentCount}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Total Appointments</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--success-color);">${completedAppointments}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Completed</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--warning-color);">${appointmentCount - completedAppointments}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">Pending</div>
                    </div>
                </div>

                <!-- Recent Appointments -->
                ${appointmentCount > 0 ? `
                    <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">📅 Recent Appointments</h4>
                        <div style="display: grid; gap: 0.5rem; max-height: 200px; overflow-y: auto;">
                            ${patientAppointments.slice(-5).reverse().map(apt => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius-sm);">
                                    <div>
                                        <div style="font-weight: 500;">${apt.date} at ${apt.time}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${apt.type} - ${apt.duration} minutes</div>
                                    </div>
                                    <span style="padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; background: ${apt.status === 'Completed' ? 'rgb(34 197 94 / 0.1); color: var(--success-color)' : 'rgb(59 130 246 / 0.1); color: var(--primary-color)'};">
                                        ${apt.status}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Notes -->
                ${patient.notes ? `
                    <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">📝 Notes</h4>
                        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-sm); font-style: italic;">
                            "${patient.notes}"
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // Set up action buttons
        document.getElementById('editFromViewBtn').onclick = () => {
            this.closeViewPatientModal();
            this.editPatient(patientId);
        };

        document.getElementById('scheduleFromViewBtn').onclick = () => {
            this.closeViewPatientModal();
            this.showAppointmentModalForPatient(patientId);
        };

        // Add auto-schedule button for braces patients
        if (patient.treatment === 'Braces') {
            const autoScheduleBtn = document.createElement('button');
            autoScheduleBtn.className = 'btn btn-warning';
            autoScheduleBtn.style.marginLeft = '0.5rem';
            autoScheduleBtn.innerHTML = '<i class="fas fa-magic"></i> Auto Schedule (+2 weeks)';
            autoScheduleBtn.onclick = () => {
                this.closeViewPatientModal();
                this.autoScheduleNextAppointment(patientId);
            };
            
            const buttonContainer = document.querySelector('#viewPatientModal .btn-success').parentElement;
            buttonContainer.appendChild(autoScheduleBtn);
        }
    }

    closeViewPatientModal() {
        document.getElementById('viewPatientModal').style.display = 'none';
    }

    editPatient(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            alert('❌ Patient not found!');
            return;
        }

        // Show the patient modal with pre-filled data
        document.getElementById('patientModal').style.display = 'block';
        
        // Pre-fill the form with existing patient data
        document.getElementById('patientName').value = patient.name;
        document.getElementById('patientAge').value = patient.age;
        document.getElementById('patientGender').value = patient.gender || '';
        document.getElementById('patientEmail').value = patient.email || '';
        document.getElementById('patientPhone').value = patient.phone || '';
        document.getElementById('patientTreatment').value = patient.treatment || '';
        document.getElementById('patientNotes').value = patient.notes || '';

        // Change the modal title and button text
        const modalTitle = document.querySelector('#patientModal h2');
        const submitButton = document.querySelector('#patientModal button[type="submit"]');
        modalTitle.textContent = '✏️ Edit Patient';
        submitButton.innerHTML = '<i class="fas fa-save"></i> Update Patient';

        // Set up the form for editing
        const form = document.getElementById('patientForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.updatePatient(patientId);
        };
    }

    updatePatient(patientId) {
        const patientIndex = this.patients.findIndex(p => p.id === patientId);
        if (patientIndex === -1) {
            alert('❌ Patient not found!');
            return;
        }

        // Validate required fields
        const name = document.getElementById('patientName').value.trim();
        const age = document.getElementById('patientAge').value;
        
        if (!name) {
            alert('❌ Patient name is required!');
            return;
        }
        
        if (!age || age < 1 || age > 100) {
            alert('❌ Please enter a valid age (1-100)!');
            return;
        }

        // Update patient data
        this.patients[patientIndex] = {
            ...this.patients[patientIndex], // Keep existing data like id, dateAdded
            name: name,
            age: parseInt(age),
            gender: document.getElementById('patientGender').value,
            email: document.getElementById('patientEmail').value.trim(),
            phone: document.getElementById('patientPhone').value.trim(),
            treatment: document.getElementById('patientTreatment').value,
            notes: document.getElementById('patientNotes').value.trim(),
            lastModified: new Date().toISOString().split('T')[0]
        };

        console.log('✏️ Patient updated:', this.patients[patientIndex]);

        // Close modal and reset
        this.closePatientModal();
        
        // Show success message
        alert(`✅ Patient "${name}" updated successfully!`);
        
        // Refresh the patients page
        if (this.currentPage === 'patients') {
            this.loadPatientsPage();
        }
    }

    showAppointmentModalForPatient(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            alert('❌ Patient not found!');
            return;
        }

        // Show appointment modal
        this.showAppointmentModal();
        
        // Pre-select the patient
        setTimeout(() => {
            const patientSelect = document.getElementById('appointmentPatient');
            if (patientSelect) {
                patientSelect.value = patientId;
            }
        }, 100);
    }

    closePatientModal() {
        document.getElementById('patientModal').style.display = 'none';
        document.getElementById('patientForm').reset();
        
        // Reset modal title and button text to default
        const modalTitle = document.querySelector('#patientModal h2');
        const submitButton = document.querySelector('#patientModal button[type="submit"]');
        modalTitle.textContent = '👤 Add New Patient';
        submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Patient';
        
        // Reset form handler to add new patient
        const form = document.getElementById('patientForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewPatient();
        };
    }

    autoScheduleNextAppointment(patientId) {
        const patient = this.patients.find(p => p.id === patientId);
        if (!patient) {
            alert('❌ Patient not found!');
            return;
        }

        // Get the most recent appointment for this patient
        const patientAppointments = this.appointments.filter(apt => apt.patientId === patientId);
        const lastAppointment = patientAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        let baseDate;
        let suggestedTime = '10:00'; // Default time

        if (lastAppointment) {
            // Calculate 2 weeks from the last appointment
            baseDate = new Date(lastAppointment.date);
            suggestedTime = lastAppointment.time; // Keep same time as last appointment
        } else {
            // If no previous appointments, start from today
            baseDate = new Date();
        }

        // Add 2 weeks (14 days)
        baseDate.setDate(baseDate.getDate() + 14);
        
        // Skip weekends - if it falls on Saturday, move to Monday
        if (baseDate.getDay() === 6) { // Saturday
            baseDate.setDate(baseDate.getDate() + 2);
        } else if (baseDate.getDay() === 0) { // Sunday
            baseDate.setDate(baseDate.getDate() + 1);
        }

        const suggestedDate = baseDate.toISOString().split('T')[0];

        // Get auto-schedule settings
        const settings = this.getAutoScheduleSettings();
        
        // Create the appointment automatically
        const appointmentData = {
            id: Date.now(),
            patientId: patientId,
            patientName: patient.name,
            date: suggestedDate,
            time: suggestedTime,
            type: settings.defaultType,
            duration: settings.defaultDuration,
            notes: `Auto-scheduled ${settings.interval} follow-up appointment`,
            status: 'Scheduled'
        };

        this.appointments.push(appointmentData);

        // Show confirmation with option to modify
        const confirmMessage = `✅ Auto-Scheduled Appointment!\n\n` +
                              `Patient: ${patient.name}\n` +
                              `Date: ${suggestedDate}\n` +
                              `Time: ${suggestedTime}\n` +
                              `Type: ${settings.defaultType}\n` +
                              `Duration: ${settings.defaultDuration} minutes\n\n` +
                              `The appointment has been automatically scheduled for 2 weeks from the last appointment.\n\n` +
                              `Would you like to modify this appointment?`;

        if (confirm(confirmMessage)) {
            // Open the appointment modal for editing
            this.editAppointment(appointmentData.id);
        } else {
            // Just show success and refresh
            console.log('🤖 Auto-scheduled appointment:', appointmentData);
            
            // Refresh current page
            if (this.currentPage === 'appointments') {
                this.loadAppointmentsPage();
            } else if (this.currentPage === 'patients') {
                this.loadPatientsPage();
            }
        }
    }

    getAutoScheduleSettings() {
        // Default auto-schedule settings - can be customized in Settings page
        return {
            interval: '2 weeks',
            defaultType: 'Adjustment',
            defaultDuration: '45',
            skipWeekends: true,
            preferredTimes: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
        };
    }

    editAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) {
            alert('❌ Appointment not found!');
            return;
        }

        // Show appointment modal with pre-filled data
        document.getElementById('appointmentModal').style.display = 'block';
        this.setupAppointmentForm();
        this.populatePatientSelect();

        // Pre-fill the form
        setTimeout(() => {
            document.getElementById('appointmentPatient').value = appointment.patientId;
            document.getElementById('appointmentDate').value = appointment.date;
            document.getElementById('appointmentTime').value = appointment.time;
            document.getElementById('appointmentType').value = appointment.type;
            document.getElementById('appointmentDuration').value = appointment.duration;
            document.getElementById('appointmentNotes').value = appointment.notes;
        }, 100);

        // Change form handler to update instead of create
        const form = document.getElementById('appointmentForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.updateAppointment(appointmentId);
        };

        // Update modal title
        const modalTitle = document.querySelector('#appointmentModal h2');
        modalTitle.textContent = '✏️ Edit Appointment';
    }

    updateAppointment(appointmentId) {
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === appointmentId);
        if (appointmentIndex === -1) {
            alert('❌ Appointment not found!');
            return;
        }

        const patientId = parseInt(document.getElementById('appointmentPatient').value);
        const patient = this.patients.find(p => p.id === patientId);

        // Update appointment data
        this.appointments[appointmentIndex] = {
            ...this.appointments[appointmentIndex],
            patientId: patientId,
            patientName: patient ? patient.name : 'Unknown',
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            type: document.getElementById('appointmentType').value,
            duration: document.getElementById('appointmentDuration').value,
            notes: document.getElementById('appointmentNotes').value,
            lastModified: new Date().toISOString().split('T')[0]
        };

        this.closeAppointmentModal();
        
        // Show success message
        alert(`✅ Appointment updated successfully!`);
        
        // Refresh the page
        if (this.currentPage === 'appointments') {
            this.loadAppointmentsPage();
        }
    }

    closeAppointmentModal() {
        document.getElementById('appointmentModal').style.display = 'none';
        document.getElementById('appointmentForm').reset();
        
        // Reset modal title
        const modalTitle = document.querySelector('#appointmentModal h2');
        modalTitle.textContent = '📅 Schedule Appointment';
        
        // Reset form handler
        const form = document.getElementById('appointmentForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewAppointment();
        };
    }

    callPatient(patientName, patientId) {
        const patient = this.patients.find(p => p.id == patientId);
        if (!patient) {
            alert('❌ Patient not found!');
            return;
        }

        const phoneNumber = patient.phone || 'No phone number on file';
        const callOptions = `📞 Call ${patientName}\n\n` +
                           `Phone: ${phoneNumber}\n\n` +
                           `Choose an option:`;

        if (phoneNumber === 'No phone number on file') {
            alert(`❌ Cannot call ${patientName}\n\nNo phone number on file. Please update patient contact information.`);
            return;
        }

        // Simulate call options
        const action = confirm(`${callOptions}\n\nClick OK to simulate call, Cancel to update contact info`);
        
        if (action) {
            // Simulate making the call
            alert(`📞 Calling ${patientName}...\n\n` +
                  `Phone: ${phoneNumber}\n\n` +
                  `✅ Call initiated!\n\n` +
                  `(In a real system, this would integrate with your phone system or open your default phone app)`);
            
            // Log the call activity
            console.log(`📞 Call initiated to ${patientName} at ${phoneNumber}`);
        } else {
            // Open patient edit modal to update contact info
            this.editPatient(patientId);
        }
    }

    markAppointmentComplete(appointmentId) {
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === appointmentId);
        if (appointmentIndex === -1) {
            alert('❌ Appointment not found!');
            return;
        }

        const appointment = this.appointments[appointmentIndex];
        
        if (appointment.status === 'Completed') {
            alert(`✅ Appointment already completed!\n\n${appointment.patientName} - ${appointment.date} at ${appointment.time}`);
            return;
        }

        // Show completion confirmation with options
        const completionNotes = prompt(`✅ Mark appointment as completed?\n\n` +
                                     `Patient: ${appointment.patientName}\n` +
                                     `Date: ${appointment.date} at ${appointment.time}\n` +
                                     `Type: ${appointment.type}\n\n` +
                                     `Add completion notes (optional):`);

        if (completionNotes !== null) { // User didn't cancel
            // Mark as completed
            this.appointments[appointmentIndex] = {
                ...appointment,
                status: 'Completed',
                completedAt: new Date().toISOString(),
                completionNotes: completionNotes || 'Appointment completed successfully',
                completedBy: 'Dr. Denisa'
            };

            // Show success message
            alert(`✅ Appointment marked as completed!\n\n` +
                  `Patient: ${appointment.patientName}\n` +
                  `Completed at: ${new Date().toLocaleString()}\n` +
                  `Notes: ${completionNotes || 'No additional notes'}`);

            // Auto-schedule next appointment for braces patients
            const patient = this.patients.find(p => p.id === appointment.patientId);
            if (patient && patient.treatment === 'Braces') {
                const autoSchedule = confirm(`🤖 Auto-schedule next appointment?\n\n` +
                                           `${patient.name} has braces treatment.\n` +
                                           `Would you like to automatically schedule the next appointment in 2 weeks?`);
                
                if (autoSchedule) {
                    setTimeout(() => {
                        this.autoScheduleNextAppointment(appointment.patientId);
                    }, 500);
                }
            }

            // Refresh the appointments page
            if (this.currentPage === 'appointments') {
                this.loadAppointmentsPage();
            }

            console.log('✅ Appointment completed:', this.appointments[appointmentIndex]);
        }
    }

    rescheduleAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id === appointmentId);
        if (!appointment) {
            alert('❌ Appointment not found!');
            return;
        }

        if (appointment.status === 'Completed') {
            alert(`❌ Cannot reschedule completed appointment!\n\n${appointment.patientName} - ${appointment.date} at ${appointment.time}`);
            return;
        }

        // Show reschedule options
        const rescheduleOptions = `📅 Reschedule Appointment\n\n` +
                                `Current: ${appointment.patientName}\n` +
                                `Date: ${appointment.date} at ${appointment.time}\n` +
                                `Type: ${appointment.type}\n\n` +
                                `Choose reschedule option:`;

        const quickReschedule = confirm(`${rescheduleOptions}\n\nOK = Quick reschedule (+1 day)\nCancel = Custom reschedule`);

        if (quickReschedule) {
            // Quick reschedule - add 1 day
            const currentDate = new Date(appointment.date);
            currentDate.setDate(currentDate.getDate() + 1);
            
            // Skip weekends
            if (currentDate.getDay() === 6) { // Saturday
                currentDate.setDate(currentDate.getDate() + 2);
            } else if (currentDate.getDay() === 0) { // Sunday
                currentDate.setDate(currentDate.getDate() + 1);
            }

            const newDate = currentDate.toISOString().split('T')[0];
            
            // Update appointment
            const appointmentIndex = this.appointments.findIndex(apt => apt.id === appointmentId);
            this.appointments[appointmentIndex] = {
                ...appointment,
                date: newDate,
                status: 'Rescheduled',
                rescheduledAt: new Date().toISOString(),
                rescheduledBy: 'Dr. Denisa',
                originalDate: appointment.date
            };

            alert(`✅ Appointment rescheduled!\n\n` +
                  `Patient: ${appointment.patientName}\n` +
                  `From: ${appointment.date} at ${appointment.time}\n` +
                  `To: ${newDate} at ${appointment.time}\n\n` +
                  `Reason: Quick reschedule (+1 day)`);

            // Refresh the appointments page
            if (this.currentPage === 'appointments') {
                this.loadAppointmentsPage();
            }
        } else {
            // Custom reschedule - open edit appointment modal
            this.editAppointment(appointmentId);
        }
    }

    toggleAppointment(appointmentId) {
        const detailsElement = document.getElementById(`details-${appointmentId}`);
        const iconElement = document.getElementById(`icon-${appointmentId}`);
        
        if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
            // Expand
            detailsElement.style.display = 'block';
            iconElement.style.transform = 'rotate(180deg)';
            
            // Add expanded styling
            const cardElement = document.getElementById(`apt-${appointmentId}`);
            cardElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            cardElement.style.transform = 'translateY(-2px)';
        } else {
            // Collapse
            detailsElement.style.display = 'none';
            iconElement.style.transform = 'rotate(0deg)';
            
            // Remove expanded styling
            const cardElement = document.getElementById(`apt-${appointmentId}`);
            cardElement.style.boxShadow = 'none';
            cardElement.style.transform = 'translateY(0)';
        }
    }

    // Treatment Gallery Functions
    loadSampleTreatmentPhotos() {
        return [
            {
                id: 1,
                patientId: 1,
                patientName: 'John Smith',
                treatmentType: 'braces',
                stage: 'before',
                date: '2024-01-15',
                title: 'Initial Photos - Before Treatment',
                description: 'Pre-treatment dental condition assessment',
                imageUrl: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Before+Treatment',
                tags: ['initial', 'assessment', 'braces'],
                notes: 'Significant crowding in upper arch, mild spacing in lower arch'
            },
            {
                id: 2,
                patientId: 1,
                patientName: 'John Smith',
                treatmentType: 'braces',
                stage: 'progress',
                date: '2024-02-15',
                title: '1 Month Progress Check',
                description: 'Initial alignment progress after bracket placement',
                imageUrl: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=1+Month+Progress',
                tags: ['progress', '1month', 'alignment'],
                notes: 'Good initial movement, patient compliance excellent'
            },
            {
                id: 3,
                patientId: 2,
                patientName: 'Sarah Johnson',
                treatmentType: 'invisalign',
                stage: 'before',
                date: '2024-01-20',
                title: 'Invisalign - Initial Scan',
                description: 'Digital scan for Invisalign treatment planning',
                imageUrl: 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Invisalign+Scan',
                tags: ['invisalign', 'scan', 'planning'],
                notes: 'Minor crowding, excellent candidate for Invisalign'
            },
            {
                id: 4,
                patientId: 1,
                patientName: 'John Smith',
                treatmentType: 'braces',
                stage: 'adjustment',
                date: '2024-03-15',
                title: 'Post-Adjustment Photos',
                description: 'Progress after wire change and adjustment',
                imageUrl: 'https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Post+Adjustment',
                tags: ['adjustment', 'wire-change', 'progress'],
                notes: 'Increased arch wire gauge, excellent progress'
            },
            {
                id: 5,
                patientId: 2,
                patientName: 'Sarah Johnson',
                treatmentType: 'invisalign',
                stage: 'progress',
                date: '2024-02-20',
                title: 'Invisalign Tray 5 Progress',
                description: 'Progress check at tray 5 of 20',
                imageUrl: 'https://via.placeholder.com/400x300/0891B2/FFFFFF?text=Tray+5+Progress',
                tags: ['invisalign', 'tray5', 'progress'],
                notes: 'Tracking well, patient compliance good'
            }
        ];
    }

    getTreatmentPhotoCount(treatmentType) {
        if (!this.treatmentPhotos) return 0;
        if (treatmentType === 'all') return this.treatmentPhotos.length;
        return this.treatmentPhotos.filter(photo => photo.treatmentType === treatmentType).length;
    }

    switchTreatmentTab(tab) {
        this.currentTreatmentTab = tab;
        this.loadTreatmentsPage();
    }

    toggleViewMode() {
        this.currentViewMode = this.currentViewMode === 'grid' ? 'list' : 'grid';
        document.getElementById('photoGallery').innerHTML = this.renderTreatmentGallery();
        document.getElementById('viewModeIcon').className = `fas ${this.currentViewMode === 'grid' ? 'fa-th' : 'fa-list'}`;
    }

    filterTreatmentPhotos() {
        document.getElementById('photoGallery').innerHTML = this.renderTreatmentGallery();
    }

    renderTreatmentGallery() {
        let photos = [...this.treatmentPhotos];
        
        // Filter by treatment type
        if (this.currentTreatmentTab !== 'all') {
            photos = photos.filter(photo => photo.treatmentType === this.currentTreatmentTab);
        }
        
        // Filter by patient
        const patientFilter = document.getElementById('patientFilter')?.value;
        if (patientFilter) {
            photos = photos.filter(photo => photo.patientId == patientFilter);
        }
        
        // Filter by stage
        const stageFilter = document.getElementById('stageFilter')?.value;
        if (stageFilter) {
            photos = photos.filter(photo => photo.stage === stageFilter);
        }
        
        // Sort photos
        const sortOrder = document.getElementById('sortOrder')?.value || 'newest';
        switch (sortOrder) {
            case 'newest':
                photos.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                photos.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'patient':
                photos.sort((a, b) => a.patientName.localeCompare(b.patientName));
                break;
            case 'stage':
                const stageOrder = { 'before': 1, 'progress': 2, 'adjustment': 3, 'completion': 4 };
                photos.sort((a, b) => stageOrder[a.stage] - stageOrder[b.stage]);
                break;
        }
        
        if (photos.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>No Photos Found</h3>
                    <p>No treatment photos match your current filters</p>
                    <button class="btn btn-primary" onclick="app.showUploadModal()" style="margin-top: 1rem;">
                        <i class="fas fa-camera"></i>
                        Upload First Photo
                    </button>
                </div>
            `;
        }
        
        if (this.currentViewMode === 'grid') {
            return this.renderGridView(photos);
        } else {
            return this.renderListView(photos);
        }
    }

    renderGridView(photos) {
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                ${photos.map(photo => `
                    <div class="photo-card" onclick="app.viewPhotoDetails(${photo.id})" style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; cursor: pointer; transition: all 0.3s ease; background: var(--bg-secondary);">
                        <div style="position: relative; height: 200px; background: var(--bg-primary); display: flex; align-items: center; justify-content: center;">
                            <img src="${photo.imageUrl}" alt="${photo.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; flex-direction: column; align-items: center; color: var(--text-muted);">
                                <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                                <span>Photo Preview</span>
                            </div>
                            <div style="position: absolute; top: 0.5rem; right: 0.5rem; display: flex; gap: 0.25rem;">
                                <span style="padding: 0.25rem 0.5rem; background: var(--primary-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                    ${this.getStageLabel(photo.stage)}
                                </span>
                                <span style="padding: 0.25rem 0.5rem; background: var(--success-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                    ${this.getTreatmentLabel(photo.treatmentType)}
                                </span>
                            </div>
                        </div>
                        <div style="padding: 1rem;">
                            <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">${photo.title}</h4>
                            <p style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4;">${photo.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
                                <span><i class="fas fa-user"></i> ${photo.patientName}</span>
                                <span><i class="fas fa-calendar"></i> ${new Date(photo.date).toLocaleDateString()}</span>
                            </div>
                            ${photo.tags ? `
                                <div style="margin-top: 0.75rem; display: flex; gap: 0.25rem; flex-wrap: wrap;">
                                    ${photo.tags.map(tag => `
                                        <span style="padding: 0.125rem 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 9999px; font-size: 0.625rem; color: var(--text-muted);">
                                            ${tag}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderListView(photos) {
        return `
            <div style="display: grid; gap: 1rem;">
                ${photos.map(photo => `
                    <div class="photo-card" onclick="app.viewPhotoDetails(${photo.id})" style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary); cursor: pointer; transition: all 0.3s ease;">
                        <div style="width: 120px; height: 80px; background: var(--bg-primary); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <img src="${photo.imageUrl}" alt="${photo.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; flex-direction: column; align-items: center; color: var(--text-muted);">
                                <i class="fas fa-image" style="font-size: 1.5rem;"></i>
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                                <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">${photo.title}</h4>
                                <div style="display: flex; gap: 0.25rem;">
                                    <span style="padding: 0.25rem 0.5rem; background: var(--primary-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                        ${this.getStageLabel(photo.stage)}
                                    </span>
                                    <span style="padding: 0.25rem 0.5rem; background: var(--success-color); color: white; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;">
                                        ${this.getTreatmentLabel(photo.treatmentType)}
                                    </span>
                                </div>
                            </div>
                            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.4;">${photo.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
                                <span><i class="fas fa-user"></i> ${photo.patientName}</span>
                                <span><i class="fas fa-calendar"></i> ${new Date(photo.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getStageLabel(stage) {
        const labels = {
            'before': 'Before',
            'progress': 'Progress',
            'adjustment': 'Adjustment',
            'completion': 'Complete'
        };
        return labels[stage] || stage;
    }

    getTreatmentLabel(treatmentType) {
        const labels = {
            'braces': 'Braces',
            'invisalign': 'Invisalign',
            'retainers': 'Retainers'
        };
        return labels[treatmentType] || treatmentType;
    }

    viewPhotoDetails(photoId) {
        const photo = this.treatmentPhotos.find(p => p.id === photoId);
        if (!photo) {
            alert('❌ Photo not found!');
            return;
        }

        this.showPhotoModal(photo);
    }

    showPhotoModal(photo) {
        const modalHtml = `
            <div id="photoModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-primary); border-radius: var(--radius-lg); width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                    <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h2 style="margin: 0; color: var(--primary-color);">
                                <i class="fas fa-camera"></i>
                                ${photo.title}
                            </h2>
                            <button onclick="app.closePhotoModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                            <!-- Main Photo Display -->
                            <div>
                                <div style="position: relative; background: var(--bg-secondary); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem;">
                                    <img src="${photo.imageUrl}" alt="${photo.title}" style="width: 100%; height: 400px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div style="display: none; height: 400px; align-items: center; justify-content: center; color: var(--text-muted);">
                                        <div style="text-align: center;">
                                            <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                            <p>Photo Preview</p>
                                        </div>
                                    </div>
                                    
                                    <!-- Photo Actions Overlay -->
                                    <div style="position: absolute; bottom: 1rem; right: 1rem; display: flex; gap: 0.5rem;">
                                        <button class="btn btn-secondary" onclick="app.showPhotoComparison(${photo.id})" style="padding: 0.5rem;">
                                            <i class="fas fa-columns"></i>
                                            Compare
                                        </button>
                                        <button class="btn btn-primary" onclick="app.downloadPhoto(${photo.id})" style="padding: 0.5rem;">
                                            <i class="fas fa-download"></i>
                                            Download
                                        </button>
                                    </div>
                                </div>

                                <!-- Photo Navigation -->
                                <div style="display: flex; justify-content: center; gap: 0.5rem;">
                                    <button class="btn btn-secondary" onclick="app.navigatePhoto(${photo.id}, 'prev')" style="padding: 0.5rem 1rem;">
                                        <i class="fas fa-chevron-left"></i>
                                        Previous
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.navigatePhoto(${photo.id}, 'next')" style="padding: 0.5rem 1rem;">
                                        Next
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Photo Information Panel -->
                            <div>
                                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                                    <h3 style="margin: 0 0 1rem 0; color: var(--primary-color);">Photo Details</h3>
                                    
                                    <div style="display: grid; gap: 0.75rem; font-size: 0.875rem;">
                                        <div>
                                            <strong>Patient:</strong><br>
                                            <span style="color: var(--text-secondary);">${photo.patientName}</span>
                                        </div>
                                        <div>
                                            <strong>Treatment:</strong><br>
                                            <span style="padding: 0.25rem 0.5rem; background: var(--primary-color); color: white; border-radius: 9999px; font-size: 0.75rem;">
                                                ${this.getTreatmentLabel(photo.treatmentType)}
                                            </span>
                                        </div>
                                        <div>
                                            <strong>Stage:</strong><br>
                                            <span style="padding: 0.25rem 0.5rem; background: var(--success-color); color: white; border-radius: 9999px; font-size: 0.75rem;">
                                                ${this.getStageLabel(photo.stage)}
                                            </span>
                                        </div>
                                        <div>
                                            <strong>Date Taken:</strong><br>
                                            <span style="color: var(--text-secondary);">${new Date(photo.date).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            <strong>Description:</strong><br>
                                            <span style="color: var(--text-secondary);">${photo.description}</span>
                                        </div>
                                        ${photo.notes ? `
                                            <div>
                                                <strong>Clinical Notes:</strong><br>
                                                <span style="color: var(--text-secondary);">${photo.notes}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>

                                ${photo.tags && photo.tags.length > 0 ? `
                                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                                        <h4 style="margin: 0 0 0.75rem 0; color: var(--primary-color);">Tags</h4>
                                        <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                                            ${photo.tags.map(tag => `
                                                <span style="padding: 0.25rem 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 9999px; font-size: 0.75rem; color: var(--text-muted);">
                                                    ${tag}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}

                                <!-- Quick Actions -->
                                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md);">
                                    <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">Quick Actions</h4>
                                    <div style="display: grid; gap: 0.5rem;">
                                        <button class="btn btn-primary" onclick="app.showPhotoComparison(${photo.id})" style="width: 100%; justify-content: flex-start;">
                                            <i class="fas fa-columns"></i>
                                            Compare Progress
                                        </button>
                                        <button class="btn btn-success" onclick="app.addToReport(${photo.id})" style="width: 100%; justify-content: flex-start;">
                                            <i class="fas fa-file-medical"></i>
                                            Add to Report
                                        </button>
                                        <button class="btn btn-warning" onclick="app.sharePhoto(${photo.id})" style="width: 100%; justify-content: flex-start;">
                                            <i class="fas fa-share"></i>
                                            Share with Patient
                                        </button>
                                        <button class="btn btn-secondary" onclick="app.editPhotoDetails(${photo.id})" style="width: 100%; justify-content: flex-start;">
                                            <i class="fas fa-edit"></i>
                                            Edit Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    closePhotoModal() {
        const modal = document.getElementById('photoModal');
        if (modal) {
            modal.remove();
        }
    }

    showPhotoComparison(photoId) {
        const photo = this.treatmentPhotos.find(p => p.id === photoId);
        if (!photo) return;

        // Find other photos of the same patient for comparison
        const patientPhotos = this.treatmentPhotos.filter(p => 
            p.patientId === photo.patientId && 
            p.treatmentType === photo.treatmentType
        ).sort((a, b) => new Date(a.date) - new Date(b.date));

        this.showComparisonModal(photo, patientPhotos);
    }

    showComparisonModal(currentPhoto, patientPhotos) {
        const modalHtml = `
            <div id="comparisonModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1001;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-primary); border-radius: var(--radius-lg); width: 95%; max-width: 1200px; max-height: 95vh; overflow-y: auto;">
                    <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h2 style="margin: 0; color: var(--primary-color);">
                                <i class="fas fa-columns"></i>
                                Treatment Progress Comparison - ${currentPhoto.patientName}
                            </h2>
                            <button onclick="app.closeComparisonModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <!-- Comparison Controls -->
                        <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Compare with:</label>
                                <select id="comparisonSelect" onchange="app.updateComparison()" style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); min-width: 200px;">
                                    ${patientPhotos.map(photo => `
                                        <option value="${photo.id}" ${photo.id === currentPhoto.id ? 'selected' : ''}>
                                            ${photo.title} - ${new Date(photo.date).toLocaleDateString()}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">View Mode:</label>
                                <select id="viewModeSelect" onchange="app.updateComparisonView()" style="padding: 0.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                    <option value="side-by-side">Side by Side</option>
                                    <option value="overlay">Overlay</option>
                                    <option value="slider">Before/After Slider</option>
                                </select>
                            </div>
                            <div style="display: flex; align-items: end; gap: 0.5rem;">
                                <button class="btn btn-primary" onclick="app.exportComparison()" style="padding: 0.5rem 1rem;">
                                    <i class="fas fa-download"></i>
                                    Export
                                </button>
                                <button class="btn btn-success" onclick="app.shareComparison()" style="padding: 0.5rem 1rem;">
                                    <i class="fas fa-share"></i>
                                    Share
                                </button>
                            </div>
                        </div>

                        <!-- Comparison Display -->
                        <div id="comparisonDisplay">
                            ${this.renderSideBySideComparison(currentPhoto, currentPhoto)}
                        </div>

                        <!-- Progress Timeline -->
                        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                            <h3 style="margin: 0 0 1rem 0; color: var(--primary-color);">Treatment Timeline</h3>
                            <div style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem;">
                                ${patientPhotos.map((photo, index) => `
                                    <div onclick="app.selectTimelinePhoto(${photo.id})" style="min-width: 120px; text-align: center; cursor: pointer; padding: 0.5rem; border-radius: var(--radius-sm); transition: all 0.3s ease; ${photo.id === currentPhoto.id ? 'background: var(--primary-color); color: white;' : 'background: var(--bg-primary);'}">
                                        <img src="${photo.imageUrl}" alt="${photo.title}" style="width: 80px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
                                        <div style="font-size: 0.75rem; font-weight: 500;">${this.getStageLabel(photo.stage)}</div>
                                        <div style="font-size: 0.625rem; opacity: 0.8;">${new Date(photo.date).toLocaleDateString()}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Close photo modal if open
        this.closePhotoModal();
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    renderSideBySideComparison(photo1, photo2) {
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <!-- Left Photo -->
                <div style="text-align: center;">
                    <div style="background: var(--bg-secondary); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem;">
                        <img src="${photo1.imageUrl}" alt="${photo1.title}" style="width: 100%; height: 300px; object-fit: cover;">
                    </div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">${photo1.title}</h4>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">
                        <div><strong>Date:</strong> ${new Date(photo1.date).toLocaleDateString()}</div>
                        <div><strong>Stage:</strong> ${this.getStageLabel(photo1.stage)}</div>
                        <div style="margin-top: 0.5rem; font-size: 0.75rem;">${photo1.description}</div>
                    </div>
                </div>

                <!-- Right Photo -->
                <div style="text-align: center;">
                    <div style="background: var(--bg-secondary); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem;">
                        <img src="${photo2.imageUrl}" alt="${photo2.title}" style="width: 100%; height: 300px; object-fit: cover;">
                    </div>
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">${photo2.title}</h4>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">
                        <div><strong>Date:</strong> ${new Date(photo2.date).toLocaleDateString()}</div>
                        <div><strong>Stage:</strong> ${this.getStageLabel(photo2.stage)}</div>
                        <div style="margin-top: 0.5rem; font-size: 0.75rem;">${photo2.description}</div>
                    </div>
                </div>
            </div>

            <!-- Comparison Analysis -->
            <div style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
                <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">Progress Analysis</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; font-size: 0.875rem;">
                    <div>
                        <strong>Time Difference:</strong><br>
                        <span style="color: var(--text-secondary);">${this.calculateTimeDifference(photo1.date, photo2.date)}</span>
                    </div>
                    <div>
                        <strong>Treatment Progress:</strong><br>
                        <span style="color: var(--success-color);">Visible improvement in alignment</span>
                    </div>
                </div>
            </div>
        `;
    }

    calculateTimeDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Same day';
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''}`;
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
    }

    closeComparisonModal() {
        const modal = document.getElementById('comparisonModal');
        if (modal) {
            modal.remove();
        }
    }

    updateComparison() {
        const selectedId = parseInt(document.getElementById('comparisonSelect').value);
        const selectedPhoto = this.treatmentPhotos.find(p => p.id === selectedId);
        const currentPhoto = this.treatmentPhotos.find(p => p.id === selectedId); // This should be the base photo
        
        if (selectedPhoto) {
            document.getElementById('comparisonDisplay').innerHTML = 
                this.renderSideBySideComparison(currentPhoto, selectedPhoto);
        }
    }

    // Placeholder functions for additional features
    downloadPhoto(photoId) {
        alert('📥 Download Photo\n\nPhoto download functionality will:\n• Export high-resolution image\n• Include metadata overlay\n• Generate filename with patient info\n• Support multiple formats (JPG, PNG, PDF)');
    }

    addToReport(photoId) {
        alert('📋 Add to Report\n\nThis will add the photo to:\n• Treatment progress report\n• Patient documentation\n• Insurance submission\n• Custom report templates');
    }

    sharePhoto(photoId) {
        alert('📤 Share with Patient\n\nSecure sharing options:\n• Email with password protection\n• Patient portal upload\n• Secure messaging\n• Print-friendly format');
    }

    editPhotoDetails(photoId) {
        alert('✏️ Edit Photo Details\n\nEditable fields:\n• Title and description\n• Clinical notes\n• Tags and categories\n• Date and stage\n• Patient association');
    }

    exportComparison() {
        alert('📊 Export Comparison\n\nExport options:\n• Side-by-side PDF report\n• Before/after presentation\n• Progress timeline\n• Patient-friendly summary');
    }

    shareComparison() {
        alert('📤 Share Comparison\n\nSharing options:\n• Email to patient\n• Print comparison report\n• Add to treatment plan\n• Insurance documentation');
    }

    // Real Photo Upload Functions
    handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('dropZone');
        dropZone.style.borderColor = 'var(--success-color)';
        dropZone.style.background = 'rgb(34 197 94 / 0.1)';
    }

    handleDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('dropZone');
        dropZone.style.borderColor = 'var(--primary-color)';
        dropZone.style.background = 'rgb(79 70 229 / 0.05)';
    }

    handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const dropZone = document.getElementById('dropZone');
        dropZone.style.borderColor = 'var(--primary-color)';
        dropZone.style.background = 'rgb(79 70 229 / 0.05)';

        const files = Array.from(event.dataTransfer.files);
        this.processSelectedFiles(files);
    }

    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.processSelectedFiles(files);
    }

    processSelectedFiles(files) {
        // Filter for image files only
        const imageFiles = files.filter(file => {
            return file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024; // 10MB limit
        });

        if (imageFiles.length === 0) {
            alert('❌ No valid image files selected.\n\nPlease select JPG, PNG, or HEIC files under 10MB.');
            return;
        }

        if (imageFiles.length !== files.length) {
            alert(`⚠️ ${files.length - imageFiles.length} file(s) were skipped.\n\nOnly image files under 10MB are supported.`);
        }

        // Add to selected files
        this.selectedFiles = [...this.selectedFiles, ...imageFiles];
        this.updatePhotoPreview();
    }

    updatePhotoPreview() {
        const previewSection = document.getElementById('photoPreviewSection');
        const photoGrid = document.getElementById('photoPreviewGrid');
        const photoCount = document.getElementById('photoCount');
        const uploadCount = document.getElementById('uploadCount');

        if (this.selectedFiles.length === 0) {
            previewSection.style.display = 'none';
            return;
        }

        previewSection.style.display = 'block';
        photoCount.textContent = this.selectedFiles.length;
        uploadCount.textContent = this.selectedFiles.length;

        // Generate preview grid
        photoGrid.innerHTML = this.selectedFiles.map((file, index) => {
            const objectUrl = URL.createObjectURL(file);
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
            
            return `
                <div style="position: relative; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
                    <img src="${objectUrl}" alt="${file.name}" style="width: 100%; height: 120px; object-fit: cover;">
                    <div style="padding: 0.75rem;">
                        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${file.name}">
                            ${file.name}
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">
                            ${fileSizeMB} MB • ${file.type.split('/')[1].toUpperCase()}
                        </div>
                    </div>
                    <button onclick="app.removeSelectedFile(${index})" style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(239, 68, 68, 0.9); color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    removeSelectedFile(index) {
        // Revoke object URL to prevent memory leaks
        const file = this.selectedFiles[index];
        const objectUrl = URL.createObjectURL(file);
        URL.revokeObjectURL(objectUrl);
        
        this.selectedFiles.splice(index, 1);
        this.updatePhotoPreview();
    }

    clearSelectedPhotos() {
        // Revoke all object URLs
        this.selectedFiles.forEach(file => {
            const objectUrl = URL.createObjectURL(file);
            URL.revokeObjectURL(objectUrl);
        });
        
        this.selectedFiles = [];
        this.updatePhotoPreview();
        
        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    async processPhotoUploads() {
        if (this.selectedFiles.length === 0) {
            alert('❌ No photos selected for upload.');
            return;
        }

        // Validate form data
        const patientId = document.getElementById('uploadPatient').value;
        const treatmentType = document.getElementById('uploadTreatment').value;
        const stage = document.getElementById('uploadStage').value;
        const date = document.getElementById('uploadDate').value;
        const notes = document.getElementById('uploadNotes').value;

        if (!patientId || !treatmentType || !stage || !date) {
            alert('❌ Please fill in all required fields:\n• Patient\n• Treatment Type\n• Progress Stage\n• Date Taken');
            return;
        }

        this.uploadInProgress = true;
        this.showUploadProgress();

        try {
            const patient = this.patients.find(p => p.id == patientId);
            let uploadedCount = 0;

            for (let i = 0; i < this.selectedFiles.length; i++) {
                const file = this.selectedFiles[i];
                
                // Simulate upload progress
                await this.simulateFileUpload(file, i + 1, this.selectedFiles.length);
                
                // Create photo record
                const photoId = this.treatmentPhotos.length + 1;
                const objectUrl = URL.createObjectURL(file);
                
                const photoRecord = {
                    id: photoId,
                    patientId: parseInt(patientId),
                    patientName: patient.name,
                    treatmentType: treatmentType,
                    stage: stage,
                    date: date,
                    title: `${this.getStageLabel(stage)} - ${patient.name}`,
                    description: `${this.getTreatmentLabel(treatmentType)} progress photo`,
                    imageUrl: objectUrl, // In real app, this would be a server URL
                    tags: [treatmentType, stage, patient.name.toLowerCase().replace(' ', '-')],
                    notes: notes,
                    uploadDate: new Date().toISOString(),
                    fileSize: file.size,
                    fileName: file.name,
                    fileType: file.type
                };

                this.treatmentPhotos.push(photoRecord);
                uploadedCount++;
            }

            // Success feedback
            this.hideUploadProgress();
            this.showUploadSuccess(uploadedCount);
            
            // Clear form and close modal
            this.clearSelectedPhotos();
            setTimeout(() => {
                this.closeBulkUploadModal();
                // Refresh treatments page if currently viewing
                if (this.currentPage === 'treatments') {
                    this.loadTreatmentsPage();
                }
            }, 2000);

        } catch (error) {
            console.error('Upload error:', error);
            this.hideUploadProgress();
            alert('❌ Upload failed. Please try again.');
        } finally {
            this.uploadInProgress = false;
        }
    }

    showUploadProgress() {
        const progressSection = document.getElementById('uploadProgress');
        const dropZone = document.getElementById('dropZone');
        
        progressSection.style.display = 'block';
        dropZone.style.opacity = '0.5';
        dropZone.style.pointerEvents = 'none';
    }

    hideUploadProgress() {
        const progressSection = document.getElementById('uploadProgress');
        const dropZone = document.getElementById('dropZone');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        progressSection.style.display = 'none';
        dropZone.style.opacity = '1';
        dropZone.style.pointerEvents = 'auto';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
    }

    async simulateFileUpload(file, currentFile, totalFiles) {
        return new Promise(resolve => {
            let progress = 0;
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                
                const overallProgress = ((currentFile - 1) / totalFiles * 100) + (progress / totalFiles);
                progressBar.style.width = `${overallProgress}%`;
                progressText.textContent = `${Math.round(overallProgress)}%`;
                
                if (progress >= 100) {
                    setTimeout(resolve, 200);
                }
            }, 100);
        });
    }

    showUploadSuccess(count) {
        const successHtml = `
            <div style="position: fixed; top: 2rem; right: 2rem; background: var(--success-color); color: white; padding: 1rem 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 1002; display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <div>
                    <div style="font-weight: 500;">Upload Successful!</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">${count} photo${count > 1 ? 's' : ''} uploaded successfully</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHtml);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            const successElement = document.querySelector('[style*="position: fixed"][style*="top: 2rem"][style*="right: 2rem"]');
            if (successElement) {
                successElement.remove();
            }
        }, 3000);
    }

    // Smart Upload Handler Functions
    handleSmartDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('smartDropZone');
        dropZone.style.borderColor = 'var(--warning-color)';
        dropZone.style.background = 'linear-gradient(135deg, rgb(251 191 36 / 0.1), rgb(79 70 229 / 0.1))';
        dropZone.style.transform = 'scale(1.02)';
    }

    handleSmartDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleSmartDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropZone = document.getElementById('smartDropZone');
        dropZone.style.borderColor = 'var(--success-color)';
        dropZone.style.background = 'linear-gradient(135deg, rgb(34 197 94 / 0.05), rgb(79 70 229 / 0.05))';
        dropZone.style.transform = 'scale(1)';
    }

    handleSmartDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const dropZone = document.getElementById('smartDropZone');
        dropZone.style.borderColor = 'var(--success-color)';
        dropZone.style.background = 'linear-gradient(135deg, rgb(34 197 94 / 0.05), rgb(79 70 229 / 0.05))';
        dropZone.style.transform = 'scale(1)';

        const files = Array.from(event.dataTransfer.files);
        this.processSmartFiles(files);
    }

    handleSmartFileSelect(event) {
        const files = Array.from(event.target.files);
        this.processSmartFiles(files);
    }

    async processSmartFiles(files) {
        // Filter for image files only
        const imageFiles = files.filter(file => {
            return file.type.startsWith('image/') && file.size <= 50 * 1024 * 1024; // 50MB limit for smart upload
        });

        if (imageFiles.length === 0) {
            alert('❌ No valid image files selected.\n\nPlease select image files for AI analysis.');
            return;
        }

        if (imageFiles.length !== files.length) {
            alert(`⚠️ ${files.length - imageFiles.length} file(s) were skipped.\n\nOnly image files are supported for AI analysis.`);
        }

        this.smartUploadFiles = imageFiles;
        
        // Hide drop zone and start AI analysis
        document.getElementById('smartDropZone').style.display = 'none';
        await this.startAIAnalysis();
    }

    async startAIAnalysis() {
        const progressDiv = document.getElementById('aiAnalysisProgress');
        const stepsDiv = document.getElementById('analysisSteps');
        const progressBar = document.getElementById('aiProgressBar');
        const progressText = document.getElementById('aiProgressText');

        progressDiv.style.display = 'block';

        const analysisSteps = [
            { step: 'Analyzing file names and metadata', progress: 10 },
            { step: 'Extracting EXIF data and dates', progress: 25 },
            { step: 'Detecting patient names and patterns', progress: 40 },
            { step: 'Classifying treatment stages', progress: 60 },
            { step: 'Identifying treatment types', progress: 75 },
            { step: 'Generating smart suggestions', progress: 90 },
            { step: 'Finalizing AI analysis', progress: 100 }
        ];

        this.aiAnalysisResults = [];

        for (let i = 0; i < analysisSteps.length; i++) {
            const step = analysisSteps[i];
            
            // Update progress
            progressBar.style.width = `${step.progress}%`;
            progressText.textContent = step.step;
            
            // Add step to analysis log
            const stepHtml = `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; opacity: 0.7;">
                    <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                    <span style="font-size: 0.875rem;">${step.step}</span>
                </div>
            `;
            stepsDiv.insertAdjacentHTML('beforeend', stepHtml);
            
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
            
            // Process files during analysis
            if (i === 1) await this.analyzeFileMetadata();
            if (i === 2) await this.detectPatientNames();
            if (i === 3) await this.classifyTreatmentStages();
            if (i === 4) await this.identifyTreatmentTypes();
            if (i === 5) await this.generateSmartSuggestions();
        }

        // Hide progress and show results
        setTimeout(() => {
            progressDiv.style.display = 'none';
            this.displaySmartResults();
        }, 500);
    }

    async analyzeFileMetadata() {
        // Simulate EXIF data extraction and filename analysis
        for (let i = 0; i < this.smartUploadFiles.length; i++) {
            const file = this.smartUploadFiles[i];
            const fileName = file.name.toLowerCase();
            
            // Extract date from filename or file metadata
            let extractedDate = new Date();
            const dateMatch = fileName.match(/(\d{4}[-_]\d{2}[-_]\d{2})|(\d{2}[-_]\d{2}[-_]\d{4})/);
            if (dateMatch) {
                extractedDate = new Date(dateMatch[0].replace(/[-_]/g, '-'));
            } else {
                extractedDate = new Date(file.lastModified);
            }

            this.aiAnalysisResults.push({
                file: file,
                fileName: file.name,
                extractedDate: extractedDate,
                confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
                suggestions: {}
            });
        }
    }

    async detectPatientNames() {
        // Simulate patient name detection from filenames
        const patientNames = this.patients.map(p => p.name.toLowerCase());
        
        this.aiAnalysisResults.forEach(result => {
            const fileName = result.fileName.toLowerCase();
            
            // Look for patient names in filename
            let detectedPatient = null;
            let maxConfidence = 0;
            
            patientNames.forEach((name, index) => {
                const nameParts = name.split(' ');
                let matches = 0;
                
                nameParts.forEach(part => {
                    if (fileName.includes(part.toLowerCase())) {
                        matches++;
                    }
                });
                
                const confidence = matches / nameParts.length;
                if (confidence > maxConfidence && confidence > 0.5) {
                    maxConfidence = confidence;
                    detectedPatient = this.patients[index];
                }
            });
            
            // If no exact match, suggest based on similarity
            if (!detectedPatient && this.patients.length > 0) {
                detectedPatient = this.patients[Math.floor(Math.random() * this.patients.length)];
                maxConfidence = 0.3; // Low confidence for random assignment
            }
            
            result.suggestions.patient = detectedPatient;
            result.suggestions.patientConfidence = maxConfidence;
        });
    }

    async classifyTreatmentStages() {
        // Simulate treatment stage classification
        const stageKeywords = {
            'before': ['before', 'initial', 'start', 'pre'],
            'progress': ['progress', 'check', 'mid', 'update', 'month'],
            'adjustment': ['adjustment', 'adjust', 'tighten', 'wire', 'post'],
            'completion': ['complete', 'final', 'end', 'finish', 'done', 'after']
        };
        
        this.aiAnalysisResults.forEach(result => {
            const fileName = result.fileName.toLowerCase();
            let detectedStage = 'progress'; // default
            let maxConfidence = 0.4;
            
            Object.keys(stageKeywords).forEach(stage => {
                const keywords = stageKeywords[stage];
                let matches = 0;
                
                keywords.forEach(keyword => {
                    if (fileName.includes(keyword)) {
                        matches++;
                    }
                });
                
                const confidence = matches / keywords.length + Math.random() * 0.3;
                if (confidence > maxConfidence) {
                    maxConfidence = confidence;
                    detectedStage = stage;
                }
            });
            
            result.suggestions.stage = detectedStage;
            result.suggestions.stageConfidence = Math.min(maxConfidence, 0.95);
        });
    }

    async identifyTreatmentTypes() {
        // Simulate treatment type identification
        const treatmentKeywords = {
            'braces': ['braces', 'bracket', 'wire', 'metal', 'ceramic'],
            'invisalign': ['invisalign', 'clear', 'aligner', 'invisible'],
            'retainers': ['retainer', 'retain', 'maintain', 'hold']
        };
        
        this.aiAnalysisResults.forEach(result => {
            const fileName = result.fileName.toLowerCase();
            let detectedTreatment = 'braces'; // default
            let maxConfidence = 0.5;
            
            Object.keys(treatmentKeywords).forEach(treatment => {
                const keywords = treatmentKeywords[treatment];
                let matches = 0;
                
                keywords.forEach(keyword => {
                    if (fileName.includes(keyword)) {
                        matches++;
                    }
                });
                
                const confidence = matches / keywords.length + Math.random() * 0.4;
                if (confidence > maxConfidence) {
                    maxConfidence = confidence;
                    detectedTreatment = treatment;
                }
            });
            
            // Also consider patient's current treatment
            if (result.suggestions.patient && result.suggestions.patient.treatment) {
                if (Math.random() > 0.3) { // 70% chance to use patient's treatment
                    detectedTreatment = result.suggestions.patient.treatment;
                    maxConfidence = 0.8;
                }
            }
            
            result.suggestions.treatmentType = detectedTreatment;
            result.suggestions.treatmentConfidence = Math.min(maxConfidence, 0.9);
        });
    }

    async generateSmartSuggestions() {
        // Generate final smart suggestions and titles
        this.aiAnalysisResults.forEach(result => {
            const patient = result.suggestions.patient;
            const stage = result.suggestions.stage;
            const treatment = result.suggestions.treatmentType;
            
            // Generate smart title
            const stageLabels = {
                'before': 'Before Treatment',
                'progress': 'Progress Check',
                'adjustment': 'Post-Adjustment',
                'completion': 'Treatment Complete'
            };
            
            const treatmentLabels = {
                'braces': 'Braces',
                'invisalign': 'Invisalign',
                'retainers': 'Retainers'
            };
            
            result.suggestions.title = `${stageLabels[stage]} - ${patient ? patient.name : 'Patient'}`;
            result.suggestions.description = `${treatmentLabels[treatment]} ${stageLabels[stage].toLowerCase()} photo`;
            
            // Generate tags
            result.suggestions.tags = [
                treatment,
                stage,
                patient ? patient.name.toLowerCase().replace(' ', '-') : 'unknown-patient'
            ];
            
            // Calculate overall confidence
            const confidences = [
                result.suggestions.patientConfidence || 0.5,
                result.suggestions.stageConfidence || 0.5,
                result.suggestions.treatmentConfidence || 0.5
            ];
            result.suggestions.overallConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;
        });
    }

    displaySmartResults() {
        const resultsDiv = document.getElementById('smartResults');
        const gridDiv = document.getElementById('smartResultsGrid');
        const countSpan = document.getElementById('smartUploadCount');
        
        resultsDiv.style.display = 'block';
        countSpan.textContent = this.aiAnalysisResults.length;
        
        // Generate results grid
        gridDiv.innerHTML = this.aiAnalysisResults.map((result, index) => {
            const objectUrl = URL.createObjectURL(result.file);
            const confidence = Math.round(result.suggestions.overallConfidence * 100);
            const confidenceColor = confidence >= 80 ? 'var(--success-color)' : 
                                  confidence >= 60 ? 'var(--warning-color)' : 'var(--danger-color)';
            
            return `
                <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; position: relative;">
                    <!-- Confidence Badge -->
                    <div style="position: absolute; top: 0.5rem; right: 0.5rem; background: ${confidenceColor}; color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 500; z-index: 1;">
                        ${confidence}% AI
                    </div>
                    
                    <!-- Photo Preview -->
                    <img src="${objectUrl}" alt="${result.fileName}" style="width: 100%; height: 120px; object-fit: cover;">
                    
                    <!-- AI Suggestions -->
                    <div style="padding: 1rem;">
                        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${result.suggestions.title}">
                            ${result.suggestions.title}
                        </div>
                        
                        <div style="display: grid; gap: 0.25rem; font-size: 0.75rem; color: var(--text-muted);">
                            <div><strong>Patient:</strong> ${result.suggestions.patient ? result.suggestions.patient.name : 'Unknown'}</div>
                            <div><strong>Stage:</strong> ${this.getStageLabel(result.suggestions.stage)}</div>
                            <div><strong>Treatment:</strong> ${this.getTreatmentLabel(result.suggestions.treatmentType)}</div>
                            <div><strong>Date:</strong> ${result.extractedDate.toLocaleDateString()}</div>
                        </div>
                        
                        <!-- Quick Edit -->
                        <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
                            <button class="btn btn-secondary" onclick="app.editSmartSuggestion(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; flex: 1;">
                                <i class="fas fa-edit"></i>
                                Edit
                            </button>
                            <button class="btn btn-success" onclick="app.approveSmartSuggestion(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; flex: 1;">
                                <i class="fas fa-check"></i>
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Smart Upload Action Functions
    editSmartSuggestion(index) {
        const result = this.aiAnalysisResults[index];
        const editModalHtml = `
            <div id="editSuggestionModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1001;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-primary); border-radius: var(--radius-lg); width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                    <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h3 style="margin: 0; color: var(--primary-color);">
                                <i class="fas fa-edit"></i>
                                Edit AI Suggestion
                            </h3>
                            <button onclick="app.closeEditSuggestionModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <div style="display: grid; gap: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Patient:</label>
                                <select id="editPatient" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                    ${this.patients.map(p => `<option value="${p.id}" ${result.suggestions.patient && result.suggestions.patient.id === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Treatment Type:</label>
                                <select id="editTreatment" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                    <option value="braces" ${result.suggestions.treatmentType === 'braces' ? 'selected' : ''}>Braces</option>
                                    <option value="invisalign" ${result.suggestions.treatmentType === 'invisalign' ? 'selected' : ''}>Invisalign</option>
                                    <option value="retainers" ${result.suggestions.treatmentType === 'retainers' ? 'selected' : ''}>Retainers</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Progress Stage:</label>
                                <select id="editStage" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                    <option value="before" ${result.suggestions.stage === 'before' ? 'selected' : ''}>Before Treatment</option>
                                    <option value="progress" ${result.suggestions.stage === 'progress' ? 'selected' : ''}>Progress Check</option>
                                    <option value="adjustment" ${result.suggestions.stage === 'adjustment' ? 'selected' : ''}>Post-Adjustment</option>
                                    <option value="completion" ${result.suggestions.stage === 'completion' ? 'selected' : ''}>Treatment Complete</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Date Taken:</label>
                                <input type="date" id="editDate" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);" value="${result.extractedDate.toISOString().split('T')[0]}">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Title:</label>
                                <input type="text" id="editTitle" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);" value="${result.suggestions.title}">
                            </div>
                        </div>

                        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                            <button class="btn btn-secondary" onclick="app.closeEditSuggestionModal()">
                                <i class="fas fa-times"></i>
                                Cancel
                            </button>
                            <button class="btn btn-primary" onclick="app.saveEditedSuggestion(${index})">
                                <i class="fas fa-save"></i>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', editModalHtml);
    }

    closeEditSuggestionModal() {
        const modal = document.getElementById('editSuggestionModal');
        if (modal) {
            modal.remove();
        }
    }

    saveEditedSuggestion(index) {
        const result = this.aiAnalysisResults[index];
        const patientId = document.getElementById('editPatient').value;
        const treatmentType = document.getElementById('editTreatment').value;
        const stage = document.getElementById('editStage').value;
        const date = document.getElementById('editDate').value;
        const title = document.getElementById('editTitle').value;

        // Update the suggestion
        result.suggestions.patient = this.patients.find(p => p.id == patientId);
        result.suggestions.treatmentType = treatmentType;
        result.suggestions.stage = stage;
        result.extractedDate = new Date(date);
        result.suggestions.title = title;

        // Mark as manually edited (100% confidence)
        result.suggestions.overallConfidence = 1.0;
        result.suggestions.manuallyEdited = true;

        // Close modal and refresh display
        this.closeEditSuggestionModal();
        this.displaySmartResults();

        // Show success message
        this.showNotification('✅ Suggestion updated successfully!', 'success');
    }

    approveSmartSuggestion(index) {
        const result = this.aiAnalysisResults[index];
        result.suggestions.approved = true;
        result.suggestions.overallConfidence = Math.max(result.suggestions.overallConfidence, 0.95);
        
        // Update the display
        this.displaySmartResults();
        
        // Show success message
        this.showNotification(`✅ ${result.suggestions.title} approved!`, 'success');
    }

    acceptAllSuggestions() {
        this.aiAnalysisResults.forEach(result => {
            result.suggestions.approved = true;
            result.suggestions.overallConfidence = Math.max(result.suggestions.overallConfidence, 0.9);
        });
        
        this.displaySmartResults();
        this.showNotification(`✅ All ${this.aiAnalysisResults.length} suggestions approved!`, 'success');
    }

    reviewSuggestions() {
        const lowConfidenceResults = this.aiAnalysisResults.filter(result => 
            result.suggestions.overallConfidence < 0.8 && !result.suggestions.approved
        );
        
        if (lowConfidenceResults.length === 0) {
            this.showNotification('✅ All suggestions have high confidence!', 'success');
            return;
        }
        
        alert(`⚠️ Found ${lowConfidenceResults.length} suggestions with low confidence.\n\nPlease review and edit these suggestions before uploading.`);
    }

    exportAnalysis() {
        const analysisData = {
            timestamp: new Date().toISOString(),
            totalFiles: this.aiAnalysisResults.length,
            averageConfidence: this.aiAnalysisResults.reduce((sum, result) => sum + result.suggestions.overallConfidence, 0) / this.aiAnalysisResults.length,
            results: this.aiAnalysisResults.map(result => ({
                fileName: result.fileName,
                suggestions: result.suggestions,
                confidence: result.suggestions.overallConfidence,
                extractedDate: result.extractedDate
            }))
        };

        console.log('📊 AI Analysis Export:', analysisData);
        this.showNotification('📊 Analysis exported to console!', 'info');
    }

    resetSmartUpload() {
        // Clear all data
        this.smartUploadFiles = [];
        this.aiAnalysisResults = [];
        
        // Reset interface
        const smartInterface = document.getElementById('smartUploadInterface');
        if (smartInterface) {
            smartInterface.remove();
        }
        
        // Show regular upload interface
        const photoPreviewSection = document.getElementById('photoPreviewSection');
        const dropZone = document.getElementById('dropZone');
        
        if (photoPreviewSection) photoPreviewSection.style.display = 'block';
        if (dropZone) dropZone.style.display = 'block';
        
        this.showNotification('🔄 Smart upload reset. You can now start over.', 'info');
    }

    async processSmartUpload() {
        const approvedResults = this.aiAnalysisResults.filter(result => 
            result.suggestions.approved || result.suggestions.overallConfidence >= 0.8
        );
        
        if (approvedResults.length === 0) {
            alert('❌ No approved suggestions to upload.\n\nPlease approve at least one suggestion or review low-confidence items.');
            return;
        }

        this.uploadInProgress = true;
        this.showUploadProgress();

        try {
            let uploadedCount = 0;
            
            for (let i = 0; i < approvedResults.length; i++) {
                const result = approvedResults[i];
                
                // Simulate upload progress
                await this.simulateFileUpload(result.file, i + 1, approvedResults.length);
                
                // Create photo record
                const photoId = this.treatmentPhotos.length + 1;
                const objectUrl = URL.createObjectURL(result.file);
                
                const photoRecord = {
                    id: photoId,
                    patientId: result.suggestions.patient ? result.suggestions.patient.id : null,
                    patientName: result.suggestions.patient ? result.suggestions.patient.name : 'Unknown Patient',
                    treatmentType: result.suggestions.treatmentType,
                    stage: result.suggestions.stage,
                    date: result.extractedDate.toISOString().split('T')[0],
                    title: result.suggestions.title,
                    description: result.suggestions.description,
                    imageUrl: objectUrl,
                    tags: result.suggestions.tags,
                    notes: `AI-organized photo (${Math.round(result.suggestions.overallConfidence * 100)}% confidence)`,
                    uploadDate: new Date().toISOString(),
                    fileSize: result.file.size,
                    fileName: result.file.name,
                    fileType: result.file.type,
                    aiGenerated: true,
                    aiConfidence: result.suggestions.overallConfidence
                };

                this.treatmentPhotos.push(photoRecord);
                uploadedCount++;
            }

            // Success feedback
            this.hideUploadProgress();
            this.showUploadSuccess(uploadedCount);
            
            setTimeout(() => {
                this.closeBulkUploadModal();
                // Refresh treatments page if currently viewing
                if (this.currentPage === 'treatments') {
                    this.loadTreatmentsPage();
                }
            }, 2000);

        } catch (error) {
            console.error('Smart upload error:', error);
            this.hideUploadProgress();
            alert('❌ Smart upload failed. Please try again.');
        } finally {
            this.uploadInProgress = false;
        }
    }

    showNotification(message, type = 'info') {
        const colors = {
            success: 'var(--success-color)',
            warning: 'var(--warning-color)',
            error: 'var(--danger-color)',
            info: 'var(--info-color)'
        };
        
        const notificationHtml = `
            <div style="position: fixed; top: 2rem; right: 2rem; background: ${colors[type]}; color: white; padding: 1rem 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 1003; max-width: 300px;">
                ${message}
            </div>
        `;
        
        const notification = document.createElement('div');
        notification.innerHTML = notificationHtml;
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    showUploadModal() {
        const modalHtml = `
            <div id="bulkUploadModal" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-primary); border-radius: var(--radius-lg); width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto;">
                    <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h2 style="margin: 0; color: var(--primary-color);">
                                <i class="fas fa-upload"></i>
                                Upload Progress Photos
                            </h2>
                            <button onclick="app.closeBulkUploadModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <!-- Real Photo Upload Interface -->
                        <div style="margin-bottom: 2rem;">
                            <!-- Drag and Drop Zone -->
                            <div id="dropZone" style="border: 2px dashed var(--primary-color); border-radius: var(--radius-md); padding: 3rem; text-align: center; background: rgb(79 70 229 / 0.05); cursor: pointer; transition: all 0.3s ease;" 
                                 ondrop="app.handleDrop(event)" 
                                 ondragover="app.handleDragOver(event)" 
                                 ondragenter="app.handleDragEnter(event)" 
                                 ondragleave="app.handleDragLeave(event)"
                                 onclick="document.getElementById('fileInput').click()">
                                <div id="dropZoneContent">
                                    <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                                    <h3 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">Drop photos here or click to browse</h3>
                                    <p style="margin: 0; color: var(--text-secondary);">Supports JPG, PNG, HEIC files up to 10MB each</p>
                                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--text-muted);">Multiple files supported • Auto-resize and optimize</p>
                                </div>
                            </div>
                            
                            <!-- Hidden File Input -->
                            <input type="file" id="fileInput" multiple accept="image/*" style="display: none;" onchange="app.handleFileSelect(event)">
                            
                            <!-- Upload Progress -->
                            <div id="uploadProgress" style="display: none; margin-top: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <span style="font-weight: 500;">Uploading photos...</span>
                                    <span id="progressText">0%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                                    <div id="progressBar" style="height: 100%; background: var(--primary-color); width: 0%; transition: width 0.3s ease;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Photo Preview and Metadata -->
                        <div id="photoPreviewSection" style="display: none;">
                            <h3 style="margin: 0 0 1rem 0; color: var(--primary-color);">
                                <i class="fas fa-images"></i>
                                Selected Photos (<span id="photoCount">0</span>)
                            </h3>
                            <div id="photoPreviewGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; max-height: 300px; overflow-y: auto;"></div>
                            
                            <!-- Batch Metadata Form -->
                            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
                                <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">Photo Information</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                    <div>
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Patient:</label>
                                        <select id="uploadPatient" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                            <option value="">Select Patient</option>
                                            ${this.patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Treatment Type:</label>
                                        <select id="uploadTreatment" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                            <option value="">Select Treatment</option>
                                            <option value="braces">Braces</option>
                                            <option value="invisalign">Invisalign</option>
                                            <option value="retainers">Retainers</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Progress Stage:</label>
                                        <select id="uploadStage" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                                            <option value="">Select Stage</option>
                                            <option value="before">Before Treatment</option>
                                            <option value="progress">Progress Check</option>
                                            <option value="adjustment">Post-Adjustment</option>
                                            <option value="completion">Treatment Complete</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Date Taken:</label>
                                        <input type="date" id="uploadDate" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);" value="${new Date().toISOString().split('T')[0]}">
                                    </div>
                                </div>
                                <div style="margin-top: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Clinical Notes:</label>
                                    <textarea id="uploadNotes" placeholder="Add clinical observations, treatment notes, or other relevant information..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); min-height: 80px; resize: vertical;"></textarea>
                                </div>
                            </div>

                            <!-- Upload Actions -->
                            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                                <button class="btn btn-secondary" onclick="app.clearSelectedPhotos()" style="padding: 0.75rem 1.5rem;">
                                    <i class="fas fa-times"></i>
                                    Clear All
                                </button>
                                <button class="btn btn-primary" onclick="app.processPhotoUploads()" style="padding: 0.75rem 1.5rem;">
                                    <i class="fas fa-save"></i>
                                    Upload Photos (<span id="uploadCount">0</span>)
                                </button>
                            </div>
                        </div>

                        <!-- Import Options -->
                        <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
                            <!-- Smart Batch Upload -->
                            <div style="padding: 1.5rem; border: 2px dashed var(--primary-color); border-radius: var(--radius-md); background: rgb(79 70 229 / 0.05);">
                                <h3 style="margin: 0 0 1rem 0; color: var(--primary-color);">
                                    <i class="fas fa-magic"></i>
                                    Smart Batch Upload
                                </h3>
                                <p style="margin: 0 0 1rem 0; color: var(--text-secondary);">
                                    AI-powered photo organization with automatic patient detection and progress stage classification
                                </p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <button class="btn btn-primary" onclick="app.startSmartUpload()" style="width: 100%;">
                                        <i class="fas fa-brain"></i>
                                        Start Smart Upload
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.showUploadDemo()" style="width: 100%;">
                                        <i class="fas fa-play"></i>
                                        See Demo
                                    </button>
                                </div>
                                <div style="font-size: 0.875rem; color: var(--text-muted);">
                                    <strong>Features:</strong> Auto-detects patients, stages, dates from filenames and metadata
                                </div>
                            </div>

                            <!-- Manual Organization -->
                            <div style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary);">
                                <h3 style="margin: 0 0 1rem 0; color: var(--success-color);">
                                    <i class="fas fa-folder-open"></i>
                                    Folder-Based Import
                                </h3>
                                <p style="margin: 0 0 1rem 0; color: var(--text-secondary);">
                                    Organize photos by folder structure (Patient Name → Treatment Type → Date)
                                </p>
                                <button class="btn btn-success" onclick="app.startFolderImport()" style="width: 100%;">
                                    <i class="fas fa-folder-plus"></i>
                                    Import from Folders
                                </button>
                            </div>
                        </div>

                        <!-- Quick Setup Wizard -->
                        <div style="padding: 1.5rem; background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: 2rem;">
                            <h3 style="margin: 0 0 1rem 0; color: var(--warning-color);">
                                <i class="fas fa-rocket"></i>
                                Quick Setup for Existing Photos
                            </h3>
                            <p style="margin: 0 0 1rem 0; color: var(--text-secondary);">
                                Let's help you organize your existing photo collection efficiently
                            </p>
                            
                            <div style="display: grid; gap: 1rem;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <i class="fas fa-question-circle" style="color: var(--primary-color); font-size: 1.2rem;"></i>
                                    <span style="font-weight: 500;">How many photos do you have approximately?</span>
                                </div>
                                <select id="photoCount" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                    <option value="50">50-100 photos</option>
                                    <option value="200">200-500 photos</option>
                                    <option value="1000" selected>500-1000 photos</option>
                                    <option value="2000">1000+ photos</option>
                                </select>

                                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
                                    <i class="fas fa-camera" style="color: var(--success-color); font-size: 1.2rem;"></i>
                                    <span style="font-weight: 500;">What's your current photo organization?</span>
                                </div>
                                <select id="currentOrg" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                    <option value="random">Random files in folders</option>
                                    <option value="dates" selected>Organized by dates</option>
                                    <option value="patients">Organized by patient names</option>
                                    <option value="mixed">Mixed organization</option>
                                </select>

                                <button class="btn btn-warning" onclick="app.generateImportPlan()" style="width: 100%; margin-top: 1rem;">
                                    <i class="fas fa-lightbulb"></i>
                                    Generate Custom Import Plan
                                </button>
                            </div>
                        </div>

                        <!-- Advanced Features -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                <h4 style="margin: 0 0 0.5rem 0; color: var(--info-color);">
                                    <i class="fas fa-cogs"></i>
                                    Batch Processing
                                </h4>
                                <ul style="margin: 0; padding-left: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                                    <li>Auto-resize images</li>
                                    <li>Extract EXIF data</li>
                                    <li>Duplicate detection</li>
                                    <li>Quality optimization</li>
                                </ul>
                            </div>
                            <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                <h4 style="margin: 0 0 0.5rem 0; color: var(--info-color);">
                                    <i class="fas fa-shield-alt"></i>
                                    HIPAA Compliance
                                </h4>
                                <ul style="margin: 0; padding-left: 1rem; font-size: 0.875rem; color: var(--text-secondary);">
                                    <li>Encrypted storage</li>
                                    <li>Access logging</li>
                                    <li>Secure backup</li>
                                    <li>Audit trail</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    closeBulkUploadModal() {
        const modal = document.getElementById('bulkUploadModal');
        if (modal) {
            modal.remove();
        }
    }

    async startSmartUpload() {
        // Hide the regular upload interface and show smart upload
        const photoPreviewSection = document.getElementById('photoPreviewSection');
        const dropZone = document.getElementById('dropZone');
        
        if (photoPreviewSection) photoPreviewSection.style.display = 'none';
        if (dropZone) dropZone.style.display = 'none';
        
        // Show smart upload interface
        this.showSmartUploadInterface();
    }

    showSmartUploadInterface() {
        const smartUploadHtml = `
            <div id="smartUploadInterface" style="margin-top: 2rem;">
                <div style="background: linear-gradient(135deg, var(--primary-color), var(--success-color)); padding: 2rem; border-radius: var(--radius-lg); color: white; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <i class="fas fa-brain" style="font-size: 2rem;"></i>
                        <div>
                            <h2 style="margin: 0; font-size: 1.5rem;">AI-Powered Smart Upload</h2>
                            <p style="margin: 0; opacity: 0.9;">Intelligent photo organization with automatic categorization</p>
                        </div>
                    </div>
                </div>

                <!-- Smart Drop Zone -->
                <div id="smartDropZone" style="border: 3px dashed var(--success-color); border-radius: var(--radius-lg); padding: 3rem; text-align: center; background: linear-gradient(135deg, rgb(34 197 94 / 0.05), rgb(79 70 229 / 0.05)); cursor: pointer; transition: all 0.3s ease; margin-bottom: 2rem;" 
                     ondrop="app.handleSmartDrop(event)" 
                     ondragover="app.handleSmartDragOver(event)" 
                     ondragenter="app.handleSmartDragEnter(event)" 
                     ondragleave="app.handleSmartDragLeave(event)"
                     onclick="document.getElementById('smartFileInput').click()">
                    <div id="smartDropContent">
                        <i class="fas fa-magic" style="font-size: 4rem; color: var(--success-color); margin-bottom: 1rem; animation: pulse 2s infinite;"></i>
                        <h3 style="margin: 0 0 0.5rem 0; color: var(--success-color); font-size: 1.5rem;">Drop Photos for AI Analysis</h3>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 1.1rem;">AI will automatically detect patients, stages, and organize your photos</p>
                        <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--success-color);">
                                <i class="fas fa-user-check"></i>
                                <span>Patient Detection</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--success-color);">
                                <i class="fas fa-calendar-check"></i>
                                <span>Date Extraction</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--success-color);">
                                <i class="fas fa-tags"></i>
                                <span>Stage Classification</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hidden File Input -->
                <input type="file" id="smartFileInput" multiple accept="image/*" style="display: none;" onchange="app.handleSmartFileSelect(event)">

                <!-- AI Analysis Progress -->
                <div id="aiAnalysisProgress" style="display: none; background: var(--bg-secondary); padding: 2rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="spinner" style="width: 24px; height: 24px; border: 3px solid var(--border-color); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <h3 style="margin: 0; color: var(--primary-color);">AI Analysis in Progress...</h3>
                    </div>
                    <div id="analysisSteps" style="margin-bottom: 1rem;"></div>
                    <div style="width: 100%; height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden;">
                        <div id="aiProgressBar" style="height: 100%; background: linear-gradient(90deg, var(--primary-color), var(--success-color)); width: 0%; transition: width 0.5s ease;"></div>
                    </div>
                    <div style="text-align: center; margin-top: 1rem; color: var(--text-muted);">
                        <span id="aiProgressText">Initializing AI analysis...</span>
                    </div>
                </div>

                <!-- Smart Results -->
                <div id="smartResults" style="display: none;">
                    <h3 style="margin: 0 0 1.5rem 0; color: var(--primary-color);">
                        <i class="fas fa-check-circle"></i>
                        AI Analysis Complete
                    </h3>
                    <div id="smartResultsGrid" style="display: grid; gap: 1rem; margin-bottom: 2rem;"></div>
                    
                    <!-- Batch Actions -->
                    <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
                        <h4 style="margin: 0 0 1rem 0; color: var(--primary-color);">Batch Actions</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                            <button class="btn btn-success" onclick="app.acceptAllSuggestions()" style="padding: 0.75rem;">
                                <i class="fas fa-check-double"></i>
                                Accept All Suggestions
                            </button>
                            <button class="btn btn-warning" onclick="app.reviewSuggestions()" style="padding: 0.75rem;">
                                <i class="fas fa-eye"></i>
                                Review & Edit
                            </button>
                            <button class="btn btn-info" onclick="app.exportAnalysis()" style="padding: 0.75rem;">
                                <i class="fas fa-download"></i>
                                Export Analysis
                            </button>
                            <button class="btn btn-secondary" onclick="app.resetSmartUpload()" style="padding: 0.75rem;">
                                <i class="fas fa-redo"></i>
                                Start Over
                            </button>
                        </div>
                    </div>

                    <!-- Final Upload -->
                    <div style="text-align: center;">
                        <button class="btn btn-primary" onclick="app.processSmartUpload()" style="padding: 1rem 2rem; font-size: 1.1rem;">
                            <i class="fas fa-cloud-upload-alt"></i>
                            Upload <span id="smartUploadCount">0</span> Organized Photos
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        // Insert after the photo preview section
        const uploadModal = document.getElementById('bulkUploadModal');
        const photoPreviewSection = document.getElementById('photoPreviewSection');
        
        if (photoPreviewSection) {
            photoPreviewSection.insertAdjacentHTML('afterend', smartUploadHtml);
        } else {
            uploadModal.querySelector('.padding').insertAdjacentHTML('beforeend', smartUploadHtml);
        }
    }

    startFolderImport() {
        alert('📁 Folder-Based Import\n\n' +
              'Recommended Folder Structure:\n\n' +
              '📂 Patient Photos/\n' +
              '  📂 Smith, John/\n' +
              '    📂 Braces/\n' +
              '      📂 2024-01-15 - Before/\n' +
              '      📂 2024-02-15 - Progress/\n' +
              '      📂 2024-03-15 - Adjustment/\n' +
              '  📂 Johnson, Sarah/\n' +
              '    📂 Invisalign/\n' +
              '      📂 2024-01-20 - Initial/\n' +
              '      📂 2024-02-20 - Tray 5/\n\n' +
              'Import Process:\n' +
              '1. Select root folder\n' +
              '2. System scans structure\n' +
              '3. Auto-creates patient records\n' +
              '4. Imports with metadata\n' +
              '5. Generates progress timeline\n\n' +
              'Perfect for organized photo collections!');
    }

    showUploadDemo() {
        alert('🎬 Smart Upload Demo\n\n' +
              'Watch how the system processes photos:\n\n' +
              '📸 Photo: "JohnSmith_Before_Jan2024.jpg"\n' +
              '🤖 AI Analysis:\n' +
              '  • Patient: John Smith ✓\n' +
              '  • Treatment: Braces (detected from filename)\n' +
              '  • Stage: Before Treatment ✓\n' +
              '  • Date: January 2024 ✓\n' +
              '  • Quality: Good (sharp, well-lit) ✓\n\n' +
              '📸 Photo: "Progress_Sarah_Invisalign_Tray8.jpg"\n' +
              '🤖 AI Analysis:\n' +
              '  • Patient: Sarah Johnson ✓\n' +
              '  • Treatment: Invisalign ✓\n' +
              '  • Stage: Progress Check ✓\n' +
              '  • Notes: Tray 8 progress ✓\n\n' +
              '⚡ Results:\n' +
              '• 95% accuracy in patient detection\n' +
              '• 90% accuracy in stage classification\n' +
              '• 100% EXIF data extraction\n' +
              '• Automatic duplicate detection\n\n' +
              'Save hours of manual organization!');
    }

    generateImportPlan() {
        const photoCount = document.getElementById('photoCount').value;
        const currentOrg = document.getElementById('currentOrg').value;
        
        let plan = '';
        let timeEstimate = '';
        let strategy = '';

        // Generate custom plan based on selections
        if (photoCount >= 1000) {
            timeEstimate = '2-3 hours with Smart Upload, 8-12 hours manually';
            strategy = 'Batch processing with AI assistance';
        } else if (photoCount >= 500) {
            timeEstimate = '1-2 hours with Smart Upload, 4-6 hours manually';
            strategy = 'Smart Upload with manual review';
        } else {
            timeEstimate = '30-60 minutes with any method';
            strategy = 'Either method works well';
        }

        switch (currentOrg) {
            case 'random':
                plan = '🎯 RECOMMENDED: Smart Upload\n\n' +
                       '1. Use AI-powered filename analysis\n' +
                       '2. EXIF date extraction\n' +
                       '3. Visual pattern recognition\n' +
                       '4. Manual review of uncertain matches\n\n' +
                       '⚡ This will save you 80% of organization time!';
                break;
            case 'dates':
                plan = '🎯 RECOMMENDED: Folder Import + Smart Upload\n\n' +
                       '1. Group photos by date ranges\n' +
                       '2. Use Smart Upload for patient detection\n' +
                       '3. Cross-reference with appointment dates\n' +
                       '4. Auto-assign to treatment stages\n\n' +
                       '⚡ Your date organization gives us a big advantage!';
                break;
            case 'patients':
                plan = '🎯 RECOMMENDED: Folder Import\n\n' +
                       '1. Use existing patient folders\n' +
                       '2. Auto-create patient records\n' +
                       '3. Smart stage detection within folders\n' +
                       '4. Minimal manual work needed\n\n' +
                       '⚡ Perfect! Your organization is already ideal!';
                break;
            case 'mixed':
                plan = '🎯 RECOMMENDED: Hybrid Approach\n\n' +
                       '1. Start with organized sections (Folder Import)\n' +
                       '2. Use Smart Upload for random photos\n' +
                       '3. Merge and deduplicate\n' +
                       '4. Final review and cleanup\n\n' +
                       '⚡ Best of both worlds approach!';
                break;
        }

        alert(`📋 Your Custom Import Plan\n\n` +
              `📊 Photo Count: ${photoCount}+ photos\n` +
              `📁 Current Organization: ${currentOrg}\n\n` +
              `${plan}\n\n` +
              `⏱️ Estimated Time: ${timeEstimate}\n` +
              `🛠️ Strategy: ${strategy}\n\n` +
              `🚀 Ready to start? Choose your preferred method above!`);
    }

    // Global Search Functions
    handleGlobalSearch(query) {
        if (!query || query.length < 2) {
            this.clearSearch();
            return;
        }

        this.isSearchActive = true;
        this.searchResults = this.performSearch(query);
        this.displaySearchResults();
    }

    performSearch(query) {
        const results = [];
        const searchTerm = query.toLowerCase();

        // Search patients
        this.patients.forEach(patient => {
            const score = this.calculateSearchScore(patient, searchTerm, 'patient');
            if (score > 0) {
                results.push({
                    type: 'patient',
                    data: patient,
                    score: score,
                    matchedFields: this.getMatchedFields(patient, searchTerm, 'patient')
                });
            }
        });

        // Search appointments
        this.appointments.forEach(appointment => {
            const score = this.calculateSearchScore(appointment, searchTerm, 'appointment');
            if (score > 0) {
                results.push({
                    type: 'appointment',
                    data: appointment,
                    score: score,
                    matchedFields: this.getMatchedFields(appointment, searchTerm, 'appointment')
                });
            }
        });

        // Search treatment photos
        if (this.treatmentPhotos) {
            this.treatmentPhotos.forEach(photo => {
                const score = this.calculateSearchScore(photo, searchTerm, 'photo');
                if (score > 0) {
                    results.push({
                        type: 'photo',
                        data: photo,
                        score: score,
                        matchedFields: this.getMatchedFields(photo, searchTerm, 'photo')
                    });
                }
            });
        }

        // Sort by relevance score
        return results.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    calculateSearchScore(item, searchTerm, type) {
        let score = 0;
        
        switch (type) {
            case 'patient':
                if (item.name && item.name.toLowerCase().includes(searchTerm)) score += 10;
                if (item.email && item.email.toLowerCase().includes(searchTerm)) score += 8;
                if (item.phone && item.phone.includes(searchTerm)) score += 8;
                if (item.treatment && item.treatment.toLowerCase().includes(searchTerm)) score += 6;
                if (item.notes && item.notes.toLowerCase().includes(searchTerm)) score += 4;
                break;
                
            case 'appointment':
                if (item.patientName && item.patientName.toLowerCase().includes(searchTerm)) score += 10;
                if (item.type && item.type.toLowerCase().includes(searchTerm)) score += 8;
                if (item.status && item.status.toLowerCase().includes(searchTerm)) score += 6;
                if (item.notes && item.notes.toLowerCase().includes(searchTerm)) score += 4;
                if (item.date && item.date.includes(searchTerm)) score += 6;
                if (item.time && item.time.includes(searchTerm)) score += 4;
                break;
                
            case 'photo':
                if (item.patientName && item.patientName.toLowerCase().includes(searchTerm)) score += 10;
                if (item.title && item.title.toLowerCase().includes(searchTerm)) score += 8;
                if (item.description && item.description.toLowerCase().includes(searchTerm)) score += 6;
                if (item.treatmentType && item.treatmentType.toLowerCase().includes(searchTerm)) score += 6;
                if (item.stage && item.stage.toLowerCase().includes(searchTerm)) score += 6;
                if (item.notes && item.notes.toLowerCase().includes(searchTerm)) score += 4;
                if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) score += 4;
                break;
        }
        
        return score;
    }

    getMatchedFields(item, searchTerm, type) {
        const matches = [];
        
        switch (type) {
            case 'patient':
                if (item.name && item.name.toLowerCase().includes(searchTerm)) matches.push('name');
                if (item.email && item.email.toLowerCase().includes(searchTerm)) matches.push('email');
                if (item.phone && item.phone.includes(searchTerm)) matches.push('phone');
                if (item.treatment && item.treatment.toLowerCase().includes(searchTerm)) matches.push('treatment');
                break;
                
            case 'appointment':
                if (item.patientName && item.patientName.toLowerCase().includes(searchTerm)) matches.push('patient');
                if (item.type && item.type.toLowerCase().includes(searchTerm)) matches.push('type');
                if (item.status && item.status.toLowerCase().includes(searchTerm)) matches.push('status');
                if (item.date && item.date.includes(searchTerm)) matches.push('date');
                break;
                
            case 'photo':
                if (item.patientName && item.patientName.toLowerCase().includes(searchTerm)) matches.push('patient');
                if (item.title && item.title.toLowerCase().includes(searchTerm)) matches.push('title');
                if (item.treatmentType && item.treatmentType.toLowerCase().includes(searchTerm)) matches.push('treatment');
                if (item.stage && item.stage.toLowerCase().includes(searchTerm)) matches.push('stage');
                break;
        }
        
        return matches;
    }

    displaySearchResults() {
        if (!this.isSearchActive || this.searchResults.length === 0) {
            this.hideSearchResults();
            return;
        }

        // Create search results dropdown
        let existingDropdown = document.getElementById('searchDropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        const searchInput = document.getElementById('globalSearch');
        const dropdown = document.createElement('div');
        dropdown.id = 'searchDropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 0.5rem;
        `;

        const resultsHtml = this.searchResults.map(result => {
            const icon = this.getSearchResultIcon(result.type);
            const title = this.getSearchResultTitle(result);
            const subtitle = this.getSearchResultSubtitle(result);
            const matches = result.matchedFields.join(', ');

            return `
                <div class="search-result-item" onclick="app.selectSearchResult('${result.type}', ${result.data.id})" style="padding: 1rem; border-bottom: 1px solid var(--border-color); cursor: pointer; transition: background 0.2s ease;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="color: var(--primary-color); font-size: 1.2rem;">
                            <i class="${icon}"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; margin-bottom: 0.25rem;">${title}</div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">${subtitle}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                                Matches: ${matches}
                            </div>
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.75rem;">
                            ${result.type}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        dropdown.innerHTML = `
            <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary); font-weight: 500; font-size: 0.875rem; color: var(--text-secondary);">
                Found ${this.searchResults.length} result${this.searchResults.length !== 1 ? 's' : ''}
            </div>
            ${resultsHtml}
            <div style="padding: 0.5rem 1rem; text-align: center; font-size: 0.75rem; color: var(--text-muted);">
                Press Enter to see all results • ESC to close
            </div>
        `;

        // Position dropdown relative to search input
        const searchContainer = searchInput.parentElement;
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(dropdown);

        // Add hover effects
        dropdown.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'var(--bg-secondary)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
        });
    }

    getSearchResultIcon(type) {
        const icons = {
            'patient': 'fas fa-user',
            'appointment': 'fas fa-calendar',
            'photo': 'fas fa-camera'
        };
        return icons[type] || 'fas fa-search';
    }

    getSearchResultTitle(result) {
        switch (result.type) {
            case 'patient':
                return result.data.name;
            case 'appointment':
                return `${result.data.patientName} - ${result.data.type}`;
            case 'photo':
                return result.data.title;
            default:
                return 'Unknown';
        }
    }

    getSearchResultSubtitle(result) {
        switch (result.type) {
            case 'patient':
                return `${result.data.treatment || 'No treatment'} • Age ${result.data.age}`;
            case 'appointment':
                return `${result.data.date} at ${result.data.time} • ${result.data.status}`;
            case 'photo':
                return `${result.data.patientName} • ${this.getTreatmentLabel(result.data.treatmentType)} • ${this.getStageLabel(result.data.stage)}`;
            default:
                return '';
        }
    }

    selectSearchResult(type, id) {
        this.hideSearchResults();
        
        switch (type) {
            case 'patient':
                this.navigateToPage('patients');
                setTimeout(() => this.viewPatientDetails(id), 300);
                break;
            case 'appointment':
                this.navigateToPage('appointments');
                setTimeout(() => this.toggleAppointment(id), 300);
                break;
            case 'photo':
                this.navigateToPage('treatments');
                setTimeout(() => this.viewPhotoDetails(id), 300);
                break;
        }
        
        // Clear search input
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.value = '';
        }
    }

    clearSearch() {
        this.isSearchActive = false;
        this.searchResults = [];
        this.hideSearchResults();
        
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.value = '';
        }
    }

    hideSearchResults() {
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown) {
            dropdown.remove();
        }
    }

    executeSearch() {
        if (this.searchResults.length > 0) {
            // Navigate to first result
            const firstResult = this.searchResults[0];
            this.selectSearchResult(firstResult.type, firstResult.data.id);
        }
    }

    showAddCollaboratorModal() {
        alert('Add Collaborator Modal - Coming Soon!\n\nFeatures will include:\n• Name and contact info\n• Role assignment\n• Permission levels\n• Access controls');
    }

    // Import functionality
    showImportModal() {
        document.getElementById('importModal').style.display = 'block';
    }

    closeImportModal() {
        document.getElementById('importModal').style.display = 'none';
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            console.log('📁 File selected:', file.name);
            // Here you would process the CSV/Excel file
            alert(`File "${file.name}" selected. Processing functionality will be implemented.`);
        }
    }

    downloadTemplate() {
        const csvContent = `Name,Email,Phone,Age,Treatment Type,Status
John Smith,john@email.com,(555) 123-4567,16,Braces,Active
Sarah Johnson,sarah@email.com,(555) 234-5678,14,Invisalign,Active
Mike Wilson,mike@email.com,(555) 345-6789,18,Retainers,Completed`;
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ortho-denisa-client-template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    processImport() {
        // Process the imported file
        alert('Import processing functionality will be implemented.');
        this.closeImportModal();
    }

    // Materials functionality
    showMaterialsModal() {
        document.getElementById('materialsModal').style.display = 'block';
        this.loadMaterialsList();
    }

    closeMaterialsModal() {
        document.getElementById('materialsModal').style.display = 'none';
    }

    loadMaterialsList() {
        const materialsContent = document.getElementById('materialsContent');
        const orthodonticMaterials = this.getOrthodonticMaterials();
        
        materialsContent.innerHTML = `
            <div style="display: grid; gap: 2rem;">
                ${orthodonticMaterials.map(category => `
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">${category.icon} ${category.category}</h3>
                        </div>
                        <div class="card-body">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                                ${category.items.map(item => `
                                    <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-secondary);">
                                        <div style="font-weight: 600; margin-bottom: 0.5rem;">${item.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">${item.description}</div>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--primary-color); color: white; border-radius: 4px;">${item.supplier}</span>
                                            <span style="font-weight: 600; color: var(--success-color);">${item.price}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getOrthodonticMaterials() {
        return [
            {
                category: "Brackets & Bands",
                icon: "🦷",
                items: [
                    { name: "Metal Brackets", description: "Stainless steel brackets for traditional braces", supplier: "3M Unitek", price: "$2.50/unit" },
                    { name: "Ceramic Brackets", description: "Tooth-colored aesthetic brackets", supplier: "Ormco", price: "$4.75/unit" },
                    { name: "Self-Ligating Brackets", description: "Damon system brackets", supplier: "Ormco", price: "$8.25/unit" },
                    { name: "Molar Bands", description: "Stainless steel molar bands", supplier: "American Orthodontics", price: "$3.20/unit" },
                    { name: "Buccal Tubes", description: "Welded and convertible tubes", supplier: "GAC", price: "$5.80/unit" }
                ]
            },
            {
                category: "Archwires",
                icon: "🔗",
                items: [
                    { name: "NiTi Archwires", description: "Nickel-titanium initial alignment wires", supplier: "3M Unitek", price: "$12.50/pack" },
                    { name: "Stainless Steel Wires", description: "Working and finishing wires", supplier: "American Orthodontics", price: "$8.75/pack" },
                    { name: "Beta-Titanium Wires", description: "TMA wires for finishing", supplier: "Ormco", price: "$15.20/pack" },
                    { name: "Copper NiTi", description: "Heat-activated alignment wires", supplier: "Ormco", price: "$18.90/pack" }
                ]
            },
            {
                category: "Elastics & Ligatures",
                icon: "⭕",
                items: [
                    { name: "Elastic Ligatures", description: "Colored and clear ligature ties", supplier: "3M Unitek", price: "$25.00/1000" },
                    { name: "Steel Ligatures", description: "Stainless steel wire ligatures", supplier: "American Orthodontics", price: "$35.00/1000" },
                    { name: "Elastic Chains", description: "Continuous and short chains", supplier: "GAC", price: "$45.00/roll" },
                    { name: "Intermaxillary Elastics", description: "Class II/III correction elastics", supplier: "3M Unitek", price: "$28.00/bag" }
                ]
            },
            {
                category: "Adhesives & Bonding",
                icon: "🧪",
                items: [
                    { name: "Bracket Adhesive", description: "Light-cure orthodontic adhesive", supplier: "3M Unitek", price: "$85.00/kit" },
                    { name: "Etch Gel", description: "37% phosphoric acid etchant", supplier: "Ormco", price: "$45.00/syringe" },
                    { name: "Primer", description: "Orthodontic bonding primer", supplier: "American Orthodontics", price: "$65.00/bottle" },
                    { name: "Band Cement", description: "Glass ionomer band cement", supplier: "GC America", price: "$120.00/kit" }
                ]
            },
            {
                category: "Appliances",
                icon: "🔧",
                items: [
                    { name: "Rapid Palatal Expander", description: "Hyrax expansion appliance", supplier: "GAC", price: "$125.00/unit" },
                    { name: "Herbst Appliance", description: "Class II correction appliance", supplier: "Dentaurum", price: "$450.00/unit" },
                    { name: "Quad Helix", description: "Expansion and rotation appliance", supplier: "American Orthodontics", price: "$85.00/unit" },
                    { name: "Forsus Springs", description: "Class II corrector springs", supplier: "3M Unitek", price: "$180.00/pair" }
                ]
            },
            {
                category: "Retainers",
                icon: "🛡️",
                items: [
                    { name: "Hawley Retainers", description: "Removable acrylic retainers", supplier: "Great Lakes", price: "$95.00/unit" },
                    { name: "Clear Retainers", description: "Vacuum-formed clear retainers", supplier: "Align Technology", price: "$75.00/unit" },
                    { name: "Bonded Retainers", description: "Fixed lingual retainer wire", supplier: "3M Unitek", price: "$25.00/arch" },
                    { name: "Spring Retainers", description: "Active retainer with springs", supplier: "American Orthodontics", price: "$110.00/unit" }
                ]
            },
            {
                category: "Impression Materials",
                icon: "👄",
                items: [
                    { name: "Alginate", description: "Fast-set impression alginate", supplier: "Dentsply", price: "$35.00/lb" },
                    { name: "PVS Impression Material", description: "Polyvinyl siloxane putty", supplier: "3M ESPE", price: "$125.00/kit" },
                    { name: "Digital Scanner Tips", description: "Disposable scanner sleeves", supplier: "Align Technology", price: "$150.00/box" },
                    { name: "Bite Registration", description: "Vinyl polysiloxane bite material", supplier: "GC America", price: "$85.00/cartridge" }
                ]
            },
            {
                category: "Instruments",
                icon: "🔨",
                items: [
                    { name: "Bracket Placement Forceps", description: "Precision bracket positioning", supplier: "Hu-Friedy", price: "$185.00/unit" },
                    { name: "Archwire Cutters", description: "Distal end cutting pliers", supplier: "Hu-Friedy", price: "$220.00/unit" },
                    { name: "Ligature Directors", description: "Elastic placement instruments", supplier: "American Orthodontics", price: "$95.00/unit" },
                    { name: "Torquing Keys", description: "Wire torquing instruments", supplier: "GAC", price: "$125.00/set" }
                ]
            }
        ];
    }

    performGlobalSearch(query) {
        console.log('🔍 Searching for:', query);
    }

    toggleUserMenu() {
        console.log('👤 User menu toggled');
    }
}

// Global functions
function navigateToPage(page) {
    app.navigateToPage(page);
}

function showNewPatientModal() {
    app.showNewPatientModal();
}

function showAppointmentModal() {
    app.showAppointmentModal();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Starting Ortho-Denisa App');
    try {
        window.app = new OrthoDenisaApp();
        console.log('✅ App instance created successfully');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        // Fallback: show error message
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 400px; color: var(--danger-color);">
                    <div style="text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Error Loading Application</h3>
                        <p>Please refresh the page or contact support.</p>
                        <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 1rem;">
                            <i class="fas fa-refresh"></i>
                            Refresh Page
                        </button>
                    </div>
                </div>
            `;
        }
    }
});
