import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../components/CustomButton'; // Assuming default export

export default function App() {
    return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] items-center justify-center px-4">
          <Text className="text-3xl font-bold text-center text-white">
            Musicaa!
          </Text>
          <Link className="text-2xl text-gray-100 mt-7 text-center" href="/home">
            Your music haven
          </Link>
          <CustomButton
            title="Sign In"
            handlePress={() => router.push('/sign-in')}
            containerStyles="mt-7 w-full"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}