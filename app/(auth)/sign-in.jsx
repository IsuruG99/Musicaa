import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { images } from '../../constants';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { signIn } from '../../lib/appwrite';
import { setUser } from '../../context/GlobalProvider';

// Designed to auto Sign In for testing purposes

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Submit form & sign in to appwrite (Auto Sign In for testing)
  const submit = async () => {
    if (!form.email || !form.password) {
      form.email = 'a@a.com'
      form.password = 'aaaaaaaa'
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('An error occurred. Please try again.', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px] mx-auto" />
          <Text className="text-2xl text-center text-white mt-7">
            Sign in to your account
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row-gap-2">
            <Text className="text-gray-100">Don't have an account?</Text>
            {/* <Link href="/sign-up" className="text-secondary">Sign Up</Link> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;