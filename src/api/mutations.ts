import { AxiosResponse } from "axios"
import { httpClient } from "./httpClient"
import { Client } from "./queries"
import { Order } from "./queries"
import { ClientPayload } from "../validators/validators"
import { OrderPayload } from "../validators/validators"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./constants"
// import { QUERY_KEYS } from "./constants"

export const addClient = async (newClient: ClientPayload): Promise<AxiosResponse<Client>> => {
    return await httpClient.post(`/clients`, JSON.stringify(newClient))
}
export const useAddClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: ClientPayload) => await addClient(values),
        onSuccess: (data) => {
            console.log("onSuccess", data)
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.client] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] })
        },
        onError: () => {
            console.log("Nie udało zaktualizować")
        }
    })
}

export const deleteClient = async (clientId: string): Promise<void> => {
    await httpClient.delete(`/clients/${clientId}`);
}
export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (clientId: string) => await deleteClient(clientId),
        onSuccess: () => {
            console.log("Klient został pomyślnie usunięty");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.client] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
        },
        onError: () => {
            console.log("Nie udało się usunąć klienta");
        }
    });
}

export const updateClient = async (clientId: string, updateClientData: ClientPayload): Promise<AxiosResponse<Client>> => {
    return await httpClient.put(`/clients/${clientId}`, JSON.stringify(updateClientData))
}

export const useUpdateClient = (clientId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: ClientPayload) => await updateClient(clientId, values),
        onSuccess: (data) => {
            console.log("onSuccess", data)
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.client] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
        },
        onError: () => {
            console.log("Nie udało zaktualizować")
        }
    });
}

export const addOrder = async (newClient: OrderPayload): Promise<AxiosResponse<Order>> => {
    return await httpClient.post(`/orders`, JSON.stringify(newClient))
}
export const useAddOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: OrderPayload) => await addOrder(values),
        onSuccess: (data) => {
            console.log("onSuccess", data)
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.client] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] })
        },
        onError: () => {
            console.log("Nie udało zaktualizować")
        }
    })
}