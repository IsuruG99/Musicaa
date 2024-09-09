import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';

function Play() {
    const { handlePlay, handlePause, handleStop, isLoggedIn, isLoading, uri } = useGlobalContext();
    const [status, setStatus] = useState('stopped');

    // Return status for a text display, 
    // made this elaborate cuz i thought i would want to make the text fancy 
    // but i ended up not doing it
    useEffect(() => {
        return () => {
            switch (status) {
                case 'playing':
                    return "Playing";
                case 'paused':
                    return "Paused";
                case 'stopped':
                    return "Stopped";
            }
        }
    }, [status]);

    // Return a loading text if the app is still loading
    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    // Should not happen, ever, but, just in case
    if (!isLoggedIn) {
        return <View><Text>Please log in to play music.</Text></View>;
    }

    return (
        <SafeAreaView className="bg-primary w-full justify-center items-center h-full p-5">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View className="w-full items-center">
                    <Image source={images.logo} className="p-3 w-[100px] h-[100px] mx-auto" resizeMode='contain' />
                    <Text className="text-2xl text-center text-white mt-7">
                        {uri.trim().split('/').pop().replace(/\.(mp3|wav|webp)$/, '')}
                    </Text>
                    <Text className="text-2xl text-center text-white mt-7">{status}</Text>
                </View>
                <View
                    className="w-full flex-row items-center justify-center mt-5">
                    <TouchableOpacity className="p-3" onPress={() => { handlePlay(); setStatus("Playing"); }}>
                        <Image source={images.play} className="w-[50px] h-[50px] bg-white mx-auto" resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3" onPress={() => { handlePause(); setStatus("Paused"); }}>
                        <Image source={images.pause} className="w-[50px] h-[50px] bg-white mx-auto" resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3" onPress={() => { handleStop(); setStatus("Stopped"); }}>
                        <Image source={images.stop} className="w-[50px] h-[50px] bg-white mx-auto" resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Play;