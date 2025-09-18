# GitHub Setup and Automatic Deployment Guide

This guide will help you set up your Devix Solutions website on GitHub with automatic deployment to Vercel.

## 🚀 Automated GitHub Setup

Run the automated setup script:

```bash
npm run github-setup
```

This will:
1. Initialize Git repository (if needed)
2. Create a GitHub repository named "devix-solutions"
3. Push your code to GitHub
4. Prepare for Vercel deployment

## 🔧 Manual GitHub Setup

If you prefer to set up manually:

### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Name your repository "devix-solutions"
3. Set it as Public
4. Don't initialize with a README
5. Click "Create repository"

### 2. Connect Local Repository to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Devix Solutions website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devix-solutions.git
git push -u origin main
```

## 🌐 Automatic Deployment Setup

### Option 1: Vercel GitHub Integration (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your "devix-solutions" repository
4. Vercel will automatically detect it's a Next.js app
5. Click "Deploy"
6. Future pushes to main branch will automatically deploy

### Option 2: GitHub Actions (Advanced)

1. Get your Vercel credentials:
   - Vercel Token: https://vercel.com/account/tokens
   - Organization ID: From Vercel project settings
   - Project ID: From Vercel project settings

2. Add these secrets to your GitHub repository:
   - Go to repo Settings > Secrets and variables > Actions
   - Add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID

3. The GitHub Actions workflow will automatically deploy on pushes to main

## 🔄 Workflow

After setup, your workflow will be:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. GitHub Actions will automatically deploy to Vercel
4. Your site will update automatically

## 🛠️ Troubleshooting

### Common Issues:

1. **Permission denied**:
   - Use HTTPS with username/password or SSH keys
   - Check your GitHub credentials

2. **Repository already exists**:
   - Use a different repository name
   - Or delete the existing repository

3. **Vercel deployment fails**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

### Helpful Commands:

```bash
# Check Git status
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v

# Force push (use with caution)
git push -u origin main --force
```

## 🎉 Success

When everything is set up correctly:
- Your code will be on GitHub
- Changes will automatically deploy to Vercel
- You'll have a professional CI/CD pipeline
- Your site will always be up-to-date

The automated setup script handles most of this for you!