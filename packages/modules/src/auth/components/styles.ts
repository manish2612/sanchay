import { StyleSheet } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBrandPanelStyles = (t: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: t.colors.primary || "#007AFF", 
    },
    title: {
      color: t.colors.primaryForeground || "#FFFFFF",
      marginBottom: 16,
    },
    welcome: {
      color: t.colors.primaryForeground || "#FFFFFF",
    },
    subtitle: {
      color: t.colors.primaryForeground || "#FFFFFF",
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 16,
      lineHeight: 38,
    },
    text: {
      color: t.colors.primaryForeground || "#FFFFFF",
      fontSize: 16,
      marginBottom: 16,
      opacity: 0.9,
      lineHeight: 24,
    },
    textLast: {
      color: t.colors.primaryForeground || "#FFFFFF",
      fontSize: 16,
      opacity: 0.9,
      lineHeight: 24,
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormPanelStyles = (t: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      backgroundColor: t.colors.background, // or muted/secondary depending on design
    },
    card: {
      backgroundColor: t.colors.card || t.colors.background,
      borderRadius: 8,
      padding: 32,
      width: "100%",
      maxWidth: 380,
      elevation: 4, // Android shadow
      shadowColor: t.colors.shadow || "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: t.colors.border,
      flex: 0.3,
      maxHeight:350
    },
    header: {
      fontSize: 24,
      marginBottom: 32,
      textAlign: "center",
      color: t.colors.foreground,
      fontWeight: "bold",
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputGroupLast: {
      marginBottom: 24,
    },
    passwordToggle: {
      padding: 8,
    },
    actionGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 32,
      gap: 16,
    },
    actionButton: {
      flex: 1,
    },
    companyHeader: {
      backgroundColor: t.colors.muted,
      padding: 16,
      borderRadius: 6,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom:40
    },
    footerTextContainer: {},
    footerLabel: {
      fontSize: 12,
      color: t.colors.mutedForeground,
    },
    footerName: {
      fontWeight: "500",
      color: t.colors.foreground,
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLoginLayoutStyles = (t: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: t.colors.background, // Ensure background is themed
      justifyContent:'center',
      alignItems:'center'
    },
    splitLayout: {
      flexDirection: "row",
    },
  });
