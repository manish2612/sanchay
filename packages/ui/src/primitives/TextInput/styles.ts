import { StyleSheet } from 'react-native';

export const getRootStyles = (t: any, variant: string = 'default') => {
    let borderColor = t.colors.border;

    if (variant === 'error') {
        borderColor = t.colors.danger || 'red';
    } else if (variant === 'success') {
        borderColor = t.colors.success || 'green';
    }

    return {
        borderColor: borderColor,
        backgroundColor: t.colors.background,
        borderRadius: t.radii.md,
        // We use minHeight instead of fixed height to allow expansion if needed, but standard is 40
        minHeight: t.sizes.buttonHeight || 40,
    };
};

export const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingVertical: 0, // Remove default padding to center text
        // Font styles should come from theme in usage
    },
    slot: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slotLeft: {
        marginRight: 8,
    },
    slotRight: {
        marginLeft: 8,
    },
});
