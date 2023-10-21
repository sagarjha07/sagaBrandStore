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
import {Colors, FontFamily, FontSize, Sizes} from '../constants';
import {Formik} from 'formik';
import * as yup from 'yup';
import authService from '../appwrite/AuthService';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email address is required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be atleast ${min} characters`)
      .required('Password is required'),
    name: yup
      .string()
      .min(3, ({min}) => `Name must be atleast ${min} characters long`)
      .required('Name is required'),
  });

  const showToast = (type, title, subtitle) => {
    Toast.show({
      type: type,
      text1: title,
      text2: subtitle,
    });
  };

  const onSignupClick = async ({email, password, name}, {resetForm}) => {
    setLoading(true);
    try {
      const res = await authService.signUp(email, password, name);
      resetForm({values: {email: '', password: '', name: ''}});
      showToast(
        'success',
        'Account Created',
        'You can now Login in your account 👋',
      );
    } catch (error) {
      showToast('error', 'Sign-Up error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Sign-Up</Text>
        <Text style={styles.subtitle}>Let's create your account</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: '', name: ''}}
          onSubmit={(values, {resetForm}) => {
            onSignupClick(values, {resetForm});
          }}>
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
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.textInput}
                  placeholder="Enter Your name"
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={[styles.textInput, {marginTop: Sizes.x5 / 2}]}
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
                <Pressable
                  style={[
                    styles.btnContainer,
                    {
                      opacity: isValid ? 1 : 0.5,
                    },
                  ]}
                  onPress={handleSubmit}>
                  <Text style={styles.btnText}>Create Account</Text>
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

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x8,
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
