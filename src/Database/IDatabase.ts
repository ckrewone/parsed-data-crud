export interface IDatabase {
    add(data: object): Promise<string>;
    get(id: string): Promise<object>;
    delete(): void;
    update(): void;
    close(): void;
    createTable(): Promise<void>;
}
