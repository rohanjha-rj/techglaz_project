/**
 * TechGlaz - Projects Listing Logic
 */

// Sample Project Data
const projects = [
    {
        id: "p1",
        title: "AI-Powered Student Attendance System using Face Recognition",
        branch: "cs",
        branchName: "Computer Science",
        tech: ["python", "machine-learning"],
        techNames: ["Python", "OpenCV", "TensorFlow"],
        difficulty: "intermediate",
        price: 2500,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p2",
        title: "Smart Agriculture Monitoring System via IoT",
        branch: "ee",
        branchName: "Electronics",
        tech: ["iot"],
        techNames: ["Arduino", "Sensors", "Wi-Fi Module"],
        difficulty: "beginner",
        price: 3000,
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p3",
        title: "Blockchain-Based Fake Product Identification System",
        branch: "cs",
        branchName: "Computer Science",
        tech: ["react", "solidity"],
        techNames: ["Ethereum", "React", "Node.js"],
        difficulty: "advanced",
        price: 5000,
        image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p4",
        title: "E-Commerce Website with Recommendation Engine",
        branch: "cs",
        branchName: "Computer Science",
        tech: ["react", "python"],
        techNames: ["MERN Stack", "Python ML"],
        difficulty: "intermediate",
        price: 4500,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p5",
        title: "Automated Railway Gate Control System",
        branch: "ee",
        branchName: "Electrical",
        tech: ["iot"],
        techNames: ["Microcontroller", "IR Sensors"],
        difficulty: "beginner",
        price: 2500,
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p6",
        title: "Design of Multi-Story Residential Building using STAAD.Pro",
        branch: "mech",
        branchName: "Civil",
        tech: ["autocad"],
        techNames: ["STAAD.Pro", "AutoCAD"],
        difficulty: "intermediate",
        price: 3500,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p7",
        title: "Secure Cloud Storage System using Cryptography",
        branch: "cs",
        branchName: "Information Tech",
        tech: ["java"],
        techNames: ["Java", "AES", "MySQL"],
        difficulty: "advanced",
        price: 4000,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "p8",
        title: "Design and Analysis of Disc Brake using ANSYS",
        branch: "mech",
        branchName: "Mechanical",
        tech: ["ansys"],
        techNames: ["ANSYS", "SolidWorks"],
        difficulty: "intermediate",
        price: 3000,
        image: "https://images.unsplash.com/photo-1532054950341-2a912bb67eb8?auto=format&fit=crop&w=600&q=80"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projectsGrid');
    const searchInput = document.getElementById('searchInput');
    const checkboxes = document.querySelectorAll('.filter-cb');
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filtersSidebar = document.getElementById('filtersSidebar');
    const priceSlider = document.getElementById('priceSlider');
    const priceRangeDisplay = document.getElementById('priceRangeDisplay');
    const wishlistViewBtn = document.getElementById('wishlistViewBtn');
    const wishlistCountBadge = document.getElementById('wishlistCountBadge');

    // Wishlist State (Feature 10)
    let wishlist = JSON.parse(localStorage.getItem('techglaz_wishlist')) || [];
    let showingWishlistOnly = false;

    function updateWishlistBadge() {
        if(wishlistCountBadge) {
            wishlistCountBadge.textContent = wishlist.length;
            if(wishlist.length > 0) wishlistViewBtn.classList.add('has-items');
            else wishlistViewBtn.classList.remove('has-items');
        }
    }
    updateWishlistBadge();

    if(wishlistViewBtn) {
        wishlistViewBtn.addEventListener('click', () => {
            showingWishlistOnly = !showingWishlistOnly;
            wishlistViewBtn.classList.toggle('active', showingWishlistOnly);
            if(showingWishlistOnly) {
                wishlistViewBtn.innerHTML = `<i class="fa-solid fa-heart"></i> Show All Projects <span class="wishlist-count-badge" id="wishlistCountBadge">${wishlist.length}</span>`;
            } else {
                wishlistViewBtn.innerHTML = `<i class="fa-regular fa-heart"></i> My Wishlist <span class="wishlist-count-badge" id="wishlistCountBadge">${wishlist.length}</span>`;
            }
            filterProjects();
        });
    }

    // Price Slider Logic (Feature 9)
    if(priceSlider && priceRangeDisplay) {
        const updateSliderUI = () => {
            const val = priceSlider.value;
            const max = priceSlider.max;
            const percentage = (val / max) * 100;
            priceSlider.style.setProperty('--thumb-pos', `${percentage}%`);
            priceRangeDisplay.innerHTML = `Up to &#8377;${parseInt(val).toLocaleString('en-IN')}`;
        };
        priceSlider.addEventListener('input', updateSliderUI);
        priceSlider.addEventListener('change', filterProjects);
        updateSliderUI();
    }

    // Mobile filter toggle
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', () => {
            filtersSidebar.classList.toggle('active');
        });
    }

    // Check URL parameters for initial filters
    const urlParams = new URLSearchParams(window.location.search);
    const branchParam = urlParams.get('branch');
    const techParam = urlParams.get('tech');
    const difficultyParam = urlParams.get('difficulty');
    
    if (branchParam) {
        const branches = branchParam.split(',');
        branches.forEach(b => {
            const cb = document.querySelector(`.filter-cb[data-category="branch"][value="${b}"]`);
            if (cb) cb.checked = true;
        });
    }
    if (techParam) {
        const techs = techParam.split(',');
        techs.forEach(t => {
            const cb = document.querySelector(`.filter-cb[data-category="tech"][value="${t}"]`);
            if (cb) cb.checked = true;
        });
    }
    if (difficultyParam) {
        const diffs = difficultyParam.split(',');
        diffs.forEach(d => {
            const cb = document.querySelector(`.filter-cb[data-category="difficulty"][value="${d}"]`);
            if (cb) cb.checked = true;
        });
    }

    // Render projects
    function renderProjects(projectsToRender) {
        grid.innerHTML = '';

        if (projectsToRender.length === 0) {
            grid.innerHTML = `
                <div class="no-results fade-in">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--border-color); margin-bottom: 1rem;"></i>
                    <h2>No projects found</h2>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        projectsToRender.forEach((project, index) => {
            // Difficulty dots logic
            let diffHtml = '';
            if (project.difficulty === 'beginner') {
                diffHtml = `
                    <div class="diff-dot active easy"></div>
                    <div class="diff-dot"></div>
                    <div class="diff-dot"></div>
                `;
            } else if (project.difficulty === 'intermediate') {
                diffHtml = `
                    <div class="diff-dot active medium"></div>
                    <div class="diff-dot active medium"></div>
                    <div class="diff-dot"></div>
                `;
            } else {
                diffHtml = `
                    <div class="diff-dot active hard"></div>
                    <div class="diff-dot active hard"></div>
                    <div class="diff-dot active hard"></div>
                `;
            }

            const isWishlisted = wishlist.includes(project.id);
            const cardHtml = `
                <div class="glass-card project-card fade-in" style="transition-delay: ${index * 0.05}s">
                    <button class="wishlist-btn ${isWishlisted ? 'wishlisted' : ''}" data-id="${project.id}" aria-label="Add to wishlist">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <div class="project-img-wrapper">
                        <img src="${project.image}" alt="${project.title}" class="project-img">
                        <span class="project-branch-badge">${project.branchName}</span>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <div class="project-tags">
                            ${project.techNames.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <div class="project-meta">
                            <div class="project-difficulty">
                                <div class="difficulty-indicator">${diffHtml}</div>
                                <span style="text-transform: capitalize;">${project.difficulty}</span>
                            </div>
                            <span class="project-price">₹${project.price}</span>
                        </div>
                        <div style="display:flex; gap:0.5rem; margin-top:1.5rem;">
                            <button class="btn btn-secondary" onclick="openWhatsAppModal('${project.title.replace(/'/g, "\\'")}', ${project.price})" style="flex:1; padding:0.6rem; font-size:0.85rem;"><i class="fa-brands fa-whatsapp"></i> Quick Order</button>
                            <a href="project-detail.html?id=${project.id}" class="btn btn-primary" style="flex:1; padding:0.6rem; font-size:0.85rem;">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Re-trigger fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.project-card.fade-in').forEach(el => el.classList.add('visible'));
            document.querySelectorAll('.no-results.fade-in').forEach(el => el.classList.add('visible'));
        }, 50);

        // Bind wishlist toggle events
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pid = btn.dataset.id;
                const icon = btn.querySelector('i');
                if(wishlist.includes(pid)) {
                    wishlist = wishlist.filter(id => id !== pid);
                    btn.classList.remove('wishlisted', 'pop');
                    icon.classList.replace('fa-solid', 'fa-regular');
                    if(window.showToast) window.showToast("Removed from wishlist");
                } else {
                    wishlist.push(pid);
                    btn.classList.add('wishlisted', 'pop');
                    icon.classList.replace('fa-regular', 'fa-solid');
                    if(window.showToast) window.showToast("Added to wishlist!");
                }
                localStorage.setItem('techglaz_wishlist', JSON.stringify(wishlist));
                updateWishlistBadge();
                
                // If viewing wishlist only, re-filter when removing
                if(showingWishlistOnly && !wishlist.includes(pid)) {
                    setTimeout(filterProjects, 300); // Small delay for animation
                }
            });
        });
    }

    // Filter Logic
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        
        // Get active filters
        const activeFilters = {
            branch: [],
            tech: [],
            difficulty: []
        };

        checkboxes.forEach(cb => {
            if (cb.checked) {
                activeFilters[cb.dataset.category].push(cb.value);
            }
        });

        const maxPrice = priceSlider ? parseInt(priceSlider.value) : Infinity;

        const filtered = projects.filter(project => {
            // Wishlist View Filter
            if (showingWishlistOnly && !wishlist.includes(project.id)) return false;

            // Search filter
            const matchesSearch = project.title.toLowerCase().includes(searchTerm) || 
                                  project.techNames.some(t => t.toLowerCase().includes(searchTerm));
            
            // Checkbox filters (OR within category, AND across categories)
            const matchesBranch = activeFilters.branch.length === 0 || activeFilters.branch.includes(project.branch);
            const matchesTech = activeFilters.tech.length === 0 || project.tech.some(t => activeFilters.tech.includes(t));
            const matchesDiff = activeFilters.difficulty.length === 0 || activeFilters.difficulty.includes(project.difficulty);

            // Price filter
            const matchesPrice = project.price <= maxPrice;

            return matchesSearch && matchesBranch && matchesTech && matchesDiff && matchesPrice;
        });

        // Update URL dynamically (pushState)
        const params = new URLSearchParams();
        if (activeFilters.branch.length > 0) params.set('branch', activeFilters.branch.join(','));
        if (activeFilters.tech.length > 0) params.set('tech', activeFilters.tech.join(','));
        if (activeFilters.difficulty.length > 0) params.set('difficulty', activeFilters.difficulty.join(','));
        
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, '', newUrl);

        renderProjects(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterProjects);
    checkboxes.forEach(cb => cb.addEventListener('change', filterProjects));

    // Initial Render
    filterProjects();
});
