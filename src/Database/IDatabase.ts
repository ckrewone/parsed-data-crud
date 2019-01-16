export interface IDatabase {
    add(data:object): string;
    get(id:string): object;
    delete(): void;
    update(): void;
    close(): void;
    createTable(): void;
}
