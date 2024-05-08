import { AxiosResponse } from "axios"
import { ClientPayload } from "../validators/validators"
import { OrderPayload } from "../validators/validators"
import { httpClient } from "./httpClient"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./constants"

export type Client = ClientPayload & { id: string }
export type Order = OrderPayload & { id: string }

export const getClientById = async (id: string): Promise<AxiosResponse<Client>> => {
    return await httpClient.get(`/clients/${id}`)
}

export const getClients = async (): Promise<AxiosResponse<Client[]>> => {
    return await httpClient.get(`/clients`)
}
export const getOrders = async (): Promise<AxiosResponse<Order[]>> => {
    return await httpClient.get(`/orders`)
}

export const useGetClientById = (id?: string) => {
    return useQuery({ queryKey: [QUERY_KEYS.client, id], queryFn: () => id ? getClientById(id).then(res => res.data) : undefined, enabled: !!id })
}

export const useGetClients = () => {
    return useQuery({ queryKey: [QUERY_KEYS.clients], queryFn: () => getClients().then(res => res.data) })
}
export const useGetOrders = () => {
    return useQuery({ queryKey: [QUERY_KEYS.orders], queryFn: () => getOrders().then(res => res.data) })
}