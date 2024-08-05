<template>
    <main>
        <div class="container">
            <div class="nav-scroller py-1 mb-3 border-bottom position-sticky rounded-3 bg-info-subtle shadow" style="top: 0.3rem;">
                <nav class="nav nav-underline d-flex justify-content-around align-items-center">
                    <button type="button" class="nav-item nav-link link-body-emphasis"  @click="removeFiltroCategoria()">
                        <span class="badge d-flex align-items-center p-1 pe-2 rounded-pill" :class="filtros.categoria == ''? 'bg-dark text-white' : 'bg-white text-dark'">
                            <img class="rounded-circle me-1" width="24" height="24" src="https://github.com/mdo.png"
                                alt="">
                                Todos
                        </span>
                    </button>
                    <button type="button" class="nav-item nav-link link-body-emphasis" v-for="item in categorias" :key="item.id" @click="filtroCategoria(item.id)">
                        <span class="badge d-flex align-items-center p-1 pe-2 rounded-pill" :class="item.id == filtros.categoria? 'bg-dark text-white': 'bg-white text-dark'">
                            <img :src="item.icono" class="rounded-3 me-1" width="20px" height="20px" alt="">{{ item.nombre }}
                        </span>
                    </button>
                </nav>
            </div>
            <div class="row featurette">
                <div class="col-md-7 d-flex align-items-center text-center">
                    <h2 class="featurette-heading fw-bold display-3">{{ dato.nombre }} - <span
                            class="text-body-secondary text-center">{{ dato.codigo }}</span><br>
                        <button type="button" class="btn btn-lg" style="background-color: #5000ab; color:white"
                            @click="productoStore.addCarrito(dato)"><i class="fas fa-shopping-cart me-2"></i>Agregar al
                            carrito</button>
                    </h2>
                </div>
                <div class="col-md-5">
                    <img :src="dato.imagen" class="rounded-4" width="100%" height="100%" alt="">
                </div>
                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-4 fw-normal text-body-emphasis">Productos</h1>
                    <p class="fs-5 text-body-secondary">¡Bienvenido a nuestro Sistema de Ventas Online! Simplifica la
                        gestión de tus productos, inventario y transacciones con nuestra plataforma intuitiva y segura.
                        Aumenta tus ventas y lleva tu negocio al siguiente nivel con nuestras herramientas avanzadas y
                        soporte dedicado. ¡Empieza hoy mismo y transforma tu experiencia de venta!</p>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-md-8">
                    <div class="row gy-5">
                        <div class="col-12 col-md-6" v-for="item in datos" :key="item.id">
                            <div class="card rounded-bottom-5 rounded-start-5 shadow-lg border-0">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <img :src="item.imagen" class="rounded-3" width="100%" height="100%" alt="">
                                    </div>
                                    <div class="col-12 col-md-8">
                                        <div
                                            class="card-header rounded-bottom-5 bg-dark-subtle text-white border-0 m-0">
                                            <h5 class="fw-bold fs-3 text-center">{{ item.nombre }}</h5>
                                        </div>
                                        <div class="card-body m-0">
                                            <p class="m-0"><span class="fw-bold">Categoria:</span> {{
                                                item.categoria.nombre }}</p>
                                            <p class="m-0"><span class="fs-3 fw-bold text-success">${{ item.precio_venta
                                                    }}</span> <span class="text-muted text-decoration-line-through">${{
                                                        ((parseFloat(item.precio_venta) * 0.13) +
                                                    parseFloat(item.precio_venta)).toFixed(2)}}</span></p>
                                            <div class="text-center">
                                                <button class="btn btn-outline-primary"
                                                    @click="productoStore.addCarrito(item)"><i
                                                        class="fas fa-shopping-cart"></i> Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="position-sticky" style="top: 4rem;">
                        <div class="row gy-3">
                            <div class="col-12">
                                <h4 class="fst-italic">Búsqueda</h4>
                                <div class="form-floating">
                                    <input type="text" class="form-control rounded-4" id="search" v-model="filtros.search" placeholder="Nombre, codigo.." autocomplete="off" @change="filtroBusqueda()">
                                    <label for="search" class="text-primary"><i class="fas fa-search me-1"></i>Nombre, codigo..</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <h4 class="fst-italic">Carrito</h4>
                                <ul class="list-unstyled " v-if="productoStore.carrito.length > 0">
                                    <li v-for="(item, indice) in productoStore.carrito" :key="item.producto_id">
                                        <div
                                            class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img :src="item.imagen" width="100%" height="100%" class="rounded-3"
                                                        alt="">
                                                </div>
                                                <div class="col-md-6">
                                                    <p class=" fs-5 fw-bold">{{ item.nombre }}</p>
                                                    <p class="text-body-secondary m-0">{{ item.codigo }}</p>
                                                    <p class="fst-italic fw-bold">{{ (item.subtotal).toFixed(2) }} <span
                                                            class="badge bg-info">Bs</span></p>
                                                    <p class="m-0">
                                                        <button class="btn btn-outline-danger btn-sm me-2"  @click="productoStore.decrementarCantidad(indice)">
                                                            <i class="fas fa-minus"></i>
                                                        </button>
                                                        {{ item.cantidad }}
                                                        <button class="btn btn-outline-success btn-sm ms-2" @click="productoStore.incrementarCantidad(indice)">
                                                            <i class="fas fa-plus"></i>
                                                        </button>
                                                    </p>
                                                </div>
                                                <div class="col-md-2 d-flex align-items-center">
                                                    <button type="button" class="btn btn-outline-danger "
                                                        @click="productoStore.removeCarrito(indice)"><i
                                                            class="fas fa-trash"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="alert alert-warning text-center" v-else>
                                    Ningun producto seleccionado
                                </div>
                            </div>
                            <div class="text-end" v-if="productoStore.carrito.length > 0">
                                <hr>
                                <p> <small class="fw-bold h3">Total</small> {{ (productoStore.total).toFixed(2) }} Bs</p>
                            </div>
                            <div class="text-center" v-if="productoStore.carrito.length > 0">
                                <button type="button" class="btn btn-lg" style="background-color: #5000ab; color:white" @click="TerminarPedido()">
                                    Terminar compra
                                    <i class="far fa-credit-card ms-3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { listarAleatorio, listarProductos } from '@/services/productosService';
