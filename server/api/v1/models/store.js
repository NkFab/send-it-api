/** 
     * Credit to Musigwa Pacifique for writting methods.
     * Store for models in an array temporarily
     * 
     * */

/**
 * Creates a store for a passed model object
 * @class
 * 
 */
class Store {
    constructor(model_name) {
        this.model_name = model_name;
        this.store = {};
        this.store[this.model_name] = [];
        this.indexes = {};
        this.indexes[this.model_name] = 0;
        this.error = new Error();
    }
    /**
     * Pushes model data passed as param object
     * @method create
     * @param {*} data 
     * @this Store
     */
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
    /**
     * Finds if there is any data in the array and retrieve them
     * @method search
     * @param {*} args
     * @this Store 
     */
    search(args = {}) {
        return new Promise((resolve, reject) => {
            if (this.store[this.model_name]) {
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
    /**
     * Find a corresponding value to the param and retrieve it
     * @method searchById
     * @param {*} id 
     * @this Store
     */
    searchById(id) {
        return new Promise((resolve, reject) => {
            const found = this.store[this.model_name].find(order => order.id === id);
            this.error.message = `id ${id}  not found`;
            this.error.model_name = `not found`;
            found ? resolve(found) : reject(this.error);
        });
    }
    /**
     * Find a corresponding value to the param and replace it
     * @method update
     * @param {*} id 
     * @param {*} args 
     * @this Store
     */
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
    /**
     * Find a corresponding value to the param in the array and remove it
     * @method findByIdAndRemove
     * @param {*} id 
     * @this store
     */
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
    //***********************************************************
    /**
     * Remove any value in the array
     * @method clean
     * @this store
     */
    clean() {
        this.store[this.model_name].length = 0;
    }
}
export default Store;