const endpoints = {
  session: window.COMPUTER_AGENTS_CONFIG?.sessionUrl || '/api/auth/session',
  summary: window.COMPUTER_AGENTS_CONFIG?.customerSummaryUrl || '/api/database/customer-summary',
  tickets: window.COMPUTER_AGENTS_CONFIG?.ticketsUrl || '/api/database/tickets',
};

const mock = {
  user: { name: 'Ada Lovelace', email: 'ada@example.com' },
  summary: { openTickets: 3, plan: 'Individual' },
  tickets: [
    { title: 'Connect billing export', status: 'Open', updated: 'Today' },
    { title: 'Review domain verification', status: 'Waiting', updated: 'Yesterday' },
    { title: 'Prepare launch checklist', status: 'Done', updated: '2 days ago' },
  ],
};

async function readJson(url, fallback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

function renderTickets(tickets) {
  const container = document.querySelector('#tickets');
  container.innerHTML = '';

  for (const ticket of tickets) {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <strong>${ticket.title}</strong>
      <span>${ticket.status}</span>
      <span>${ticket.updated}</span>
    `;
    container.append(row);
  }
}

async function loadPortal() {
  document.querySelector('#sync-state').textContent = 'Syncing';
  const [session, summary, tickets] = await Promise.all([
    readJson(endpoints.session, { user: mock.user }),
    readJson(endpoints.summary, mock.summary),
    readJson(endpoints.tickets, { tickets: mock.tickets }),
  ]);

  const user = session.user || mock.user;
  document.querySelector('#user-name').textContent = user.name || 'Signed-in customer';
  document.querySelector('#user-email').textContent = user.email || 'Authenticated by Computer Agents Auth';
  document.querySelector('#ticket-count').textContent = String(summary.openTickets ?? tickets.tickets?.length ?? 0);
  document.querySelector('#plan-name').textContent = summary.plan || 'Workspace';
  renderTickets(tickets.tickets || mock.tickets);
  document.querySelector('#sync-state').textContent = 'Connected preview';
}

document.querySelector('#refresh').addEventListener('click', loadPortal);
loadPortal();

