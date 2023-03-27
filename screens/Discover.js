import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {useNavigation } from "@react-navigation/native"
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MenuContainer from '../components/MenuContainer';
import { Attractions, Hotels, NotFound, Restaurants } from '../assets';
import ItemsContainer from '../components/ItemsContainer';
import { getPlacesData } from '../api';

const Discover = () => {
    const navigation= useNavigation();

    const [type, setType ]= useState("restaurants")
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null)
    const [bl_lng, setBl_lng] = useState(null)
    const [tr_lat, setTr_lat] = useState(null)
    const [tr_lng, setTr_lng] = useState(null)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

  useEffect(()=>{
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data =>{
        setMainData(data);
        setInterval(() => {
            setIsLoading(false)
            
        }, 2000);
    })
  },[bl_lat, bl_lng, tr_lat, tr_lng, type])  
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
            <Text className="text-[35px] text-[#ff6348] font-bold">Discover</Text>
            <Text className="text-black text-[24px]">Votre prochaine destination</Text>
        </View>
        <View className="w-12 h-12 bg-[#ff6348] rounded-md items-center justify-center">
        <FontAwesome name="user" size={40} color="white" />
        </View>
      </View>
      {/* search address */}
      <View className="flex-row items-center mx-4 rounded-full py-1 px-4 shadow-lg mt-4">
      <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{fields:"geometry"}}
      placeholder='Search addresss'
      className="placeholder-gray-500 border"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(details?.geometry?.viewport);
        setBl_lat(details?.geometry?.viewport?.southwest?.lat)
        setBl_lng(details?.geometry?.viewport?.southwest?.lng)
        setTr_lat(details?.geometry?.viewport?.northeast?.lat)
        setTr_lng(details?.geometry?.viewport?.northeast?.lng)
      }}
      query={{
        key: 'AIzaSyDVkTw8sCVwH-UWj6otO6w3d428ul1nIwM',
        language: 'en',
      }}
     />
      </View>

    {/* Menu Container */}
    {   isLoading ? <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#ff6348" />
    </View> :
    <ScrollView>
            <View className="flex-row items-center px-8 mt-8 justify-between">
                <MenuContainer 
                key={"hotels"} 
                title="Hotels"
                imageSrc={Hotels}
                type={type}
                setType={setType}
                />
                <MenuContainer 
                key={"attractions"} 
                title="Attractions"
                imageSrc={Attractions}
                type={type}
                setType={setType}
                />
                <MenuContainer 
                key={"restaurants"} 
                title="Restaurants"
                imageSrc={Restaurants}
                type={type}
                setType={setType}
                />
            </View>

            {/* section display resto */}
            <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                    <Text className="text-gray-600 font-bold text-[20px]">Meilleurs voyages</Text>
                    <TouchableOpacity className="flex-row justify-center items-center space-x-2">
                        <Text className=" font-bold text-gray-700 text-[20px] ">Explore</Text>
                        <FontAwesome name="long-arrow-right" size={24} color="#ff6348" />
                    </TouchableOpacity>
                </View>


                <View className="px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
                    {mainData?.length > 0 ? (<>
                    {mainData?.map((data,i)=>(
                        <ItemsContainer 
                            key={i} 
                            imageSrc = 
                            {data?.photo?.images?.medium?.url ?
                            data?.photo?.images?.medium?.url :
                            "https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_1280.jpg"} 
                            title={data?.name} 
                            location={data?.location_string}
                            data={data}
                        />
                    ))}
                        </>):(<>
                            <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                <Image 
                                    source={NotFound}
                                    className="w-20 h-20 object-cover"
                                    />
                                <Text className="text-l text-[#ff6348] font-semibold">Opps...No Data Found</Text>
                            </View>
                        </>)
                    }
                </View>
            </View>
        </ScrollView>
    }
        
    </SafeAreaView>
  )
}

export default Discover