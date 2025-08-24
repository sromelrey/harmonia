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
# First, ensure all changes are committed and pushed
git add .
git commit -m "your commit message"
git push

# Update version and publish
npm version patch
git push --follow-tags
npm publish --access public
```

### Troubleshooting Common Issues

#### Build Errors
If you encounter `ERR_PNPM_OUTDATED_LOCKFILE`:
```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update lockfile"
git push
```

#### TypeScript Build Errors
If you get "Cannot write file 'dist/index.d.ts' because it would overwrite input file":
1. Clean the dist directory: `rm -rf dist`
2. Ensure `dist` is in the exclude list in `tsconfig.build.json`
3. Run build: `npm run build:lib`

#### Git Working Directory Not Clean
If npm version fails with "Git working directory not clean":
```bash
git add .
git commit -m "your changes"
git push
npm version patch
```