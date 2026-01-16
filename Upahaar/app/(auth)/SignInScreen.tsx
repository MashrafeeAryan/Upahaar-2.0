import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import InputField from "@/src/components/ui/InputField";
import AppButton from "@/src/components/ui/AppButton";
import { router } from "expo-router";

const SignInScreen = () => {
  // States used for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // API later
  };

  return (
    // Prevents keyboard from covering form fields on iOS
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View className="flex-1 px-6 justify-center bg-background"> 
        {/* Logo */}
        {/* <Image
          source={require("../../assets/logo.png")}
          className="w-24 h-24 self-center mb-8"
          resizeMode="contain"
        /> */}

        {/* Heading */}
        <Text className="text-3xl font-bold text-textPrimary text-center">
          Welcome back
        </Text>

        <Text className="text-base text-textSecondary text-center mt-2 mb-8">
          Sign in to continue tracking birthdays and gifts
        </Text>

        {/* Form */}
        <View className="space-y-2">
          <InputField
            placeholder="Email address"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <InputField
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* CTA */}
        <View className="mt-6">
          <AppButton title="Sign in" onPress={handleSignIn} />
        </View>

        {/* Secondary action */}
        <Pressable
          onPress={() => router.replace("/(auth)/SignUpScreen")}
          className="mt-6"
        >
          <Text className="text-center text-textSecondary">
            Don’t have an account?{" "}
            <Text className="text-primary font-semibold">Create one</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
