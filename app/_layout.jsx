import { View } from "react-native";
import "./nativewind-output";

export default function RootLayout({ children }) {
    return (
        <View className="flex-1">{children}</View>
    );
}