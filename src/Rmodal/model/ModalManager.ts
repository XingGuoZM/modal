import Rmodal from './Rmodal';
import Stat from './Stat';
import { showMethodEnum } from '../constants/index';
import { ModalModel } from './ModalModel';

/**
 * 弹窗模型
 */
class ModalManager {
  // 初始化的弹窗组件集合
  contentCompMap = {};

  // 当前显示的弹窗栈，最大只允许同时显示1个弹窗
  showStack: ModalModel[] = [];

  // 是否阻止body滚动的标记
  stopBodyScrollFlag = false;

  constructor(opts) {
    if (opts) {
      const { contentCompMap = {} } = opts;
      // 初始化的弹窗组件集合
      this.contentCompMap = contentCompMap;
    }
    // 当前显示的弹窗栈，最大只允许同时显示1个弹窗
    this.showStack = [];
  }

  /**
   * 注册组件
   */
  register = (compMap = {}) => {
    this.contentCompMap = {
      ...this.contentCompMap,
      ...compMap,
    };
  };

  /**
   * 取出弹窗组件，入栈
   * @param opts 显示选项
   */
  pushModalInStack = (opts: any, resolve: any, reject: any) => {
    const { key } = opts;
    // 取出弹窗内容组件
    const ContentComp = this.contentCompMap[key];

    if (ContentComp) {
      // 能从弹窗集合中找到弹窗组件，实例化新弹窗并入栈。创建一个新弹窗实例
      const newModal = Rmodal({
        ...opts,
        // 弹窗组件
        ContentComp,
        // 弹窗管理器实例
        modalManager: this,
        closeCallBack: this.close,
      });
      // 创建一个弹窗模型
      const modalModel = new ModalModel(resolve, reject, newModal);
      // 弹窗模型入栈
      this.showStack.push(modalModel);
      // 预加载资源
      newModal
        .preload()
        .then(() => {
          // 只有资源加载完后才执行newModal.init()
          newModal.init();
        })
        .catch(() => {
          // 资源加载失败也执行newModal.init()
          newModal.init();
        });

      // 弹窗显示时，阻止body滚动
      this._stopBodyScroll();
    } else {
      /**
       * 没找到对应的弹窗内容组件，报错
       */
      reject(
        new Stat({
          stat: 'faild',
          result: `没找到对应的弹窗内容组件。key:${key}`,
        })
      );
    }
  };

  /**
   * 显示弹窗
   * @param {*} opts
   */
  show = (opts): Promise<any> => {
    return new Promise((resolve, reject) => {
      // 显示哪一个弹窗, 默认并存模式
      const { showMethod = showMethodEnum.cover } = opts;
      if (showMethod === showMethodEnum.coexist) {
        // 并存模式，直接往栈里塞就行
        this.pushModalInStack(opts, resolve, reject);
      } else if (showMethod === showMethodEnum.cover) {
        // 覆盖模式
        this.closeAll('覆盖模式,关闭所有弹窗');
        // 往栈里塞新弹窗
        this.pushModalInStack(opts, resolve, reject);
      }
    });
  };

  /**
   * 关闭栈顶弹窗
   */
  close = (params) => {
    if (this.showStack.length > 0) {
      // 关闭栈顶弹窗
      const { promiseResolve, Rmodal } = this.showStack.pop();
      // 调用rModal的关闭弹窗
      Rmodal.close(promiseResolve, params);
      if (this.showStack.length === 0) {
        // 弹窗栈内没有弹窗恢复body滚动
        this._resumeBodyScroll();
      }
    } else {
      console.warn('没有弹窗可以关闭');
    }
  };

  /**
   * 关闭所有弹窗
   */
  closeAll = (params = '关闭所有弹窗') => {
    if (this.showStack.length > 0) {
      // 循环取出栈中有弹窗关闭
      for (let n = 0; n < this.showStack.length;) {
        const { promiseResolve, Rmodal } = this.showStack.pop();
        // 调用弹窗的关闭方法
        Rmodal.close(promiseResolve, {
          code: 'closeAll',
          message: params,
        });
      }
      if (this.showStack.length === 0) {
        // 弹窗栈内没有弹窗恢复body滚动
        this._resumeBodyScroll();
      }
    }
  };

  /**
   * 使用overflow:hidden的方案,阻止body滚动
   */
  _stopBodyScroll = () => {
    if (!this.stopBodyScrollFlag) {
      document.body.style.overflow = 'hidden';
      this.stopBodyScrollFlag = true;
    }
  };

  /**
   * 恢复body滚动
   */
  _resumeBodyScroll = () => {
    if (this.stopBodyScrollFlag) {
      document.body.style.overflow = 'auto';
      this.stopBodyScrollFlag = false;
    }
  };
}

export default ModalManager;
