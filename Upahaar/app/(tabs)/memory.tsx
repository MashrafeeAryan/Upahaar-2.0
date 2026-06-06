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
import AppButton from "@/src/components/ui/AppButton";

/**
 * Upahaar theme constants.
 * These match the soft pink, cutesy, girly style used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Temporary mock friend data.
 * Later, this will come from the Appwrite friends collection.
 */
const friends = [
  { id: 1, name: "Alex Johnson" },
  { id: 2, name: "Mom" },
  { id: 3, name: "Rahim" },
];

/**
 * Memory categories.
 * These make notes easier to organize and later use for gift recommendations.
 */
const categories = [
  "Gift clue 🎁",
  "Likes 💕",
  "Dislikes 🚫",
  "Wants ✨",
  "Favorite color 🎨",
  "Inside joke 😭",
  "Hobby 🌸",
];

/**
 * Temporary mock memory data.
 * Later, this will come from the Appwrite memories collection.
 */
const initialMemories = [
  {
    id: 1,
    friendName: "Alex Johnson",
    category: "Wants ✨",
    note: "Mentioned wanting a black desk mat for his setup.",
  },
  {
    id: 2,
    friendName: "Mom",
    category: "Likes 💕",
    note: "Likes simple gold jewelry and soft colors.",
  },
];

const Memory = () => {
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [note, setNote] = useState("");
  const [memories, setMemories] = useState(initialMemories);

  const selectedFriend = friends.find((friend) => friend.id === selectedFriendId);

  /**
   * Saves a memory note locally for now.
   *
   * Later, this function should create a new document in Appwrite.
   * Suggested Appwrite collection: memories
   */
  const handleSaveMemory = () => {
    if (!selectedFriend) {
      Alert.alert("Choose a friend", "Please choose who this memory is for.");
      return;
    }

    if (!note.trim()) {
      Alert.alert("Empty memory", "Write a small note before saving.");
      return;
    }

    const newMemory = {
      id: Date.now(),
      friendName: selectedFriend.name,
      category: selectedCategory,
      note: note.trim(),
    };

    setMemories([newMemory, ...memories]);
    setNote("");

    Alert.alert("Memory saved 💌", "This little detail was saved for later.");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/appBackground2_new.png")}
      resizeMode="cover"
      className="flex-1"
    >
      {/*
        Soft pink overlay.
        Keeps the background visible while making the form easy to read.
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
              Memory Drop 💌
            </Text>

            <Text className="text-base text-textSecondary mt-2 leading-5">
              Quickly save the little things people mention, so gift ideas feel
              personal later.
            </Text>
          </View>

          {/*
            Quick explanation card.
            This helps judges/users understand why this feature matters.
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
              A tiny note now, a thoughtful gift later ✨
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Save things like favorite colors, hobbies, inside jokes, dislikes,
              or gift clues from everyday conversations.
            </Text>
          </View>

          {/*
            Memory form card.
            This is the main interaction on the Memory Drop tab.
          */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-4">
              Save a new memory
            </Text>

            {/* Friend selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Who is this about?
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {friends.map((friend) => {
                  const isSelected = selectedFriendId === friend.id;

                  return (
                    <Pressable
                      key={friend.id}
                      onPress={() => {
                        setSelectedFriendId(friend.id);
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
                        {friend.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Category selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Category
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;

                  return (
                    <Pressable
                      key={category}
                      onPress={() => {
                        setSelectedCategory(category);
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
                        {category}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Memory note input */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              What did they mention?
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Example: She said she loves matcha and simple gold jewelry..."
              placeholderTextColor="#B48A99"
              multiline
              textAlignVertical="top"
              className="min-h-32 rounded-2xl px-4 py-4 text-base text-textPrimary border"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            <Text className="text-xs text-textSecondary mt-2 leading-4">
              Tip: Save details like wants, favorite colors, hobbies, or things
              they dislike.
            </Text>

            <AppButton
              title="Save Memory"
              onPress={handleSaveMemory}
              className="mt-5"
            />
          </View>

          {/* Recent memories section */}
          <View className="flex-row items-center justify-between mt-8 mb-3">
            <Text className="text-lg font-semibold text-textPrimary">
              Saved Little Things 💭
            </Text>

            <Text className="text-sm font-semibold" style={{ color: PRIMARY_PINK }}>
              {memories.length} notes
            </Text>
          </View>

          {/*
            Recent saved memories.
            This gives immediate feedback after a user saves a note.
          */}
          <View
            className="bg-white rounded-3xl shadow-sm overflow-hidden border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            {memories.map((memory, index) => (
              <View
                key={memory.id}
                className={`px-5 py-4 ${
                  index !== memories.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderBottomColor:
                    index !== memories.length - 1
                      ? CARD_BORDER_COLOR
                      : "transparent",
                }}
              >
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-base font-bold text-textPrimary">
                    {memory.friendName}
                  </Text>

                  <Text
                    className="text-xs font-bold"
                    style={{ color: PRIMARY_PINK }}
                  >
                    {memory.category}
                  </Text>
                </View>

                <Text className="text-sm text-textSecondary leading-5">
                  {memory.note}
                </Text>
              </View>
            ))}
          </View>

          {/*
            Widget connection explanation.
            For the current MVP, this explains the future widget plan clearly.
          */}
          <View
            className="rounded-3xl p-5 shadow-sm border mt-6"
            style={{
              backgroundColor: VERY_SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Widget-ready idea 🌸
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              This screen is designed to become the full version of a future home
              screen widget: tap, jot down a memory, and save it before you
              forget.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Memory;