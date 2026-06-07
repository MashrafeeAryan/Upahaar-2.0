import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
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
 * Temporary mock gift data.
 * Later, this should come from the selected gift idea / Appwrite / AI response.
 */
const selectedGift = {
  friendName: "Alex Johnson",
  title: "Custom Desk Setup Mug",
  productType: "Mug",
  estimatedPrice: "$24",
  suggestedText: "Focus Mode",
  suggestedNote:
    "Happy birthday! Hope this makes your setup feel a little more complete.",
};

/**
 * Product customization options.
 * Later, these could come from Printful product variants.
 */
const productTypes = ["Mug", "Shirt", "Locket", "Hoodie", "Tote Bag"];
const colors = ["Blush Pink", "White", "Black", "Cream", "Dark Green"];
const styles = ["Minimal", "Cute", "Elegant", "Funny", "Cozy"];

const CustomizeGift = () => {
  const [selectedProductType, setSelectedProductType] = useState(
    selectedGift.productType
  );
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedStyle, setSelectedStyle] = useState("Minimal");
  const [customText, setCustomText] = useState(selectedGift.suggestedText);
  const [giftNote, setGiftNote] = useState(selectedGift.suggestedNote);

  /**
   * Mock finalization handler.
   *
   * Later, this can:
   * - save the customized gift to Appwrite
   * - generate a Printful mockup
   * - create a draft order
   */
  const handleSaveCustomizedGift = () => {
    if (!customText.trim()) {
      Alert.alert("Custom text required", "Please add text for the gift.");
      return;
    }

    if (!giftNote.trim()) {
      Alert.alert("Gift note required", "Please add a short gift note.");
      return;
    }

    Alert.alert(
      "Gift customized 💝",
      "Your gift idea is ready to send or connect to fulfillment later.",
      [
        {
          text: "OK",
          onPress: () => {
            router.replace("/(tabs)/gifts");
          },
        },
      ]
    );
  };

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
                Customize Gift 🎀
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Make the gift feel personal before sending it.
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

          {/* Gift summary card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <View className="items-center">
              <View
                className="h-24 w-24 rounded-3xl items-center justify-center mb-4"
                style={{ backgroundColor: SOFT_PINK }}
              >
                <Text className="text-4xl">🎁</Text>
              </View>

              <Text className="text-2xl font-bold text-textPrimary text-center">
                {selectedGift.title}
              </Text>

              <Text className="text-sm text-textSecondary mt-2">
                For {selectedGift.friendName} • Around{" "}
                {selectedGift.estimatedPrice}
              </Text>
            </View>
          </View>

          {/* Product preview card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Preview concept ✨
            </Text>

            <View className="bg-white rounded-3xl p-5 mt-4 items-center">
              <View
                className="h-32 w-32 rounded-3xl items-center justify-center mb-4"
                style={{ backgroundColor: VERY_SOFT_PINK }}
              >
                <Text className="text-5xl">
                  {selectedProductType === "Mug"
                    ? "☕"
                    : selectedProductType === "Shirt"
                    ? "👕"
                    : selectedProductType === "Locket"
                    ? "✨"
                    : selectedProductType === "Hoodie"
                    ? "🧥"
                    : "👜"}
                </Text>
              </View>

              <Text className="text-xl font-bold text-textPrimary text-center">
                {customText || "Your custom text"}
              </Text>

              <Text className="text-sm text-textSecondary mt-2 text-center">
                {selectedColor} • {selectedStyle} • {selectedProductType}
              </Text>
            </View>
          </View>

          {/* Customization form */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-4">
              Customize details
            </Text>

            {/* Product type selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Product type
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {productTypes.map((type) => {
                  const isSelected = selectedProductType === type;

                  return (
                    <Pressable
                      key={type}
                      onPress={() => {
                        setSelectedProductType(type);
                      }}
                      className="px-4 py-2 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? SOFT_PINK : VERY_SOFT_PINK,
                        borderColor: isSelected
                          ? PRIMARY_PINK
                          : CARD_BORDER_COLOR,
                        borderWidth: CARD_BORDER_WIDTH,
                      }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{
                          color: isSelected ? PRIMARY_PINK : "#7A5A66",
                        }}
                      >
                        {type}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Color selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Color
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {colors.map((color) => {
                  const isSelected = selectedColor === color;

                  return (
                    <Pressable
                      key={color}
                      onPress={() => {
                        setSelectedColor(color);
                      }}
                      className="px-4 py-2 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? SOFT_PINK : VERY_SOFT_PINK,
                        borderColor: isSelected
                          ? PRIMARY_PINK
                          : CARD_BORDER_COLOR,
                        borderWidth: CARD_BORDER_WIDTH,
                      }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{
                          color: isSelected ? PRIMARY_PINK : "#7A5A66",
                        }}
                      >
                        {color}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Style selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Design style
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {styles.map((style) => {
                  const isSelected = selectedStyle === style;

                  return (
                    <Pressable
                      key={style}
                      onPress={() => {
                        setSelectedStyle(style);
                      }}
                      className="px-4 py-2 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? SOFT_PINK : VERY_SOFT_PINK,
                        borderColor: isSelected
                          ? PRIMARY_PINK
                          : CARD_BORDER_COLOR,
                        borderWidth: CARD_BORDER_WIDTH,
                      }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{
                          color: isSelected ? PRIMARY_PINK : "#7A5A66",
                        }}
                      >
                        {style}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Custom text */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Custom text
            </Text>

            <TextInput
              value={customText}
              onChangeText={setCustomText}
              placeholder="Example: Focus Mode"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Gift note */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Gift note
            </Text>

            <TextInput
              value={giftNote}
              onChangeText={setGiftNote}
              placeholder="Write a sweet note..."
              placeholderTextColor="#B48A99"
              multiline
              textAlignVertical="top"
              className="min-h-28 rounded-2xl px-4 py-4 text-base text-textPrimary border"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            <Text className="text-xs text-textSecondary mt-2 leading-4">
              Later, this screen can connect to Printful for real product mockups
              and fulfillment.
            </Text>

            <AppButton
              title="Save Customized Gift"
              onPress={handleSaveCustomizedGift}
              className="mt-5"
            />
          </View>

          {/* Secondary actions */}
          <Pressable
            onPress={() => {
              router.push("/gifts/preview");
            }}
            className="mt-6 items-center"
          >
            <Text className="font-semibold" style={{ color: PRIMARY_PINK }}>
              Back to Preview →
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CustomizeGift;