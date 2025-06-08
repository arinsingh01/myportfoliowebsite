# Arin Singh - Portfolio Website

A responsive portfolio website with an admin panel to manage projects.

## Features

- Responsive design that works on all devices
- Clean and modern UI
- Admin panel to add, edit, and delete projects
- Contact form for visitors to reach out
- Sections for showcasing skills, projects, and personal information

## Pages

1. **Home Page (index.html)**
   - Hero section with introduction
   - About Me section with skills
   - Projects section displaying your work
   - Contact section with form and contact information

2. **Admin Dashboard (admin.html)**
   - Protected by login
   - Add new projects
   - Edit existing projects
   - Delete projects

## How to Use

### Viewing the Portfolio

Simply open `index.html` in a web browser to view the portfolio website.

### Accessing the Admin Panel

1. Click the Admin link in the navigation (visible only when logged in)
2. Or use the keyboard shortcut: `Ctrl+Shift+A` to open the login modal
3. Login with the following credentials:
   - Username: `admin`
   - Password: `password`

### Managing Projects

Once logged in to the admin panel, you can:

- **Add Projects**: Fill out the form at the top of the admin page
- **Edit Projects**: Click the "Edit" button next to any project
- **Delete Projects**: Click the "Delete" button next to any project

## Customization

### Changing Login Credentials

For security reasons, you should change the default login credentials. To do this:

1. Open `js/main.js`
2. Find the login form submission handler (around line 80)
3. Change the username and password values

### Adding Your Own Images

1. Create an `images` folder if it doesn't exist
2. Add your profile picture as `images/profile-placeholder.svg` or update the path in the HTML
3. Add project images to `images/projects/` folder
4. Reference your images in the project data

### Customizing Styles

All styles are in the `css` folder:

- `style.css` - Main website styles
- `admin.css` - Admin panel specific styles

## Technical Details

### Data Storage

This portfolio uses the browser's localStorage to store project data. This means:

- Data persists between sessions on the same browser
- Data is not shared between different browsers or devices
- Clearing browser data will reset the projects to the sample data

For a production site, you would want to replace this with a proper backend database.

### Security Note

This is a client-side only implementation for demonstration purposes. In a real-world scenario, you would want to:

1. Implement proper server-side authentication
2. Store data in a secure database
3. Use HTTPS for all communications
4. Implement proper input validation and sanitization

## License

This project is open source and available for personal and commercial use.

## Contact

Arin Singh - Singharin.02@gmail.com

---

Created by Arin Singh