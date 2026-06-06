import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 * These match the soft, light-pink, cutesy style used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock friend data.
 * Later, this should come from Appwrite.
 *
 * Each friend has saved memories/interests that the gift recommendation
 * logic can use to create thoughtful gift ideas.
 */
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    relationship: "Friend",
    budget: "$25 - $40",
    memories: [
      "Mentioned wanting a black desk mat for his setup.",
      "Likes coffee and minimal designs.",
      "Prefers black and dark red colors.",
    ],
  },
  {
    id: 2,
    name: "Mom",
    relationship: "Family",
    budget: "$30 - $60",
    memories: [
      "Likes simple gold jewelry and soft colors.",
      "Loves flowers and handwritten notes.",
      "Prefers meaningful gifts over expensive ones.",
    ],
  },
  {
    id: 3,
    name: "Rahim",
    relationship: "Friend",
    budget: "$20 - $35",
    memories: [
      "Said he wants a better coffee mug.",
      "Likes football and simple designs.",
      "Does not like flashy colors.",
    ],
  },
];

/**
 * Mock gift recommendation data.
 *
 * For the MVP, recommendations are rule-based and connected to the selected
 * friend's saved memories. Later, this can become AI-assisted or Appwrite-backed.
 */
const giftIdeasByFriendId: Record<
  number,
  {
    id: number;
    title: string;
    productType: string;
    price: string;
    why: string;
    personalization: string;
    emoji: string;
  }[]
> = {
  1: [
    {
      id: 1,
      title: "Custom Desk Setup Mug",
      productType: "Mug",
      price: "$24",
      emoji: "☕",
      why: "Alex mentioned wanting to improve his desk setup and likes coffee.",
      personalization:
        "Use a black mug with minimal white text like “Focus Mode”.",
    },
    {
      id: 2,
      title: "Minimal Black Desk Mat",
      productType: "Desk accessory",
      price: "$35",
      emoji: "🖤",
      why: "He specifically mentioned wanting a black desk mat for his setup.",
      personalization:
        "Add small initials or a clean dark red border to match his style.",
    },
    {
      id: 3,
      title: "Dark Red Custom T-Shirt",
      productType: "Shirt",
      price: "$29",
      emoji: "👕",
      why: "He likes dark red and minimal designs, so this stays personal without being too loud.",
      personalization:
        "Add a small chest print with an inside joke or his initials.",
    },
  ],
  2: [
    {
      id: 1,
      title: "Simple Gold-Style Locket",
      productType: "Locket",
      price: "$38",
      emoji: "✨",
      why: "She likes simple gold jewelry and meaningful gifts.",
      personalization:
        "Add initials, a tiny heart, or a short message inside the locket.",
    },
    {
      id: 2,
      title: "Soft Floral Mug",
      productType: "Mug",
      price: "$22",
      emoji: "🌸",
      why: "She loves flowers, soft colors, and thoughtful everyday gifts.",
      personalization:
        "Use a blush floral design with a short handwritten-style message.",
    },
    {
      id: 3,
      title: "Custom Note Card Bundle",
      productType: "Card set",
      price: "$18",
      emoji: "💌",
      why: "She prefers meaningful gifts over expensive ones, and handwritten notes fit that perfectly.",
      personalization:
        "Include a sweet birthday message and a few memories you want to thank her for.",
    },
  ],
  3: [
    {
      id: 1,
      title: "Minimal Coffee Mug",
      productType: "Mug",
      price: "$21",
      emoji: "☕",
      why: "Rahim said he wants a better coffee mug and likes simple designs.",
      personalization:
        "Use a clean design with his name or a small football icon.",
    },
    {
      id: 2,
      title: "Football-Inspired T-Shirt",
      productType: "Shirt",
      price: "$27",
      emoji: "⚽",
      why: "He likes football, but does not like flashy colors, so a subtle design works best.",
      personalization:
        "Use a small minimal football graphic with neutral colors.",
    },
    {
      id: 3,
      title: "Simple Everyday Hoodie",
      productType: "Hoodie",
      price: "$35",
      emoji: "🧥",
      why: "He likes practical gifts and simple designs, so this feels useful and wearable.",
      personalization:
        "Add small initials on the sleeve instead of a large front design.",
    },
  ],
};