import { onMounted, ref } from 'vue';
import { useProductoStore } from '@/stores/productos';
import { listaCategoria } from '@/services/categoriasService';
import { useRouter } from 'vue-router';
const router = useRouter();
const datos = ref([]);
const dato = ref({});
const categorias = ref([]);
const productoStore = useProductoStore();
const filtros = ref({
    search: '',
    categoria: ''
});
const paginacion = ref({
    total: null,
    pagina: 1,
});
const listar = async () => {
    try {
        const { data } = await listarProductos(paginacion.value.pagina, filtros.value);
        datos.value = [...datos.value, ...data.datos.data];
        paginacion.value.total = data.datos.total;
    } catch (error) {
        console.log(error);
    }
}
const listarProductoAleatorio = async () => {
    try {
        const { data } = await listarAleatorio();
        dato.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const listarCategorias = async () => {
    try {
        const { data } = await listaCategoria();
        categorias.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const filtroCategoria = param => {
    filtros.value.categoria = param;
    paginacion.value.pagina = 1;
    datos.value = []
    listar();
}
const filtroBusqueda = () => {
    paginacion.value.pagina = 1;
    datos.value = []
    listar();    
}
const removeFiltroCategoria = () => {
    filtros.value.categoria = '';
    paginacion.value.pagina = 1;
    datos.value = []
    listar();
}
const cargarMas = ()=>{
    if (paginacion.value.total > datos.value.length) {
        if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
            paginacion.value.pagina++;
            listar();
        }
    }
}
const TerminarPedido = () => {
    router.push({path: '/procesar-pago'});
}
onMounted(() => {
    listar();
    listarProductoAleatorio();
    listarCategorias();    
    window.addEventListener('scroll', cargarMas);
});

</script>
<style>
.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.cursor-personalizado {
    cursor: pointer;
}
</style>