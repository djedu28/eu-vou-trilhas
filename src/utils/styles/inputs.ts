// import { boolean } from "yup"

export interface InputName {
  color?:  string
  escala?: number
  bottom:  number
}

export interface LockBtn {
  lock: boolean | "true" | "false",
}

export interface ICardConfig {
  size?: {
    width?: number | undefined,
    height?: number | undefined,
  },
  position?:  {
    top?: number | undefined,
    right?: number | undefined,
    bottom?: number | undefined,
    left?: number | undefined,
  },
  isCircle?: number | boolean | undefined,
  border?: {
    topLeft?: number | undefined,
    topRight?: number | undefined,
    bottomRight?: number | undefined,
    bottomLeft?: number | undefined,
  },
}
