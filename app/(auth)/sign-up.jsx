// import { View, Text, ScrollView, Image } from 'react-native';
// import React, { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link } from 'expo-router';

// import { images } from '../../constants';

// import FormField from '../../components/FormField';
// import CustomButton from '../../components/CustomButton';



// const SignUp = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const submit = () => {

//   }

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView>
//         <View className="w-full justify-center min-h-[85vh] px-4 my-6">
//           <Image source={images.logo} className="w-[115px] h-[35px] mx-auto" />
//           <Text className="text-2xl text-center text-white mt-7">
//             Sign in to your account
//           </Text>
//           <FormField
//             title="Username"
//             value={form.username}
//             handleChangeText={(e) => setForm({ ...form, username: e })}
//             otherStyles="mt-7"
//           />
//           <FormField
//             title="Email"
//             value={form.email}
//             handleChangeText={(e) => setForm({ ...form, email: e })}
//             otherStyles="mt-7"
//             keyboardType="email-address"
//           />
//           <FormField
//             title="Password"
//             value={form.password}
//             handleChangeText={(e) => setForm({ ...form, password : e })}
//             otherStyles="mt-7"
//             keyboardType="password"
//           />

//           <CustomButton
//             title="Sign In"
//             handlePress={submit}
//             isLoading={isSubmitting}
//             containerStyles="mt-7"
//           />

//           <View className="justify-center pt-5 flex-row-gap-2">
//             <Text className="text-gray-100">Already have an account?</Text>
//             <Link href="/sign-in" className="text-secondary">Sign In</Link>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default SignUp;