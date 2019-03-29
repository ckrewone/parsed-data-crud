export interface IDatabase {
    add(data: object): Promise<string>;

    get(id: string): Promise<object>;

    getAll(): Promise<object>;

    delete(id: string): Promise<boolean>;

    put(): void;

    patch(id: string, data: object): Promise<boolean>;

    createTable(): Promise<void>;
}
