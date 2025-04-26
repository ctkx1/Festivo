import { Informations } from "@/constants/info"
import { useRouter } from "expo-router"
import { Animated, FlatList, Pressable, Text, View } from "react-native"

const Info = () => {
	const router = useRouter()

	const createAnimatedHandlers = () => {
		const scaleValue = new Animated.Value(1)

		const handlePressIn = () => {
			Animated.spring(scaleValue, {
				toValue: 0.95,
				useNativeDriver: true,
				speed: 50,
				bounciness: 5,
			}).start()
		}

		const handlePressOut = () => {
			Animated.spring(scaleValue, {
				toValue: 1,
				useNativeDriver: true,
				speed: 50,
				bounciness: 5,
			}).start()
		}

		return { scaleValue, handlePressIn, handlePressOut }
	}

	return (
		<>
			<View>
				<Text className='text-white uppercase px-9 font-bold text-lg'>
					info
				</Text>
			</View>
			<FlatList
				data={Informations}
				numColumns={2}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
				columnWrapperStyle={{ justifyContent: "center" }}
				scrollEnabled={false}
				renderItem={({ item }) => {
					const { scaleValue, handlePressIn, handlePressOut } =
						createAnimatedHandlers()

					return (
						<Animated.View
							style={{
								transform: [{ scale: scaleValue }],
								flex: 1,
								minWidth: "45%",
								maxWidth: "45%",
								margin: 4,
							}}>
							<Pressable
								onPress={() => router.push(`/informations/${item.id}`)}
								onPressIn={handlePressIn}
								onPressOut={handlePressOut}
								className={`${
									item.name === "Bilety" ? "bg-accent border-0" : ""
								} h-14 border border-gray-500 pt-4 pl-2 rounded-[5px]`}>
								<Text
									className={`${
										item.name === "Bilety" ? "text-slate-900" : "text-accent"
									} font-bold uppercase text-base text-left`}>
									{item.name}
								</Text>
							</Pressable>
						</Animated.View>
					)
				}}
			/>
		</>
	)
}

export default Info
