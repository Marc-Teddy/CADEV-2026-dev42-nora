import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    steady: { executor: 'constant-arrival-rate', rate: 100, timeUnit: '1s', duration: '2m', preAllocatedVUs: 20, maxVUs: 100 }
  },
  thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: ['p(95)<500', 'p(99)<1000'] }
};

export default function () {
  const response = http.get(`${__ENV.BASE_URL || 'http://127.0.0.1:8080'}/health`);
  check(response, { 'health is 200': (item) => item.status === 200 });
  sleep(0.1);
}
