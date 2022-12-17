import { useContext } from "react"
import { UIContext } from "../context/UIContext"


export const useUI = () => {
  const {toggle, children} = useContext(UIContext)
  return {
    toggle, children
  }
}