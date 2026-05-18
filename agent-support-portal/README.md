# Agent Support Portal

A customer support web app that sends visitor questions to a connected Agent Runtime.

## Connected resources

- Agent Runtime: receives the visitor question and returns an answer or run id.
- Optional database: stores transcripts and customer metadata.

## Expected endpoint

The app posts to `/api/agent-runtime/run` by default:

```json
{
  "input": "Customer question",
  "metadata": {
    "source": "agent-support-portal"
  }
}
```

You can change the endpoint in `app.js` or expose `window.COMPUTER_AGENTS_CONFIG.agentRuntimeUrl`.

