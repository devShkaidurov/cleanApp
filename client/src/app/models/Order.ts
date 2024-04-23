export interface Order {
    id: number,
    orderDate: Date,
    square: number,
    price: number,
    status: number,
    cleanType: number,
    orderType: number,
    orderAddress: string,
    done: boolean,
    cleaner: Object
}