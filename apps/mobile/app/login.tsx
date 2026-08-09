import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { LoginScreen } from '@prime/modules';
import { createClient } from '@prime/api';

export default function LoginScreenPage() {
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    console.log('Login Native', data);
    try {
      // Note: localhost might not work on Android emulator, but IP should work.
      // User provided specific IP in URL, so we use that.
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
      console.error('Login Native API Error', error);
      setResponseMsg('Error: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <View style={styles.container}>
      <LoginScreen
        onLogin={handleLogin}
        onForgotPassword={() => console.log('Forgot Password Native')}
      />
      {responseMsg && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response: {responseMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  responseContainer: {
    padding: 16,
    alignItems: 'center',
  },
  responseText: {
    color: 'green',
    fontWeight: '500',
  },
});
