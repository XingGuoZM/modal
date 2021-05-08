import * as React from "react";
import ModalOne from './components/ModalOne';
import { getRmodal } from './Rmodal';
import { viewport } from './utils';
viewport();

export interface AppProps { name: string };
const modal = getRmodal();
modal.registerComp({
  modalOne: ModalOne,
});


const showModal = async () => {
  await modal.show({
    key: 'modalOne',
    modalProps: {
      maskClosable: true,
      className: 'test',
    },
  });
};
export const App = (props: AppProps) => <div onClick={showModal}>React+ts弹窗模型 {props.name}</div>;