import React from 'react';

export function Button({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
    return React.createElement('button', { onClick, style: { padding: 10, backgroundColor: 'blue', color: 'white' } }, children);
}
