# Harmonia — Deployment & Publishing Guide

This guide covers the full workflow for:
- Pushing code to **GitHub**
- Deploying the app to **Vercel**
- Publishing or updating the package on **npm**

---

## 📚 Table of Contents

| Section | Description |
| ------- | ----------- |
| [1. Pushing to GitHub](#1-pushing-to-github) | How to commit and push code updates |
| [2. Deploying to Vercel](#2-deploying-to-vercel) | How to deploy the app using Vercel |
| [3. Publishing & Updating on npm](#3-publishing--updating-on-npm) | How to publish the library and push updates to npm |


---

## 1. Pushing to GitHub

1. **Stage changes**
   ```bash
   git add .
   git commit -m "Describe your changes here"
   git push origin main
   ```

## 2. Deploying to Vercel


## 3. Publishing & Updating on npm

```bash
npm login
npm run build:lib
npm publish --access public
```