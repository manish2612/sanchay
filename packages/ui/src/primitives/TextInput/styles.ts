import { StyleSheet } from 'react-native';

export const getRootStyles = (t: any, variant: string = 'default', isFocused: boolean = false) => {
    let borderColor = t.colors.border;

    if (variant === 'error') {
        borderColor = t.colors.danger || 'red';
    } else if (variant === 'success') {
        borderColor = t.colors.success || 'green';
    } else if (isFocused) {
        borderColor = t.colors.focusRing || t.colors.primary || 'blue'; // Assume focusRing or primary exists
    }

    return {
        borderColor: borderColor,
        backgroundColor: t.colors.background,
        borderRadius: t.radii.md,
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
    rootInField: {
        minHeight: 48,
        paddingVertical: 6,
    },
    inputWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        height: '100%',
    },
    inputInField: {
        flex: 0,
        minHeight: 20,
    },
    labelDefault: {
        marginBottom: 6,
        fontWeight: '500',
    },
    labelInField: {
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    labelInline: {
        width: 120,
        marginRight: 12,
        fontWeight: '500',
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    defaultContainer: {
        width: '100%',
    },
    slotLeft: {
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slotRight: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
