import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Weather from "../components/homepage/weather/Weather"
import Title from "../components/homepage/title/Title"
import { ScrollView, Text, View } from "react-native"
import Info from "../components/homepage/info/Info"
import Artists from "../components/homepage/artists/Artists"

export default function Index() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className='flex-1  bg-slate-900'>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}>
					<Weather />
					<Title />
					<Artists />
					<Info />
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
