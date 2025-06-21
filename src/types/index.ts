import { MyActionListener } from "../utils/MyActionListener";

export type BoardProps = {
  board: Array<string>;
  status: string;
}

export type KeyboardProps = {
  actionListener: MyActionListener
}

export type KeyProps = {
  keyVal: string;
  actionListener: MyActionListener;
  icon?: React.ReactNode
}

export type Listener = (data: any) => void;
