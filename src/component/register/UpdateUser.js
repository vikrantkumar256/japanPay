import React from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';


import { addDoc, collection, setDoc, doc, deleteDoc } from 'firebase/firestore';
import db from '../../services/firebase.config'
import { updateUser } from '../../reducers/userActions';
import { bindActionCreators } from 'redux';




const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
});

const UpdateUser = (props) => {


    const name = props.route.params.item.Name;
    const email = props.route.params.item.Email;
    const gender = props.route.params.item.Gender;
    const id = props.route.params.item.id;
    async function AddUser(name, mail, gender) {


        const docRef = doc(db, "users", id);
        await setDoc(docRef, {
            Name: name,
            Email: mail,
            Gender: gender,
            Password: props.route.params.item.Password
        }).then(() => {
            console.log("vikrant ");
            props.navigation.navigate('User');
        }).catch((error) => {
            alert(error.message)
        });
    }

    async function DeleteUser() {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef).then(() => {
            props.navigation.navigate('User');
        }).catch((error) => {
            alert(error.message);
        })
    }


    return (
        <View>
            <Formik
                initialValues={{ name: name, email: email, gender: gender }}
                onSubmit={(values) => {
                    console.log(values);
                    AddUser(values.name, values.email, values.gender)
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                placeholder="Name"
                                style={styles.input}
                            />
                            {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email"
                                style={styles.input}
                            />
                            {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

                            <Picker
                                selectedValue={values.gender}
                                onValueChange={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select gender" value="" />
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                            </Picker>
                            {errors.gender && touched.gender && <Text style={{ color: 'red' }}>{errors.gender}</Text>}
                            <Button title="Update" onPress={handleSubmit} style={styles.btn} />
                        </View>
                    </View>
                )}
            </Formik>
            <Button title='Delete' onPress={() => DeleteUser()} style={styles.btn} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aqua',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 30,
        width: 200,
        margin: 6,
        borderWidth: 1,
        paddingHorizontal: 15,
        backgroundColor: "white"
    },
    form: {
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 20,
        borderWidth: 1,
        borderColor: "black"


    },
    btn: {
        margin: 10,
        width: ""
    },
    picker: {
        marginVertical: 10,
        marginHorizontal: 6,
        width: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: "#fff",
        color: "#000",
        backgroundColor: "white"
    },
});


const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUser

    }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);


