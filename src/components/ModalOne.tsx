import * as React from "react";
import styles from './ModalOne.module.less';

type ModalProps = {
  closeModal: () => void;
  showModal: () => void;
}
class ModalOne extends React.Component<ModalProps> {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.showModal();
  }
  render() {
    return <div className={styles.wrap}>点击蒙层关闭</div>;
  }

}

export default ModalOne;
