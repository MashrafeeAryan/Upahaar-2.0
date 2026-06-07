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
import { router, useLocalSearchParams } from "expo-router";
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
 * Relationship options.
 * These keep the friend profile structured and useful for recommendations.
 */
const relationships = ["Friend", "Family", "Partner", "Classmate", "Coworker", "Other"];

/**
 * Budget options.
 * These help the gift assistant recommend realistic gift ideas.
 */
const budgets = ["Under $20", "$20 - $35", "$35 - $60", "$60+", "Not sure"];

/**
 * Temporary mock friend data.
 * Later, this should come from the Appwrite friends collection using the id.
 */
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    birthDate: "1998-09-24",
    relationship: "Friend",
    budget: "$25 - $40",
    likes: "coffee, desk setup, minimal designs",
    dislikes: "flashy colors, messy designs",
    favoriteColors: "black, dark red",
    notes: "Likes practical gifts and clean designs.",
  },
  {
    id: 2,
    name: "Mom",
    birthDate: "1985-10-02",
    relationship: "Family",
    budget: "$30 - $60",
    likes: "gold jewelry, flowers, handwritten notes",
    dislikes: "loud designs",
    favoriteColors: "soft pink, cream, gold",
    notes: "Prefers meaningful gifts over expensive ones.",
  },
  {
    id: 3,
    name: "Rahim",
    birthDate: "2000-03-25",
    relationship: "Friend",
    budget: "$20 - $35",
    likes: "coffee mugs, football, simple designs",
    dislikes: "flashy colors",
    favoriteColors: "blue, black",
    notes: "Likes useful everyday gifts.",
  },
];

const EditFriend = () => {
  /**
   * Expo Router gives us the dynamic route value from /friend/edit/[id].
   */
  const { id } = useLocalSearchParams();

  const friendId = Number(id);
  const friend = friends.find((item) => item.id === friendId);

  /**
   * If this was connected to Appwrite, these states would be filled
   * after fetching the friend document from the database.
   */
  const [name, setName] = useState(friend?.name ?? "");
  const [birthDate, setBirthDate] = useState(friend?.birthDate ?? "");
  const [selectedRelationship, setSelectedRelationship] = useState(
    friend?.relationship ?? "Friend"
  );
  const [selectedBudget, setSelectedBudget] = useState(friend?.budget ?? "$20 - $35");
  const [likes, setLikes] = useState(friend?.likes ?? "");
  const [dislikes, setDislikes] = useState(friend?.dislikes ?? "");
  const [favoriteColors, setFavoriteColors] = useState(friend?.favoriteColors ?? "");
  const [notes, setNotes] = useState(friend?.notes ?? "");

  /**
   * Simple fallback if the friend id does not match any mock data.
   */
  if (!friend) {
    return (
      <View className="flex-1 items-center justify-center bg-pink-50 px-6">
        <Text className="text-2xl font-bold text-textPrimary">
          Friend not found
        </Text>

        <Text className="text-base text-textSecondary text-center mt-2">
          This profile could not be loaded.
        </Text>

        <AppButton
          title="Go Back"
          onPress={() => {
            router.back();
          }}
          className="mt-5"
        />
      </View>
    );
  }

  /**
   * Updates the friend profile.
   *
   * Right now, this only validates the form and routes back to the profile page.
   * Later, replace this with Appwrite updateDocument().
   */
  const handleUpdateFriend = () => {
    if (!name.trim()) {
      Alert.alert("Name required", "Please enter your friend's name.");
      return;
    }

    if (!birthDate.trim()) {
      Alert.alert("Birthday required", "Please enter their birthday.");
      return;
    }

    /**
     * Later Appwrite update shape:
     *
     * await databases.updateDocument(
     *   DATABASE_ID,
     *   FRIENDS_COLLECTION_ID,
     *   friendDocumentId,
     *   {
     *     name: name.trim(),
     *     birthDate: birthDate.trim(),
     *     relationship: selectedRelationship,
     *     budget: selectedBudget,
     *     likes: likes.trim(),
     *     dislikes: dislikes.trim(),
     *     favoriteColors: favoriteColors.trim(),
     *     notes: notes.trim(),
     *     updatedAt: new Date().toISOString()
     *   }
     * );
     */

    Alert.alert("Friend updated 💝", `${name.trim()}'s profile was updated.`, [
      {
        text: "OK",
        onPress: () => {
          router.replace(`/friend/${friend.id}`);
        },
      },
    ]);
  };

  /**
   * Deletes the friend profile.
   *
   * Later, this should delete the friend document from Appwrite and optionally
   * delete memories connected to this friend.
   */
  const handleDeleteFriend = () => {
    Alert.alert(
      "Delete friend?",
      `This will remove ${friend.name}'s profile from Upahaar.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            /**
             * Later:
             * await databases.deleteDocument(
             *   DATABASE_ID,
             *   FRIENDS_COLLECTION_ID,
             *   friendDocumentId
             * );
             */

            router.replace("/(tabs)/friends");
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/appBackground2_new.png")}
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
                Edit Friend 🎀
              </Text>

              <Text className="text-base text-textSecondary mt-2 leading-5">
                Update their birthday, preferences, and gift clues.
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

          {/* Info card */}
          <View
            className="rounded-3xl p-5 shadow-sm border mb-6"
            style={{
              backgroundColor: SOFT_PINK,
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Keep their profile fresh 💌
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Updated details help Mimi suggest better, more thoughtful gifts.
            </Text>
          </View>

          {/* Edit form */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary mb-4">
              Profile details
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
              Tip: Save clear details so Mimi can make better recommendations.
            </Text>

            <AppButton
              title="Save Changes"
              onPress={handleUpdateFriend}
              className="mt-5"
            />
          </View>

          {/* Danger zone */}
          <View
            className="bg-white rounded-3xl p-5 shadow-sm border mt-6"
            style={{
              borderColor: CARD_BORDER_COLOR,
              borderWidth: CARD_BORDER_WIDTH,
            }}
          >
            <Text className="text-lg font-bold text-textPrimary">
              Danger Zone
            </Text>

            <Text className="text-sm text-textSecondary mt-2 leading-5">
              Delete this friend profile if you no longer want to keep their
              birthday and memory notes.
            </Text>

            <Pressable
              onPress={handleDeleteFriend}
              className="mt-4 rounded-2xl px-4 py-3 items-center border"
              style={{
                backgroundColor: "#FFF0F3",
                borderColor: "#F4A6B8",
                borderWidth: CARD_BORDER_WIDTH,
              }}
            >
              <Text className="font-bold" style={{ color: "#C2185B" }}>
                Delete Friend
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default EditFriend;