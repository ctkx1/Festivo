import MapView, { Marker, Overlay } from "react-native-maps"
import { Text, View, Image, TouchableOpacity, Animated } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useState, useRef } from "react"

type LegendProps = { visible: boolean }

const Legend = ({ visible }: LegendProps) => {
  const slideAnim = useRef(new Animated.Value(visible ? 0 : 250)).current

  Animated.timing(slideAnim, {
    toValue: visible ? 0 : 250,
    duration: 300,
    useNativeDriver: true,
  }).start()

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 20,
        right: 10,
        transform: [{ translateY: slideAnim }],
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 10,
        padding: 10,
        maxWidth: 200,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/stage1_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Scena BLUE</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/stage2_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Scena GREEN</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/stage3_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Scena RED</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/stage_power.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Scena POWER</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/tent_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Strefa namiotowa</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/sprite_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Sprite Zone</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Image source={require("../../assets/icons/WC_pin.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Łazienki</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../../assets/icons/pin_gate_entry.png")} style={{ width: 20, height: 20, marginRight: 8 }} />
        <Text style={{ fontSize: 12 }}>Bramki Festiwalu</Text>
      </View>
    </Animated.View>
  )
}

const Map = () => {
  const [legendVisible, setLegendVisible] = useState(true)

  return (
    <View className='flex-1 bg-slate-900'>
      <MapView
        style={{ flex: 1, borderRadius: 5 }}
        initialRegion={{
          latitude: 51.476457096667815,
          longitude: 18.35182119589565,
          latitudeDelta: 0.0045,
          longitudeDelta: 0.0045,
        }}
      >
        <Overlay
          image={require("../../assets/images/render-mapy.png")}
          bounds={[[51.4818, 18.3495],[51.4782, 18.3545]]}
        />

        <Marker coordinate={{ latitude: 51.4767, longitude: 18.35114 }} title='Scena BLUE'>
          <Image source={require("../../assets/icons/stage1_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.4765, longitude: 18.35256 }} title='Scena GREEN'>
          <Image source={require("../../assets/icons/stage2_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.47775, longitude: 18.35203 }} title='Scena RED'>
          <Image source={require("../../assets/icons/stage3_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.47757, longitude: 18.35256 }} title='Scena POWER'>
          <Image source={require("../../assets/icons/stage_power.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.477, longitude: 18.3509 }} title='Strefa namiotowa'>
          <Image source={require("../../assets/icons/tent_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.47715, longitude: 18.35219 }} title="Sprite Zone">
          <Image source={require("../../assets/icons/sprite_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.47725, longitude: 18.3536 }} title='Łazienki'>
          <Image source={require("../../assets/icons/WC_pin.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>

        <Marker coordinate={{ latitude: 51.4759, longitude: 18.35123 }} title='Bramki Festiwalu'>
          <Image source={require("../../assets/icons/pin_gate_entry.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
        </Marker>
      </MapView>

      <Legend visible={legendVisible} />

      <TouchableOpacity
        onPress={() => setLegendVisible(!legendVisible)}
        style={{
          position: "absolute",
          bottom: 20,
          left: 10,
          backgroundColor: "white",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 14 }}>{legendVisible ? "Ukryj legendę" : "Pokaż legendę"}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Map
