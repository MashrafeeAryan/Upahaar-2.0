import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import InputField from "@/src/components/ui/InputField";
import AppButton from "@/src/components/ui/AppButton";
import { router } from "expo-router";

const SignUpScreen = () => {
  // States used for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    //API Later
  };

  return (
    // Prevents keyboard from covering form fields on iOS
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <View className="flex-1 px-6 justify-center">
        {/* Logo */}
        {/* <Image
          source={require("../../assets/logo.png")}
          className="w-24 h-24 self-center mb-8"
          resizeMode="contain"
        /> */}

        {/* Heading */}
        <Text className="text-3xl font-bold text-textPrimary text-center">
          Create account
        </Text>

        <Text className="text-base text-textSecondary text-center mt-2 mb-8">
          Track birthdays and send meaningful gifts effortlessly
        </Text>

        {/*Form*/}
        <View className="space-y-4">
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
          <InputField
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* CTA */}
        {/* SignUp BUtton*/}
        <View className="mt-6">
          <AppButton title="Create account" onPress={handleSignUp} />
        </View>

        {/*Secondary Action*/}
        {/*Presses the the sign router.replace buttong*/}
        <Pressable
          onPress={() => router.replace("/SignInScreen")}
          className="mt-6"
        >
          <Text className="text-center text-textSecondary">
            Already have an account?{" "}
            <Text className="text-primary font-semibold">Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