const Gifts = () => {
  const [selectedFriendId, setSelectedFriendId] = useState<number>(1);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedFriend = friends.find((friend) => friend.id === selectedFriendId);
  const giftIdeas = giftIdeasByFriendId[selectedFriendId] ?? [];

  /**
   * For the MVP, this simply reveals the mock gift ideas.
   *
   * Later, this can call a real recommendation function that uses memories,
   * likes, dislikes, relationship type, and budget.
   */
  const handleGenerateGiftIdeas = () => {
    setHasGenerated(true);
    setSelectedGiftId(null);
  };

  const selectedGift = giftIdeas.find((gift) => gift.id === selectedGiftId);

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/*
        Soft pink overlay.
        Keeps the background readable while preserving the light girly theme.
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
              Gift Ideas ✨
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Turn saved memories into thoughtful custom gift suggestions.
            </Text>
          </View>

          {/*
            Explanation card.
            Helps users and judges understand how this page connects to Memory Drop.
          */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              From little notes to meaningful gifts 💝
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Upahaar looks at the memories you saved and suggests gifts that
              match what your friend likes, wants, or mentioned before.
            </Text>
          </View>

          {/*
            Friend selector.
            The selected friend controls which memories and recommendations appear.
          */}
          <Text className="text-sm font-semibold text-textPrimary mb-2">
            Choose someone special
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="flex-row gap-2">
              {friends.map((friend) => {
                const isSelected = selectedFriendId === friend.id;

                return (
                  <Pressable
                    key={friend.id}
                    onPress={() => {
                      setSelectedFriendId(friend.id);
                      setHasGenerated(false);
                      setSelectedGiftId(null);
                    }}
                    className="px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: isSelected ? SOFT_PINK : VERY_SOFT_PINK,
                      borderColor: isSelected ? PRIMARY_PINK : CARD_BORDER_COLOR,
                      borderWidth: CARD_BORDER_WIDTH,
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color: isSelected ? PRIMARY_PINK : "#7A5A66",
                      }}
                    >
                      {friend.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {/*
            Selected friend memory summary.
            Shows the raw details that gift recommendations are based on.
          */}
          {selectedFriend && (
            <View
              className="bg-white rounded-3xl p-5 shadow-sm border mb-6"
              style={{
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View>
                  <Text className="text-xl font-bold text-textPrimary">
                    {selectedFriend.name}
                  </Text>

                  <Text className="text-sm text-textSecondary mt-1">
                    {selectedFriend.relationship} • Budget {selectedFriend.budget}
                  </Text>
                </View>

                <View
                  className="h-12 w-12 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: SOFT_PINK }}
                >
                  <Text className="text-xl">🎁</Text>
                </View>
              </View>

              <Text className="text-sm font-semibold text-textPrimary mb-2">
                Saved memories
              </Text>

              <View className="gap-2">
                {selectedFriend.memories.map((memory) => (
                  <View
                    key={memory}
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: VERY_SOFT_PINK }}
                  >
                    <Text className="text-sm text-textSecondary leading-5">
                      💭 {memory}
                    </Text>
                  </View>
                ))}
              </View>

              <AppButton
                title="Generate Gift Ideas"
                onPress={handleGenerateGiftIdeas}
                className="mt-5"
              />
            </View>
          )}

          {/*
            Gift recommendation list.
            Hidden until the user taps Generate Gift Ideas to make the flow feel intentional.
          */}
          {hasGenerated && (
            <>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-lg font-semibold text-textPrimary">
                  Recommended Gifts
                </Text>

                <Text
                  className="text-sm font-semibold"
                  style={{ color: PRIMARY_PINK }}
                >
                  {giftIdeas.length} ideas
                </Text>
              </View>

              <View className="gap-4">
                {giftIdeas.map((gift) => {
                  const isSelected = selectedGiftId === gift.id;

                  return (
                    <Pressable
                      key={gift.id}
                      onPress={() => {
                        setSelectedGiftId(gift.id);
                      }}
                      className="bg-white rounded-3xl p-5 shadow-sm border"
                      style={{
                        borderColor: isSelected
                          ? PRIMARY_PINK
                          : CARD_BORDER_COLOR,
                        borderWidth: isSelected ? 2 : CARD_BORDER_WIDTH,
                      }}
                    >
                      {/* Gift title row */}
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3 flex-1">
                          <View
                            className="h-12 w-12 rounded-2xl items-center justify-center"
                            style={{ backgroundColor: SOFT_PINK }}
                          >
                            <Text className="text-xl">{gift.emoji}</Text>
                          </View>

                          <View className="flex-1">
                            <Text className="text-lg font-bold text-textPrimary">
                              {gift.title}
                            </Text>

                            <Text className="text-sm text-textSecondary mt-1">
                              {gift.productType} • Around {gift.price}
                            </Text>
                          </View>
                        </View>

                        {isSelected && (
                          <Text
                            className="text-xs font-bold"
                            style={{ color: PRIMARY_PINK }}
                          >
                            Picked
                          </Text>
                        )}
                      </View>

                      {/* Why this gift fits */}
                      <View
                        className="rounded-2xl px-4 py-3 mt-4"
                        style={{ backgroundColor: VERY_SOFT_PINK }}
                      >
                        <Text className="text-sm font-bold text-textPrimary">
                          Why this fits
                        </Text>

                        <Text className="text-sm text-textSecondary mt-1 leading-5">
                          {gift.why}
                        </Text>
                      </View>

                      {/* Personalization idea */}
                      <View className="mt-4">
                        <Text
                          className="text-sm font-bold"
                          style={{ color: PRIMARY_PINK }}
                        >
                          Personalization idea
                        </Text>

                        <Text className="text-sm text-textSecondary mt-1 leading-5">
                          {gift.personalization}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          {/*
            Final selected gift preview.
            This gives the user a clear ending point for the MVP demo.
          */}
          {selectedGift && selectedFriend && (
            <View
              className="rounded-3xl p-5 shadow-sm border mt-6"
              style={{
                backgroundColor: SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="text-lg font-bold text-textPrimary">
                Gift Preview 💌
              </Text>

              <Text className="text-sm text-textSecondary mt-2 leading-5">
                You picked{" "}
                <Text className="font-bold text-textPrimary">
                  {selectedGift.title}
                </Text>{" "}
                for{" "}
                <Text className="font-bold text-textPrimary">
                  {selectedFriend.name}
                </Text>
                .
              </Text>

              <View
                className="bg-white rounded-2xl px-4 py-3 mt-4"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="text-sm font-bold text-textPrimary">
                  Ready-to-customize idea
                </Text>

                <Text className="text-sm text-textSecondary mt-1 leading-5">
                  {selectedGift.personalization}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  // Later: navigate to a real customization / Printful preview page.
                }}
                className="mt-5 bg-white rounded-2xl px-4 py-3 items-center border"
                style={{
                  borderColor: CARD_BORDER_COLOR,
                  borderWidth: CARD_BORDER_WIDTH,
                }}
              >
                <Text className="font-bold" style={{ color: PRIMARY_PINK }}>
                  Customize Gift →
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Gifts;