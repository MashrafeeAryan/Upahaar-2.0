import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";

// theme
const PRIMARY_PINK = "#C2185B";
const LIGHT_PINK = "#FCE4EC";

// fake fetch (simulates backend)
const fetchUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Rita Smith",
        phone: "+5999-771-7171",
        email: "rita@gmail.com",
        birthday: "1998-09-24",
        address: "Buffalo, NY",
        relationshipCount: 24,
        upcomingEvents: 3,
        avatar:
          "https://randomuser.me/api/portraits/women/44.jpg",
      });
    }, 500);
  });
};

// format birthday
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile().then(setUser);
  }, []);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* header background */}
      <View className="h-40" style={{ backgroundColor: PRIMARY_PINK }} />

      {/* avatar */}
      <View className="items-center -mt-16">
        <Image
          source={{ uri: user.avatar }}
          className="h-32 w-32 rounded-full border-4 border-white"
        />
      </View>

      {/* name */}
      <Text className="text-2xl font-bold text-center mt-4">
        {user.name}
      </Text>

      {/* info */}
      <View className="mt-6 px-6 gap-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Phone</Text>
          <Text className="font-medium">{user.phone}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Email</Text>
          <Text className="font-medium">{user.email}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Birthday</Text>
          <Text className="font-medium">
            {formatDate(user.birthday)}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">Location</Text>
          <Text className="font-medium">{user.address}</Text>
        </View>
      </View>

      {/* stats */}
      <View className="flex-row justify-around mt-8 px-6">
        <View className="items-center">
          <Text className="text-xl font-bold">
            {user.relationshipCount}
          </Text>
          <Text className="text-gray-500">Connections</Text>
        </View>

        <View className="items-center">
          <Text className="text-xl font-bold">
            {user.upcomingEvents}
          </Text>
          <Text className="text-gray-500">Upcoming</Text>
        </View>
      </View>

      {/* actions */}
      <View className="mt-8 px-6 gap-4">
        <Pressable
          className="py-4 rounded-xl items-center"
          style={{ backgroundColor: LIGHT_PINK }}
        >
          <Text style={{ color: PRIMARY_PINK }}>
            Edit Profile
          </Text>
        </Pressable>

        <Pressable
          className="py-4 rounded-xl items-center border"
          style={{ borderColor: PRIMARY_PINK }}
        >
          <Text style={{ color: PRIMARY_PINK }}>
            Manage Birthdays
          </Text>
        </Pressable>

        <Pressable className="py-4 items-center">
          <Text className="text-gray-500">Log out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;