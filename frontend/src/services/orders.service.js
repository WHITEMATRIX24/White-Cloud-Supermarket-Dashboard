import OrderData from '../data/order.json';
import call from './Call';

class OrdersService {
    getList() {
        const Orders = call({
            path:"/order",
            method:"GET"
        })
        return {
            data: Orders
        };
    }
    
    changeStatus(data) {
        const Orders = call({
            path:"/orderStatus",
            method:"POST",
            data: data,
        })
        return {
            data: Orders
        };
    }

}

export default new OrdersService()