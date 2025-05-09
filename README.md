
## 🎯 What Did You Build?

I cloned Twitter’s core feed UI and added an **AI‑powered “Summarize”** button under every tweet. When clicked, it:

1. Sends the tweet text to a lightweight Express.js API
2. Calls Hugging Face’s `facebook/bart-large-cnn` model via the Inference API
3. Returns a concise, one‑sentence summary displayed in a drop‑up panel

This enhances readability and engagement by letting users skim conversations at a glance.

---

## ✨ Key Features

* **Pixel‑perfect UI** matching Twitter’s look & feel
* **Summarize button** on each tweet with loading state
* **Drop‑up panel** showing original text + AI summary
* **Secure API** using environment variables (no keys exposed)
* **CORS‑enabled** for easy frontend/backend integration

---

## 🛠 Tech Stack & Tools

* **Frontend:** React (Vite) + Tailwind CSS
* **Backend:** Node.js + Express.js
* **AI Model:** Hugging Face Inference API (`facebook/bart-large-cnn`)
* **HTTP Client:** Axios
* **Deployment:** Vercel for frontend, Render/Heroku for backend (optional)

---
