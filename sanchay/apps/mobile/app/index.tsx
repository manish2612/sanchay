import { View, Text } from 'react-native';
import { APP_NAME } from '@sanchay/config';
import { Button } from '@sanchay/ui';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to {APP_NAME} Mobile</Text>
      <Button onClick={() => console.log('Mobile Click')}>
        <Text>Shared UI Button</Text>
      </Button>
    </View>
  );
}
