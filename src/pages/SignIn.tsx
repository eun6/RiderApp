import React, { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canGoNext = email && password;

  //이메일, 패스워드 변함에 따라 공백 제거 후 저장하는 콜백.
  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  //로그인 버튼 콜백 함수
  const onSubmit = useCallback(()=> {
    Alert.alert('알림', '로그인 되었습니다.');
  }, []);

  return (
    <View>
      <View style={{...styles.inputWrapper, marginTop: 40}}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          style={styles.textInput}
          onChangeText={onChangeEmail}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          style={styles.textInput}
          onChangeText={onChangePassword}
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
        <Pressable>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
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
