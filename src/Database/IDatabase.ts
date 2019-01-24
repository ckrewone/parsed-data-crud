export interface IDatabase {
    add(data: object): Promise<string>;
    get(id: string): Promise<object>;
    getAll(): Promise<object>;
    delete(): void;
    update(): void;
    createTable(): Promise<void>;
}
