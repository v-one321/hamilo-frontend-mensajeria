import { urlBase, http } from './Http.js'
export const listaCategoria = () => {
    return http().get(`${urlBase}categorias`);
}