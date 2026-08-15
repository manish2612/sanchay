import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { createApiRegistry, ITokenStorage, ApiError } from '@prime/api';

export const Route = createFileRoute('/dev/api-sandbox')({
  component: ApiSandboxPage,
});

// --- 1. Fake Token Storage (Simulating js-cookie or localStorage) ---
class FakeCookieStorage implements ITokenStorage {
  private token: string | null = 'INITIAL_VALID_TOKEN';
  getToken = () => this.token;
  setToken = (t: string) => {
    this.token = t;
  };
  clearToken = () => {
    this.token = null;
  };
}
const tokenStorage = new FakeCookieStorage();

// --- 2. Initialize the Registry ---
// We use public mock APIs for demonstration
const apiRegistry = createApiRegistry<'JSON_PLACEHOLDER' | 'HTTP_BIN' | 'MOCK_401'>({
  clients: {
    JSON_PLACEHOLDER: { baseURL: 'https://jsonplaceholder.typicode.com' },
    HTTP_BIN: { baseURL: 'https://httpbin.org' },
    MOCK_401: { baseURL: 'https://httpbin.org' }, // Using httpbin because it has better CORS support
  },
  defaultClient: 'JSON_PLACEHOLDER',
  tokenStorage,
  onRefreshToken: async () => {
    console.log('[TokenManager] 401 Intercepted. Starting refresh...');
    // Simulate a slow network refresh call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('[TokenManager] Refresh successful. Setting new token.');
    tokenStorage.setToken('NEW_REFRESHED_TOKEN_' + Date.now());
  },
  onUnauthorized: () => {
    console.error('[TokenManager] Refresh completely failed. Forcing logout.');
  },
});

// --- 3. Inject Mock 401 Interceptor for the Demo ---
// We inject a fake interceptor into the MOCK_401 client to reliably throw a 401.
// This completely bypasses flaky external APIs, CORS issues, and 503s!
apiRegistry.getClient('MOCK_401').getRawClient().interceptors.request.use((config) => {
  if (config.url === '/status/401') {
    return Promise.reject({
      isAxiosError: true,
      config,
      response: { status: 401, data: { message: 'Fake Sandbox 401' } },
    });
  }
  return config;
});

function ApiSandboxPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) =>
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

  // --- Demos ---

  const demoAuthLifecycle = async () => {
    addLog('--- Auth Lifecycle Demo ---');
    addLog(`Current Token: ${tokenStorage.getToken()}`);
    tokenStorage.setToken('MANUALLY_SET_TOKEN');
    addLog(`New Token set in storage: ${tokenStorage.getToken()}`);
    addLog('Future requests will attach this via Request Interceptor automatically.');
  };

  const demoRouting = async () => {
    addLog('--- Multi-URL Routing Demo (Facade DX) ---');
    setLoading(true);
    try {
      // ✅ NEW DX: Using the default client (no config needed)
      addLog('Fetching from JSON_PLACEHOLDER (Default Backend)...');
      const user: any = await apiRegistry.get('/users/1');
      addLog(`Success! User: ${user.name}`);

      // ✅ NEW DX: Using a specific client via config
      addLog('Fetching from HTTP_BIN (Explicit Config)...');
      const binData: any = await apiRegistry.get('/get', { client: 'HTTP_BIN' });
      addLog(`Success! Origin IP: ${binData.origin}`);
    } catch (e: any) {
      addLog(`Routing error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const demoErrorNormalization = async () => {
    addLog('--- Error Normalization Demo ---');
    setLoading(true);
    try {
      // This will 404 — the engine normalizes it before throwing
      await apiRegistry.get('/this-route-does-not-exist', { client: 'JSON_PLACEHOLDER' });
    } catch (error: unknown) {
      // Guaranteed to be an ApiError — never a raw AxiosError
      const cleanError = error as ApiError;
      addLog(
        `✅ Caught Normalized ApiError — Status: ${cleanError.status}, isNetworkError: ${cleanError.isNetworkError}`,
      );
      addLog(`Message: ${cleanError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const demoConcurrency401 = async () => {
    addLog('--- 401 Concurrency Stress Test ---');
    addLog('Firing 3 concurrent 401 requests simultaneously...');
    setLoading(true);

    // httpbin.org/status/401 always returns 401. The interceptor will:
    // 1. Catch the first 401 and start the refresh (2s fake delay)
    // 2. Queue req2 and req3 instead of firing more refreshes
    // 3. After refresh resolves, replay all 3 automatically
    // Since it always returns 401, they'll fail again — but you'll
    // see exactly 1 refresh attempt and 3 replays in the Network tab.
    const makeReq = (id: string) => 
      apiRegistry.get('/status/401', { client: 'MOCK_401' })
        .then(() => `${id} → unexpected success`)
        .catch((e: any) => `${id} → failed with status: ${e.status || 'Network Error'}`);

    const req1 = makeReq('req1');
    const req2 = makeReq('req2');
    const req3 = makeReq('req3');

    const results = await Promise.all([req1, req2, req3]);
    results.forEach((r) => addLog(String(r)));
    addLog('✅ Open Network tab: you should see exactly 1 refresh attempt, then 3 replays.');
    addLog(`Final Token after refresh attempt: ${tokenStorage.getToken()}`);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-2">Centralized API Engine (Phase 1) Sandbox</h1>
      <p className="text-gray-600 mb-8">
        This route proves the generic Axios engine works perfectly *before* we attach RTK Query.
        Open your browser's <b>Network Tab</b> to observe the magic.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={demoAuthLifecycle}
          disabled={loading}
          className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded font-semibold text-left"
        >
          1. Auth Lifecycle
          <div className="text-xs font-normal mt-1 text-blue-600">Test token storage injection</div>
        </button>

        <button
          onClick={demoRouting}
          disabled={loading}
          className="p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded font-semibold text-left"
        >
          2. Multi-Backend Routing
          <div className="text-xs font-normal mt-1 text-green-600">
            Hit JSON Placeholder & HttpBin
          </div>
        </button>

        <button
          onClick={demoErrorNormalization}
          disabled={loading}
          className="p-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded font-semibold text-left"
        >
          3. Error Normalization
          <div className="text-xs font-normal mt-1 text-yellow-600">Catch a 404 cleanly</div>
        </button>

        <button
          onClick={demoConcurrency401}
          disabled={loading}
          className="p-4 bg-red-100 hover:bg-red-200 text-red-800 rounded font-semibold text-left"
        >
          4. 401 Concurrency Stress Test
          <div className="text-xs font-normal mt-1 text-red-600">
            Watch the queue pause and retry in Network tab
          </div>
        </button>
      </div>

      <div className="bg-gray-900 rounded p-4 h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-400 font-mono text-sm uppercase tracking-wider">
            Sandbox Console
          </h2>
          <button onClick={() => setLogs([])} className="text-gray-500 hover:text-white text-xs">
            Clear
          </button>
        </div>
        {logs.map((log, i) => (
          <div key={i} className="text-green-400 font-mono text-sm mb-1">
            {log}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gray-600 font-mono text-sm italic">Click a demo above...</div>
        )}
      </div>
    </div>
  );
}
