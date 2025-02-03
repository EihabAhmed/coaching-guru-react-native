import {
  TextInput,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "./../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import UserDetailContext from "../../context/UserDetailContext";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [loading, setLoading] = useState(false);

  const onSignInClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        // console.log(user);
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        e.message;
        setLoading(false);
        ToastAndroid.show("Incorrect Email & Password", ToastAndroid.BOTTOM);
      });
  };

  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "Users", email));
    // console.log(result.data());
    setUserDetail(result.data());
  };

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 100,
          flex: 1,
          padding: 25,
          backgroundColor: Colors.WHITE,
        }}
      >
        <Image
          source={require("./../../assets/images/logo.png")}
          style={{
            width: 180,
            height: 180,
          }}
        />

        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome Back
        </Text>

        <TextInput
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={styles.textInput}
        />

        <TouchableOpacity
          onPress={onSignInClick}
          disabled={loading}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            marginTop: 25,
            borderRadius: 10,
          }}
        >
          {!loading ? (
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.WHITE,
                textAlign: "center",
              }}
            >
              Sign In
            </Text>
          ) : (
            <ActivityIndicator size={"large"} color={Colors.WHITE} />
          )}
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
            }}
          >
            Don't have an account?
          </Text>

          <Pressable onPress={() => router.push("/auth/signUp")}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontFamily: "outfit-bold",
              }}
            >
              Create New Here
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
