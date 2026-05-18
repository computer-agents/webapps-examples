const form = document.querySelector('#support-form');
const input = document.querySelector('#question');
const thread = document.querySelector('#thread');

const endpoint =
  window.COMPUTER_AGENTS_CONFIG?.agentRuntimeUrl ||
  '/api/agent-runtime/run';

function addMessage(text, direction) {
  const message = document.createElement('article');
  message.className = `message ${direction}`;
  message.textContent = text;
  thread.append(message);
  thread.scrollTop = thread.scrollHeight;
}

async function askAgent(question) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      input: question,
      metadata: {
        source: 'agent-support-portal',
        requestedAt: new Date().toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Agent runtime returned ${response.status}`);
  }

  return response.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) {
    return;
  }

  input.value = '';
  addMessage(question, 'outgoing');
  addMessage('Working on it...', 'incoming');

  const placeholder = thread.lastElementChild;
  try {
    const result = await askAgent(question);
    placeholder.textContent =
      result.answer ||
      result.output ||
      (result.runId ? `Agent run started: ${result.runId}` : 'Agent response received.');
  } catch (error) {
    placeholder.textContent =
      'Preview mode: connect an Agent Runtime to enable live answers. The submitted question was ready to send.';
    console.warn(error);
  }
});

