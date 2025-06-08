/**
 * Certificates Management Script
 * This script handles the certificates data and rendering for both the main site and admin panel
 */

// Certificates data (will be replaced with localStorage data if available)
const sampleCertificates = [
    {
        id: 1,
        title: 'AI for Entrepreneurship',
        issuer: 'Skill India Digital Hub & Intel Technology India',
        date: '2025-03-29',
        image: 'images/certificates/ai-entrepreneurship.png',
        link: 'https://courses.skillindiadigital.gov.in/api/custom_api/view_certificate/81f74cf2f72649a29609e2b5f5894d71'    },    {        id: 2,        title: 'Programming for Everybody (Getting Started with Python)',        issuer: 'University of Michigan via Coursera',        date: '2024-10-15',        image: 'images/certificates/python-michigan.png',        link: 'https://www.coursera.org/account/accomplishments/verify/RIW5Y2PUISQ4'    },    {        id: 3,        title: 'AWS Fundamentals',        issuer: 'AWS via Coursera',        date: '2025-04-01',        image: 'images/certificates/aws-fundamentals.png',        link: 'https://www.coursera.org/account/accomplishments/specialization/ND6J9S63DAJ9'    },    {        id: 4,        title: 'Learning Design Thinking: Lead Change in Your Organization',        issuer: 'LinkedIn Learning',        date: '2023-10-07',        image: 'images/certificates/design-thinking.png',        link: '#hero'
    }
];

// Certificates class to handle all certificate-related operations
class CertificatesManager {
    constructor() {
        this.certificates = [];
        this.loadCertificates();
    }

    // Load certificates from localStorage or use sample data
    loadCertificates() {
        const storedCertificates = localStorage.getItem('portfolioCertificates');
        if (storedCertificates) {
            this.certificates = JSON.parse(storedCertificates);
        } else {
            // Use sample data for first-time users
            this.certificates = sampleCertificates;
            this.saveCertificates();
        }
    }

    // Save certificates to localStorage
    saveCertificates() {
        localStorage.setItem('portfolioCertificates', JSON.stringify(this.certificates));
    }

    // Get all certificates
    getAllCertificates() {
        return this.certificates;
    }

    // Add a new certificate
    addCertificate(certificate) {
        // Generate a unique ID
        const newId = this.certificates.length > 0 
            ? Math.max(...this.certificates.map(c => c.id)) + 1 
            : 1;
        
        // Create new certificate object with ID
        const newCertificate = {
            id: newId,
            title: certificate.title,
            issuer: certificate.issuer,
            date: certificate.date,
            image: certificate.image,
            link: certificate.link || ''
        };
        
        // Add to certificates array
        this.certificates.push(newCertificate);
        
        // Save to localStorage
        this.saveCertificates();
        
        return newCertificate;
    }

    // Update an existing certificate
    updateCertificate(id, updatedCertificate) {
        const index = this.certificates.findIndex(certificate => certificate.id === id);
        
        if (index !== -1) {
            // Update the certificate
            this.certificates[index] = {
                ...this.certificates[index],
                ...updatedCertificate,
                id: id // Ensure ID doesn't change
            };
            
            // Save to localStorage
            this.saveCertificates();
            
            return this.certificates[index];
        }
        
        return null;
    }

    // Delete a certificate
    deleteCertificate(id) {
        const index = this.certificates.findIndex(certificate => certificate.id === id);
        
        if (index !== -1) {
            this.certificates.splice(index, 1);
            this.saveCertificates();
            return true;
        }
        
        return false;
    }

    // Get a certificate by ID
    getCertificateById(id) {
        return this.certificates.find(certificate => certificate.id === id) || null;
    }
}

// Create a global instance of the CertificatesManager
const certificatesManager = new CertificatesManager();

// Function to render certificates on the main page
function renderCertificates() {
    const certificatesContainer = document.getElementById('certificates-container');
    
    // If the container doesn't exist, we're not on the main page
    if (!certificatesContainer) return;
    
    // Clear the container
    certificatesContainer.innerHTML = '';
    
    // Get all certificates
    const certificates = certificatesManager.getAllCertificates();
    
    // If no certificates, show a message
    if (certificates.length === 0) {
        certificatesContainer.innerHTML = '<p class="no-certificates">No certificates to display.</p>';
        return;
    }
    
    // Render each certificate
    certificates.forEach(certificate => {
        const certificateCard = document.createElement('div');
        certificateCard.className = 'certificate-card card-3d';
        
        // Format the date
        const formattedDate = new Date(certificate.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Set the HTML content
        certificateCard.innerHTML = `
            <div class="certificate-image">
                <img src="${certificate.image}" alt="${certificate.title}">
            </div>
            <div class="certificate-info">
                <h3>${certificate.title}</h3>
                <div class="certificate-issuer">
                    <i class="fas fa-certificate"></i>
                    <span>${certificate.issuer}</span>
                </div>
                <div class="certificate-date">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${formattedDate}</span>
                </div>
                ${certificate.link ? `<button onclick="window.open('${certificate.link}', '_blank')" class="btn primary-btn certificate-link">Verify Certificate</button>` : ''}
            </div>
        `;

        // Add click event listener to the verify button
        const verifyButton = certificateCard.querySelector('.certificate-link');
        if (verifyButton) {
            verifyButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(certificate.link, '_blank');
            });
        }
        
        // Add to the container
        certificatesContainer.appendChild(certificateCard);
    });
}

