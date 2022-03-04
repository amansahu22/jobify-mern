import { useAppContext } from "../context/appContext";

const Alert = () => {

    const { alertType, alertText } = useAppContext();

    const alertClasses = `alert alert-${alertType}`
    return (
        <div className={alertClasses}>
            {alertText}
        </div>
    )
}

export default Alert