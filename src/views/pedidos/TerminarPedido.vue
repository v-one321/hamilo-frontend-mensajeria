<template>
    <div class="container mt-5">
        <div class="row gy-2" v-if="productoStore.carrito.length > 0">
            <div class="col-12" :class="{'col-md-8' : formulario.tipo_pago}">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row d-flex justify-content-center gy-2">
                            <div class="col-12">                                
                                <h3 class="card-title" style="color: #5000ab"><i class="fas fa-shopping-cart me-2"></i>Carrito de productos</h3>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead >
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Codigo</th>
                                                <th>Cantidad</th>
                                                <th>Precio <small class="text-danger">(Unitario)</small></th>
                                                <th>Subtotal</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, indice) in productoStore.carrito" :key="item.producto_id">
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.codigo }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button class="btn btn-outline-danger btn-sm me-2"  @click="productoStore.decrementarCantidad(indice)">
                                                            <i class="fas fa-minus"></i>
                                                        </button>
                                                        {{ item.cantidad }}
                                                        <button class="btn btn-outline-success btn-sm ms-2" @click="productoStore.incrementarCantidad(indice)">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>{{ item.precio_unitario }}</td>
                                                <td>{{ (item.subtotal).toFixed(2) }}</td>
                                                <td><button type="button" class="btn btn-outline-danger btn-sm" @click="productoStore.removeCarrito(indice)"><i class="fas fa-trash"></i></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-12 col-md-7">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th colspan="12" class="fs-4" style="color: #5000ab">Total Pago</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="fw-bold">Subtotal</td>
                                                <td class="text-success text-end">{{ (productoStore.total).toFixed(2) }} Bs</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-bold">Descuento</td>
                                                <td class="text-danger text-end">{{ (productoStore.total * 0.13 ).toFixed(2) }} Bs</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-bold" style="color: #5000ab;">Total</td>
                                                <td class="text-end fw-bold">{{ (productoStore.total * 0.87 ).toFixed(2) }} Bs</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <p class="fw-bold h5" style="color:#5000ab">Seleccione metodo de pago</p>
                                <div class="row">
                                    <div class="col-12 col-md-6 d-flex justify-md-content-end justify-content-center">
                                        <div class="form-check ">
                                            <input type="radio" class="form-check-input" value="tarjeta de credito" id="tarjeta" v-model="formulario.tipo_pago">
                                            <label for="tarjeta" class="form-check-label">Tarjeta de credito</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 d-flex justify-md-content-start justify-content-center">
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" value="transferencia" id="transferencia" v-model="formulario.tipo_pago">
                                            <label for="transferencia" class="form-check-label">Transferencia</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4" v-show="formulario.tipo_pago">
                <div class="card border-0 shadow">
                    <div class="card-body">
                        <div class="row gy-2">
                            <div class="col-12">
                                <h4 class="card-title" style="color:#5000ab;"><i class="fa-solid fa-file-invoice me-2"></i>Datos para la factura</h4>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control rounded-4" id="nombre" v-model="formulario.nombre" placeholder="Nombre.." autocomplete="off">
                                    <label class="fw-bold" for="nombre">Nombre..</label>
                                </div>
                                <small class="text-danger" v-if="errors.nombre">{{ errors.nombre[0] }}</small>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="text" class="form-control rounded-4" id="nro_referencia" v-model="formulario.nro_referencia" placeholder="Nro. tarjeta" autocomplete="off" v-mask="'#### #### #### ####'">
                                    <label class="fw-bold" for="nro_referencia">{{ formulario.tipo_pago == 'tarjeta de credito' ? 'Nro tarjeta credito' : 'Nro transaccion' }}</label>
                                </div>
                                <small class="text-danger" v-if="errors.nro_referencia">{{ errors.nro_referencia[0] }}</small>
                            </div>
                            <div class="col-12" v-show="formulario.tipo_pago == 'tarjeta de credito'">
                                <div class="form-floating">
                                    <input type="text" class="form-control rounded-4" id="cvv" v-model="formulario.cvv" placeholder="cvv" autocomplete="off" v-mask="'###'">
                                    <label class="fw-bold" for="cvv">Cvv</label>
                                </div>
                                <small class="text-danger" v-if="errors.cvv">{{ errors.cvv[0] }}</small>
                            </div>
                            <div class="col-12" v-show="formulario.tipo_pago == 'tarjeta de credito'">
                                <div class="form-floating">
                                    <input type="text" class="form-control rounded-4" id="expiracion" v-model="formulario.expiracion" placeholder="Fecha" autocomplete="off" v-mask="'##/####'" @keyup="validateExpirationDate()">
                                    <label class="fw-bold" for="expiracion">Expiracion <small class="text-danger fst-italic">(MM/AAAA)</small></label>
                                </div>
                                <small class="text-danger" v-if="errors.expiracion">{{ errors.expiracion }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <button type="button" class="btn btn-lg" :class="{'disabled' : fechaValidacion}" style="width: 100%; background-color: #5000ab; color:white" @click="store()">
                            Terminar pago                            
                            <i class="far fa-credit-card ms-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row gy-3" v-else>
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    <i class="fa-solid fa-spinner fa-spin me-2"></i>Ningun producto añadido al carrito
                </div>
            </div>
            <div class="col-12 text-center">
                <button type="button" class="btn btn-primary btn-lg" @click="volver()"><i class="fas fa-table me-2"></i>Ir a productos</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useProductoStore } from '@/stores/productos';
import { guardarPedido } from '@/services/pedidosService';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter();
const productoStore = useProductoStore();
const formulario = ref({});
const errors = ref({});
const fechaValidacion = ref(false);
const store = async () => {
    errors.value = {};
    try {
        formulario.value.detalle = productoStore.carrito;
        formulario.value.total = productoStore.total * 0.87;
        formulario.value.nro_referencia = formulario.value.nro_referencia.replace(/\s+/g, '');
        const { data } = await guardarPedido(formulario.value);
        productoStore.carrito = [];
        formulario.value = {};
        Swal.fire({
            text: data.mensaje,
            title: 'Bien!',
            icon: 'success'
        });
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
            Swal.fire({
                text: error.response.data.message,
                title: 'Error!',
                icon: 'error'
            });
        }else{
            Swal.fire({
                text: error.response.data.message,
                title: 'Error!',
                icon: 'error'
            })
        }
        console.log(error);
    }
}
const validateExpirationDate = () => {
    errors.value = {}
    fechaValidacion.value = false;
    const [month, year] = formulario.value.expiracion.split('/');
    const expirationDate = new Date(year, month - 1);
    const currentDate = new Date();
    console.log(expirationDate);
    if (expirationDate < currentDate) {
        errors.value.expiracion = 'Fecha no valida.';
        fechaValidacion.value = true;
    } else {
        errors.expiracion = '';
    }
};
const volver = () => {
    router.push({path: '/'})
}
</script>
<style>
    
</style>