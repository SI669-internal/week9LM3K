import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import store from './app/store';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return( 
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home' 
          screenOptions={
            { 
              title: 'ListMaker 2000',
            }}>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Details' component={DetailsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;