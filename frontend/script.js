document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
    
    // Search tabs functionality
    const searchTabs = document.querySelectorAll('.search-tabs button');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('aria-controls');
            
            // Update tab states
            searchTabs.forEach(t => {
                t.setAttribute('aria-selected', 'false');
            });
            
            this.setAttribute('aria-selected', 'true');
            
            // In a real app, you would show/hide the corresponding tab content
            console.log(`Switched to ${tabId}`);
        });
    });
    
    // Booking functionality with loading state
    const bookButtons = document.querySelectorAll('.book-btn, .deal-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.activity-card, .deal-card');
            const activityName = card.querySelector('h4').textContent;
            const price = card.querySelector('.price, .discounted-price').textContent;
            
            // Show loading state
            this.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                this.classList.remove('loading');
                
                // Show confirmation
                showToast(`Successfully booked: ${activityName} for ${price}`);
            }, 1500);
        });
    });
    
    // Search functionality with validation
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const destination = document.getElementById('destination').value.trim();
            const date = document.getElementById('travel-date').value;
            const travelers = document.getElementById('travelers').value;
            
            // Validate inputs
            if (!destination) {
                showToast('Please enter a destination', 'error');
                document.getElementById('destination').focus();
                return;
            }
            
            // Show loading state
            this.classList.add('loading');
            
            // Simulate search
            setTimeout(() => {
                this.classList.remove('loading');
                showToast(`Found activities in ${destination}`);
                document.getElementById('activities').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 2000);
        });
    }
    
    // User dropdown toggle
    const userAvatar = document.querySelector('.user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = document.querySelector('.dropdown-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            dropdown.style.display = isExpanded ? 'none' : 'block';
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
            userAvatar.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Activity filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activities = document.querySelectorAll('.activity-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter category
            const filter = this.textContent.toLowerCase();
            
            // Filter activities
            activities.forEach(activity => {
                if (filter === 'all' || activity.dataset.category === filter) {
                    activity.style.display = 'block';
                } else {
                    activity.style.display = 'none';
                }
            });
            
            // Announce filter change for screen readers
            const liveRegion = document.getElementById('filter-live-region') || createLiveRegion();
            liveRegion.textContent = `Showing ${filter === 'all' ? 'all activities' : filter + ' activities'}`;
        });
    });
    
    // Create a live region for accessibility announcements
    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'filter-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.classList.add('visually-hidden');
        document.body.appendChild(liveRegion);
        return liveRegion;
    }
    
    // Set min date for date picker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travel-date')?.setAttribute('min', today);
    
    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('data-original')) {
            img.setAttribute('data-original', img.src);
        }
        
        img.addEventListener('error', function() {
            this.classList.add('broken');
            console.warn('Image failed to load:', this.alt);
        });
    });
    
    // Toast notification function
    function showToast(message, type = 'success') {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}); 
 // Mobile menu toggle functionality
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.mobile-menu-toggle').setAttribute('aria-expanded', 'false');
                const icon = document.querySelector('.mobile-menu-toggle i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // Image error handling
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="16" dy=".35em" text-anchor="middle" x="150" y="100"%3EImage not available%3C/text%3E%3C/svg%3E';
            });
        });