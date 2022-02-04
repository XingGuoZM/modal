import * as React from "react";
import { ModalPropsOptions } from '../config';
import styles from './B.module.less';

function B({ showModal, closeModal }: ModalPropsOptions) {
  React.useEffect(() => {
    showModal();
  }, []);
  return <div className={styles.wrap} onClick={closeModal}>B</div>;
}

export default B;
