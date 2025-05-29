import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TicketPurchaseModal from './TicketPurchaseModal'

interface ProfileFormProps {
  session: Session
  username: string
  dateOfBirth: Date | null
  loading: boolean
  onSave: (newUsername: string, newDateOfBirth: Date | null) => void
}

export default function ProfileForm({ 
  session, 
  username, 
  dateOfBirth, 
  loading, 
  onSave 
}: ProfileFormProps) {
  const [localUsername, setLocalUsername] = useState(username)
  const [localDate, setLocalDate] = useState<Date | null>(dateOfBirth)
  const [visible, setVisible] = useState(false)

  const [ticketModalVisible, setTicketModalVisible] = useState(false)
	const [isPurchasing, setIsPurchasing] = useState(false)
	const [purchaseComplete, setPurchaseComplete] = useState(false)

	const handleBuy = () => {
		setTicketModalVisible(true)
		setIsPurchasing(true)
		setPurchaseComplete(false)
		setTimeout(() => {
			setIsPurchasing(false)
			setPurchaseComplete(true)
		}, 5000)
	}

	const closeTicketModal = () => setTicketModalVisible(false)

  useEffect(() => {
    setLocalUsername(username)
  }, [username])

  useEffect(() => {
    setLocalDate(dateOfBirth)
  }, [dateOfBirth])

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
          onChangeText={setLocalUsername}
          value={localUsername}
        />

        <Text className='text-accent text-xl font-bold'>Data urodzenia:</Text>
        <TouchableOpacity 
          className="bg-transparent border border-accent p-4 rounded-lg mb-3" 
          onPress={() => setVisible(true)}
        >
          <Text className="text-white font-bold text-center text-lg">
            {formatDate(localDate)}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal 
          isVisible={visible}
          mode="date"
          onConfirm={(date) => {
            setVisible(false)
            setLocalDate(date)
          }}
          onCancel={() => setVisible(false)}
          date={localDate || new Date()}
          confirmButtonTestID='confirm'
          cancelButtonTestID='cancel'
          confirmTextIOS="Zatwierdź"
          cancelTextIOS="Anuluj"
        />
      </View>

	  <TouchableOpacity
				className='w-full bg-accent py-4 px-4 rounded-lg items-center'
				onPress={handleBuy}>
				<Text className='text-black font-bold text-lg'>Kup bilet</Text>
			</TouchableOpacity>

			<TicketPurchaseModal
				visible={ticketModalVisible}
				onClose={closeTicketModal}
				isPurchasing={isPurchasing}
				purchaseComplete={purchaseComplete}
			/>

      <TouchableOpacity
        className="w-full bg-accent py-4 px-4 rounded-lg items-center mt-4"
        onPress={() => onSave(localUsername, localDate)}
        disabled={loading}
      >
        <Text className="text-black font-bold text-center text-lg">
          {loading ? 'Ładowanie...' : 'Zaktualizuj dane konta'}
        </Text>
      </TouchableOpacity>
    </>
  )
}
