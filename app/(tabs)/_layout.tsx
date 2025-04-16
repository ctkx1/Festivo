import { Image, Text } from "react-native"
import { Tabs } from "expo-router"
import { tabs } from "@/constants/data"

const Icons = ({ source, focused }: { source: any; focused: boolean }) => {
	return (
		<Image
			className='size-8'
			source={source}
			style={{ tintColor: focused ? "#f8b24b" : "#ffffff" }}
		/>
	)
}

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					paddingTop: 5,
					borderBlockColor: "transparent",
				},
			}}>
			{tabs.map(({ name, title, icon }) => (
				<Tabs.Screen
					key={name}
					name={name}
					options={{
						headerShown: false,
						tabBarLabel: ({ focused }) => (
							<Text
								style={{
									color: focused ? "#f8b24b" : "#aaa",
									fontSize: 14,
									paddingTop: 5,
								}}>
								{title}
							</Text>
						),
						tabBarIcon: ({ focused }) => (
							<Icons source={icon} focused={focused} />
						),
					}}
				/>
			))}
		</Tabs>
	)
}

export default TabsLayout
