# Devix Solutions - Vercel Deployment Guide

## Prerequisites
1. Make sure you have Node.js installed (version 18 or higher)
2. Make sure you have a Vercel account

## Deployment Steps

### 1. Navigate to the Project Directory
Open your terminal and navigate to the project directory:
```bash
cd "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build the Project
```bash
npm run build
```

### 4. Deploy to Vercel
First, login to Vercel:
```bash
npx vercel login
```

Follow the prompts to authenticate with your Vercel account.

Then, deploy the project:
```bash
npx vercel --prod
```

## Alternative Deployment Method

If you prefer to use the Vercel dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Sign in to your account
3. Click "New Project"
4. Import your Git repository (GitHub, GitLab, or Bitbucket)
5. Configure the project settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

## Troubleshooting

### If you encounter build errors:
1. Make sure all dependencies are installed: `npm install`
2. Check that your Node.js version is compatible (18 or higher)
3. Clear the build cache: `npm run clean` (if available) or delete the `.next` folder

### If you encounter deployment errors:
1. Make sure your Vercel account is properly authenticated
2. Check that your `vercel.json` file is correctly configured
3. Verify that your API routes are properly set up

## Project Structure
The project should be deployed from the `devix-solutions` directory which contains:
- `package.json`
- `next.config.ts`
- `src/` directory with all the source code
- `public/` directory with static assets
- `vercel.json` configuration file

## Need Help?
If you continue to experience issues, please check the Vercel documentation or contact their support team.