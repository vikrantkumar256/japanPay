import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmailRegistration from '../component/register/EmailRegistration';
import UpdateUser from '../component/register/UpdateUser';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import AccountList from '../component/account/AccountList';
import AccountRegistration from '../component/account/AccountRegistration';
import UpdateAccount from '../component/account/UpdateAccount';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();


export default function RegisterScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerMode: 'none',

            }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="RegisterScreen" component={EmailRegistration} />
                <Stack.Screen name="UpdateUser" component={UpdateUser} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
                <Stack.Screen name="List" component={AccountList} />
                <Stack.Screen name="Register" component={AccountRegistration} />
                <Stack.Screen name="Update" component={UpdateAccount} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
