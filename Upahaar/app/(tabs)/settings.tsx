import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 * These match the soft, light-pink, cutesy/girly style used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock user data.
 * Later, this should come from Appwrite account.get().
 */
const user = {
  name: "Mashrafee",
  email: "mashrafee@example.com",
};

/**
 * Settings tab for Upahaar.
 *
 * This screen keeps account actions, app information, and logout in one place.
 * Later, the logout button will connect to Appwrite authentication.
 */
const Settings = () => {
  /**
   * Temporary logout handler.
   *
   * Later, replace this with:
   * await account.deleteSession("current");
   * router.replace("/(auth)/SignInScreen");
   */
  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          router.replace("/(auth)/SignInScreen");
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/*
        Soft pink overlay.
        Keeps the background readable while matching Upahaar's cozy theme.
      */}
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* Page header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-textPrimary">
              Settings 🌸
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Manage your account and learn more about Upahaar.
            </Text>
          </View>

          {/* Profile card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View className="flex-row items-center gap-4">
              <View
                className="h-16 w-16 rounded-3xl items-center justify-center"
                style={{ backgroundColor: SOFT_PINK }}
              >
                <Text className="text-2xl">💝</Text>
              </View>

              <View className="flex-1">
                <Text className="text-xl font-bold text-textPrimary">
                  {user.name}
                </Text>

                <Text className="text-sm text-textSecondary mt-1">
                  {user.email}
                </Text>
              </View>
            </View>

            <View
              className="rounded-2xl px-4 py-3 mt-5"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-semibold text-textPrimary">
                Account status
              </Text>

              <Text className="text-sm text-textSecondary mt-1 leading-5">
                Signed in with Appwrite authentication soon.
              </Text>
            </View>
          </View>

          {/* About app card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              About Upahaar ✨
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Upahaar helps you remember the small things people mention, then
              turns those memories into thoughtful gift ideas for birthdays and
              special moments.
            </Text>
          </View>

          {/* Feature summary card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-4">
              What Upahaar helps with
            </Text>

            <View className="gap-3">
              <View
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  💌 Memory Drop
                </Text>
                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  Save quick notes about things your friends like, want, or
                  mention.
                </Text>
              </View>

              <View
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  🎁 Gift Ideas
                </Text>
                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  Turn saved memories into thoughtful custom gift suggestions.
                </Text>
              </View>

              <View
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  🎂 Birthday Reminders
                </Text>
                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  Keep upcoming birthdays visible so you have time to prepare.
                </Text>
              </View>
            </View>
          </View>

          {/* Finishathon/demo card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Project status
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              This version is an MVP for the GitHub Finish-Up-A-Thon. The core
              flow is built: friends, memory notes, birthdays, and gift ideas.
            </Text>

            <Pressable
              onPress={() => {
                router.push("/(tabs)/gifts");
              }}
              className="mt-4 rounded-2xl px-4 py-3 items-center"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                View Gift Ideas →
              </Text>
            </Pressable>
          </View>

          {/* Logout action */}
          <AppButton title="Log Out" onPress={handleLogout} className="mt-2" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Settings;