export const ROUTES={
    home: "/",
    clients: "/clients",
    clientAdd: '/clients/add',
    clientId: (id:string)=>`/clients/${id}`,
    clientEdit: (id:string)=>`/clients/${id}/edit`,
    orders: "/orders",
    ordersAdd: "/orders/add",
    orderId: (id:string)=>`/orders/${id}`,
    invoices: "/invoices",
    posts: "/posts",
    page404: "*"
}