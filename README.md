
https://in-info-web4.luddy.indianapolis.iu.edu/~jtdohner/newm-n315/newm_n315_hw8/

*** Begin Patch
*** Add File: /mnt/c/Users/James Dohner/OneDrive/1. School/NEWM-N-315 Advanced Front-End Devolopment/2. HW/HW7/newm_n315_hw7/README.md
+# NEWM N-315 HW7 — Recipe Frontend
+
+A small front-end recipe management application for the NEWM N-315 Advanced Front-End Development course (Homework 7). This project is a client-side UI built with Vite, vanilla JavaScript, SCSS, and some helper libraries; it provides pages and components for browsing, viewing, creating, editing, and managing recipes.
+
+**Key Features**
+- **Browse recipes:** `public/pages/browse.html` for listing recipes.
+- **View recipe details:** `public/pages/view.html` and `public/pages/recipe.html`.
+- **Create / Edit recipes:** `public/pages/creat.html` and `public/pages/edit-recipe.html` (note: typo preserved from project).
+- **User pages & login:** `public/pages/login.html`, `public/pages/my_recipe.html`.
+- **Responsive navigation & footer:** multiple variants in `public/pages/` for logged-in / logged-out and desktop/mobile.
+
+**Tech / Tools**
+- Vite dev server and build tool (project scaffolded to use Vite).
+- Vanilla JavaScript modules in `src/app` and `src/model` (e.g. `app.js`, `model.js`, `user.js`).
+- SCSS styles in `src/scss`.
+- jQuery is included under `public/lib/jquery-3.7.1.min.js` for any pages that use it.
+
+**Project Structure (important files)**
+- `index.html` — main entry file.
+- `public/pages/` — standalone page templates used by the app (browse, create, view, recipe, login, etc.).
+- `public/lib/` — third-party libs (jQuery).
+- `src/app/` — application logic: `app.js`, `user.js`, `userData.js`.
+- `src/model/` — `model.js` holds data-model related code.
+- `src/scss/` — SCSS source files; compile to CSS when building.
+- `package.json` — npm scripts and dev dependencies (Vite).
+
+**Getting Started (development)**
+1. Install Node.js (LTS recommended) and npm.
+2. From the project root, install dependencies:
+
+```powershell
+npm install
+```
+
+3. Start the dev server (Vite):
+
+```powershell
+npm run dev
+```
+
+4. Open the displayed local URL (typically `http://localhost:5173`) in your browser.
+
+**Build & Preview**
+- Build for production:
+
+```powershell
+npm run build
+```
+
+- Preview the production build locally:
+
+```powershell
+npm run preview
+```
+
+**Notes & Assumptions**
+- This repository contains client-side pages and scripts; there is no back-end included. Any persistence or authentication is either mocked or expected to be implemented separately.
+- Some filenames in `public/pages` include typos (e.g., `creat.html`) — these are preserved from the original project.
+- SCSS files must be compiled by the project build (Vite handles this if configured).
+
+**Next steps you might want**
+- Add a `README` section describing how recipes are stored (mock data vs API) once you decide on a backend.
+- Add a `LICENSE` file if you want to release the project publicly.
+
+If you want, I can run `npm install` and `npm run dev` here, or open and summarize specific files. Which would you like next?
+
*** End Patch
