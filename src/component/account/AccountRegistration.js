import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../core/theme';


import { addDoc, collection } from 'firebase/firestore';
import db from '../../services/firebase.config'
import Background from '../../unitcomponent/Background';
import BackButton from '../../unitcomponent/BackButton';
import Logo from '../../unitcomponent/Logo';
import Header from '../../unitcomponent/Header';
import TextInput from '../../unitcomponent/TextInput';
import Button from '../../unitcomponent/Button';



const validationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.string().required('account number is required'),
    amount: Yup.number().required('initial amount is required')

});

const AccountRegistration = (props) => {
    const userid = props.route.params.userid;
    async function AddProduct(bankName, accountNumber, amount) {


        // Add a new document with a generated id.
        await addDoc(collection(db, "product"), {
            bankName,
            accountNumber,
            amount,
            userid
        }).then(() => {

            console.log("vikrant ");
            props.navigation.navigate('Dashboard', { userid });
        }).catch((error) => {
            console.log(error);
            alert(error.message)
        });
    }


    return (
        <Background>
            <BackButton goBack={() => props.navigation.navigate('HomeScreen')} />


            <Header>Create Account</Header>
            <Formik
                initialValues={{ bankName: '', accountNumber: '', amount: '' }}
                onSubmit={(values) => {
                    console.log(values);
                    AddProduct(values.bankName, values.accountNumber, values.amount)
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
                            Add Account
                        </Button>


                    </View>
                )}
            </Formik>
        </Background>);
};


const styles = StyleSheet.create({

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

export default AccountRegistration;
