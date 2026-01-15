import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignInScreen"
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack>
  );
}
