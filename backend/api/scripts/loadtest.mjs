import process from 'node:process';

const baseUrl = process.env.LOADTEST_URL ?? 'http://127.0.0.1:8080';
const durationMs = Number(process.env.LOADTEST_DURATION_MS ?? 10000);
const concurrency = Number(process.env.LOADTEST_CONCURRENCY ?? 20);
const endpoint = process.env.LOADTEST_ENDPOINT ?? '/health';
const deadline = Date.now() + durationMs;
let completed = 0;
let failed = 0;
const latencies = [];

async function worker() {
  while (Date.now() < deadline) {
    const started = performance.now();
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      if (!response.ok) failed++;
      else completed++;
    } catch {
      failed++;
    } finally {
      latencies.push(performance.now() - started);
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
latencies.sort((a, b) => a - b);
const percentile = (value) => latencies[Math.min(latencies.length - 1, Math.floor(latencies.length * value))] ?? 0;
const total = completed + failed;
console.log(JSON.stringify({
  url: `${baseUrl}${endpoint}`, durationMs, concurrency, requests: total, completed, failed,
  requestsPerSecond: Math.round(total / (durationMs / 1000)),
  latencyMs: { p50: Number(percentile(0.5).toFixed(2)), p95: Number(percentile(0.95).toFixed(2)), p99: Number(percentile(0.99).toFixed(2)) }
}, null, 2));
if (!total || failed / total > 0.01) process.exitCode = 1;