// Function to render certificates in the admin panel
function renderAdminCertificates() {
    const adminCertificatesList = document.getElementById('admin-certificates-list');
    
    // If the container doesn't exist, we're not on the admin page
    if (!adminCertificatesList) return;
    
    // Clear the container
    adminCertificatesList.innerHTML = '';
    
    // Get all certificates
    const certificates = certificatesManager.getAllCertificates();
    
    // If no certificates, show a message
    if (certificates.length === 0) {
        adminCertificatesList.innerHTML = '<p class="no-certificates">No certificates to display. Add your first certificate above!</p>';
        return;
    }
    
    // Render each certificate
    certificates.forEach(certificate => {
        const certificateItem = document.createElement('div');
        certificateItem.className = 'admin-certificate-item';
        certificateItem.dataset.id = certificate.id;
        
        // Format the date
        const formattedDate = new Date(certificate.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Set the HTML content
        certificateItem.innerHTML = `
            <div class="admin-certificate-info">
                <h4>${certificate.title}</h4>
                <p>${certificate.issuer} - ${formattedDate}</p>
            </div>
            <div class="admin-certificate-actions">
                <button class="edit-certificate-btn" data-id="${certificate.id}">Edit</button>
                <button class="delete-certificate-btn" data-id="${certificate.id}">Delete</button>
            </div>
        `;
        
        // Add to the container
        adminCertificatesList.appendChild(certificateItem);
    });
    
    // Add event listeners for edit and delete buttons
    addAdminCertificateEventListeners();
}

// Function to add event listeners to admin certificate items
function addAdminCertificateEventListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-certificate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const certificateId = parseInt(this.dataset.id);
            const certificate = certificatesManager.getCertificateById(certificateId);
            
            if (certificate) {
                // Populate the edit form (this will be implemented in admin.js)
                if (typeof openEditCertificateModal === 'function') {
                    openEditCertificateModal(certificate);
                }
            }
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-certificate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const certificateId = parseInt(this.dataset.id);
            
            if (confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
                certificatesManager.deleteCertificate(certificateId);
                renderAdminCertificates();
                
                // If we're on the main page too, update that
                if (document.getElementById('certificates-container')) {
                    renderCertificates();
                }
            }
        });
    });
}

// Initialize certificates on page load
document.addEventListener('DOMContentLoaded', function() {
    // Render certificates on the main page
    renderCertificates();
    
    // Render certificates on the admin page
    renderAdminCertificates();
    
    // Setup add certificate form on admin page
    const addCertificateForm = document.getElementById('add-certificate-form');
    if (addCertificateForm) {
        addCertificateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const certificateData = {
                title: document.getElementById('certificate-title').value,
                issuer: document.getElementById('certificate-issuer').value,
                date: document.getElementById('certificate-date').value,
                image: document.getElementById('certificate-image').value,
                link: document.getElementById('certificate-link').value
            };
            
            // Add certificate
            certificatesManager.addCertificate(certificateData);
            
            // Reset form
            addCertificateForm.reset();
            
            // Update certificate list
            renderAdminCertificates();
            
            // Show success message
            alert('Certificate added successfully!');
        });
    }
    
    // Create edit certificate modal
    createEditCertificateModal();
});

// Create edit certificate modal
function createEditCertificateModal() {
    // Check if we're on the admin page
    if (!document.getElementById('admin-certificates-list')) return;
    
    // Create modal element if it doesn't exist
    if (!document.getElementById('edit-certificate-modal')) {
        const modal = document.createElement('div');
        modal.id = 'edit-certificate-modal';
        modal.className = 'modal';
        
        // Set modal HTML
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Edit Certificate</h2>
                <form id="edit-certificate-form">
                    <input type="hidden" id="edit-certificate-id">
                    <div class="form-group">
                        <label for="edit-certificate-title">Certificate Title</label>
                        <input type="text" id="edit-certificate-title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-certificate-issuer">Issuing Organization</label>
                        <input type="text" id="edit-certificate-issuer" name="issuer" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-certificate-date">Date Issued</label>
                        <input type="date" id="edit-certificate-date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-certificate-image">Certificate Image URL</label>
                        <input type="text" id="edit-certificate-image" name="image" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-certificate-link">Certificate Link (optional)</label>
                        <input type="text" id="edit-certificate-link" name="link">
                    </div>
                    <button type="submit" class="btn primary-btn pulse">Update Certificate</button>
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
        const editForm = document.getElementById('edit-certificate-form');
        
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get certificate ID
            const certificateId = parseInt(document.getElementById('edit-certificate-id').value);
            
            // Get form data
            const certificateData = {
                title: document.getElementById('edit-certificate-title').value,
                issuer: document.getElementById('edit-certificate-issuer').value,
                date: document.getElementById('edit-certificate-date').value,
                image: document.getElementById('edit-certificate-image').value,
                link: document.getElementById('edit-certificate-link').value
            };
            
            // Update certificate
            certificatesManager.updateCertificate(certificateId, certificateData);
            
            // Close modal
            modal.style.display = 'none';
            
            // Update certificate list
            renderAdminCertificates();
            
            // Show success message
            alert('Certificate updated successfully!');
        });
    }
}

// Function to open edit certificate modal
function openEditCertificateModal(certificate) {
    // Get modal
    const modal = document.getElementById('edit-certificate-modal');
    
    if (modal && certificate) {
        // Set form values
        document.getElementById('edit-certificate-id').value = certificate.id;
        document.getElementById('edit-certificate-title').value = certificate.title;
        document.getElementById('edit-certificate-issuer').value = certificate.issuer;
        document.getElementById('edit-certificate-date').value = certificate.date;
        document.getElementById('edit-certificate-image').value = certificate.image;
        document.getElementById('edit-certificate-link').value = certificate.link || '';
        
        // Show modal
        modal.style.display = 'block';
    }
}