import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ThemeProvider } from '@/theme';
import { config } from '@/theme/gluestack-ui';

import ApplicationNavigator from './navigators/Application';
import './translations';

export const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<GluestackUIProvider config={config}>
					<ApplicationNavigator />
				</GluestackUIProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
