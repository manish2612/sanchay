import { View, Text } from 'react-native';
import { UniversalLink } from '@prime/ui';

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, marginBottom: 20 }}>About Prime (Native)</Text>
      <Text style={{ marginBottom: 20 }}>This is a dummy about page to verify routing.</Text>

      <UniversalLink href="/" style={{ color: '#007AFF', textDecorationLine: 'underline' }}>
        &larr; Back to Home
      </UniversalLink>
    </View>
  );
}
