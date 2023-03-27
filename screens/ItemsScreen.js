import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5, FontAwesome, MaterialIcons} from '@expo/vector-icons';

const ItemsScreen = ({route}) => {
    const navigation = useNavigation()
    const data= route?.params?.param;
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

  return (
    <SafeAreaView className="flex-1 bg-white relative">
        <ScrollView className="flex-1 px-4 py-6">
            <View className="relative bg-white shadow-lg">
                <Image
                    source={
                        {uri:
                            data?.photo?.images?.large?.url ?
                            data?.photo?.images?.large?.url :
                            "https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_1280.jpg"
                        }
                    }
                    className="w-full h-72 object-cover rounded-2xl"
                />
                <View className="flex-row absolute inset-x-0 top-5 justify-between px-6">
                <TouchableOpacity
                onPress={()=> navigation.navigate("Discover")}
                className="w-12 h-12 rounded-full items-center justify-center bg-white">
                <FontAwesome5 name="chevron-left" size={30} color="#ff6348" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full items-center justify-center bg-[#ff6348]">
                <FontAwesome5 name="heartbeat" size={30} color="white" />
                </TouchableOpacity>
                </View>

                <View className="flex-row absolute inset-x-0 bottom-5 justify-between px-6">
                <View className="flex-row space-x-2 items-center">
                <Text className="text-[12px] font-semibold text-gray-100">
                    {data?.price_level}
                </Text>
                <Text className="text-[30px] font-bold text-gray-100">
                    {data?.price}
                </Text>
                </View>

                <View className="px-2 py-1 rounded-md bg-white">
                <Text className="text-center font-semibold text-[#ff6348]">{data?.open_now_text}
                </Text>
                </View>
                </View>
            </View>

            <View className="mt-6">
                <Text className="text-[#ff6348] text-[24px] font-bold">
                    {data?.name}
                </Text>
                <View className=" flex-row items-center space-x-2 mt-2">
                <FontAwesome name="map-marker" size={25} color="gray" />
                <Text className="text-[20px] text-gray-400 font-bold">
                    {data?.location_string}
                </Text>
                </View>
            </View>

            <View className="mt-4 flex-row items-center justify-between">
                {data?.rating &&(
                    <View className="flex-row items-center space-x-2">
                        <View className="w-12 h-12 rounded-full bg-black items-center justify-center shadow-md">
                        <FontAwesome name="star" size={24} color="#ff6348" />
                        </View>
                        <View>
                            <Text>{data?.rating}</Text>
                            <Text>Rating</Text>
                        </View>
                    </View>
                )}

                {data?.price_level &&(
                    <View className="flex-row items-center space-x-2">
                        <View className="w-12 h-12 rounded-full bg-black items-center justify-center shadow-md">
                        <MaterialIcons name="attach-money" size={24} color="#ff6348" />
                        </View>
                        <View>
                            <Text>{data?.price_level}</Text>
                            <Text>Price level</Text>
                        </View>
                    </View>
                )}

                {data?.bearing &&(
                    <View className="flex-row items-center space-x-2">
                        <View className="w-12 h-12 rounded-full bg-black items-center justify-center shadow-md">
                        <FontAwesome name="map-signs" size={24} color="#ff6348" />
                        </View>
                        <View>
                            <Text>{data?.bearing}</Text>
                            <Text>Bearing</Text>
                        </View>
                    </View>
                )}
            </View>

            {data?.description &&(
                <Text className="mt-4 tracking-wide text-[16px] font-semibold text-gray-500">{data?.description}</Text>
            )}

            {data?.cuisine &&(
                <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
                {data?.cuisine.map((n)=>(
                <TouchableOpacity
                key={n.key}
                 className="px-2 py-1 rounded-md bg-[#ff6348]">
                 <Text className="text-black">{n.name}</Text>
                </TouchableOpacity>
                 ))}
                </View>
            )}

            <View className="mt-2 space-y-2 bg-gray-100 rounded-md px-4 py-2">
                {data?.phone && (
                    <View className="items-center flex-row space-x-6">
                    <FontAwesome name="phone" size={24} color="#ff6348" />
                    <Text className="text-lg">{data?.phone}</Text>
                    </View>
                )}

                 {/* {data?.email && (
                    <View className="items-center flex-row space-x-6">
                    <FontAwesome name="envelope" size={24} color="black" />
                    <Text className="text-lg">{data?.email}</Text>
                    </View>
                )} */}

                {data?.address && (
                    <View className="items-center flex-row space-x-6">
                    <FontAwesome name="map-pin" size={24} color="#ff6348" />
                    <Text className="text-lg">{data?.address}</Text>
                    </View>
                )}
                <TouchableOpacity>
                <View className="mt-4 px-4 py-4 rounded-full bg-[#ff6348] items-center justify-center mb-12">
                <Text className=" text-xl font-semibold uppercase tracking-wide text-white">reservation</Text>
                </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ItemsScreen