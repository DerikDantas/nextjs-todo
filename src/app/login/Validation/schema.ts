import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email().required('Email is a required field'),
  password: Yup.string().required('Password is a required field')
});

export default schema;
