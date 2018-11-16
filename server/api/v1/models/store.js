class Store {
    constructor(model_name) {
        this.model_name = model_name;
        this.store = {};
        this.store[this.model_name] = [];
        this.indexes = {};
        this.indexes[this.model_name] = 0;
        this.error = new Error();
    }

    create(data) {
        return new Promise((resolve, reject) => {

            data.id = this.indexes[this.model_name].toString();
            this.indexes[this.model_name]++;
            data.createdAt = new Date();
            data.updatedAt = new Date();

            if (this.store[this.model_name]) {
                this.store[this.model_name].push(data);
                resolve(this.store[this.model_name].sort((a, b) => a.updatedAt < b.updatedAt));
            } else {
                this.error.message = `the ${this.store[this.model_name]} collection not found`;
                error.model_name = 'not saved';
                reject(error);
            }
        });
    }

    search(args = {}) {
        return new Promise((resolve, reject) => {
            if (this.store[this.model_name]) {
                console.log('args:', args);
                let found = this.store[this.model_name];
                for (const key in args) {
                    found = found.filter(
                        elmt =>
                            typeof elmt[key] === 'string'
                                ? elmt[key].toLowerCase() === args[key].toLowerCase()
                                : elmt[key] === args[key],
                    );
                }
                resolve(found.sort((a, b) => a.updatedAt < b.updatedAt));
            } else {
                this.error.message = `the ${this.store[this.model_name]} collection not found`;
                reject(error);
            }
        });
    }

    searchById(id) {
        return new Promise((resolve, reject) => {
            const found = this.store[this.model_name].find(order => order.id === id);
            this.error.message = `id ${id}  not found`;
            this.error.model_name = `not found`;
            found ? resolve(found) : reject(this.error);
        });
    }

    update(id, args) {
        return new Promise((resolve, reject) => {
            this.findById(id)
                .then(res => {
                    for (const key in args) {
                        if (res.hasOwnProperty(key)) {
                            res[key] = args[key];
                        }
                    }
                    res.updatedAt = new Date();
                    resolve(this.store[this.model_name].sort((a, b) => a.updatedAt < b.updatedAt));
                })
                .catch(err => reject({ ...err, name: 'not updated' }));
        });
    }

    findByIdAndRemove(id) {
        return new Promise((resolve, reject) => {
            this.findById(id)
                .then(res => {
                    this.store[this.model_name].splice(this.store[this.model_name][res], 1);
                    resolve(this.store[this.model_name].sort((a, b) => a.updatedAt < b.updatedAt));
                })
                .catch(err => reject({ ...err, name: 'not deleted' }));
        });
    }
    clean() {
        this.store[this.model_name].length = 0;
    }
}
export default Store;