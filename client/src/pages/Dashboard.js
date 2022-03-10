import { useEffect } from 'react'

const Dashboard = () => {

    //we have set proxy so our react server first try to load resource from static files(present on client side) and if it's not present here than it will try to access them from the prefix domain(set as a proxy in package.json)

    return (
        <div>Dashboard Page</div>
    )
}

export default Dashboard;