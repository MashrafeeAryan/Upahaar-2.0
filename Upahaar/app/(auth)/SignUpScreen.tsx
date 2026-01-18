import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState } from "react";
import InputField from "@/src/components/ui/InputField";
import AppButton from "@/src/components/ui/AppButton";
import { router } from "expo-router";

const SignUpScreen = () => {
  // States used for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // API later
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      {/* Background */}
      <ImageBackground
        source={require("../../assets/images/2.webp")}
        resizeMode="cover"
        className="flex-1 justify-center px-6"
      >
        {/* Card */}
        <View className="bg-white rounded-2xl px-6 py-8 shadow-lg">
          {/* Heading */}
          <Text className="text-2xl font-bold text-secondary text-center">
            Create account!
          </Text>

          <Text className="text-base text-textSecondary text-center mt-2 mb-6">
            Track birthdays and send meaningful gifts
          </Text>

          {/* Form */}
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

          {/* CTA */}
          <AppButton title="Create account" onPress={handleSignUp} />

          {/* Secondary action */}
          <Pressable
            onPress={() => router.replace("/(auth)/SignInScreen")}
            className="mt-6"
          >
            <Text className="text-center text-textSecondary">
              Already have an account?{" "}
              <Text className="text-primary font-semibold">Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
