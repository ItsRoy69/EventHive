import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Path } from "react-native-svg";

const sections = [
  {
    _id: "section1",
    floorId: "floor1",
    name: "Main Hall",
    coordinates: [
      [10, 50],
      [150, 50],
      [150, 200],
      [10, 200],
    ], // Rectangular coordinates
    color: "lightblue",
  },
  {
    _id: "section2",
    floorId: "floor1",
    name: "Dining Area",
    coordinates: [
      [160, 50],
      [300, 50],
      [300, 200],
      [160, 200],
    ], // Rectangular coordinates
    color: "lightyellow",
  },
  // Add more sections as needed
];

const FloorPlan = () => {
  const renderSections = () => {
    return sections.map((section) => {
      const pathData =
        section.coordinates.reduce((acc, [x, y], index) => {
          return acc + `${index === 0 ? "M" : "L"}${x},${y} `;
        }, "") + "Z";

      return (
        <View key={section._id} style={styles.sectionContainer}>
          <Svg style={styles.sectionSvg}>
            <Path
              d={pathData}
              fill={section.color}
              stroke="black"
              strokeWidth="1"
            />
          </Svg>
          <Text
            style={[
              styles.sectionName,
              {
                left: section.coordinates[0][0],
                top: section.coordinates[0][1],
              },
            ]}
          >
            {section.name}
          </Text>
        </View>
      );
    });
  };

  return <View style={styles.container}>{renderSections()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 400, // Adjust image height as needed
  },
  sectionContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 400, // Ensure it matches the image height
  },
  sectionSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  sectionName: {
    position: "absolute",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    color: "white",
  },
});

export default FloorPlan;
