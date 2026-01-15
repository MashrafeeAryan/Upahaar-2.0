import { View, Text, Platform, KeyboardAvoidingView, Image } from "react-native";
import React, { useState } from "react";
import InputField from "@/src/components/ui/InputField";

const SignUpScreen = () => {
  // States used for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    //API Later
  };

  return (
    // Adjusts screen when the on-screen keybaord appears, so inputs don't get convered
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
  >
      <View className="flex-1 px-6 justify-center">
        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          className="w-24 h-24 self-center mb-8"
          resizeMode="contain"
        />

        {/* Heading */}
        <Text className="text-3xl font-bold text-gray-900 text-center">
          Create account
        </Text>

        <Text className="text-base text-gray-500 text-center mt-2 mb-8">
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
