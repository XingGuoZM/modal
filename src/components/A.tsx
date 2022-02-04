import * as React from "react";
import { getRmodal } from '../Rmodal';
import { ModalPropsOptions } from '../config'
import styles from './A.module.less';

const modal = getRmodal();

function A({ showModal, closeModal }: ModalPropsOptions) {
  const showModalB = React.useCallback(async () => {
    await modal.show({
      key: 'b',
      showMethod: 'coexist',
      modalProps: {
        maskClosable: true,
        className: 'modalB',
      },
    });
  },[]);
  React.useEffect(() => {
    showModal();
  }, []);
  return <div className={styles.wrap} onClick={showModalB}>点击蒙层关闭</div>
}

export default A;
