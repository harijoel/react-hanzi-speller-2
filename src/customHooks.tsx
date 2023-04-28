import { useEffect, useRef, useState } from "react"

export function resetArrTypeState(arr: React.Dispatch<React.SetStateAction<any[]>>[]) {
    for (let i = 0; i < arguments.length; i++) {
        arr[i]([])
      }
}

// setInputKeys([])
// setRevealNos([])
// setMistakeTrail([])

// const elr = useRef<HTMLDivElement>(null)
// const htmlEl = <div ref={elr}>hahsdf</div>
// const kk = elr.current


export function useClickHoldState(elRef: React.RefObject<HTMLElement>) {

  const [isMouseIn, setIsMouseIn] = useState<boolean>(false)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  useEffect(() => {
    const mouseEnterHandle = () => {
      setIsMouseIn(true)
    }
    const mouseLeaveHandle = () => {
      setIsMouseIn(false)
      setIsMouseDown(false) 
    }
    const mouseDownHandle = () => {
      setIsMouseDown(true)
    }
    const mouseUpHandle = () => {
      setIsMouseDown(false)
    }

    if (!elRef.current) return
    const el = elRef.current

    el.addEventListener("mouseenter", mouseEnterHandle)
    el.addEventListener("mouseleave", mouseLeaveHandle)
    el.addEventListener("mousedown", mouseDownHandle)
    el.addEventListener("mouseup", mouseUpHandle)

    return () => {
      el.removeEventListener("mouseenter", mouseEnterHandle)
      el.removeEventListener("mouseleave", mouseLeaveHandle)
      el.removeEventListener("mousedown", mouseDownHandle)
      el.removeEventListener("mouseup", mouseUpHandle)
    }
  }, [])

  return ([isMouseIn && isMouseDown])

}