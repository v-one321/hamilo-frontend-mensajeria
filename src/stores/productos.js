import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductoStore = defineStore('carritoProductos', () => {
    const carrito = ref([]);
    const total = computed(() => carrito.value.reduce((suma, elemento) => { return suma + elemento.subtotal}, 0));
    const addCarrito = param => {
        if (!comprobarProducto(param.id)) {
        let objeto = {
            producto_id: param.id,
            nombre: param.nombre,
            codigo: param.codigo,
            precio_unitario: parseFloat(param.precio_venta),
            cantidad: 1,
            subtotal: parseFloat(param.precio_venta),
            imagen: param.imagen,
        }
        carrito.value.push(objeto);
    }else{
        const posicion = carrito.value.findIndex(elemento => elemento.producto_id == param.id);
        incrementarCantidad(posicion);
    }
    }    
    const comprobarProducto = (param,) => {
        const existe = carrito.value.some(elemento => elemento.producto_id === param);
        return existe;
    }
    const removeCarrito = param => {
        carrito.value.splice(param, 1);
    }
    const incrementarCantidad = param => {
        carrito.value[param].cantidad++;
        carrito.value[param].subtotal += carrito.value[param].precio_unitario;
    }
    const decrementarCantidad = param => {
        if(carrito.value[param].cantidad > 1){
            carrito.value[param].cantidad--;
            carrito.value[param].subtotal -= carrito.value[param].precio_unitario;
        }
    }
  return { carrito, addCarrito, removeCarrito, total, incrementarCantidad, decrementarCantidad }
})
