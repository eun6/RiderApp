import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canGoNext = email && password;

  const emailRef = useRef<TextInput | null>(null); //타입 지정, textinput이고 값은 null 일 수도, 아닐 수도 있음.
  const passwordRef = useRef<TextInput | null>(null);

  //이메일, 패스워드 변함에 따라 공백 제거 후 저장하는 콜백.
  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  //로그인 버튼 콜백 함수
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  //회원가입 버튼 콜백 함수
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <DismissKeyboardView>
      <View style={{...styles.inputWrapper, marginTop: 40}}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          value={email}
          style={styles.textInput}
          onChangeText={onChangeEmail}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          value={password}
          style={styles.textInput}
          onChangeText={onChangePassword}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          returnKeyType="send"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? [styles.loginButton, styles.loginButtonActive]
              : styles.loginButton
          }
          onPress={onSubmit}
          disabled={!canGoNext}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  buttonZone: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 5,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default SignIn;
