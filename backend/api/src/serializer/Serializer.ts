export interface Serializer<T> {
    serialize(rawData: any): T,
    deserialize(parsedData: T): any,
}