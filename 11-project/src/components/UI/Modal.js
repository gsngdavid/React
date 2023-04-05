import { Fragment } from 'react';
import ReactDOM  from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = props => <div className={styles.backdrop} onClick={props.backdropClick} />;

const ModalOvalay = props => <div className={styles.modal}>
    <div className={styles.content}>
        {props.children}
    </div>
</div>

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop backdropClick={props.onClose}  />, portalElement)}
        {ReactDOM.createPortal(<ModalOvalay>{props.children}</ModalOvalay>, portalElement)}
    </Fragment>
}

export default Modal;