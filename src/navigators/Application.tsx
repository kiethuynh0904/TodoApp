import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home, Startup, NewTask, EditTask } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Startup" component={Startup} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="NewTask"
						options={{ headerShown: true }}
						component={NewTask}
					/>
					<Stack.Screen
						name="EditTask"
						options={{ headerShown: true }}
						component={EditTask}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
