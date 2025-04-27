import { Stack } from "expo-router"
import "./global.css"
export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen name='artist/[id]' options={{ headerShown: false }} />
			<Stack.Screen name='informations/[id]' options={{ headerShown: false }} />
			<Stack.Screen name='news/[id]' options={{ headerShown: false }} />
		</Stack>
	)
}
