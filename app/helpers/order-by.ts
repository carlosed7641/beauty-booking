export const orderBy = (items: ServiceResult[], order: string) => {
    switch (order) {
        case'Precio mayor':
            return items.sort((a, b) => b.price - a.price)
        case 'Precio menor' :
            return  items.sort((a, b) => a.price - b.price)
        default:
            return items
    }
}