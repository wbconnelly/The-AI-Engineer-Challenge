### Frontend: Streaming Chat UI (No Build Tools, Just Works)

Welcome to the tiniest yet mighty frontend. It's a static HTML/CSS/JS setup that talks to the FastAPI backend and streams responses from `/api/chat` in real-time.

#### Features
- **Streaming**: Reads the response as it arrives and updates the UI.
- **No bundlers**: Plain `index.html`, `style.css`, and `main.js`.
- **API key input**: You paste your OpenAI API key in the UI.

#### Prerequisites
- Backend running locally at `http://localhost:8000` or deployed (Vercel supported).

#### Local Development
You can open `frontend/index.html` directly in the browser for a quick check. For full API access with correct CORS and routing, run the backend and serve the repo root:

```bash
# In one terminal (from repo root), start the FastAPI server
uv run uvicorn api.app:app --reload

# Option A: Open the file directly
open frontend/index.html

# Option B (recommended): Serve the repo root to preserve /frontend/* paths
python -m http.server 5500
# Then visit http://localhost:5500/frontend/
```

When deployed on Vercel, routing is already configured so that `/api/*` goes to the Python backend and everything else serves from `frontend/`.

#### How to Use
1. Paste your OpenAI API key.
2. Pick a model (default: `gpt-4.1-mini`).
3. Optionally tweak the developer message.
4. Type a user message and press Send (or Cmd/Ctrl+Enter).
5. Watch the response stream in.

#### Files
- `frontend/index.html`: Structure and inputs
- `frontend/style.css`: Minimal modern styling
- `frontend/main.js`: Fetch logic and streaming reader

Have fun and hack away! ✨