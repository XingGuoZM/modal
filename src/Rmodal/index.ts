import Rmodal from './model/ModalManager';

/**
 * Rmodal的实例化方法，Rmodal是单例模式，每个应用只允许存在一个Rmodal实例
 * webview上全局单例
 */
function getRmodal(): Rmodal {
  // @ts-ignore
  if (!window.__rStore__) {
    // @ts-ignore
    window.__rStore__ = {};
  }
  // @ts-ignore
  if (!window.__rStore__.rmodalInstance) {
    // @ts-ignore
    window.__rStore__.rmodalInstance = new Rmodal();
  }
  // @ts-ignore
  return window.__rStore__.rmodalInstance;
}

export { getRmodal, Rmodal };
