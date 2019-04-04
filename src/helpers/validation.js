import * as Yup from 'yup';

const signUpValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Please enter no less than 3 characters')
    .max(30, 'Please enter no more than 30 characters')
    .required('Please enter your firstname'),
  lastname: Yup.string()
    .min(3, 'Please enter no less than 3 characters')
    .max(30, 'Please enter no more than 30 characters')
    .required('Please enter your lastname'),
  othernames: Yup.string()
    .min(3, 'Please enter no less than 3 characters')
    .required('Please enter your othernames'),
  username: Yup.string()
    .min(3, 'Please enter no less than 3 characters')
    .max(20, 'Please enter no more than 20 characters')
    .required('Please enter your username'),
  email: Yup.string().email()
    .required('Please enter your email'),
  phoneNumber: Yup.number()
    .required('Please enter your phone number'),
  password: Yup.string()
    .min(6, 'Please enter no less than 6 characters')
    .required('Please enter your password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required('Confirm your password')
});

export default signUpValidationSchema;