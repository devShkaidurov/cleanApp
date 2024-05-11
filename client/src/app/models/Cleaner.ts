import { Order } from "./Order";

export interface Cleaner {
    id: number,
    login: string,
    fio: string,
    birthday: number,
    orders: Order[],
    password: string
}