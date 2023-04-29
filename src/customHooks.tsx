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

  const [isDocMouseDown, setIsDocMouseDown] = useState<boolean>(false)
  const [isElMouseIn, setIsElMouseIn] = useState<boolean>(false)
  const isClickHold = isElMouseIn && isDocMouseDown

  useEffect(() => { 

    // Document Down/Up
    const docMouseDownHandle = () => {
      setIsDocMouseDown(true)
    }
    const docMouseUpHandle = () => {
      setIsDocMouseDown(false)
    }

    // Element Enter/Leave
    const elMouseEnterHandle = () => {
      setIsElMouseIn(true)
    }
    const elMouseLeaveHandle = () => {
      setIsElMouseIn(false)
    }

    if (!elRef.current) return
    const el = elRef.current
    
    el.addEventListener("mouseenter", elMouseEnterHandle)
    el.addEventListener("mouseleave", elMouseLeaveHandle)
    document.body.addEventListener("mouseup", docMouseUpHandle)
    document.body.addEventListener("mousedown", docMouseDownHandle)

    return () => {
      el.removeEventListener("mouseenter", elMouseEnterHandle)
      el.removeEventListener("mouseleave", elMouseLeaveHandle)
      document.body.removeEventListener("mouseup", docMouseUpHandle)
      document.body.removeEventListener("mousedown", docMouseDownHandle)
    }
  }, [])

  return ([isClickHold])

}