/**
 * Admin Dashboard JavaScript
 * Handles project and certificate management in the admin panel
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin dashboard
    initAdminDashboard();
});

// Initialize admin dashboard
function initAdminDashboard() {
    // Check if user is logged in as admin
    if (!isAdminLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Setup logout button
    setupLogout();
    
    // Setup add project form
    setupAddProjectForm();
    
    // Create edit project modal
    createEditProjectModal();
    
    // Add 3D effects to admin cards
    addEffectsToAdminElements();
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Setup logout button
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear admin logged in flag
            localStorage.removeItem('adminLoggedIn');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}

// Setup add project form
function setupAddProjectForm() {
    const addProjectForm = document.getElementById('add-project-form');
    
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const projectData = {
                title: document.getElementById('project-title').value,
                description: document.getElementById('project-description').value,
                image: document.getElementById('project-image').value,
                tags: document.getElementById('project-tags').value,
                link: document.getElementById('project-link').value
            };
            
            // Add project
            projectsManager.addProject(projectData);
            
            // Reset form
            addProjectForm.reset();
            
            // Update project list
            renderAdminProjects();
            
            // Show success message
            alert('Project added successfully!');
        });
    }
}

// Create edit project modal
function createEditProjectModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'edit-project-modal';
    modal.className = 'modal';
    
    // Set modal HTML
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Project</h2>
            <form id="edit-project-form">
                <input type="hidden" id="edit-project-id">
                <div class="form-group">
                    <label for="edit-project-title">Project Title</label>
                    <input type="text" id="edit-project-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="edit-project-description">Description</label>
                    <textarea id="edit-project-description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="edit-project-image">Image URL</label>
                    <input type="text" id="edit-project-image" name="image" required>
                </div>
                <div class="form-group">
                    <label for="edit-project-tags">Tags (comma separated)</label>
                    <input type="text" id="edit-project-tags" name="tags">
                </div>
                <div class="form-group">
                    <label for="edit-project-link">Project Link (optional)</label>
                    <input type="text" id="edit-project-link" name="link">
                </div>
                <button type="submit" class="btn primary-btn">Update Project</button>
            </form>
        </div>
    `;
    
    // Add modal to the page
    document.body.appendChild(modal);
    
    // Get the close button
    const closeBtn = modal.querySelector('.close');
    
    // Set up close button click handler
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Set up edit form submission
    const editForm = document.getElementById('edit-project-form');
    
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get project ID
        const projectId = parseInt(document.getElementById('edit-project-id').value);
        
        // Get form data
        const projectData = {
            title: document.getElementById('edit-project-title').value,
            description: document.getElementById('edit-project-description').value,
            image: document.getElementById('edit-project-image').value,
            tags: document.getElementById('edit-project-tags').value,
            link: document.getElementById('edit-project-link').value
        };
        
        // Update project
        projectsManager.updateProject(projectId, projectData);
        
        // Close modal
        modal.style.display = 'none';
        
        // Update project list
        renderAdminProjects();
        
        // Show success message
        alert('Project updated successfully!');
    });
}

// Open edit project modal
function openEditProjectModal(project) {
    // Get modal
    const modal = document.getElementById('edit-project-modal');
    
    if (modal && project) {
        // Set form values
        document.getElementById('edit-project-id').value = project.id;
        document.getElementById('edit-project-title').value = project.title;
        document.getElementById('edit-project-description').value = project.description;
        document.getElementById('edit-project-image').value = project.image;
        document.getElementById('edit-project-tags').value = project.tags.join(', ');
        document.getElementById('edit-project-link').value = project.link || '';
        
        // Show modal
        modal.style.display = 'block';
    }
}

// Add 3D effects and animations to admin elements
function addEffectsToAdminElements() {
    // Add perspective container class to sections
    const adminSection = document.querySelector('.admin-section');
    if (adminSection) {
        adminSection.classList.add('perspective-container');
    }
    
    // Add floating animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('float');
    });
    
    // Add pulse animation to buttons
    const buttons = document.querySelectorAll('.primary-btn');
    buttons.forEach(button => {
        if (!button.classList.contains('pulse')) {
            button.classList.add('pulse');
        }
    });
}