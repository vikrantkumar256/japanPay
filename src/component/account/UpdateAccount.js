import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../core/theme';


import { addDoc, collection, setDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import db from '../../services/firebase.config'
import BackButton from '../../unitcomponent/BackButton';
import Background from '../../unitcomponent/Background';
import Header from '../../unitcomponent/Header';
import Button from '../../unitcomponent/Button';
import TextInput from '../../unitcomponent/TextInput';
import Logo from '../../unitcomponent/Logo';



const validationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.string().test('len', 'Must be exactly 11 characters', val => val.length === 11),
    amount: Yup.number().required('initial amount is required')

});

const UpdateAccount = (props) => {


    const bankName = props.route.params.item.bankName;
    const accountNumber = props.route.params.item.accountNumber;
    const userid = props.route.params.item.userid;
    const id = props.route.params.item.id;
    const amount = props.route.params.item.amount;

    async function UpdateAccount(bankName, accountNumber, amount) {
        const docRef = doc(db, "product", id);
        await setDoc(docRef, {
            bankName,
            accountNumber,
            amount,
            userid
        }).then(() => {
            console.log("vikrant ");
            props.navigation.navigate('Dashboard', { userid });
        }).catch((error) => {
            alert(error.message)
        });
    }

    async function DeleteAccount() {
        const docRef = doc(db, "product", id);
        await deleteDoc(docRef).then(() => {
            props.navigation.navigate('Dashboard', { userid });
        }).catch((error) => {
            alert(error.message);
        })
    }


    return (
        <Background>
            <BackButton goBack={() => props.navigation.goBack()} />

            <Header>Update Account</Header>
            <Formik
                initialValues={{ bankName: bankName, accountNumber: accountNumber, amount: amount }}
                onSubmit={(values) => {
                    console.log(values);
                    UpdateAccount(values.bankName, values.accountNumber, values.amount)
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <TextInput
                            label="bankName"
                            onChangeText={handleChange('bankName')}
                            onBlur={handleBlur('bankName')}
                            value={values.name}
                            placeholder="Bank Name"
                        />
                        {errors.bankName && touched.bankName && <Text style={{ color: 'red' }}>{errors.bankName}</Text>}

                        <TextInput
                            label="accountNumber"
                            onChangeText={handleChange('accountNumber')}
                            onBlur={handleBlur('accountNumber')}
                            value={values.accountNumber}
                            placeholder="Account Number"
                        />
                        {errors.accountNumber && touched.accountNumber && <Text style={{ color: 'red' }}>{errors.accountNumber}</Text>}

                        <TextInput
                            label="amount"
                            onChangeText={handleChange('amount')}
                            onBlur={handleBlur('amount')}
                            value={values.amount}
                            placeholder="Intial Amount"

                        />
                        {errors.amount && touched.amount && <Text style={{ color: 'red' }}>{errors.amount}</Text>}


                        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                            Update Account
                        </Button>


                    </View>
                )}
            </Formik>
            <Button title='Delete' onPress={() => DeleteAccount()} style={styles.Button}>Delete Account</Button>
        </Background>
    );
};


const styles = StyleSheet.create({
    form: {
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 20,
        borderWidth: 1,
        borderColor: "black"
    },
    form: {
        width: "100%"



    },

    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        justifyContent: "center"
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});


export default UpdateAccount;
