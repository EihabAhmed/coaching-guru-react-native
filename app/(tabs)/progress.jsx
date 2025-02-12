import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import UserDetailContext from "../../context/UserDetailContext";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export default function Progress() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log("--", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: 700,
        }}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          padding: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            color: Colors.WHITE,
            marginBlock: 10,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={() => GetCourseList()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                route.push({
                  pathname: "/courseView/" + item?.docId,
                  params: {
                    courseParams: JSON.stringify(item),
                  },
                })
              }
            >
              <CourseProgressCard item={item} width={"96%"} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
