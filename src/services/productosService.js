import { urlBase, http } from './Http.js'
export const listarProductos = (pagina, param) => {
    return http().get(`${urlBase}productos?page=${pagina}&search=${param.search}&categoria=${param.categoria}`);
}
export const listarAleatorio = () => {
    return http().get(`${urlBase}productos-aleatorio`);
}