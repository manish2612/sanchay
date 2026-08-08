import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UniversalLink } from '../primitives/Link';
import { Button } from '../primitives/Button/Button.native';

interface NavDemoProps {
  onLoginPress: () => void;
}

export const NavDemo = ({ onLoginPress }: NavDemoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routing Strategy Demo</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Universal Link (SEO Friendly)</Text>
        <Text style={styles.description}>
          Uses &lt;UniversalLink&gt;. Renders &lt;a&gt; on Web, Link on Native.
        </Text>
        <UniversalLink href="/about" style={styles.link}>
          Go to About Page (Link)
        </UniversalLink>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.subtitle}>2. Callback Pattern (Interactive)</Text>
        <Text style={styles.description}>
          Uses Button + Callback. App Shell handles router.push().
        </Text>
        <Button variant="primary" onPress={onLoginPress}>
          Go to Login (Button)
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    maxWidth: 400,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  section: {
    gap: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
    color: '#000',
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 8,
  },
});
