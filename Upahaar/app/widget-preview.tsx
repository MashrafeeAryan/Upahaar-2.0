import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

const WidgetPreview = () => {
  return (
    <ImageBackground
      source={require("../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-textPrimary">
                Widget Preview 🌸
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Quick-save little details before you forget.
              </Text>
            </View>

            <Pressable
              onPress={() => {
                router.back();
              }}
              className="h-11 w-11 rounded-2xl items-center justify-center border ml-3"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-lg" style={{ color: PRIMARY_PINK }}>
                ✕
              </Text>
            </Pressable>
          </View>

          {/* Intro card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Memory Drop, but faster 💌
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Tap the widget, write what they said, and save it for later.
            </Text>
          </View>

          {/* Small widget preview */}
          <Text className="text-lg font-semibold text-textPrimary mb-3">
            Small Widget
          </Text>

          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View
              className="rounded-3xl p-5 items-center"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-4xl mb-3">💌</Text>

              <Text className="text-xl font-bold text-textPrimary text-center">
                Memory Drop
              </Text>

              <Text className="text-sm text-textSecondary mt-2 text-center">
                Save a sweet detail
              </Text>

              <Pressable
                onPress={() => {
                  router.push("/(tabs)/memory");
                }}
                className="mt-4 rounded-2xl px-4 py-3 border"
                style={{
                  backgroundColor: SOFT_PINK,
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Open Memory Drop
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Medium widget preview */}
          <Text className="text-lg font-semibold text-textPrimary mb-3">
            Medium Widget
          </Text>

          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View
              className="rounded-3xl p-5"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <View className="flex-row items-center gap-3 mb-4">
                <View
                  className="h-14 w-14 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: SOFT_PINK }}
                >
                  <Text className="text-2xl">🌸</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-xl font-bold text-textPrimary">
                    Upahaar
                  </Text>

                  <Text className="text-sm text-textSecondary mt-1">
                    Remember the little things
                  </Text>
                </View>
              </View>

              <View
                className="bg-white rounded-2xl px-4 py-3 border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  Quick note
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  “She said she loves matcha and gold jewelry.”
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  router.push("/(tabs)/memory");
                }}
                className="mt-4 rounded-2xl px-4 py-3 items-center"
                style={{ backgroundColor: SOFT_PINK }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Tap to Save Memory →
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Simple action */}
          <AppButton
            title="Try Memory Drop"
            onPress={() => {
              router.push("/(tabs)/memory");
            }}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default WidgetPreview;