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
export const App = (props: AppProps) => <div onClick={showModal}>React+ts弹窗模型 {props.name}</div>;