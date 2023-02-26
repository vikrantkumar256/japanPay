import React, { memo } from 'react';
import Background from '../unitcomponent/Background';
import Logo from '../unitcomponent/Logo';
import Header from '../unitcomponent/Header';
import Button from '../unitcomponent/Button';
import Paragraph from '../unitcomponent/Paragraph';
import { connect } from 'formik';
import { bindActionCreators } from 'redux';



const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Japan Pay</Header>

    <Paragraph>
      Welcome to new way of banking!
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
