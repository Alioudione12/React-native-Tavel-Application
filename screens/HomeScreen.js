import { View, Text, SafeAreaView, TouchableOpacity,} from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useNavigation } from "@react-navigation/native"
import * as Animatable from 'react-native-animatable';



const HomeScreen = () => {
    const navigation= useNavigation();
useLayoutEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
},[])
  return (
    <SafeAreaView className="bg-[#ff6348] flex-1 relative">
    {/* firstSection */}
        <View className="flex-row px-6 mt-8 items-center space-x-2">
            <View className="w-16 h-16 bg-[#d2dae2] rounded-full items-center justify-center">
                <Text className="text-[#1F2225] text-3xl font-semibold">Go</Text>
            </View>
            <Animatable.Text animation={"flash"} easing="ease-in-out" iterationCount={"infinite"} className="text-[#d2dae2] text-3xl font-semibold">Discover</Animatable.Text>
         </View>

        {/* secondSection */}
        <View className="px-6 space-y-3 mt-8">
            <Text className=" text-[#1F2225] text-[29px] font-bold">Voyagez en toute confiance</Text>
            <Text className="text-[#d2dae2] text-[25px] font-semibold">Commencez à planifier </Text>
            <Text className="text-[#d2dae2] text-base text-[20px] font-semibold">votre prochaine escapade,</Text>
        </View>

        {/* Circle section */}
        <View className="w-[400px] h-[400px] bg-[#ff6348] rounded-full absolute bottom-36 -right-36"></View>
        <View className="w-[400px] h-[400px] bg-white rounded-full absolute -bottom-28 -left-36"></View>

        {/* imageContainer */}
        <View className="flex-1 relative items-center justify-center">
        <Animatable.Image 
            animation="fadeIn"
            easing="ease-in-out"
            source={require('../assets/cover4.png')} 
            className="w-full h-full object-cover mt-20"/>
        
            <TouchableOpacity
            onPress={()=>navigation.navigate("Discover")}
            className="absolute bottom-20 w-44 h-24 border-l-2 border-r-2 border-t-4 border-[#ff6348] rounded-xl items-center justify-center">
            <Animatable.View animation={"pulse"} easing="ease-in-out" iterationCount={"infinite"} className="w-40 h-20 items-center justify-center rounded-xl bg-[#ff6348]">
                <Text className="text-black text-[36px] font-bold">Go</Text>
            </Animatable.View>
        </TouchableOpacity>
        </View>


    </SafeAreaView>
  )
}

export default HomeScreen