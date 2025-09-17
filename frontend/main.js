const apiKeyInput = document.getElementById('apiKey');
const modelSelect = document.getElementById('model');
const developerInput = document.getElementById('developer');
const userTextarea = document.getElementById('user');
const sendBtn = document.getElementById('sendBtn');
const outputEl = document.getElementById('output');

function append(text) {
  outputEl.textContent += text;
}

function clearOutput() {
  outputEl.textContent = '';
}

async function sendMessage() {
  const apiKey = apiKeyInput.value.trim();
  const model = modelSelect.value.trim();
  const developer_message = developerInput.value.trim();
  const user_message = userTextarea.value.trim();

  if (!apiKey) {
    alert('Please enter your OpenAI API key.');
    return;
  }
  if (!user_message) {
    alert('Please enter a user message.');
    return;
  }

  clearOutput();
  sendBtn.disabled = true;
  sendBtn.textContent = 'Streaming...';

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, model, developer_message, user_message }),
    });

    if (!resp.ok || !resp.body) {
      const text = await resp.text();
      throw new Error(text || 'Request failed');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      append(chunk);
    }
  } catch (err) {
    append(`\n[Error] ${err.message || String(err)}`);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';
  }
}

sendBtn.addEventListener('click', sendMessage);
userTextarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    sendMessage();
  }
});


