class LocalStorage {
    setData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    getData(key) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }

    removeData(key) {
        localStorage.removeItem(key);
        return true;
    }
}

export default new LocalStorage();