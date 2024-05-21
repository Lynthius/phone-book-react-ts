import * as yup from "yup"
//zod, yup, joi
export const clientValidationSchema = yup.object({
    name: yup.string().min(3, "Imię musi mieć minimum 3 znaki").required("Imie jest wymagane"),
    surname: yup.string().min(3, "Nazwisko musi mieć minimum 3 znaki").required("Nazwisko jest wymagane"),
    street: yup.string().min(5, "Ulica musi mieć minimum 5 znaków").required("Ulica jest wymagana"),
    postCode: yup.string().matches(/^([0-9]{2})(-[0-9]{3})?$/i, { message: "Kod pocztowy powinien składać się z 2 cyfr, myślnika i 3 kolejnych cyfr" }).required("Kod pocztowy jest wymagany"),
    town: yup.string().min(3, "Miasto musi mieć minimum 3 znaki").required("Miasto jest wymagane"),
    region: yup.string().min(3, "Region musi mieć minimum 3 znaki"),
    phoneNumber: yup.string().matches(/^([0-9]{9})?$/i, { message: "Numer telefonu powinien składać się z 9 cyfr" }),
    imgSrc: yup.string().url(),
})

export type ClientPayload = yup.InferType<typeof clientValidationSchema>

export const orderValidationSchema = yup.object({
    quantity: yup.number().min(1, "Minimum jedna sztuka").required("Ilość jest wymagana"),
    clientId: yup.string().required("ID jest wymagane"),
    title: yup.string().min(3, "Nazwa zamówienia musi mieć minimum 3 znaki").required("Nazwa zamówienia jest wymagana"),
    body: yup.string().min(3, "Zamówienie musi mieć minimum 3 znaki").required("Zamówienie jest wymagane"),
})

export type OrderPayload = yup.InferType<typeof orderValidationSchema>