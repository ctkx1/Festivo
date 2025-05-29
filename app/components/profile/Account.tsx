// Account.tsx
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

import Avatar from "./Avatar"
import ProfileForm from "./ProfileForm"
import TicketPurchaseModal from "./TicketPurchaseModal"
import useProfile from "./useProfile"

export default function Account({ session }: { session: Session }) {
	const {
		loading,
		username,
		setUsername,
		dateOfBirth,
		setDateOfBirth,
		avatarUrl,
		updateProfile,
	} = useProfile(session)

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

	const handleSubmit = () => {
		updateProfile({
			username,
			date_of_birth: dateOfBirth,
			avatar_url: avatarUrl ? avatarUrl.split("?")[0] : null,
		})
	}

	return (
		<View className='bg-slate-900 p-3 h-full w-full justify-center items-center'>
			{username ? (
				<Text className='text-accent text-4xl font-bold mb-3'>
					Witaj, {username}!
				</Text>
			) : null}
			<Text className='text-white text-4xl font-bold mb-6'>
				Zarządzaj swoim kontem
			</Text>

			<Avatar
				session={session}
				username={username}
				avatarUrl={avatarUrl}
				updateProfile={updateProfile}
				dateOfBirth={dateOfBirth}
			/>
			{/* <TouchableOpacity
				className='w-full bg-accent py-4 px-4 rounded-lg items-center mt-4'
				onPress={handleBuy}>
				<Text className='text-black font-bold text-lg'>Kup bilet</Text>
			</TouchableOpacity>

			<TicketPurchaseModal
				visible={ticketModalVisible}
				onClose={closeTicketModal}
				isPurchasing={isPurchasing}
				purchaseComplete={purchaseComplete}
			/> */}

			<ProfileForm 
 				session={session}
 				username={username}
 				dateOfBirth={dateOfBirth}
 				loading={loading}
 				onSave={(newUsername, newDateOfBirth) =>
 				  updateProfile({
 				    username: newUsername,
 				    date_of_birth: newDateOfBirth,
 				    avatar_url: avatarUrl ? avatarUrl.split('?')[0] : null,
   	 				})
	 				}
				/>


			

			<TouchableOpacity
				className='bg-transparent border border-accent p-4 rounded-lg mt-4 w-full'
				onPress={() => supabase.auth.signOut()}
				disabled={loading}>
				<Text className='text-orange-300 font-bold text-center text-lg'>
					Wyloguj
				</Text>
			</TouchableOpacity>
		</View>
	)
}
