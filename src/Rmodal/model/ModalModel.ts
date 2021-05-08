/**
 * 弹窗模型，存入在栈中的弹窗模型
 */
class ModalModel {
  // 该弹窗模型对应的promise resolve
  public promiseResolve = null;

  // 该弹窗模型对应的promise reject
  public promiseReject = null;

  // 弹窗对应的Rmodal
  public Rmodal = null;

  constructor(resolve, reject, Rmodal) {
    this.promiseResolve = resolve;
    this.promiseReject = reject;
    this.Rmodal = Rmodal;
  }
}

export { ModalModel };
