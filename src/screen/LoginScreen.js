import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../unitcomponent/Background';
import Logo from '../unitcomponent/Logo';
import Header from '../unitcomponent/Header';
import Button from '../unitcomponent/Button';
import TextInput from '../unitcomponent/TextInput';
import BackButton from '../unitcomponent/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '../services/firebase.config'
import { loginUser } from '../reducers/userActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [authError, setAuthError] = useState('');


  async function validateUser(email, password) {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("Email", "==", email));
    const QuerySnapshot = await getDocs(q);
    let user;
    QuerySnapshot.forEach((doc) => {
      user = doc.data();
      user["id"] = doc.id;
    })
    console.log(user, email, password);
    console.log(password == user.Password);
    if (password == user.Password) {

      return { validate: true, userid: user.id };
    }
    else {
      return { validate: false, userid: null };
    }
  };

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const auth = await validateUser(email.value, password.value);
    if (auth.validate === false) {
      console.log(auth.validate);
      setAuthError("Invalid user credentials");
      return;
    }
    else if (auth.validate === true) {
      setAuthError('');
      navigation.navigate('Dashboard', { userid: auth.userid });

    }


  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.</Header>
      <Text>{authError}</Text>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);



