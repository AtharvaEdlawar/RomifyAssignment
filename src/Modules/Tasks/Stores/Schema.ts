import * as Yup from 'yup';

const taskValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    status: Yup.string().required('Status is required')
});

export default  taskValidationSchema;

