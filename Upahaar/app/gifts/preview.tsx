import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 * These match the soft, light-pink, cutesy/girly design used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock gift preview data.
 * Later, this should come from the selected AI-generated gift idea.
 */
const giftPreview = {
  friendName: "Alex Johnson",
  giftTitle: "Custom Desk Setup Mug",
  productType: "Mug",
  estimatedPrice: "$24",
  reason:
    "Alex mentioned wanting to improve his desk setup and likes coffee, so a clean custom mug fits his everyday routine.",
  personalization:
    "Use a black mug with minimal white text that says “Focus Mode”.",
  giftNote:
    "Happy birthday! Hope this makes your setup feel a little more complete.",
};

const GiftPreview = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      <View className="flex-1 bg-pink-50/70">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          className="flex-1 px-6 pt-14"
          showsVerticalScrollIndicator={false}
        >
          {/* Header row */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-textPrimary">
                Gift Preview 💌
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Review the thoughtful gift idea before customizing it.
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

          {/* Main preview card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View className="items-center mb-5">
              <View
                className="h-24 w-24 rounded-3xl items-center justify-center mb-4"
                style={{ backgroundColor: SOFT_PINK }}
              >
                <Text className="text-4xl">☕</Text>
              </View>

              <Text className="text-2xl font-bold text-textPrimary text-center">
                {giftPreview.giftTitle}
              </Text>

              <Text className="text-sm text-textSecondary mt-2">
                For {giftPreview.friendName}
              </Text>
            </View>

            <View
              className="rounded-2xl px-4 py-3 mb-3"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-bold text-textPrimary">
                Product type
              </Text>

              <Text className="text-sm text-textSecondary mt-1">
                {giftPreview.productType} • Around {giftPreview.estimatedPrice}
              </Text>
            </View>

            <View
              className="rounded-2xl px-4 py-3 mb-3"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-bold text-textPrimary">
                Why this fits ✨
              </Text>

              <Text className="text-sm text-textSecondary mt-1 leading-5">
                {giftPreview.reason}
              </Text>
            </View>

            <View
              className="rounded-2xl px-4 py-3"
              style={{ backgroundColor: VERY_SOFT_PINK }}
            >
              <Text className="text-sm font-bold text-textPrimary">
                Personalization idea
              </Text>

              <Text className="text-sm text-textSecondary mt-1 leading-5">
                {giftPreview.personalization}
              </Text>
            </View>
          </View>

          {/* Gift note card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Suggested gift note 💝
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              {giftPreview.giftNote}
            </Text>
          </View>

          {/* Actions */}
          <AppButton
            title="Customize Gift"
            onPress={() => {
              router.push("/gifts/customize");
            }}
            className="mt-2"
          />

          <Pressable
            onPress={() => {
              router.push("/(tabs)/gifts");
            }}
            className="mt-5 items-center"
          >
            <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
              Back to Gift Ideas →
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default GiftPreview;