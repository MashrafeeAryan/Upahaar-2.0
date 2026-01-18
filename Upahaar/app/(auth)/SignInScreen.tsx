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

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          {/* Heading*/}
          <Text className="text-2xl font-bold text-secondary text-center">
            Welcome back!
          </Text>

          <Text className="text-base text-textSecondary text-center mt-2 mb-6">
            Sign in to continue
          </Text>

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

          <AppButton title="Sign in" onPress={() => {}} />

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
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
