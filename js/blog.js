/**
 * TechGlaz - Blog Logic
 */

const blogPosts = [
    {
        id: "b1",
        title: "How to Ace Your Final Year Project Viva",
        category: "viva",
        categoryName: "Viva Preparation",
        date: "May 15, 2026",
        author: "TechGlaz Team",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
        excerpt: "The Viva is the most crucial part of your project evaluation. Learn the top 10 questions external examiners always ask and how to answer them confidently."
    },
    {
        id: "b2",
        title: "Top 5 Machine Learning Projects for CSE Students",
        category: "projects",
        categoryName: "Top Projects",
        date: "May 02, 2026",
        author: "TechGlaz Team",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
        excerpt: "Machine Learning is the most sought-after domain for final year projects. Explore these 5 cutting-edge project ideas that will impress your professors."
    },
    {
        id: "b3",
        title: "Why IoT is the Future of Electrical Engineering",
        category: "projects",
        categoryName: "Top Projects",
        date: "April 20, 2026",
        author: "TechGlaz Team",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        excerpt: "Integrating the Internet of Things (IoT) into traditional electrical projects gives you a massive edge. Here's why you should choose an IoT project."
    },
    {
        id: "b4",
        title: "How Your Final Year Project Helps in Placements",
        category: "career",
        categoryName: "Career Tips",
        date: "April 10, 2026",
        author: "TechGlaz Team",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
        excerpt: "Recruiters care more about your project than your GPA. Discover how to leverage your final year project during HR and technical interviews."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('blogGrid');
    const searchInput = document.getElementById('blogSearch');
    const categoryBtns = document.querySelectorAll('.category-btn');

    let currentCategory = 'all';

    function renderPosts(posts) {
        grid.innerHTML = '';

        if (posts.length === 0) {
            grid.innerHTML = `
                <div class="no-results fade-in" style="text-align: center; padding: 3rem; grid-column: 1/-1;">
                    <i class="fa-solid fa-newspaper" style="font-size: 3rem; color: var(--border-color); margin-bottom: 1rem;"></i>
                    <h2>No articles found</h2>
                    <p>Try a different search term or category.</p>
                </div>
            `;
            return;
        }

        posts.forEach((post, index) => {
            const html = `
                <div class="blog-card fade-in" style="transition-delay: ${index * 0.1}s">
                    <div class="blog-img-wrapper">
                        <img src="${post.image}" alt="${post.title}" class="blog-img">
                        <span class="blog-category-badge">${post.categoryName}</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                        </div>
                        <h3 class="blog-title">${post.title}</h3>
                        <p class="blog-excerpt">${post.excerpt}</p>
                        <div style="margin-top: auto;">
                            <a href="#" class="read-more-btn">Read Article <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', html);
        });

        setTimeout(() => {
            document.querySelectorAll('.blog-card.fade-in').forEach(el => el.classList.add('visible'));
        }, 50);
    }

    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        const filtered = blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
            
            return matchesSearch && matchesCategory;
        });

        renderPosts(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterPosts);

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            currentCategory = target.dataset.category;
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            
            filterPosts();
        });
    });

    // Initial Render
    renderPosts(blogPosts);
});
