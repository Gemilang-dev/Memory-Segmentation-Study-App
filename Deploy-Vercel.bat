@echo off
title Deploy SegMentality to Vercel
cd /d "%~dp0desktop-app\public"
echo Deploying desktop-app\public to Vercel...
npx --yes vercel --prod
pause
