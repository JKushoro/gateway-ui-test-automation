//ui/utils/dataStore.ts
class DataStore {
    private storedValues: { [key: string]: any } = {};

    getValue<T = any>(key: string): T {
        return this.storedValues[key];
    }

    setValue<T = any>(key: string, value: T): void {
        this.storedValues[key] = value;
    }
}

const dataStore = new DataStore();

export {dataStore};

