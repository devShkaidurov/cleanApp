export interface Order {
    id: number,
    date: Date,
    square: number,
    price: number,
    status: number,
    clean_type: number,
    order_type: number,
    order_address: string,
    is_done: boolean,
    cleaner: Object
}