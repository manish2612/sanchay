'use client';

import { useState } from 'react';
import { apiClient } from '@prime/services';

export default function TestApiPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleRequest = async (method: string, operation: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await operation();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getList = () => handleRequest('GET List', () => apiClient.get('/posts'));
  const getDetail = () => handleRequest('GET Detail', () => apiClient.get('/posts/1'));

  const postCreate = () =>
    handleRequest('POST Create', () =>
      apiClient.post('/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    );

  const putUpdate = () =>
    handleRequest('PUT Update', () =>
      apiClient.put('/posts/1', {
        id: 1,
        title: 'foo updated',
        body: 'bar updated',
        userId: 1,
      }),
    );

  const patchUpdate = () =>
    handleRequest('PATCH Update', () =>
      apiClient.patch('/posts/1', {
        title: 'foo patched',
      }),
    );

  const deleteItem = () => handleRequest('DELETE', () => apiClient.delete('/posts/1'));

  // Note: JSONPlaceholder doesn't support multipart, so we use httpbin for this test
  // This might fail if CORS is an issue with httpbin from localhost, but illustrates the code.
  const postMultipart = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Create a client pointing to httpbin just for this test
      const httpbinClient = apiClient.getRawClient(); // Or create new instance
      // For demo purposes, we will assume we can use the existing client if we override baseURL in config
      // But axios instance baseURL is fixed. Let's use full URL.

      const formData = new FormData();
      formData.append('test-file', new Blob(['test content'], { type: 'text/plain' }), 'test.txt');

      const res = await apiClient.post('https://httpbin.org/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">API Utility Test</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={getList}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          GET List
        </button>
        <button
          onClick={getDetail}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          GET Detail
        </button>
        <button
          onClick={postCreate}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          POST Create
        </button>
        <button
          onClick={putUpdate}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          PUT Update
        </button>
        <button
          onClick={patchUpdate}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          PATCH Update
        </button>
        <button
          onClick={deleteItem}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          DELETE
        </button>
        <button
          onClick={postMultipart}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          POST Multipart
        </button>
      </div>

      <div className="border p-4 rounded bg-background min-h-[200px]">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {result && (
          <pre className="text-sm overflow-auto max-h-[500px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
        {!loading && !error && !result && (
          <p className="text-gray-400">Select an operation to see results</p>
        )}
      </div>
    </div>
  );
}
