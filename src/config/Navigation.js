import { GetStarted, Home, Addperson, AllDetail } from "./../Screen/index";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Get Start">
        <Stack.Screen
          name="Home"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Get Start"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllDetail"
          component={AllDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Add Person" component={Addperson} />
    </Drawer.Navigator>
  );
}
export default Navigation;
