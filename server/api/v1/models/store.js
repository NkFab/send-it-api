class Store {
    constructor(model) {
        this.model = model;
        this.store = {};
        this.store[this.model] = [];
        this.indexes = {};
        this.indexes[this.model] = 0;
    }

    save(data) {
        return new Promise((resolve, reject) => {
            data.id = this.indexes[this.model];
            this.indexes[this.model]++;
            data.createdAt = new Date();
            data.updatedAt = new Date();
            if (this.store[this.model].push(data)) {
                resolve(data);
            } else {
                const error = new Error('not saved');
                error.code = 101;
                error.msg = 'error saving';
                reject(error);
            }
        });
    }

    search(args = {}) {
        return new Promise((resolve, reject) => {
            if (this.store[this.model]) {
                let found = this.store[this.model];
                for (const key in args) {
                    found = found.filter(
                        elmt =>
                            typeof elmt[key] === 'string'
                                ? elmt[key].toLowerCase() === args[key].toLowerCase()
                                : elmt[key] === args[key],
                    );
                }
                resolve(found);
            } else {
                const error = new Error('not found');
                error.code = 101;
                error.msg = `${this.store[this.model]} collection not found`;
                reject(error);
            }
        });
    }

    searchId(id) {
        return new Promise(resolve => {
            resolve(this.store[this.model].find(order => order.id === Number(id)));
        });
    }

    searchIdUpdate(id, args) {
        return new Promise((resolve, reject) => {
            this.findById(id)
                .then(res => {
                    if (res) {
                        for (const key in args) {
                            if (res.hasOwnProperty(key)) {
                                res[key] = args[key];
                            }
                        }
                        res.updatedAt = new Date();
                    } else {
                        resolve(res);
                    }
                })
                .catch(err => reject(err));
            resolve(this.store[this.model]);
        });
    }
}
export default Store;

    //   searchIdRemove(id) {
    //     return new Promise((resolve, reject) => {
    //       this.findById(id)
    //         .then(res => {
    //           if (res) {
    //             this.store[this.model].splice(this.store[this.model][res], 1);
    //           }
    //         })
    //         .catch(err => reject(err));
    //       resolve(this.store[this.model]);
    //     });
    //   }
    // }

