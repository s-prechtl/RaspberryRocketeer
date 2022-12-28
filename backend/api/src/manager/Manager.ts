export abstract class Manager<T> {
    //region getter&setter
    protected abstract serialize(raw: any): T;

    protected abstract deserialize(parsed: T): any;
    //endregion
}