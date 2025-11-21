import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './external-styles.css'

// Import global CSS files from assets
// Note: In Vite, we can import CSS files directly if they are in src, or reference them in index.html if in public.
// Since we put them in public/assets, we should link them in index.html OR we can import them here if we move them to src.
// To keep it simple and allow Vite to process them, it's often better to have them in src/assets.
// However, since I already put them in public/assets, I will link them in index.html.
// BUT, to ensure they are bundled correctly and I can control order, I will try to import them if I can.
// Actually, for public folder, we must use <link> in index.html.
// Let's update index.html to include these links.

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
