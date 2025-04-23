import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Weather from "../components/homepage/weather/Weather"

export default function Index() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className='bg-black flex-1'>
				<Weather />
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
