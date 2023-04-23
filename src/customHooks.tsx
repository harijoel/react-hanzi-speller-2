export function resetArrTypeState(arr: React.Dispatch<React.SetStateAction<any[]>>[]) {
    for (let i = 0; i < arguments.length; i++) {
        arr[i]([])
      }
}

// setInputKeys([])
// setRevealNos([])
// setMistakeTrail([])