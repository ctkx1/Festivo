import MapView, { Marker, Overlay } from "react-native-maps"
import { Text, View, Image } from "react-native"
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
					coordinate={{ latitude: 51.4767, longitude: 18.35114 }}
					title='Scena BLUE'>
					<Image
    				source={require("../../assets/icons/stage1_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>
				</Marker>
				<Marker
					coordinate={{ latitude: 51.4765, longitude: 18.35256 }}
					title='Scena GREEN'>
					<Image
    				source={require("../../assets/icons/stage2_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>				
				</Marker>

				<Marker
					coordinate={{ latitude: 51.47775, longitude: 18.35203 }}
					title='Scena RED'>
					<Image
    				source={require("../../assets/icons/stage3_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>

				</Marker>

				<Marker
					coordinate={{ latitude: 51.47757, longitude: 18.35256 }}
					title='Scena POWER'>
					<Image
    				source={require("../../assets/icons/stage_power.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>

				</Marker>

				<Marker coordinate={{ latitude: 51.477, longitude: 18.3509 }}
				title='Strefa namiotowa'>
					<Image
    				source={require("../../assets/icons/tent_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>
				</Marker>
				

				<Marker coordinate={{ latitude: 51.47715, longitude: 18.35219 }} 	title="Sprite Zone">
  					<Image
    				source={require("../../assets/icons/sprite_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>
				</Marker>

				<Marker
					coordinate={{ latitude: 51.47725, longitude: 18.3536 }}
					title='Łazienki'>
					<Image
    				source={require("../../assets/icons/WC_pin.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>
				</Marker>
				<Marker
					coordinate={{ latitude: 51.4759, longitude: 18.35123 }}
					title='Bramki Festiwalu'>
					<Image
    				source={require("../../assets/icons/pin_gate_entry.png")}
    				style={{ width: 40, height: 40 }}
    				resizeMode="contain"
  					/>
				</Marker>
			</MapView>
		</View>
	)
}
export default Map
