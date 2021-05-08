/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.css' {
  const resource: { [key: string]: string };
  export = resource;
}
