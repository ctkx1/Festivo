// ProfileForm.tsx
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Session } from "@supabase/supabase-js"
import DateTimePickerModal from "react-native-modal-datetime-picker"

interface ProfileFormProps {
	session: Session
	username: string
	setUsername: (text: string) => void
	dateOfBirth: Date | null
	setDateOfBirth: (date: Date | null) => void
	loading: boolean
	onSubmit: () => void
}

export default function ProfileForm({
	session,
	username,
	setUsername,
	dateOfBirth,
	setDateOfBirth,
	loading,
	onSubmit,
}: ProfileFormProps) {
	const [visible, setVisible] = useState(false)

	const formatDate = (date: Date | null) => {
		return date ? date.toLocaleDateString("pl-PL") : "Podaj datę urodzenia"
	}

	return (
		<View className='w-full'>
			<Text className='text-accent text-xl font-bold'>Imię:</Text>
			<TextInput
				className='text-white border border-accent p-4 rounded-lg mb-3'
				placeholderTextColor='#9CA3AF'
				autoCapitalize='none'
				value={username}
				onChangeText={setUsername}
			/>

			<Text className='text-accent text-xl font-bold'>Data urodzenia:</Text>
			<TouchableOpacity
				className='bg-transparent border border-accent p-4 rounded-lg mb-3'
				onPress={() => setVisible(true)}>
				<Text className='text-white font-bold text-center text-lg'>
					{formatDate(dateOfBirth)}
				</Text>
			</TouchableOpacity>

			<DateTimePickerModal
				isVisible={visible}
				mode='date'
				date={dateOfBirth || new Date()}
				onConfirm={date => {
					setVisible(false)
					setDateOfBirth(date)
				}}
				onCancel={() => setVisible(false)}
				confirmTextIOS='Zatwierdź'
				cancelTextIOS='Anuluj'
			/>

			<TouchableOpacity
				className={`bg-accent p-4 rounded-lg ${loading ? "opacity-50" : ""}`}
				onPress={onSubmit}
				disabled={loading}>
				<Text className='text-black font-bold text-center text-lg'>
					{loading ? "Ładowanie..." : "Zapisz zmiany"}
				</Text>
			</TouchableOpacity>
		</View>
	)
}
