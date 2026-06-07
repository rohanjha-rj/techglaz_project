/**
 * TechGlaz - Project Detail Logic
 */

// Full Project Database (Extending the simple one from projects.js)
const projectDB = {
    "p1": {
        title: "AI-Powered Student Attendance System using Face Recognition",
        branchName: "Computer Science",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
        overview: "This project automates the process of taking student attendance using facial recognition technology. It captures a video stream from a camera, detects faces, compares them against a known database of students, and logs attendance automatically into a database. This eliminates manual roll calls and prevents proxy attendance.",
        features: [
            "Real-time face detection and recognition",
            "Automatic database logging (MySQL/SQLite)",
            "Web-based dashboard for teachers to view records",
            "Export attendance reports to CSV/Excel",
            "Anti-spoofing techniques (optional)"
        ],
        techs: ["Python", "OpenCV", "TensorFlow", "Flask", "MySQL"],
        prices: {
            basic: 2500,
            standard: 4000,
            premium: 6500
        }
    },
    "p2": {
        title: "Smart Agriculture Monitoring System via IoT",
        branchName: "Electronics",
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1b?auto=format&fit=crop&w=1200&q=80",
        overview: "An IoT-based solution designed to help farmers monitor field conditions remotely. The system uses various sensors to collect data on soil moisture, temperature, and humidity, sending it to a cloud dashboard. It can also automate irrigation based on soil moisture levels.",
        features: [
            "Real-time soil moisture and temperature monitoring",
            "Wi-Fi enabled data transmission via ESP8266/ESP32",
            "Cloud dashboard integration (ThingSpeak/Blynk)",
            "Automated water pump control",
            "SMS/Email alerts for extreme conditions"
        ],
        techs: ["Arduino", "ESP8266", "IoT Sensors", "C++", "Cloud API"],
        prices: {
            basic: 3000,
            standard: 4500,
            premium: 7000
        }
    }
};

// Fallback template for projects not in the DB
const defaultProjectTemplate = {
    title: "Project Details Not Fully Available",
    branchName: "Engineering",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    overview: "Detailed description for this project is currently being updated. Please contact support via WhatsApp for the complete synopsis and details.",
    features: ["Source Code", "Documentation", "Installation Support"],
    techs: ["Modern Tech Stack"],
    prices: { basic: 3000, standard: 5000, premium: 8000 }
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projectDetailContainer');
    
    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    // Load data
    const project = projectDB[projectId] || defaultProjectTemplate;
    if(project === defaultProjectTemplate && projectId) {
        // If not in detailed DB but has an ID, try to get title from URL or use a generic one
        project.title = "Engineering Project (" + projectId + ")";
    }

    // Render Page
    renderProjectPage(project);

    // Setup Package Selection Logic
    setupPackageSelection(project.prices);
});

function renderProjectPage(project) {
    const container = document.getElementById('projectDetailContainer');
    
    const html = `
        <header class="project-detail-header">
            <div class="container fade-in">
                <a href="projects.html" class="back-btn">
                    <i class="fa-solid fa-arrow-left"></i> Back to Projects
                </a>
                <h1 class="project-title">${project.title}</h1>
                <div class="project-meta-top">
                    <span class="badge"><i class="fa-solid fa-graduation-cap"></i> ${project.branchName}</span>
                    <span class="badge"><i class="fa-solid fa-gauge"></i> ${project.difficulty}</span>
                </div>
            </div>
        </header>

        <section class="section">
            <div class="container project-layout">
                <!-- Left Column -->
                <div class="project-main fade-in" style="transition-delay: 0.1s;">
                    <div class="project-gallery">
                        <img src="${project.image}" alt="${project.title}" class="main-image">
                    </div>

                    <div class="details-section">
                        <h2>Project Overview</h2>
                        <p style="color: var(--text-secondary); line-height: 1.8;">${project.overview}</p>
                    </div>

                    <div class="details-section">
                        <h2>Key Features</h2>
                        <div class="feature-list">
                            ${project.features.map(f => `
                                <div class="feature-item">
                                    <i class="fa-solid fa-check"></i>
                                    <span>${f}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="details-section">
                        <h2>Technologies Used</h2>
                        <div class="tech-tags">
                            ${project.techs.map(t => `
                                <span class="tech-tag"><i class="fa-solid fa-code"></i> ${t}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Pricing Sidebar -->
                <aside class="pricing-sidebar glass-card fade-in" style="transition-delay: 0.2s;">
                    <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Select Package</h3>
                    
                    <div class="package-selector">
                        <div class="pkg-btn active" data-pkg="basic">Basic</div>
                        <div class="pkg-btn" data-pkg="standard">Standard</div>
                        <div class="pkg-btn" data-pkg="premium">Premium</div>
                    </div>

                    <div class="price-display">
                        ₹<span id="priceValue" style="font-size: 2.5rem; color: var(--primary); font-weight: 700;">${project.prices.basic}</span>
                        <span>/ one-time</span>
                    </div>

                    <ul class="package-includes" id="packageIncludes">
                        <!-- Populated by JS -->
                    </ul>

                    <div class="action-buttons">
                        <a href="contact.html?type=buy&pkg=basic&project=${encodeURIComponent(project.title)}" id="buyBtn" class="btn btn-primary" style="justify-content: center;">
                            Purchase Package
                        </a>
                        <a href="https://wa.me/916204696995?text=Hi,%20I'm%20interested%20in%20the%20project:%20${encodeURIComponent(project.title)}" target="_blank" class="btn btn-outline" style="justify-content: center; border-color: #25D366; color: #25D366;">
                            <i class="fa-brands fa-whatsapp"></i> Enquire on WhatsApp
                        </a>
                    </div>
                </aside>
            </div>
        </section>
    `;

    container.innerHTML = html;
}

function setupPackageSelection(prices) {
    const pkgBtns = document.querySelectorAll('.pkg-btn');
    const priceValue = document.getElementById('priceValue');
    const packageIncludes = document.getElementById('packageIncludes');
    const buyBtn = document.getElementById('buyBtn');

    const includes = {
        basic: [
            "Complete Source Code",
            "Execution Video",
            "Installation Guide (PDF)",
            "Base Paper (IEEE)"
        ],
        standard: [
            "Everything in Basic",
            "Complete Project Report",
            "PPT Presentation",
            "Synopsis Document",
            "1 Hour Code Explanation Session"
        ],
        premium: [
            "Everything in Standard",
            "Remote Installation Setup",
            "Plagiarism Report",
            "Minor Code Customizations",
            "24/7 Priority Support"
        ]
    };

    function updatePackage(pkg) {
        // Update Buttons
        pkgBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.pkg-btn[data-pkg="${pkg}"]`).classList.add('active');

        // Update Price
        priceValue.innerText = prices[pkg];

        // Update List
        packageIncludes.innerHTML = includes[pkg].map(item => `
            <li><i class="fa-solid fa-check"></i> ${item}</li>
        `).join('');

        // Update Buy Link
        const url = new URL(buyBtn.href);
        url.searchParams.set('pkg', pkg);
        buyBtn.href = url.toString();
    }

    // Initial render
    updatePackage('basic');

    // Click events
    pkgBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            updatePackage(e.target.dataset.pkg);
        });
    });
}
