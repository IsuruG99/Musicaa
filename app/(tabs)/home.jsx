import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

import { MusicItem } from '../../components/MusicItem';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { setUri, uri } = useGlobalContext();
  const [musicFiles, setMusicFiles] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const fetchMusicFiles = async () => {
      if (!hasPermission) return;

      try {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
          first: 1000,
        });
        const musicFiles = media.assets.map(asset => asset.uri).filter(uri => !uri.includes('Notifications'));
        //clear musicfiles first
        setMusicFiles([]);
        setMusicFiles(musicFiles);
        console.log('Number of music files detected:', musicFiles.length);
      } catch (error) {
        console.error('Error fetching music files:', error);
      }
    };

    fetchMusicFiles();
  }, [hasPermission]);

  const musicItem = ({ item }) => (
    // trim the uri to show only the file name
    <TouchableOpacity
      onPress={() => {
        setUri(item);
        router.push(`/play?uri=${encodeURIComponent(item)}`);
      }}
    >
      <Text className="text-lg font-pregular p-3 text-white">{item.split('/').pop()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full p-5">
      <StatusBar barStyle="light-content" />
      <View className="w-full h-full">
        <Text className="text-3xl font-bold text-center text-white">Musicaa!</Text>
        <FlatList
          data={musicFiles}
          keyExtractor={(item) => item}
          renderItem={musicItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;