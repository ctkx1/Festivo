import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Auth from "../components/profile/Auth"
import Account from "../components/profile/Account"
import { View } from "react-native"
import { Session } from "@supabase/supabase-js"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export default function Profile() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-slate-900 pt-2'>
				<View>
					{session && session.user ? (
						<Account key={session.user.id} session={session} />
					) : (
						<Auth />
					)}
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
