import {Serializer} from "../serializer/Serializer.js";

export interface Manager<T> {
    get content(),
    set content(value: T),
    get serializer(),
    set serializer(value: Serializer<T>),
}