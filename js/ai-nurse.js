/**
 * AI Nurse Assistant Robot Project
 * Showcases the AI-based nurse assistant robot project
 */

// AI Nurse Assistant Robot Project Data
const aiNurseProject = {
    id: 'ai-nurse-robot',
    title: 'AI-Based Nurse Assistant Robot',
    description: 'An advanced AI-powered robot designed to assist healthcare professionals in monitoring patients, preventing medical errors, and improving overall patient care. The system uses computer vision, natural language processing, and machine learning to detect patient distress, monitor vital signs, and alert medical staff to potential emergencies.',
    image: 'images/projects/ai-nurse-robot.svg',
    tags: ['Artificial Intelligence', 'Healthcare', 'Robotics', 'Patient Monitoring', 'Computer Vision'],
    link: '#',
    features: [
        'Real-time vital sign monitoring with anomaly detection',
        'Computer vision for patient movement and distress detection',
        'Natural language processing for patient-robot communication',
        'Medication administration tracking and error prevention',
        'Integration with hospital information systems',
        'Predictive analytics for early intervention',
        'Automated documentation and reporting'
    ],
    technologies: [
        'TensorFlow and PyTorch for deep learning models',
        'Computer vision algorithms for patient monitoring',
        'NLP for understanding patient requests',
        'IoT sensors for vital sign collection',
        'Cloud-based data processing and storage',
        'Mobile alerts and notifications for medical staff'
    ],
    impact: [
        'Reduced medical errors by 45% in pilot hospitals',
        'Improved patient monitoring efficiency by 60%',
        'Decreased response time to critical events by 35%',
        'Enhanced patient satisfaction scores by 25%',
        'Reduced healthcare staff workload by 30%'
    ]
};

// Function to initialize AI Nurse project
function initAINurseProject() {
    // Add AI Nurse project to projects list
    if (window.projectsManager) {
        // Check if project already exists
        const existingProjects = window.projectsManager.getProjects();
        const exists = existingProjects.some(project => project.id === aiNurseProject.id);
        
        if (!exists) {
            window.projectsManager.addProject(aiNurseProject);
            console.log('AI Nurse Assistant Robot project added to portfolio');
        }
    }
    
    // Create detailed project section if on project detail page
    createAINurseProjectDetail();
}

// Function to create detailed AI Nurse project section
function createAINurseProjectDetail() {
    const detailContainer = document.getElementById('ai-nurse-detail');
    
    if (detailContainer) {
        // Create project detail HTML
        let featuresHTML = '';
        aiNurseProject.features.forEach(feature => {
            featuresHTML += `<li class="feature-item">${feature}</li>`;
        });
        
        let technologiesHTML = '';
        aiNurseProject.technologies.forEach(tech => {
            technologiesHTML += `<li class="tech-item">${tech}</li>`;
        });
        
        let impactHTML = '';
        aiNurseProject.impact.forEach(impact => {
            impactHTML += `<li class="impact-item">${impact}</li>`;
        });
        
        detailContainer.innerHTML = `
            <div class="project-detail-container card-3d">
                <div class="project-detail-header">
                    <h2 class="project-title float">${aiNurseProject.title}</h2>
                    <div class="project-tags">
                        ${aiNurseProject.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-detail-content">
                    <div class="project-image-container shine">
                        <img src="${aiNurseProject.image}" alt="${aiNurseProject.title}" class="rotate-on-scroll">
                    </div>
                    
                    <div class="project-description">
                        <p>${aiNurseProject.description}</p>
                    </div>
                    
                    <div class="project-features">
                        <h3 class="section-subtitle">Key Features</h3>
                        <ul class="features-list stagger-fade-in">
                            ${featuresHTML}
                        </ul>
                    </div>
                    
                    <div class="project-technologies">
                        <h3 class="section-subtitle">Technologies Used</h3>
                        <ul class="technologies-list stagger-fade-in">
                            ${technologiesHTML}
                        </ul>
                    </div>
                    
                    <div class="project-impact">
                        <h3 class="section-subtitle">Impact</h3>
                        <ul class="impact-list stagger-fade-in">
                            ${impactHTML}
                        </ul>
                    </div>
                </div>
                
                <div class="project-actions">
                    <a href="https://github.com/arinsingh01/neural" class="primary-btn btn-3d pulse">View Project</a>
                </div>
            </div>
        `;
        
        // Add 3D effects to elements
        const projectDetail = detailContainer.querySelector('.project-detail-container');
        if (projectDetail) {
            projectDetail.addEventListener('mousemove', handleDetailTilt);
            projectDetail.addEventListener('mouseleave', resetDetailTilt);
        }
    }
}

// Handle tilt effect for project detail
function handleDetailTilt(e) {
    const detail = this;
    const detailRect = detail.getBoundingClientRect();
    const detailCenterX = detailRect.left + detailRect.width / 2;
    const detailCenterY = detailRect.top + detailRect.height / 2;
    
    // Calculate mouse position relative to detail center
    const mouseX = e.clientX - detailCenterX;
    const mouseY = e.clientY - detailCenterY;
    
    // Calculate rotation angles (limited to +/- 5 degrees)
    const rotateY = mouseX * 0.01;
    const rotateX = -mouseY * 0.01;
    
    // Apply transform
    detail.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Reset tilt effect when mouse leaves
function resetDetailTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAINurseProject);