import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
const Gallery = () => {
  const images = [
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
  ];

  const [selectedImages, setSelectedImages] = useState([]);

  const handleUploadImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 0,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const newImages = response.assets.map((asset) => asset.uri);
          setSelectedImages([...selectedImages, ...newImages]);
        }
      }
    );
  };

  return (
    <View className="flex-1 mt-8">
      <Text className="text-xs font-light text-center">Wedding Day</Text>
      <Text className="text-2xl font-bold text-center mb-4">Gallery</Text>
      <ScrollView contentContainerClassName="p-4 ">
        <View className="flex-row flex-wrap bg-[#F9DCC4] justify-between rounded-lg mx-2">
          {[...images, ...selectedImages].map((image, index) => (
            <View key={index} className="w-1/4 p-1">
              <Image
                source={typeof image === "number" ? image : { uri: image }}
                className="w-full h-20 rounded-lg"
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="bg-[#FFAD65] mt-6 px-6 py-3 w-100 mb-6 rounded-md mx-4"
        onPress={handleUploadImage}
      >
        <Text className="text-white text-center font-bold text-lg">
          UPLOAD IMAGE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gallery;
