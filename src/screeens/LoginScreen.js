import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  FontFamily,
  FontSize,
  Routes,
  Sizes,
  showToast,
} from '../constants';
import {Formik} from 'formik';
import * as yup from 'yup';
import authService from '../appwrite/AuthService';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateUser} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email address is required'),
    password: yup
      .string()
      .min(6, ({min}) => `Password must be atleast ${min} characters`)
      .required('Password is required'),
  });

  const onLoginClick = async ({email, password}, {resetForm}) => {
    setLoading(true);
    try {
      const res = await authService.logIn(email, password);
      dispatch(updateUser(res));
      const jsonUser = JSON.stringify(res);
      await AsyncStorage.setItem('user', jsonUser);
      resetForm({values: {email: '', password: ''}});
      showToast('success', 'Login Success', 'Welcome to Saga Brand Store 👋');
      navigation.reset({
        index: 0,
        routes: [{name: Routes.HOME_TAB}],
      });
    } catch (error) {
      showToast('error', 'Login error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter in the world of Saga-Store</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={(values, {resetForm}) => onLoginClick(values, {resetForm})}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => {
            return (
              <View style={{marginTop: Sizes.x3}}>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.textInput}
                  placeholder="Enter email address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={[styles.textInput, {marginTop: Sizes.x5 / 2}]}
                  secureTextEntry
                  placeholder="Enter password"
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <Pressable style={[styles.btnContainer]} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Let's Go</Text>
                </Pressable>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      <Modal isVisible={loading}>
        <ActivityIndicator size={'large'} color={Colors.orange} />
      </Modal>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x13,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xlarge,
    color: Colors.orange,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
    color: Colors.lightGrey,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    paddingHorizontal: Sizes.x2,
    borderRadius: Sizes.x2,
  },
  errorText: {
    fontSize: FontSize.xsmall,
    color: Colors.red,
    paddingLeft: Sizes.x1,
    paddingTop: Sizes.x1 / 2,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: Sizes.x3,
    marginTop: Sizes.x3,
  },
  btnText: {
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
    padding: Sizes.x1,
  },
});
