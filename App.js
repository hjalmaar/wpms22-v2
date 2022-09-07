import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <MainProvider>
        <Navigator></Navigator>
      </MainProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
