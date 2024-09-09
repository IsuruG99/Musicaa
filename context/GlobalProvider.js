import { createContext, useContext, useState, useEffect } from "react";
import { Audio } from 'expo-av';

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider({ children }) {
    const [uri , setUri] = useState(null);
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [status, setStatus] = useState('stopped'); // 'playing', 'paused', 'stopped'
    const [soundObject, setSoundObject] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsloggedIn(true);
                    setUser(res);
                }
                else {
                    setIsloggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, [soundObject]);

    const handlePlay = async () => {
        try {
            
            if (status === 'paused' && soundObject) {
                setStatus('playing');
                await soundObject.playAsync();
            } else {
                if (soundObject) {
                    await soundObject.unloadAsync();
                }
                const newSoundObject = new Audio.Sound();
                await newSoundObject.loadAsync({ uri });
                setStatus('playing');
                await newSoundObject.playAsync();
                setSoundObject(newSoundObject);
            }
        } catch (error) {
            handleStop();
            console.error('Error playing audio:', error);
        }
    };

    const handlePause = async () => {
        setStatus('paused');
        if (soundObject && status === 'playing') {   
            await soundObject.pauseAsync();
        }
        else {
            handleStop();
            console.log('No audio to pause');
        }
    };

    const handleStop = async () => {
        if (soundObject) {
            
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            
            setSoundObject(null);
        }
        setStatus('stopped');
    };

    

    return (
        <GlobalContext.Provider 
        value={{ 
            uri,
            setUri,
            isLoggedIn,
            setIsloggedIn,
            user,
            setUser,
            isLoading,
            handlePlay, 
            handlePause, 
            handleStop }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;