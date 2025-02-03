import { Platform, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { db } from "./../../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserDetailContext from "@/context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";

export default function Home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS == "ios" && 45,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />
      {courseList?.length == 0 ? (
        <NoCourse />
      ) : (
        <CourseList courseList={courseList} />
      )}
    </View>
  );
}
