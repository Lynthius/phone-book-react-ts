import axios from 'axios'

const API_URL="http://localhost:3000"

export const httpClient=axios.create({
    baseURL: API_URL,
    headers: {"Content-type": "application/json;charset=UTF-8"}
})


// odpala się zapytanie => leci przez interceptor => egzekucja zapytania => odpowiedź z serwera => intrcepotr repsonse => przekazanie dalej do funkcji

// Add a response interceptor
httpClient.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
     return Promise.reject(error);
});