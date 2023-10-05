import { Field, Formik } from "formik";
import CustomTextInput from "../../Components/TextInput";


export default function NewsSignUpPage() {
    return <Formik initialValues={{email: ""}}
    validationSchema={"still to apply"} onSubmit={"still to apply"}
    >
    {({handleSubmit, isValid, values, setFieldValue}) => (
        <>
            <Field 
                component={CustomTextInput}
                name='email'
                placeholder='Email Address'
                label='Get Email Updates'
                type='email'
                autoCorrect='false'
                autoCompleteType='email'
            />
            <button>Sign Up</button>
        </>
    )}
    </Formik>
}