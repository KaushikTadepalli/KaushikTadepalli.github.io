// Check if we're on the projects page or project detail page
const isProjectsPage = window.location.pathname.includes('projects.html') || window.location.pathname.includes('/projects/');
if (isProjectsPage) {
    const projectsLink = document.querySelector('a[href="projects.html"], a[href="../projects.html"]');
    if (projectsLink) projectsLink.classList.add('active');
}
