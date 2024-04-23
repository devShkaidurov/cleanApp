import { Order } from "./Order";

export interface Cleaner {
    id: number,
    login: string,
    fio: string,
    birthday: Date,
    orders: Order[]
}