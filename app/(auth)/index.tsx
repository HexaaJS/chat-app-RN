import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Image, SafeAreaView, View } from "react-native";


export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{gap: 20, alignItems: "center"}}>
        <Image
         source={require("@/assets/images/Vector.png")}
         style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Modern Chat App</Text>
        <Text>The best chat app in the world</Text>
      </View>

      <Button>Sign in with passkey</Button>
      <Button>Continue with Google</Button>
    </SafeAreaView>
  );
}
