/**
 * Projects Management Script
 * This script handles the projects data and rendering for both the main site and admin panel
 */

// Sample projects data (will be replaced with localStorage data if available)
const sampleProjects = [
    {
        id: 1,
        title: 'AI Chatbot Assistant',
        description: 'A conversational AI chatbot built with natural language processing capabilities to assist users with various tasks.',
        image: 'images/projects/project1.svg',
        tags: ['AI', 'NLP', 'Python'],
        link: 'https://github.com/arinsingh01/ai-chatbot'    },    {        id: 2,        title: 'IoT Smart Home System',        description: 'An integrated IoT system for home automation, including temperature control, lighting, and security features.',        image: 'images/projects/project2.svg',        tags: ['IoT', 'Embedded Systems', 'Cloud'],        link: 'https://github.com/arinsingh01/smart-home'    },    {        id: 3,        title: 'E-commerce Website',        description: 'A fully responsive e-commerce website with product catalog, shopping cart, and payment integration.',        image: 'images/projects/project3.svg',        tags: ['Web Development', 'JavaScript', 'CSS'],        link: 'https://github.com/arinsingh01/ecommerce-site'
    }
];

// Projects class to handle all project-related operations
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.loadProjects();
    }

    // Load projects from localStorage or use sample data
    loadProjects() {
        const storedProjects = localStorage.getItem('portfolioProjects');
        if (storedProjects) {
            this.projects = JSON.parse(storedProjects);
        } else {
            // Use sample data for first-time users
            this.projects = sampleProjects;
            this.saveProjects();
        }
    }

    // Save projects to localStorage
    saveProjects() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
    }

    // Get all projects
    getAllProjects() {
        return this.projects;
    }

    // Add a new project
    addProject(project) {
        // Generate a unique ID
        const newId = this.projects.length > 0 
            ? Math.max(...this.projects.map(p => p.id)) + 1 
            : 1;
        
        // Create new project object with ID
        const newProject = {
            id: newId,
            title: project.title,
            description: project.description,
            image: project.image,
            tags: project.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            link: project.link || ''
        };
        
        // Add to projects array
        this.projects.push(newProject);
        
        // Save to localStorage
        this.saveProjects();
        
        return newProject;
    }

    // Update an existing project
    updateProject(id, updatedProject) {
        const index = this.projects.findIndex(project => project.id === id);
        
        if (index !== -1) {
            // Process tags if they're a string
            if (typeof updatedProject.tags === 'string') {
                updatedProject.tags = updatedProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            }
            
            // Update the project
            this.projects[index] = {
                ...this.projects[index],
                ...updatedProject,
                id: id // Ensure ID doesn't change
            };
            
            // Save to localStorage
            this.saveProjects();
            
            return this.projects[index];
        }
        
        return null;
    }

    // Delete a project
    deleteProject(id) {
        const index = this.projects.findIndex(project => project.id === id);
        
        if (index !== -1) {
            this.projects.splice(index, 1);
            this.saveProjects();
            return true;
        }
        
        return false;
    }

    // Get a project by ID
    getProjectById(id) {
        return this.projects.find(project => project.id === id) || null;
    }
}

// Create a global instance of the ProjectsManager
const projectsManager = new ProjectsManager();

// Function to render projects on the main page
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    // If the container doesn't exist, we're not on the main page
    if (!projectsContainer) return;
    
    // Clear the container
    projectsContainer.innerHTML = '';
    
    // Get all projects
    const projects = projectsManager.getAllProjects();
    
    // If no projects, show a message
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="no-projects">No projects to display.</p>';
        return;
    }
    
    // Render each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Create tags HTML
        const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
        
        // Set the HTML content
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
                ${project.link ? `<a href="${project.link}" class="btn primary-btn" target="_blank">View Project</a>` : ''}
            </div>
        `;
        
        // Add to the container
        projectsContainer.appendChild(projectCard);
    });
}

// Function to render projects in the admin panel
function renderAdminProjects() {
    const adminProjectsList = document.getElementById('admin-projects-list');
    
    // If the container doesn't exist, we're not on the admin page
    if (!adminProjectsList) return;
    
    // Clear the container
    adminProjectsList.innerHTML = '';
    
    // Get all projects
    const projects = projectsManager.getAllProjects();
    
    // If no projects, show a message
    if (projects.length === 0) {
        adminProjectsList.innerHTML = '<p class="no-projects">No projects to display. Add your first project above!</p>';
        return;
    }
    
    // Render each project
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'admin-project-item';
        projectItem.dataset.id = project.id;
        
        // Set the HTML content
        projectItem.innerHTML = `
            <div class="admin-project-info">
                <h4>${project.title}</h4>
                <p>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
            </div>
            <div class="admin-project-actions">
                <button class="edit-btn" data-id="${project.id}">Edit</button>
                <button class="delete-btn" data-id="${project.id}">Delete</button>
            </div>
        `;
        
        // Add to the container
        adminProjectsList.appendChild(projectItem);
    });
    
    // Add event listeners for edit and delete buttons
    addAdminEventListeners();
}

// Function to add event listeners to admin project items
function addAdminEventListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.dataset.id);
            const project = projectsManager.getProjectById(projectId);
            
            if (project) {
                // Populate the edit form (this will be implemented in admin.js)
                if (typeof openEditProjectModal === 'function') {
                    openEditProjectModal(project);
                }
            }
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.dataset.id);
            
            if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                projectsManager.deleteProject(projectId);
                renderAdminProjects();
                
                // If we're on the main page too, update that
                if (document.getElementById('projects-container')) {
                    renderProjects();
                }
            }
        });
    });
}

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', function() {
    // Render projects on the main page
    renderProjects();
    
    // Render projects on the admin page
    renderAdminProjects();
});