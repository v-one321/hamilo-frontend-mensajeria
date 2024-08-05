import { urlBase, http } from './Http.js'
export const index = page => {
    return http().get(`${urlBase}caja?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}caja`, formulario);
}
export const view = id => {
    return http().get(`${urlBase}caja/${id}`);
}
export const update = (id, formulario) => {
    return http().put(`${urlBase}caja/${id}`, formulario);
}
export const destroy = id => {
    return http().delete(`${urlBase}caja/${id}`);
}
export const filtrarPersona = search => {
    return http().get(`${urlBase}persona?search=${search}`);
}
export const selectPersona = id => {
    return http().get(`${urlBase}persona/${id}`);
}
export const flujoCaja = () => {
    return http().get(`${urlBase}caja-flujo`);
}