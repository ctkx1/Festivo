import MapView, { Marker, Overlay } from "react-native-maps"
import { Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

const Map = () => {
	return (
		<View className='flex-1 bg-slate-900'>
			<MapView
				style={{ flex: 1, borderRadius: 5 }}
				initialRegion={{
					latitude: 51.476457096667815,
					longitude: 18.35182119589565,
					latitudeDelta: 0.0045,
					longitudeDelta: 0.0045,
				}}>
				<Overlay
					image={require("../../assets/images/render-mapy.png")}
					bounds={[
						[51.4818, 18.3495],
						[51.4782, 18.3545],
					]}
				/>
				<Marker
					coordinate={{ latitude: 51.4765, longitude: 18.3511 }}
					title='Scena 1'
				/>
				<Marker
					coordinate={{ latitude: 51.4763, longitude: 18.35253 }}
					title='Scena 2'
				/>
				<Marker
					coordinate={{ latitude: 51.4776, longitude: 18.352 }}
					title='Scena 3'
				/>

				<Marker
					coordinate={{ latitude: 51.477, longitude: 18.3509 }}
					title='Strefa namiotowa'
				/>

				<Marker
					coordinate={{ latitude: 51.477, longitude: 18.3522 }}
					title='Sprite Zone'
				/>

				<Marker
					coordinate={{ latitude: 51.477, longitude: 18.3539 }}
					title='Łazienki'
				/>
			</MapView>
		</View>
	)
}
export default Map
