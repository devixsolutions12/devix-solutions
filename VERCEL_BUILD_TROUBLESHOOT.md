# Vercel Build Troubleshooting Guide

## Common Build Errors and Solutions

### Error: Command "npm run build" exited with 1

This is one of the most common Vercel build errors. Here's how to fix it:

## 🔧 Solutions

### 1. Update vercel.json Configuration

Ensure your `vercel.json` includes proper build settings:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "buildCommand": "npm run build:vercel",
  "installCommand": "npm install",
  "nodeVersion": "20.x",
  "buildEnv": {
    "NEXT_TELEMETRY_DISABLED": "1"
  }
}
```

### 2. Add Robust Build Scripts

Update your `package.json` with more robust build scripts:

```json
{
  "scripts": {
    "build": "next build --turbopack",
    "build:vercel": "NEXT_TELEMETRY_DISABLED=1 next build",
    "build:ci": "npm run clean && next build",
    "clean": "rimraf .next"
  },
  "devDependencies": {
    "rimraf": "^5.0.0"
  }
}
```

### 3. Check Node.js Version Compatibility

Vercel supports specific Node.js versions:
- 18.x (recommended)
- 20.x (recommended)
- 22.x

Set the version in your `vercel.json`:
```json
{
  "nodeVersion": "20.x"
}
```

## 📋 Diagnostic Steps

### 1. Run the Build Troubleshooter
```bash
node build-troubleshooter.js
```

### 2. Clean Build Locally
```bash
npm run clean
npm install
npm run build
```

### 3. Check for TypeScript Errors
```bash
npx tsc --noEmit
```

### 4. Verify Dependencies
```bash
npm ls
```

## 🛠️ Environment Variables

If your build requires environment variables:

1. Add them in the Vercel dashboard:
   - Project Settings → Environment Variables
   - Add required variables

2. Or create a `.env.production` file:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```

## 📁 File Structure Issues

Ensure your project structure is correct:
```
project-root/
├── package.json
├── next.config.ts
├── tsconfig.json
├── vercel.json
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── components/
└── public/
```

## 🔄 Vercel-Specific Solutions

### 1. Clear Build Cache
In Vercel dashboard:
1. Go to your project
2. Click "Settings"
3. Click "Build & Development Settings"
4. Enable "Include source files outside of the Root Directory in the Build Step"
5. Redeploy

### 2. Use Different Build Command
Try these alternatives in `vercel.json`:
```json
{
  "buildCommand": "npm run build:ci"
}
```

Or:
```json
{
  "buildCommand": "next build"
}
```

## 🧪 Testing Locally

Before deploying to Vercel, test locally:

1. **Clean build**:
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Check for errors**:
   ```bash
   npm run lint
   ```

## 🎯 Devix Solutions Specific Fixes

For your Devix Solutions project:

1. **Ensure all dependencies are installed**:
   ```bash
   npm install rimraf
   ```

2. **Use the specialized build script**:
   ```bash
   npm run build:vercel
   ```

3. **Check API routes**:
   - Verify all API route files exist
   - Check for TypeScript errors in API routes

## 🆘 Need More Help?

1. **Check Vercel Logs**:
   - Go to your deployment in the Vercel dashboard
   - Click "View Logs" for detailed error information

2. **Contact Vercel Support**:
   - Visit https://vercel.com/support

3. **Review Documentation**:
   - https://vercel.com/docs

## ✅ Success Confirmation

When the build succeeds, you'll see:
```
✅ Compiled successfully
✅ Build completed successfully
```

And your website will be deployed to a URL like:
```
https://your-project.vercel.app
```

Your Devix Solutions website includes:
- Professional dark theme design
- Contact form with admin panel
- Responsive layout
- Advanced animations
- All API endpoints

Run the `build-troubleshooter.js` script to automatically diagnose and fix most build issues!