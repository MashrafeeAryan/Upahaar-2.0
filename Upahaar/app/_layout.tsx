import { Stack } from "expo-router";

/**
 * Root layout for the app.
 *
 * The bottom tabs have their own layout inside app/(tabs)/_layout.tsx.
 * These Stack settings control all screens outside the tabs, such as:
 * - friend/add
 * - friend/[id]
 * - friend/edit/[id]
 * - gifts/preview
 * - gifts/customize
 *
 * headerShown: false removes the default Expo Router header so our custom
 * in-screen headers are the only headers users see.
 */
const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="friend/add" />
      <Stack.Screen name="friend/[id]" />
      <Stack.Screen name="friend/edit/[id]" />
      <Stack.Screen name="gifts/preview" />
      <Stack.Screen name="gifts/customize" />
    </Stack>
  );
};

export default RootLayout;