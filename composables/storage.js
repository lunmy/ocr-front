export function getStorage(key){
    if (process.client) {
        let storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    }
    return null;
}

export function setStorage(key, value){
    if (process.client){
        if(value === null){
            localStorage.removeItem(key);
        }else{
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}
