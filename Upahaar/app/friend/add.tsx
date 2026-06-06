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
 * These keep the Add Friend screen consistent with the soft pink,
 * cutesy, girly design used across the app.
 */
const CARD_BORDER_COLOR = "#F8BBD0";
const CARD_BORDER_WIDTH = 1;

const SOFT_PINK = "#FFE4EC";
const VERY_SOFT_PINK = "#FFF5F8";
const PRIMARY_PINK = "#D81B60";

/**
 * Relationship options.
 * These help keep friend profiles structured instead of only using free text.
 */
const relationships = ["Friend", "Family", "Partner", "Classmate", "Coworker", "Other"];

/**
 * Budget options.
 * These can later help the AI assistant recommend realistic gift ideas.
 */
const budgets = ["Under $20", "$20 - $35", "$35 - $60", "$60+", "Not sure"];

const AddFriend = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedRelationship, setSelectedRelationship] = useState("Friend");
  const [selectedBudget, setSelectedBudget] = useState("$20 - $35");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [favoriteColors, setFavoriteColors] = useState("");
  const [notes, setNotes] = useState("");

  /**
   * Saves the friend profile.
   *
   * Right now this only validates the form and routes back to Friends.
   * Later, this is where you will create a document in the Appwrite friends collection.
   */
  const handleSaveFriend = () => {
    if (!name.trim()) {
      Alert.alert("Name required", "Please enter your friend's name.");
      return;
    }

    if (!birthDate.trim()) {
      Alert.alert("Birthday required", "Please enter their birthday.");
      return;
    }

    /**
     * Later Appwrite data shape:
     *
     * {
     *   userId,
     *   name: name.trim(),
     *   birthDate: birthDate.trim(),
     *   relationship: selectedRelationship,
     *   budget: selectedBudget,
     *   likes: likes.trim(),
     *   dislikes: dislikes.trim(),
     *   favoriteColors: favoriteColors.trim(),
     *   notes: notes.trim(),
     *   createdAt: new Date().toISOString()
     * }
     */

    Alert.alert("Friend saved 💝", `${name.trim()} was added to Upahaar.`, [
      {
        text: "OK",
        onPress: () => {
          router.replace("/(tabs)/friends");
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
        Keeps the screen readable while matching Upahaar's warm visual style.
      */}
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
                Add Friend 🎀
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Save their birthday, little details, and gift clues in one place.
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
              Build a thoughtful profile 💌
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              The more details you save, the better Mimi can suggest meaningful
              gifts later.
            </Text>
          </View>

          {/* Form card */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-4">
              Friend details
            </Text>

            {/* Name */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Example: Aisha"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Birthday */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Birthday
            </Text>

            <TextInput
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="YYYY-MM-DD, example: 2000-09-24"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Relationship selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Relationship
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {relationships.map((relationship) => {
                  const isSelected = selectedRelationship === relationship;

                  return (
                    <Pressable
                      key={relationship}
                      onPress={() => {
                        setSelectedRelationship(relationship);
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
                        {relationship}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Budget selector */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Gift budget
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-5"
            >
              <View className="flex-row gap-2">
                {budgets.map((budget) => {
                  const isSelected = selectedBudget === budget;

                  return (
                    <Pressable
                      key={budget}
                      onPress={() => {
                        setSelectedBudget(budget);
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
                        {budget}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>

            {/* Likes */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Likes
            </Text>

            <TextInput
              value={likes}
              onChangeText={setLikes}
              placeholder="Example: matcha, cats, silver jewelry"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Dislikes */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Dislikes
            </Text>

            <TextInput
              value={dislikes}
              onChangeText={setDislikes}
              placeholder="Example: loud colors, cheesy quotes"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Favorite colors */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Favorite colors
            </Text>

            <TextInput
              value={favoriteColors}
              onChangeText={setFavoriteColors}
              placeholder="Example: blush pink, dark green, gold"
              placeholderTextColor="#B48A99"
              className="rounded-2xl px-4 py-4 text-base text-textPrimary border mb-5"
              style={{
                backgroundColor: VERY_SOFT_PINK,
                borderColor: CARD_BORDER_COLOR,
                borderWidth: CARD_BORDER_WIDTH,
              }}
            />

            {/* Notes */}
            <Text className="text-sm font-semibold text-textPrimary mb-2">
              Extra notes
            </Text>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Example: She likes simple gifts and handwritten notes..."
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
              Tip: These details help the gift assistant recommend more personal
              ideas later.
            </Text>

            <AppButton
              title="Save Friend"
              onPress={handleSaveFriend}
              className="mt-5"
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AddFriend;