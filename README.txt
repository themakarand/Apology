# A Little Apology — setup guide

## 1. Open the project
Extract `apology_surprise.zip`. Open the `apology_surprise` folder in VS Code.

## 2. Add your photos
Put three photos in `assets/memories/` and name them exactly:
- `memory1.jpg`
- `memory2.jpg`
- `memory3.jpg`

Use JPG files. If your photos are PNG, either convert them to JPG or change the filenames in `index.html` to `.png`.

## 3. Personalize the text
Open `index.html` and search for `Tripathi ji`, then replace it with the name/nickname you want.
Edit the letter paragraphs in the `letter` section. There is no “I love you” text in this version.

## 4. Run it
Simplest: double-click `index.html` to open it in Chrome.
Better: in VS Code install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

## 5. Publish free with GitHub Pages
1. Sign in to GitHub and create a new **Public** repository, e.g. `apology-surprise`.
2. Upload all files and folders from this project (keep the same folder structure).
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main`, folder `/ (root)`, then Save.
6. Wait a minute or two. GitHub will show a website link in the Pages section. Open it on your phone to test, then share that link.

## Notes
- This is a single-page experience with 8 sequential screens, not a multi-page website.
- It uses emoji-style illustrations and Google Fonts. Internet is needed for Google Fonts; the rest works offline.
- Do not upload private photos publicly unless you are comfortable with anyone who has the link viewing them. A public GitHub repository makes uploaded photos publicly accessible.
