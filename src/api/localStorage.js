const storage = localStorage;
const KEY = "TOKEN"

const saveToken = async(token) => {
    storage.setItem(KEY, token);
}

const deleteToken = async() => {
    storage.removeItem(KEY);
}

const getToken = async() => {
    return storage.getItem(KEY);
}

export {saveToken, deleteToken, getToken}