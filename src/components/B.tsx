import * as React from "react";
import styles from './B.module.less';

type ModalProps = {
  closeModal: () => void;
  showModal: () => void;
}
class B extends React.Component<ModalProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.showModal();
  }
  render() {
    return <div className={styles.wrap} onClick={this.props.closeModal}>B</div>;
  }

}
export default B;
