@echo off
echo 🚀 Initiating final deployment...
echo.

REM Navigate to the project directory
cd /d "c:\Users\mgas8\OneDrive\Desktop\Devix Solutions\devix-solutions"

echo 🔍 Checking git status...
git status

echo.
echo ➕ Adding all changes...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Final fixes: Instagram contact info restored, pricing updated, WhatsApp redirection implemented"

echo.
echo 📤 Pushing to GitHub to trigger deployment...
git push origin master

echo.
echo ✅ Changes pushed successfully!
echo 🌐 GitHub Actions will now deploy the updated website
echo 🔗 Check deployment status at: https://github.com/devixsolutions12/devix-solutions/actions
echo.
echo 📋 Summary of changes:
echo    • Instagram contact info restored (visible but non-redirecting)
echo    • Pricing updated (Basic: ₹5,999, Professional: ₹15,999, Enterprise: ₹34,999)
echo    • Contact form submissions redirect to WhatsApp with pre-filled message
echo.
echo ⏳ Deployment typically takes 2-5 minutes to complete
pause