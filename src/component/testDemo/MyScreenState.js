import React from 'react';
import { useState } from 'react';
import { View, Button, Text } from 'react-native';

const MyScreenState = () => {
    const [status, setStatus] = useState('');

    const style = { backgroundColor: 'red' };

    return (<View>
        <Text testID='myText' style={style}>{status}</Text>
        <Button testID='myButton' onPress={() => setStatus('Button Pressed')} title="Press Me!" />

    </View>);
}
export default MyScreenState;