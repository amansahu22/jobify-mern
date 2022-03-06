const Register = (req, res) => {
    res.send('Register');
}

const Login = (req, res) => {
    res.send('Login');
}

const updateUser = (req, res) => {
    res.send('updateUser');
}

export { Register, Login, updateUser };