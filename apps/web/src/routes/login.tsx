'use client';

import { useState } from 'react';
import LoginLayout from '../../features/Auth/Login/Login'; // Importing the new Login layout
import { createClient } from '@prime/api';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  // The actual login form implementation will be added to the left panel of LoginLayout later.
  // For now, the layout uses a placeholder as requested.
  // We can pass handleLogin to it later.
  const handleLogin = async (data: any) => {
    console.log('Login', data);
    try {
      const client = createClient({
        baseURL: 'http://202.51.1.109:4545',
        headers: {
          Authorization:
            'Bearer 8e2OYjVMvj8trriL4EDwQYUhHd0tHmlqI4gBfEKHuw+azv18A0zkarpJbCPCzBkgq57amVmtRn1g2Mf0LqiR3xWd5IOrEUgSh0o9Mnz9W9vuCSiDzwmMGH1HD9EG+3ub8Wh9KVD2smsy97CQrdjw9Iyl2Uu5KVHZ4GMD6/aHrxri0/lXjmYtBdrOnn7A/J5DjArzwOZ47y+bhOCC4koGcLlZrDJEqUQJOZ8SdYf4EVcXMxsy1dhwh3haIUXNmS/kY/l/aKc+LwXztI0b2CLLUjlB7SNVUExIw26ZATBOc4tEyi9V',
        },
      });
      const res = await client.get<string>('/GetDBConn/EGROW_TECH_PVT._LTD./Admin/Admin@321');
      setResponseMsg(typeof res === 'string' ? res : JSON.stringify(res));
    } catch (error: any) {
      console.error('Login API Error', error);
      setResponseMsg('Error: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <LoginLayout />
      {responseMsg && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 text-center text-sm font-medium text-green-600 bg-white/90 shadow rounded">
          Response: {responseMsg}
        </div>
      )}
    </div>
  );
}
