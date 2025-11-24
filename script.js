document.addEventListener('DOMContentLoaded', () => {

    // --- Name Scramble Animation ---
    const nameHeading = document.getElementById('name-heading');
    // Check for element and data attributes needed for two-line animation
    if (nameHeading && nameHeading.dataset.first && nameHeading.dataset.last) {
        const firstName = nameHeading.dataset.first;
        const lastName = nameHeading.dataset.last;
        const targetText = firstName + lastName; // Combine for length calculation
        const chars = '!<-_\/[]{}—=+*^?#_';
        const scrambleDuration = 1000; // Duration in ms
        let startTime;
        let animationFrameId;

        function randomChar() {
            return chars[Math.floor(Math.random() * chars.length)];
        }

        function updateText(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;

            let scrambledCombinedText = '';
            // Generate scrambled text based on combined length
            for (let i = 0; i < targetText.length; i++) {
                const progress = elapsedTime / scrambleDuration;
                const charRevealTime = (i / targetText.length) * scrambleDuration * 0.6;

                if (elapsedTime > charRevealTime + Math.random() * (scrambleDuration * 0.4) || progress >= 1) {
                    scrambledCombinedText += targetText[i];
                } else {
                    // Use a character that's similar in width to the target character
                    const targetChar = targetText[i];
                    const similarChar = targetChar === ' ' ? ' ' : randomChar();
                    scrambledCombinedText += similarChar;
                }
            }

            // Split the scrambled result based on original first name length
            const scrambledFirst = scrambledCombinedText.substring(0, firstName.length);
            const scrambledLast = scrambledCombinedText.substring(firstName.length);

            // Update heading using innerHTML to render the <br> correctly
            nameHeading.innerHTML = scrambledFirst + '<br>' + scrambledLast;

            // Continue animation or set final state
            if (elapsedTime < scrambleDuration) {
                animationFrameId = requestAnimationFrame(updateText);
            } else {
                nameHeading.innerHTML = firstName + '<br>' + lastName; // Final correct state
            }
        }

        // Start animation after a short delay
        setTimeout(() => {
             if (animationFrameId) cancelAnimationFrame(animationFrameId);
             startTime = null;
             animationFrameId = requestAnimationFrame(updateText);
        }, 100);

    } else {
        console.warn("Name heading element or data-first/data-last attributes not found.");
        // Provide a fallback if the element exists but data is missing
        if (nameHeading) {
            nameHeading.innerHTML = "Your<br>Name"; // Default fallback
        }
    }


    // --- Top Navigation Active State & Scrollspy ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offset = 80; // Account for fixed header
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Scrollspy - highlight active nav link based on scroll position
    function updateActiveNav() {
        if (sections.length === 0) return; // No sections on projects page
        
        const scrollPosition = window.scrollY + 150; // Offset for better detection
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isAtBottom = (windowHeight + window.scrollY) >= documentHeight - 50; // Check if at bottom
        
        let activeSection = null;
        
        // If at the bottom of the page, highlight the last section
        if (isAtBottom && sections.length > 0) {
            activeSection = sections[sections.length - 1].getAttribute('id');
        } else {
            // Otherwise, find the section based on scroll position
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = sectionId;
                }
            });
        }
        
        // If at top of page, default to about section
        if (window.scrollY < 100 && sections.length > 0) {
            activeSection = sections[0].getAttribute('id');
        }
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (activeSection && link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial check
    updateActiveNav();
    
    // Update on scroll (debounced)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 10);
    }, { passive: true });


    // --- Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = modal ? modal.querySelector('.close-btn') : null;
    let scrollPosition = 0; // Store scroll position

    if (modal && modalBody && closeModalBtn) {
        // ================================================================
        // <<< REPLACE WITH YOUR ACTUAL PROJECT DETAILS >>>
        // Keys MUST match 'data-project-id' on cards in HTML
        // ================================================================
        const projectDetails = {
            'proj2': {
                title: '"Inhibitor" Combat Robot',
                image: 'https://i.imgur.com/ZjhPTWQ.jpeg',
                description: `<p>A 1lb vertical spinner combat robot designed and built for the West Coast Combat Robotics League June 2025 competition. Using Hack Club's "Highway" program, I got a 350$ grant to build the robot. More details of this project can be found at the <a href="https://github.com/KaushikTadepalli/Antweight_Robot" target="_blank" rel="noopener noreferrer">Github repo</a>.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: 'https://github.com/KaushikTadepalli/Antweight_Robot'
            },
            'proj5': {
                title: '3D Printed RC Airboat',
                image: 'https://i.imgur.com/XTA5ZOM.png',
                description: `<p>A custom-designed and 3D printed RC airboat I built for fun.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj3': {
                title: '2025 FRC Robot',
                image: 'https://i.imgur.com/zm0xKUw.jpeg',
                description: `<p>Team 972's 2025 FRC competition robot. As the CAD lead and main designer of the robot, I led the design of all the subsystems, a three stage cascade rigged elevator, compliant intake for PVC pipes, and a robust wrist joint and end effector for manipulation and placing of the game pieces.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj4': {
                title: '2024 FRC Robot',
                image: 'https://i.imgur.com/1quDbiY.jpeg',
                description: `<p>Team 972's 2024 FRC competition robot. </p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj1': {
                title: '3D Printed Flying Wing',
                image: 'https://i.imgur.com/VX4kvA4.jpeg',
                description: `<p>RC 3D printed LW-PLA flying wing aircraft. I used the "Scimitar" design from RCgroups and printed the parts from Polymaker LW-PLA on a Bambu X1C. It uses iNAV with a F405 WING and a pusher prop design. While it is currently LOS only, I may add FPV in the future.</p>
                <ul>

                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj6': {
                title: 'Warehouse Automation Cart',
                image: 'https://i.imgur.com/kB00Os8.jpeg',
                description: `<p>A passive latching cart designed and built during my internship at a warehouse automation company. The cart uses car door striker latches to interface and with OMRON LD-90 AMR warehouse robots and a custom designed brake cable system to release the latch. Using sheet metal fabrication and aluminum extrusion, I built a prototype cart that was tested with the robot, as well as creating BOM, documentation, assembly manuals, and doing extensive testing with the AMR in a simulated factory environment.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj7': {
                title: 'Aquarium Ecosystem',
                image: 'https://i.imgur.com/NVfGINd.jpeg',
                description: `<p>A self-sustaining 5-gallon Walstad aquarium ecosystem that I designed and built. This low-tech aquarium was created with a very small budget, consisting of serpentine rocks, manzanita wood, and topsoil gathered from nearby trails. I grew a forest of Rotala H'ra and some Ludwidgia, and kept some Neocaridinia shrimp in the ecosystem. For filtration, there are some Pothos in the hang-on-back filter and other houseplants.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj8': {
                title: 'Photography',
                image: 'https://i.imgur.com/bKDSQhI.jpeg',
                description: `<p>Some of my favorite photos captured on a Nikon D500 and Pixel 8.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj9': {
                title: 'Soarer',
                image: 'https://i.imgur.com/placeholder.jpg',
                description: `<p>Custom twin boom 1.5m wingspan RC pusher aircraft.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj10': {
                title: 'Catalyst',
                image: 'https://i.imgur.com/placeholder.jpg',
                description: `<p>Evolution of inhibitor to compete at BCRC Fall 2025.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            },
            'proj11': {
                title: 'Self Balancing Inverted Pendulum',
                image: 'https://i.imgur.com/placeholder.jpg',
                description: `<p>Arduino Uno + SimpleFOC controlled inverted pendulum implementing PID control algorithms to maintain balance.</p>
                <ul>
                </ul>`,
                liveLink: '#',
                repoLink: '#'
            }
        };
        // ================================================================

        // Function to open the modal
        function openModal(projectId) {
            // Store current scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            const details = projectDetails[projectId];
            if (details) {
                let linksHTML = '';
                const liveValid = details.liveLink && details.liveLink !== '#';
                const repoValid = details.repoLink && details.repoLink !== '#';
                if (liveValid) linksHTML += `<a href="${details.liveLink}" target="_blank" rel="noopener noreferrer">View Live</a>`;
                if (liveValid && repoValid) linksHTML += ' | ';
                if (repoValid) linksHTML += `<a href="${details.repoLink}" target="_blank" rel="noopener noreferrer">View Code</a>`;

                modalBody.innerHTML = `
                    <h2>${details.title || 'Project Details'}</h2>
                    ${details.image ? `<img src="${details.image}" alt="${details.title || 'Project Image'}">` : ''}
                    ${details.description || '<p>No description available.</p>'}
                    ${linksHTML ? `<p class="modal-links">${linksHTML}</p>` : ''}
                `;
                modal.style.display = 'flex';
                modal.classList.add('visible');
                document.body.style.overflow = 'hidden';
            } else {
                console.error(`Project details not found for ID: ${projectId}`);
                modalBody.innerHTML = `<p>Sorry, details for this project could not be loaded.</p>`;
                modal.style.display = 'flex';
                modal.classList.add('visible');
                document.body.style.overflow = 'hidden';
            }
        }

        // Function to close the modal
        function closeModal() {
            modal.classList.remove('visible');
            modal.classList.add('fading');
            // Wait for the fade-out animation to complete before hiding
            setTimeout(() => {
                modal.classList.remove('fading');
                modal.style.display = 'none';
                document.body.style.overflow = '';
                modalBody.innerHTML = '';
                // Restore scroll position
                window.scrollTo(0, scrollPosition);
            }, 300); // Match the CSS transition duration
        }

        // Add click listener to project items
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            item.addEventListener('click', (event) => {
                // Always prevent default navigation
                event.preventDefault();
                
                if (item.dataset.projectId) {
                    const projectId = item.dataset.projectId;
                    const details = projectDetails[projectId];
                    
                    if (details) {
                        // For proj2 (Inhibitor), always show modal
                        if (projectId === 'proj2') {
                            openModal(projectId);
                        } else {
                            // For other projects, try to go to live link first, then repo link, then modal
                            if (details.liveLink && details.liveLink !== '#') {
                                window.open(details.liveLink, '_blank', 'noopener,noreferrer');
                            } else if (details.repoLink && details.repoLink !== '#') {
                                window.open(details.repoLink, '_blank', 'noopener,noreferrer');
                            } else {
                                // Fallback to modal if no links available
                                openModal(projectId);
                            }
                        }
                    } else {
                        console.error(`Project details not found for ID: ${projectId}`);
                    }
                } else {
                     console.error("Could not find project ID on clicked item.");
                }
            });
        });

        // Add listeners to close the modal
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('visible')) closeModal();
        });

    } else {
         console.warn("Modal elements or project card buttons not found. Modal functionality disabled.");
    }


}); // End DOMContentLoaded
