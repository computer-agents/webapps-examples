const endpoints = {
  summary: window.COMPUTER_AGENTS_CONFIG?.opsSummaryUrl || '/api/functions/ops-summary',
  rebuild: window.COMPUTER_AGENTS_CONFIG?.rebuildIndexUrl || '/api/functions/rebuild-index',
};

const fallback = {
  metrics: [
    { label: 'Requests', value: '12.4k' },
    { label: 'Automations', value: '318' },
    { label: 'Errors', value: '2' },
    { label: 'Latency', value: '142ms' },
  ],
  events: [
    { time: '09:41', title: 'Webhook verified', status: 'OK' },
    { time: '09:18', title: 'Customer index rebuilt', status: 'OK' },
    { time: '08:57', title: 'Agent summary generated', status: 'Queued' },
  ],
};

async function getSummary() {
  try {
    const response = await fetch(endpoints.summary);
    if (!response.ok) {
      throw new Error(`Summary failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

function renderSummary(data) {
  const metrics = document.querySelector('#metrics');
  const events = document.querySelector('#events');
  metrics.innerHTML = '';
  events.innerHTML = '';

  for (const metric of data.metrics || fallback.metrics) {
    const node = document.createElement('article');
    node.className = 'metric';
    node.innerHTML = `<span>${metric.label}</span><strong>${metric.value}</strong>`;
    metrics.append(node);
  }

  for (const event of data.events || fallback.events) {
    const node = document.createElement('div');
    node.className = 'event';
    node.innerHTML = `<span>${event.time}</span><strong>${event.title}</strong><span>${event.status}</span>`;
    events.append(node);
  }
}

async function refresh() {
  document.querySelector('#state').textContent = 'Syncing';
  renderSummary(await getSummary());
  document.querySelector('#state').textContent = 'Connected preview';
}

document.querySelector('#rebuild').addEventListener('click', async () => {
  document.querySelector('#state').textContent = 'Rebuild requested';
  try {
    await fetch(endpoints.rebuild, { method: 'POST' });
  } catch (error) {
    console.warn(error);
  }
  await refresh();
});

refresh();

