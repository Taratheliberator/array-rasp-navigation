import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import DetailsScreen from './components/Details';
import { NameContext } from './components/NameContext';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [facultyName, setFacultyName] = useState(null);
  const [groupName, setGroupName] = useState(null);

  return (
    <NameContext.Provider value={{ facultyName, setFacultyName, groupName, setGroupName }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Выбор факультета и группы" component={HomeScreen} />
          <Stack.Screen name="Расписание занятий" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NameContext.Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ecf0f2',
  },
});
