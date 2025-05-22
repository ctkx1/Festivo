import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

interface ProfileFormProps {
  session: Session
  username: string
  setUsername: (text: string) => void
  dateOfBirth: Date | null
  setDateOfBirth: (date: Date | null) => void
  loading: boolean
}

export default function ProfileForm({ 
  session, 
  username, 
  setUsername, 
  dateOfBirth, 
  setDateOfBirth, 
  loading 
}: ProfileFormProps) {
  const [visible, setVisible] = useState(false)

  const formatDate = (date: Date | null) => {
    if (!date) return 'Podaj datę urodzenia'
    return date.toLocaleDateString('pl-PL')
  }

  return (
    <>
      <View className='pt-3 w-full'>
        <Text className='text-accent text-xl font-bold'>Email:</Text>
        <TextInput
          className='text-slate-300 border border-accent p-4 rounded-lg mb-3'
          placeholderTextColor="#9CA3AF"
          autoCapitalize={'none'}
          value={session?.user?.email}
          editable={false}
        />
      </View>
      <View className='pb-3 w-full'>
        <Text className='text-accent text-xl font-bold'>Imię:</Text>
        <TextInput 
          className='text-white border border-accent p-4 rounded-lg mb-3'
          onChangeText={setUsername}
          value={username || ''}
        />
        <Text className='text-accent text-xl font-bold'>Data urodzenia:</Text>
        <TouchableOpacity 
          className="bg-transparent border border-accent p-4 rounded-lg mb-3" 
          onPress={() => setVisible(true)}
        >
          <Text className="text-white font-bold text-center text-lg">
            {formatDate(dateOfBirth)}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal 
          isVisible={visible}
          mode="date"
          onConfirm={(date) => {
            setVisible(false)
            setDateOfBirth(date)
          }}
          onCancel={() => setVisible(false)}
          date={dateOfBirth || new Date()}
          confirmButtonTestID='confirm'
          cancelButtonTestID='cancel'
          confirmTextIOS="Zatwierdź"
          cancelTextIOS="Anuluj"
        />
      </View>
    </>
  )
}