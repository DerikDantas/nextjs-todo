import * as Yup from 'yup';

const schema = Yup.object({
  title: Yup.string().required('Title is a required field'),
  description: Yup.string().required('Description is a required field')
});

export default schema;
