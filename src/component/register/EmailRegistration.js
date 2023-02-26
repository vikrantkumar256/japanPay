import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import TextInput from '../../unitcomponent/TextInput';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '../../core/theme';
import Background from '../../unitcomponent/Background';
import Logo from '../../unitcomponent/Logo';
import BackButton from '../../unitcomponent/BackButton';
import Header from '../../unitcomponent/Header';
import { loginUser } from '../../reducers/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import { addDoc, collection } from 'firebase/firestore';
import db from '../../services/firebase.config'



const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    gender: Yup.string().required('Gender is required'),
});

const EmailRegistration = (props) => {

    async function AddUser(name, mail, gender, password) {
        console.log(name, mail, gender, password);

        // Add a new document with a generated id.
        await addDoc(collection(db, "users"), {
            Name: name,
            Email: mail,
            Gender: gender,
            Password: password
        }).then((doc) => {

            console.log("vikrant ");
            props.navigation.navigate('Dashboard', { userid: doc.id });
        }).catch((error) => {
            alert(error.message)
        });
    }


    return (
        <Background>
            <BackButton goBack={() => props.navigation.navigate('HomeScreen')} />
            <Logo />

            <Header>Create Account</Header>
            <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '', gender: '' }}
                onSubmit={(values) => {
                    console.log(values);
                    AddUser(values.name, values.email, values.gender, values.password)
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <TextInput
                            label="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder="Name"
                        />
                        {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

                        <TextInput
                            label="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                        />
                        {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

                        <TextInput
                            label="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            secureTextEntry
                        />
                        {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

                        <TextInput
                            label="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                        {errors.confirmPassword && touched.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}

                        <Picker
                            selectedValue={values.gender}
                            onValueChange={handleChange('gender')}
                            onBlur={handleBlur('gender')}
                        >
                            <Picker.Item label="Select gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                        {errors.gender && touched.gender && <Text style={{ color: 'red' }}>{errors.gender}</Text>}
                        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                            Sign Up
                        </Button>

                        <View style={styles.row}>
                            <Text style={styles.label}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
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


const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loginUser

    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(EmailRegistration);


