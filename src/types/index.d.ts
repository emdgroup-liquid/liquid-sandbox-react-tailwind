import { JSX as LocalJSX } from "@emdgroup-liquid/liquid/dist/loader";
import { HTMLAttributes } from "react"; // or from 'vue'

type LiquidElements<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes, "className"> & {
      class?: string;
    };
};

declare global {
  namespace JSX {
    interface IntrinsicElements
      extends LiquidElements<LocalJSX.IntrinsicElements> {}
  }
}
