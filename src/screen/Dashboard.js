import React, { memo, useState } from 'react';
import Background from '../unitcomponent/Background';
import Logo from '../unitcomponent/Logo';
import Header from '../unitcomponent/Header';
import Paragraph from '../unitcomponent/Paragraph';
import Button from '../unitcomponent/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountList from '../component/account/AccountList';
import TextInput from '../unitcomponent/TextInput';
import { View, Text } from 'react-native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '../services/firebase.config'



const Dashboard = (props) => {
  const userid = props.route.params.userid;
  const [accountNumber1, setAccountNumber1] = useState('');
  const [accountNumber2, setAccountNumber2] = useState('');
  const [amount, setAmount] = useState();
  const [authError, setAuthError] = useState('');

  async function UpdateAccount({ bankName, accountNumber, amount, id, userid }) {
    const docRef = doc(db, "product", id);
    await setDoc(docRef, {
      bankName,
      accountNumber,
      amount,
      userid
    }).catch((error) => {
      alert(error.message)
    });
  }


  const getAccountInfo = async (accountNumber) => {
    const accountCollection = collection(db, "product");
    const q = query(accountCollection, where("accountNumber", "==", accountNumber));
    const QuerySnapshot = await getDocs(q).catch((error) => { setAuthError(error.message) });
    let account;
    QuerySnapshot.forEach((doc) => {
      account = doc.data();
      account["id"] = doc.id;
    })
    return account;

  }
  const _onLoginPressed = async () => {
    const account1 = await getAccountInfo(accountNumber1);
    const account2 = await getAccountInfo(accountNumber2);
    console.log("account1", account1);
    console.log("account2", account2);

    let amount1 = parseInt(account1.amount);
    let amount2 = parseInt(amount);
    if (amount1 < amount2) {
      setAuthError("No Enough Balance");
      console.log("error");
    }
    else {
      account1.amount = amount1 - amount2;
      account2.amount = parseInt(account2.amount) + amount2;
      await UpdateAccount(account1);
      await UpdateAccount(account2);
    }
  };


  return (
    <Background>
      <Header>Let’s start</Header>
      <Text>{authError}</Text>
      <View>
        <TextInput
          label="Your Account Number"
          returnKeyType="next"
          value={accountNumber1}
          onChangeText={text => setAccountNumber1(text)}
        />
        <TextInput
          label="Receiver Account Number"
          returnKeyType="next"
          value={accountNumber2}
          onChangeText={text => setAccountNumber2(text)}
        />
        <TextInput
          label="amount"
          value={amount}
          onChangeText={text => setAmount(text)}

        />

        <Button mode="contained" onPress={_onLoginPressed}>
          Send
        </Button>
      </View>
      <Button mode="outlined" onPress={() => props.navigation.navigate('Register', { userid })}>
        Add Account
      </Button>

      <AccountList {...props} userid={userid} />

      <Button mode="outlined" onPress={() => props.navigation.navigate('HomeScreen')}>
        Logout
      </Button>

    </Background>
  )
};



const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};


export default connect(mapStateToProps)(Dashboard);

