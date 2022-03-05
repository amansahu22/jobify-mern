//express can identify if we are passing 4 parameters then first one will be for error

const errorHandleMiddleware = (err, req, res, next) => {

    console.log(err);
    res.status(500).json({
        msg: 'there is some error on server',
    })
}

export default errorHandleMiddleware;