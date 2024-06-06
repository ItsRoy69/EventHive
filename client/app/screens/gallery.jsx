import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../context/GlobalProvider";
import { channelApi } from "../../api/channelApi";
import * as FileSystem from "expo-file-system";
import * as Base64 from "base64-js";
import { changeContentTypeToMultipart } from "../../utils/axiosConfig";
const Gallery = () => {
  const navigator = useNavigation()
  const images = [
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    require("../../assets/images/weddingimage.png"),
    
    
  ];

  const [selectedImages, setSelectedImages] = useState([]);
  const { user, currentEvent } = useGlobalContext();

  const handleUploadImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = result.assets;
        setSelectedImages([...selectedImages, ...newImages]);

        changeContentTypeToMultipart(); // Set Content-Type header to multipart/form-data

        for (const asset of newImages) {
          const formData = new FormData();
          formData.append("image", {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type || "image/jpeg", // Set a default type if it's not available
          });

          console.log("Uploading image:", asset.uri);

          try {
            const response = await channelApi.uploadImage(
              currentEvent.imageChannelId,
              formData,
              user.token
            );
            console.log("Image upload response:", response.data);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }
    } catch (error) {
      console.log("Error occurred while launching image picker:", error);
    }
  };

  return (
    <View className="flex-1 mt-12 ">
      <View className="flex flex-row gap-[12px] px-4">
      <View className=" p-2 w-[40px] bg-[#FFAD65]/[0.41] h-[40px] rounded-md">
        <TouchableOpacity onPress={()=>navigator.goBack()}>
        <Image
            source={require("../../assets/icons/backArrow.png")}
            resizeMode="contain"
            className='w-full h-full'
          />
        </TouchableOpacity>
          
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-xs font-light text-center">Wedding Day</Text>
          <Text className="text-2xl font-bold text-center mb-5">Gallery</Text>
        </View>
        
      </View>

      <ScrollView contentContainerClassName="p-4 ">
        <View className="flex-row flex-wrap justify-start rounded-lg mx-2">
          {[...images, ...selectedImages].map((image, index) => (
            <View key={index} className="w-1/4 p-1  ">
              <Image
                source={
                  typeof image === "number"
                    ? image
                    : image.uri
                    ? { uri: image.uri }
                    : require("../../assets/images/weddingimage.png") // or any other placeholder image
                }
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
