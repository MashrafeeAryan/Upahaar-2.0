import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/**
 * Shared Upahaar theme colors.
 *
 * The tab bar uses a soft, light-pink style to match the app's
 * cute/girly visual direction while keeping navigation readable.
 */
const PRIMARY_PINK = "#D81B60";
const SOFT_PINK = "#FFF5F8";
const BORDER_PINK = "#F8BBD0";
const MUTED_TEXT = "#9B6B7C";

/**
 * Bottom tab layout for the main authenticated area of Upahaar.
 *
 * Tabs:
 * - Home: dashboard with birthdays and recent memories
 * - Friends: saved people and birthday profiles
 * - Memory: quick note capture / Memory Drop
 * - Gifts: gift recommendations from saved memories
 * - Settings: account, privacy, and app settings
 */
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: PRIMARY_PINK,
        tabBarInactiveTintColor: MUTED_TEXT,

        tabBarStyle: {
          backgroundColor: SOFT_PINK,
          borderTopColor: BORDER_PINK,
          borderTopWidth: 1,
          height: 76,
          paddingBottom: 12,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friend",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="memory"
        options={{
          title: "Memory",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="gifts"
        options={{
          title: "Gifts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;