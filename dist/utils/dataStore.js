"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataStore = void 0;
//ui/utils/dataStore.ts
class DataStore {
    constructor() {
        this.storedValues = {};
    }
    getValue(key) {
        return this.storedValues[key];
    }
    setValue(key, value) {
        this.storedValues[key] = value;
    }
}
const dataStore = new DataStore();
exports.dataStore = dataStore;
//# sourceMappingURL=dataStore.js.map