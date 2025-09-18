# Devix Solutions

A modern, professional website for Devix Solutions built with Next.js 15.5.3, TypeScript, Framer Motion, and Tailwind CSS.

## 🚀 Quick Deployment

To deploy this website automatically to Vercel:

```bash
npm run deploy
```

Or on Windows, you can:
- Double-click `deploy.bat` 
- Run `deploy.ps1` in PowerShell

This will:
1. Build your project
2. Log you in to Vercel (if not already logged in)
3. Deploy it to Vercel
4. Provide you with a live URL

## 🌐 GitHub Integration

✅ **GitHub setup has been completed!** Your code is now hosted at: https://github.com/devixsolutions12/devix-solutions

To make updates to your GitHub repository:

```bash
git add .
git commit -m "Your changes"
git push origin master
```

This will:
1. Add all changed files
2. Create a new commit with your changes
3. Push code to GitHub

## 🚀 Automatic Vercel Deployment

To set up automatic deployments on every push to GitHub:

1. Get your Vercel credentials:
   - Vercel Token: https://vercel.com/account/tokens
   - Organization ID: From Vercel project settings
   - Project ID: From Vercel project settings

2. Add these secrets to your GitHub repository:
   - Go to https://github.com/devixsolutions12/devix-solutions/settings/secrets/actions
   - Click "New repository secret" and add each of the following:

   ```
   Secret Name: VERCEL_TOKEN
   Value: Your Vercel token

   Secret Name: VERCEL_ORG_ID
   Value: Your Vercel organization ID

   Secret Name: VERCEL_PROJECT_ID
   Value: Your Vercel project ID
   ```

3. The GitHub Actions workflow will automatically deploy on pushes to master branch

## 🛠️ Manual Deployment

If you prefer to deploy manually:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --yes
   ```

## 🎯 Features

- **Fully Responsive Design** - Works on all devices
- **Modern Animations** - Smooth transitions with Framer Motion
- **Contact Form** - Fully functional with admin panel
- **Admin Panel** - Secure login to view messages
- **Dark Theme** - Professional dark color scheme
- **SEO Optimized** - Proper meta tags and structure

## 🔐 Admin Panel Access

After deployment, access the admin panel:
- URL: `https://your-domain.vercel.app/admin/login`
- Username: `admin`
- Password: `devix2025`

## 📝 Contact Form

The contact form stores messages in memory and makes them accessible through the admin panel. All functionality works exactly like on localhost.

## 🎨 Design System

- **Background**: #1a1a1a (near-black charcoal)
- **Text**: #FFFFFF (pure white)
- **Accent**: #A3E635 (bright lime green)
- **Secondary**: #1e3a8a (dark navy blue)
- **Font**: Inter

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── api/          # API routes for contact form
│   ├── admin/        # Admin panel pages
│   └── ...           # Other pages
├── components/       # React components
├── lib/              # Utility functions
└── ...
```

## 🔄 Automation Scripts

This project includes several automation scripts:
- `deploy.js` - Node.js deployment script
- `deploy.bat` - Windows batch file
- `deploy.ps1` - Windows PowerShell script
- `github-setup.js` - GitHub integration script
- `github-setup.bat` - Windows batch file for GitHub setup
- `github-setup.ps1` - Windows PowerShell script for GitHub setup
- `dev.js` - Development utility script

## 🚀 Deployment Platforms

This project works best on:
1. **Vercel** (recommended) - Full functionality with automatic deployments from GitHub
2. **Netlify** - Full functionality
3. **GitHub Pages** (requires static export) - Limited functionality

## 🛠️ Development

To run locally:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

## 🆘 Support

For any issues with deployment or functionality:
1. Check the console output for error messages
2. Ensure you have a stable internet connection
3. Make sure Node.js is installed
4. Try logging in manually: `vercel login`