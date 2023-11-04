import {ref, watch} from "vue"

export function useStorage(key){

    let storeVal = ref(localStorage.getItem(key))

    let val = ref(storeVal)

    watch(val,()=>{
        localStorage.setItem(key, val.value);
    
})

return val

}