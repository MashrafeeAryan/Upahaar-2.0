import { TextInput } from "react-native";

//Reusable input component that wraps React Native's Text INput
//Helps so that I don't have to repeat styles, behavior and fixes across every screen
export default function InputField(props) {
    return (
        <TextInput
        {...props}
        className="border border-primary rounded-lg px-4 py-3 text-base mb-4 text-gray-900 bg-white"
        underlineColorAndroid="transparent"
        placeholderTextColor="#9CA3AF"
        />
    )
}
