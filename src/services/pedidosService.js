import { urlBase, http } from './Http.js'
export const guardarPedido = formulario => {
    return http().post(`${urlBase}pedido`, formulario);
}
export const index = () => {
    return http().get(`${urlBase}pedido`);
}