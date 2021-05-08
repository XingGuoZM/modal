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

type ModalProps = {
  closeModal: () => void;
  showModal: () => void;
}
class A extends React.Component<ModalProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.showModal();
  }
  render() {
    return <div className={styles.wrap} onClick={showModalB}>点击蒙层关闭</div>;
  }
}

export default A;
