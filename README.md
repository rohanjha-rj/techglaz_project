# TechGlaz Platform

TechGlaz is a premium platform offering ready-to-deploy final year engineering projects for B.Tech students across various disciplines including Computer Science, Information Technology, Electrical & Electronics, Civil, and Mechanical Engineering.

## Features

- **Project Catalog**: Browse projects by engineering branch.
- **Project Details**: Comprehensive views of individual projects including technologies used and deliverables.
- **Custom Requests**: Form to submit requests for custom-built projects.
- **Responsive Design**: Modern, responsive UI ensuring accessibility across devices.

## Technologies Used

- **HTML5 & CSS3**: Semantic HTML with a custom CSS design system using CSS Variables, modern grid/flex layouts, and glassmorphism styling.
- **JavaScript**: Vanilla JS for interactive elements (modals, mobile navigation, lazy loading, API mocks).
- **FontAwesome**: For scalable vector icons.
- **Google Fonts**: Inter (Body) & Plus Jakarta Sans (Headings).

## Project Structure

```
techglaz_project/
├── index.html           # Landing page
├── projects.html        # Projects catalog
├── project-detail.html  # Individual project view
├── portfolio.html       # Student portfolio showcase
├── blog.html            # Tech blog
├── pricing.html         # Pricing plans
├── contact.html         # Contact page
├── custom-request.html  # Custom project request form
├── css/
│   └── style.css        # Main stylesheet & design system
├── js/
│   ├── main.js          # Global scripts (nav, theme, utils)
│   ├── projects.js      # Projects filtering and rendering
│   ├── project-detail.js# Project specific interactions
│   └── blog.js          # Blog rendering and interactions
└── assets/
    └── images/
        └── techglaz_hero.png # Hero background image
```

## How to Run Locally

Since this is a static website, you can run it using any local web server.

1.  **Using VS Code Live Server Extension:**
    - Open the `techglaz_project` folder in VS Code.
    - Right-click `index.html` and select "Open with Live Server".

2.  **Using Python:**
    ```bash
    # For Python 3.x
    python -m http.server 8000
    ```
    Then open `http://localhost:8000` in your browser.

## UI/UX Notes

- The project uses modern web design patterns including Micro-Interactions, Lazy Loading for improved performance, and a fully functional mobile-responsive menu.
- The UI is designed to be accessible and focuses on clear typography hierarchies.