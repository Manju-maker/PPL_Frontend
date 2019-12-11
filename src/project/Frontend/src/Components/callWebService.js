export default callWebService = (type = "Post", url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`http://localhost:8081/${url}`, data)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};
