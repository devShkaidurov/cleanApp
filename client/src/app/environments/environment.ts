export const environment = {
    url: 'http://localhost:8080',
    objectType: [
        {key: 1, value: "Дом"},
        {key: 2, value: "Дом с участком"},
        {key: 3, value: "Квартира"},
        {key: 4, value: "Гараж"},
    ],
    orderStatus: [
        {key: -2, value: "Отменён"},
        {key: -1, value: "Выполнен"},
        {key: 0, value: "Оформлен, ждет очереди"},
        {key: 1, value: "Клинер в пути"},
        {key: 2, value: "Происходит уборка"},
    ],
    cleanType: [
        {key: 1, k: 1, value: "Стандартная (влажная)"},
        {key: 2, k: 1.25, value: "Стандартная и окна"},
        {key: 3, k: 1.65, value: "Генеральная"},
        {key: 4, k: 2, value: "После ремонта"},
        {key: 5, k: 0.75, value: "Сухая"},
    ]
}
