export interface IDatabase {
    add(data: object): Promise<string>;

    get(id: string): Promise<object>;

    getAll(): Promise<object>;

    delete(): void;

    put(): void;

    patch(id: string, data: object): Promise<boolean>;

    createTable(): Promise<void>;
}
