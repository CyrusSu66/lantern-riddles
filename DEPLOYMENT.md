# Deploying Lantern Riddle Game to GitHub Pages

Here are the manual steps to deploy your game.

1.  **Create a New Repository on GitHub**
    - Go to [GitHub - New Repository](https://github.com/new).
    - Name it `lantern-riddles` (or any name you prefer).
    - Make sure it's **Public** (for free GitHub Pages).
    - **Do NOT** initialize with README, .gitignore, or License (we already have them).
    - Click **Create repository**.

2.  **Push Your Code**
    - Copy the commands under "**…or push an existing repository from the command line**".
    - Run them in your terminal (inside the `lantern-riddles` folder):
      ```bash
      git remote add origin https://github.com/YOUR_USERNAME/lantern-riddles.git
      git branch -M main
      git push -u origin main
      ```

3.  **Enable GitHub Pages**
    - Go to your repository **Settings** -> **Pages**.
    - under **Build and deployment** -> **Source**, select **GitHub Actions**.
    - *Wait, simpler method:*
    - select **Deploy from a branch**.
    - Under **Branch**, select `main` and folder `/(root)`.
    - Click **Save**.
    
    *Standard Vite Deployment usually requires a build step. For a simple static site, we can use a deploy script or GH Actions.*

    **Recommended: Use a Deploy Script (I can create this for you if you want)**
    
    Alternatively, for a quick manual deploy:
    3.1 Run `npm run build`.
    3.2 Push the `dist` folder to a `gh-pages` branch.
    
    **Easiest Way (GitHub Actions)**:
    - Create `.github/workflows/deploy.yml` (I will create this for you now).
    
    **Action Required now**:
    1. Create the repo on GitHub.
    2. Run the `git remote add` and `git push` commands.
    3. The GitHub Action will automatically deploy it!
