import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const MusicItem = ({ item }) => {
    const handlePress = () => {
        console.log('Item pressed:', item);
    };

    const renderItem = ({ item }) => (
        // trim the uri to show only the file name
        <TouchableOpacity>
            <Text
                className="text-lg font-pregular p-3 text-white"
            >{item.split('/').pop()}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text
                className="text-lg font-pregular p-3 text-white"
            >{item.split('/').pop()}</Text>
        </TouchableOpacity>
    );
};

export default MusicItem;