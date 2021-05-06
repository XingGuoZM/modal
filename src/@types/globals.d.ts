// https://www.typescriptlang.org/docs/handbook/declaration-merging.html

/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

// 声明window下有
interface Window {
  // jsapiWindVane全局属性
  WindVane: any;
  __RStore__: {
    globalRem: number;
    deviceLevel: string;
    isAddJsTracker: boolean;
    // 弹窗实例
    rmodalInstance: any;
    // loading实例
    loadingInstance: any;
  };
  // VConsole工具
  VConsole;
  // jstracker配置
  g_config: any;
  // jstracker实例
  JSTracker2: any;
}
