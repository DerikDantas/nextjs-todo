import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().required('Username is a required field'),
  email: Yup.string().email().required('Email is a required field'),
  password: Yup.string().required('Password is a required field'),
  confirmPassword: Yup.string()
    .required('Confirm password is a required field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default schema;
