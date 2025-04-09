import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Image, SafeAreaView, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { isClerkAPIResponseError, useSignIn, useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { ClerkAPIError } from "@clerk/types";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {

  const { startSSOFlow} = useSSO();
  const { setActive, signIn } = useSignIn();
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);

    const handleSignInWithGoogle = async () => {
      try {
        const {createdSessionId, setActive} = await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        } else {
          // there is no session
        }
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          setErrors(error.errors);
        } else {
          console.error(error)
          
        }
      }
    }

    
    const handleSignInWithPasskey = async () => {
      try {
        

        const signInAttempt = await signIn?.authenticateWithPasskey({
          flow: 'discoverable'
        })

        if (signInAttempt?.status === "complete") {
          await setActive!({ session: signInAttempt.createdSessionId});
        } else {
          // there is no session
        }

      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          setErrors(error.errors);
        } else {
          console.error(error)
        }
      }
    }
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
      }}>

<View style={{ flex: 0.1}}/>

      <View style={{gap: 20, alignItems: "center"}}>
        {/* <Image
         source={require("@/assets/images/Vector.png")}
         style={{ width: 100, height: 100 }}
        /> */}

      <Text style={{ fontSize: 82, fontWeight: "bold" }}>MCA</Text>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Modern Chat App</Text>
        <Text>The best chat app in the world</Text>
        {errors.map((error) => (
          <Text key={error.code} style={{color: 'red'}}>{error.message}</Text>
        ))}
      </View>

      <View style={{ flex: 1}}/>

      <Button style={{marginVertical: 20
      }}
      onPress={handleSignInWithPasskey}>Sign in with passkey</Button>
      <Button onPress={handleSignInWithGoogle}>Sign in with Google</Button>

      </View>
      
    </SafeAreaView>
  );
}
