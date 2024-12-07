import call from './Call';

class BillingService {
    getList() {
        const invoiceList = call({
            path:"/getInvoice",
            method:"GET"
        })
        return {
            data: invoiceList
        };
    }
    createItem(data) {
        const invoiceCreate = call({
            path: "/orderStore",
            method: "POST",
            data: data,
            
        })
        return {
            data : invoiceCreate
        }
    }
}

export default new BillingService()