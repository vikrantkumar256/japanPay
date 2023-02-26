import React from 'react';
import db from '../../services/firebase.config';
import { collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Modal, Portal, Provider } from 'react-native-paper';
import { query, where, getDocs } from 'firebase/firestore';


import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Button,
    TouchableOpacity
} from 'react-native';

import { doc, getDoc, onSnapshot } from "firebase/firestore";








const Item = (props) => {

    const { bankName, accountNumber, amount } = props.item;

    const containerStyle = { backgroundColor: 'white', padding: 20 };


    return (



        <View style={styles.item}>
            <View>
                <Text>{bankName}</Text>
                <Text>{accountNumber}</Text>
                <Text>{amount}</Text>
            </View>
            {/* <View>
                <View style={styles.btn}>
                    <Button title='delete' />
                </View>
                <View style={styles.btn}>
                    <Button title='update' />
                </View>
            </View> */}

        </View>

    );


}

const AccountList = (props) => {
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, 'product')
            const q = query(colRef, where("userid", "==", props.userid));
            const QuerySnapshot = await getDocs(q);
            const accounts = [];
            QuerySnapshot.forEach((doc) => {
                accounts.push({ id: doc.id, ...doc.data() });
            })
            console.log(accounts);
            setAccounts(accounts);
            //console.log(users)
        }
        fetchData().catch(console.error);
    }, []);
    console.log(accounts);
    return (

        <SafeAreaView style={styles.container}>
            <Text> Account List </Text>
            <FlatList
                data={accounts}
                renderItem={({ item }) => <TouchableOpacity onPress={() => {
                    console.log(props)
                    props.navigation.navigate('Update', { 'item': item })
                }}><Item item={item} /></TouchableOpacity>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 32,
    },
    btn: {
        margin: 5,
        borderRadius: "50%"
    }
});

export default AccountList;