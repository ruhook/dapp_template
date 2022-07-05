import create from 'zustand'

interface TestState {
    count: number,
    inc: ()=>void,
    fetch: ()=>void,
}

const sleep = (time: number) => {
    return new Promise(resolve => setTimeout(resolve,time))
}

const useTest = create<TestState>((set)=>({
    count: 1,
    inc: ()=> set((state) =>({count: state.count + 1})),
    fetch: async ()=>{
        const response = await sleep(3000)
        set({ count: 10})
    }
}))


export default useTest
