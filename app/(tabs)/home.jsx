import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

import { MusicItem } from '../../components/MusicItem';
import { router } from 'expo-router';

const Home = () => {
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
    onPress={() => router.push(`/play?uri=${encodeURIComponent(item)}`)}
    >
      <Text
        className="text-lg font-pregular p-3 text-white"
      >{item.split('/').pop()}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-primary w-full mt-8 items-center justify-center px-3">
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item}
        renderItem={musicItem}
      />
    </View>
  );
};

export default Home;