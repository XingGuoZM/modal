## react + ts弹窗模型

## 分支
```
弹窗模型在dev分支上，查看效果需切换到dev分支
```
master: 初始化项目

dev: 开发分支

## 使用
getRmodal获取Rmodal全局单例

通过全局单例可以注册组件，我们的弹层内容可以写成一个一个的组件，例子中的A、B组件。

需要打开弹层的地方可以使用modal.show方法，show方法中配置的key和register中的key值一一对应，最后会返回一个promise


- App.tsx
```js
import * as React from "react";
import A from './components/A';
import B from './components/B';
import { getRmodal } from './Rmodal';
import { viewport } from './utils';
viewport();

export interface AppProps { name: string };
const modal = getRmodal();
modal.register({
  a: A,
  b: B,
});

const showModal = async () => {
  await modal.show({
    key: 'a',
    modalProps: {
      maskClosable: true,
      className: 'modalA',
    },
    showMethod: 'coexist'
  });
};
export const App = (props: AppProps) => <div onClick={showModal}>{props.name}</div>;
```

