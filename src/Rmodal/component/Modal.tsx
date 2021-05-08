// import React, { Component } from 'react';
import * as React from "react";
import './Modal.less';

type ModalProps = {
  // 基础类名
  baseClassName: string;
  // 扩展的class类名
  className: string;
  // 是否显示弹窗
  visible: boolean;
  // 蒙层是否允许关闭
  maskClosable: boolean;
  // 关闭动画完成后回调
  closeFinishCallBack: () => void;
  // 关闭弹窗方法
  closeModal: () => void;
};

type ModalState = {
  visible: boolean;
  // 是否可点击
  clickable: boolean;
};

/**
 * 上划出弹窗组件
 */
class Modal extends React.Component<ModalProps, ModalState> {
  // modal 蒙层的真实dom
  private modalMaskView = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      // 弹窗上的事件是否生效是否可点击
      clickable: false,
    };
  }

  componentDidMount() {
    this.modalMaskView.current.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      false
    );
  }

  componentWillUnmount() {
    this.modalMaskView.current.removeEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      false
    );
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  // 动画结束后执行关闭回调
  animate = () => {
    const { closeFinishCallBack } = this.props;
    const { visible } = this.state;
    if (visible) {
      // 显示动画结束
      this.setState({
        clickable: true,
      });
    } else {
      // 隐藏动画结束
      this.setState({
        clickable: false,
      });
      closeFinishCallBack && closeFinishCallBack();
    }
  };

  // 点击蒙层
  onClickMask = (e) => {
    e.preventDefault();
    const { maskClosable = false, closeModal } = this.props;
    const { clickable } = this.state;
    if (maskClosable && clickable) {
      // 关闭弹窗
      closeModal && closeModal();
    }
  };

  render() {
    const { visible } = this.state;
    const { children, className = '', baseClassName = '' } = this.props;
    console.log(visible)
    return (
      <div className={`rModalContainer ${className} ${baseClassName}`}>
        <div
          className={`rMask ${className} ${visible ? 'open' : 'close'}`}
          onClick={this.onClickMask}
          ref={this.modalMaskView}
        />
        <div
          onAnimationEnd={this.animate}
          className={
            visible
              ? `rContent ${baseClassName} ${className} open`
              : `rContent ${baseClassName} ${className} close`
          }
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
