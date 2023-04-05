import MainNavigation from "./MainNavigation";

import classess from './Layout.module.css';
import { Fragment } from "react";

const Layout = props => {
    return (
    <Fragment>
        <MainNavigation />
        <main className={classess.main}>{props.children}</main>
    </Fragment>)
}

export default Layout;