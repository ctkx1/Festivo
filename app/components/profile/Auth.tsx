import React, { useState } from 'react'
import { Text, Alert, StyleSheet, View, AppState, TextInput, Button, TouchableOpacity } from 'react-native'
import { supabase } from '@/lib/supabase'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View className='bg-slate-900 p-3 h-full w-full justify-center items-center'>
        <Text className='text-white text-4xl font-bold'>Zaloguj się lub zarejestruj</Text>
      {/* <View className='mt-2 py-2'>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View> */}
      <View className='mt-2 pt-2 w-full'>
        <Text className='text-accent text-xl font-bold'>Email:</Text>
        <TextInput 
          className='text-white border border-accent p-4 rounded-lg mb-3'
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize={'none'}/>
      </View>

      <View className='mt-2 w-full'>
        <Text className='text-accent text-xl font-bold'>Hasło:</Text>
        <TextInput 
          className='text-white border border-accent p-4 rounded-lg mb-3'
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Hasło"
          placeholderTextColor="#9CA3AF"
          autoCapitalize={'none'}/>
      </View>
      <View className='mt-2 py-2 w-full'>
          <TouchableOpacity 
            className="bg-accent p-4 rounded-lg mb-7" 
            disabled={loading} onPress={() => signInWithEmail()}
          >
            <Text className="text-black font-bold text-center text-lg">Zaloguj</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-transparent border border-accent p-4 rounded-lg" 
            disabled={loading} onPress={() => signUpWithEmail()}
          >
            <Text className="text-orange-300 font-bold text-center text-lg">Stwórz konto</Text>
          </TouchableOpacity>
          
        </View>
      {/* <View className='mt-2 py-2'>
        <Button title="Zaloguj" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View className='mt-2 py-2'>
        <Button title="Stwórz konto" disabled={loading} onPress={() => signUpWithEmail()} />
      </View> */}
    </View>
  )
}