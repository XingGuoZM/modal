import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from '../component/Modal';
import Stat from '../model/Stat';
import { popTypeEnum } from '../constants/index';
import { loadImageList } from '../utils/preLoadImage';
import './RModal.less';

/**
 * 不同的popType对应的类名映射
 */
const classNameMap = {
  [popTypeEnum.modal]: 'RContentModal',
  [popTypeEnum.popdown]: 'RContentPopdown',
  [popTypeEnum.popleft]: 'RContentPopleft',
  [popTypeEnum.popright]: 'RContentPopright',
  [popTypeEnum.popup]: 'RContentPopup',
};

/**
 * 弹窗模型
 */
function Rmodal(opts) {
  const {
    // 弹窗内容组件对应的key
    key = '',
    // 弹窗内容组件
    ContentComp = <span />,
    // 透出给组件的props
    compProps = {},
    // 透出给modal的props
    modalProps = {},
    // model模型关闭弹窗的回调
    closeCallBack = () => { },
    // type modal：弹窗,popup：上滑抽屉
    popType = popTypeEnum.modal,
    // 父节点（默认是body）
    parentElement = document.body,
    // 弹窗管理器实例
    modalManager = null,
  } = opts;
  // 真实的dom节点
  let element = null;
  // 弹窗是否显示
  let visible = false;

  /**
   * 资源预加载,返回一个promise
   */
  const preload = () => {
    const compPreload = ContentComp.preload;
    if (compPreload) {
      // 执行预加载方法，获取到需要预加载的资源
      const { imageList = [], timeout = 3000 } = compPreload();
      return loadImageList(imageList, timeout);
    }
    // 立马返回
    return Promise.resolve([]);
  };

  /**
   * 初始化
   */
  const init = () => {
    const { className = '' } = modalProps;
    // 弹窗对应的真实dom对象
    element = document.createElement('div');
    // 添加基础类名
    element.classList.add('Rmodal');
    // 添加扩展的类名
    if (className) {
      element.classList.add(className);
    }
    // 弹窗是否显示
    visible = false;
    // 初始化render弹窗组件
    update();
  };

  /**
   * 显示弹窗
   */
  const show = () => {
    // 写入到body中
    parentElement.appendChild(element);
    // 修改为显示
    visible = true;
    update();
  };

  /**
   * 关闭弹窗
   */
  const close = (myResolve, params) => {
    visible = false;
    update();
    // 回调给使用者
    myResolve(
      new Stat({
        stat: 'ok',
        result: params,
      })
    );
  };

  /**
   * 更新弹窗，目前支持的动画类型am-fade，am-zoom，am-slide-down，am-slide-up
   */
  const update = () => {
    const {
      // 蒙层是否可以点击
      maskClosable = false,
      // 扩展类名 用于动画自定制
      className = '',
    } = modalProps;
    ReactDOM.render(
      <Modal
        visible={visible}
        baseClassName={classNameMap[popTypeEnum[popType]]}
        className={className}
        maskClosable={maskClosable}
        closeModal={() => {
          // popup内部点击蒙层关闭弹窗
          closeModalOnContent({
            code: 'maskClose',
            message: '点击蒙层关闭',
          });
        }}
        closeFinishCallBack={() => {
          // 关闭动画执行完成后回调，销毁dom元素
          destray();
        }}
      >
        {React.createElement(
          ContentComp,
          {
            ...compProps,
            closeModal: closeModalOnContent,
            showModal: showModalOnContent,
            modalManager,
          },
          null
        )}
      </Modal>,
      element
    );
  };

  /**
   * 销毁弹窗
   */
  const destray = () => {
    if (!element) {
      return;
    }
    ReactDOM.unmountComponentAtNode(element);
    element.remove();
    element = null;
  };

  /**
   * 组件内主动触发弹窗关闭，关闭模态框注入到弹窗内容组件中
   */
  const closeModalOnContent = (params) => {
    closeCallBack(params);
  };

  /**
   * 组件内主动触发弹窗显示，一般在组件内部接口调用完后触发
   */
  const showModalOnContent = () => {
    show();
  };

  return {
    // 弹窗对应的内容组件的key
    key,
    // 预加载
    preload,
    // 初始化
    init,
    // 弹窗关闭方法
    close,
    // 弹窗显示方法
    show,
  };
}

export default Rmodal;
