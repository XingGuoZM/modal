import * as React from "react";
export interface AppProps { name: string };
export const App = (props: AppProps) => <h1>React+ts {props.name}</h1>;