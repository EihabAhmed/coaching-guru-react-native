import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imageAssets } from "./../../constant/Option";
import Colors from "../../constant/Colors";

export default function CourseList({ courseList }) {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Courses
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseContainer}>
            <Image
              source={imageAssets[item.banner_image]}
              style={{
                width: "100%",
                height: 150,
                borderRadius: 15,
              }}
            />

            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 18,
                marginTop: 10,
              }}
            >
              {item?.courseTitle}
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
              }}
            >
              {item?.chapters?.length} Chapters
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 260,
  },
});
