declare class DataStore {
    private storedValues;
    getValue<T = any>(key: string): T;
    setValue<T = any>(key: string, value: T): void;
}
declare const dataStore: DataStore;
export { dataStore };
//# sourceMappingURL=dataStore.d.ts.map