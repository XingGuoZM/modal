import * as React from "react";
import styles from './A.module.less';
import { getRmodal } from '../Rmodal';

const modal = getRmodal();
const showModalB = async () => {
  await modal.show({
    key: 'b',
    showMethod: 'coexist',
    modalProps: {
      maskClosable: true,
      className: 'modalB',
    },
  });
};
export interface Props {
  showModal: () => void;
  closeModal: () => void;
}
function A({ showModal, closeModal }: Props) {
  React.useEffect(() => {
    showModal();
  }, []);
  return <div className={styles.wrap} onClick={showModalB}>点击蒙层关闭</div>
}

export default A;
