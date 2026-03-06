# Deploy Etno prototype to GitHub Pages

Follow these steps to get a live preview link (e.g. `https://<your-username>.github.io/etno-prototype/`).

## 1. Repo name and base path

- Your site will be at: **`https://<username>.github.io/<repo-name>/`**
- If your repo is **not** named `etno-prototype`, edit [vite.config.ts](vite.config.ts) and change the base:
  - Replace `'/etno-prototype/'` with `'/<your-repo-name>/'` (with leading and trailing slashes).

## 2. Push the deployment files

Commit and push the changes (Vite config, router, workflow):

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

(Use your default branch name if it’s not `main`.)

## 3. Enable GitHub Pages in the repo

1. On GitHub, open your repo **etno-prototype**.
2. Go to **Settings** → **Pages** (in the left sidebar under “Code and automation”).
3. Under **Build and deployment**:
   - **Source**: choose **GitHub Actions** (not “Deploy from a branch”).
4. Save. You don’t need to create a workflow run manually; the next push will trigger it.

## 4. Trigger the first deploy

- If you already pushed in step 2, the **Deploy to GitHub Pages** workflow will run automatically.
- Otherwise, push any commit to `main` (or run the workflow from the **Actions** tab: open “Deploy to GitHub Pages” → **Run workflow**).

## 5. Wait and get the link

1. Go to the **Actions** tab and open the latest **Deploy to GitHub Pages** run.
2. Wait until the workflow finishes (green checkmark).
3. On the **Settings** → **Pages** page, GitHub will show the site URL once the first deployment succeeds.
4. Your preview link: **`https://<username>.github.io/etno-prototype/`**

Share this link with your devs. Direct links like `/etno-prototype/collections` and `/etno-prototype/detail/AD017191` will work thanks to the 404 → SPA fallback.

## Troubleshooting

- **404 on refresh or direct URL**  
  The workflow copies `index.html` to `404.html` so GitHub Pages serves the app for unknown paths. If you still get 404s, check that the workflow ran and the “Setup Pages (404 for SPA routing)” step completed.

- **Wrong base path (blank or broken assets)**  
  If the repo name is different from `etno-prototype`, update `base` in [vite.config.ts](vite.config.ts) to `'/<your-repo-name>/'`.

- **Workflow not running**  
  Confirm the workflow file is on the default branch (e.g. `main`) under `.github/workflows/deploy-pages.yml`, and that **Settings → Pages → Source** is set to **GitHub Actions**.
