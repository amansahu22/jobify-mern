import { useState } from "react"
import { Logo } from "../components"
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
}

const Register = () => {

    const [values, setValues] = useState(initialState);

    const { isAlertShown, isLoading, displayAlert } = useAppContext()

    const onChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const toggleHandler = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!values.email || !values.password || (!values.isMember && !values.name)) {
            displayAlert()
            return;
        }
        console.log(values)
    }

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmitHandler}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {isAlertShown && <Alert />}

                {
                    !values.isMember && <FormRow
                        name='name' type='text'
                        value={values.name} labelText='Full name'
                        onChange={onChangeHandler}
                    />
                }


                <FormRow
                    name='email' type='email'
                    value={values.email} labelText='e-mail'
                    onChange={onChangeHandler}
                />

                <FormRow
                    name='password' type='password'
                    value={values.password} labelText='password'
                    onChange={onChangeHandler}
                />

                <button type="submit" className="btn btn-block">Submit</button>

                {values.isMember
                    ? <p>Not a member yet? <button type="button" onClick={toggleHandler} className='member-btn'>Register</button></p>

                    : <p>Already a member? <button onClick={toggleHandler} className='member-btn' type="button">Login</button> </p>
                }

            </form>

        </Wrapper>
    )
}

export default Register