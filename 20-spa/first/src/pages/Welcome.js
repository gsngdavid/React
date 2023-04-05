import { Route, Link } from "react-router-dom";

const Welcome = () => {
    return <section>
        <h1>The Welcome Page</h1>
        <Route path='/welcome/newuser'>
            <p>Hello new user!</p>
        </Route>
    </section>
}

export default Welcome;