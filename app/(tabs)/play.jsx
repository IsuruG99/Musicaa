import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { View, Button, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

function Play() {
    const { uri } = useGlobalSearchParams();
    const [status, setStatus] = useState('stopped'); // 'playing', 'paused', 'stopped'
    const [soundObject, setSoundObject] = useState(null);

    useEffect(() => {
        if (uri) {
            handlePlay();
        }
        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, [uri]);

    const handlePlay = async () => {
        try {
            if (status === 'paused' && soundObject) {
                await soundObject.playAsync();
            } else {
                if (soundObject) {
                    await soundObject.unloadAsync();
                }
                const newSoundObject = new Audio.Sound();
                await newSoundObject.loadAsync({ uri });
                await newSoundObject.playAsync();
                setSoundObject(newSoundObject);
            }
            setStatus('playing');
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const handlePause = async () => {
        if (soundObject && status === 'playing') {
            await soundObject.pauseAsync();
            setStatus('paused');
        }
    };

    const handleStop = async () => {
        if (soundObject) {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            setStatus('stopped');
            setSoundObject(null);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Button title="Play" onPress={handlePlay} disabled={status === 'playing'} />
                    <Button title="Pause" onPress={handlePause} disabled={status !== 'playing'} />
                    <Button title="Stop" onPress={handleStop} disabled={status === 'stopped'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Play;