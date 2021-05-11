import * as React from "react";
import styles from './B.module.less';

export interface Props {
  showModal: () => void;
  closeModal: () => void;
}
function B({ showModal, closeModal }: Props) {
  React.useEffect(() => {
    showModal();
  }, []);
  return <div className={styles.wrap} onClick={closeModal}>B</div>;
}

export default B;
