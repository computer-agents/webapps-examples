const endpoints = {
  status: window.COMPUTER_AGENTS_CONFIG?.integrationStatusUrl || '/api/functions/integration-status',
  sync: window.COMPUTER_AGENTS_CONFIG?.syncProviderUrl || '/api/functions/sync-provider',
};

const fallback = {
  secretConfigured: true,
  lastSync: 'Preview mode',
  records: 128,
  log: [
    'Connected Function: integration-proxy',
    'Secret reference: CRM_API_KEY',
    'Browser never receives the provider token.',
  ],
};

async function requestJson(url, options, fallbackValue) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn(error);
    return fallbackValue;
  }
}

function render(data) {
  document.querySelector('#secret-state').textContent = data.secretConfigured ? 'Configured' : 'Missing';
  document.querySelector('#last-sync').textContent = data.lastSync || 'Never';
  document.querySelector('#records').textContent = String(data.records ?? 0);
  document.querySelector('#log').textContent = Array.isArray(data.log)
    ? data.log.join('\n')
    : JSON.stringify(data, null, 2);
}

async function loadStatus() {
  render(await requestJson(endpoints.status, undefined, fallback));
}

document.querySelector('#sync').addEventListener('click', async () => {
  document.querySelector('#log').textContent = 'Starting provider sync...';
  const result = await requestJson(endpoints.sync, { method: 'POST' }, {
    ...fallback,
    lastSync: new Date().toLocaleString(),
    log: ['Preview mode sync completed.', ...fallback.log],
  });
  render(result);
});

loadStatus();
