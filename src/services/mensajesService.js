import { urlBase, http } from './Http.js'
//CLIENTE
export const listarUsuarios = () => {
    return http().get(`${urlBase}usuario`);
}
export const vistaChatCliente = id => {
    return http().get(`${urlBase}chatClientView/${id}`);
}
export const sendMessage = formulario => {
    return http().post(`${urlBase}chatClient`, formulario);
}
export const ultimosMensajes = () => {
    return http().get(`${urlBase}chatUltimos`);
}