<template>
    <div class="container mt-5">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Ingresos</th>
                        <th>Egresos</th>
                        <th>Flujo caja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ (parseFloat(datosFlujo.ingresos)).toFixed(2) }}</td>
                        <td>{{ (parseFloat(datosFlujo.egresos)).toFixed(2) }}</td>
                        <td>{{ (parseFloat(datosFlujo.total)).toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title">Movimientos registrados</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Buscar...">
                    </div>
                    <div class="col-12 col-md-4 text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="agregar()">Agregar</button>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Item</th>
                                        <th>Nombre(s)</th>
                                        <th>Apellido(s)</th>
                                        <th>Numero identificacion</th>
                                        <th>Tipo movimiento</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in datos" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.persona.nombre }}</td>
                                        <td>{{ item.persona.apellido }}</td>
                                        <td>{{ item.persona.identificacion }}</td>
                                        <td>
                                            <span class="badge"
                                                :class="item.tipo_movimiento == 'Ingreso' ? 'bg-info' : 'bg-personalizado'">
                                                {{ item.tipo_movimiento }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="badge" :class="item.estado ? 'bg-success' : 'bg-danger'">
                                                {{ item.estado ? 'Activo' : 'Inactivo' }}
                                            </span>
                                        </td>
                                        <td>
                                            {{ formatDate(item.created_at) }}
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-warning" @click="editar(item.id)"><i
                                                        class="fas fa-pencil"></i></button>
                                                <button class="btn" :class="item.estado ? 'btn-danger' : 'btn-success'"
                                                    @click="estado(item.id)"><i
                                                        class="fa-solid fa-retweet"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                    <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                    v-for="(item, indice) in paginacion.total" :key="indice"><button type="button"
                                        class="page-link" @click="paginaCambio(item)">{{ item }}</button>
                                </li>
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                    <button type="button" class="page-link" aria-label="Next" @click="paginaNext()">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { index, destroy, flujoCaja } from '@/services/cajasService';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
});
const router = useRouter();
onMounted(() => {
    listar();
    obtenerSumaTotal();
})
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        datos.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
const agregar = () => {
    router.push({ path: '/caja-formulario' });
}
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    listar();
}
const editar = param => {
    router.push({ path: `/caja-formulario/${param}` });
}
const estado = param => {
    try {
        Swal.fire({
            title: "¿Esta seguro?",
            text: "Esta a punto de modificar el estado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, modificar!",
            cancelButtonText: "No, cancelar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await destroy(param);
                listar();
                obtenerSumaTotal();
                Swal.fire({
                    title: "Bien!",
                    text: data.mensaje,
                    icon: "success"
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}
let datosFlujo = ref({});
const obtenerSumaTotal = async () => {
    try {
        const { data } = await flujoCaja();
        datosFlujo.value = data;
        if (datosFlujo.value.ingresos == null) {
            datosFlujo.value.ingresos = 0;
        }
        if (datosFlujo.value.egresos == null) {
            datosFlujo.value.egresos = 0;
        }
        datosFlujo.value.total = parseFloat(datosFlujo.value.ingresos) - parseFloat(datosFlujo.value.egresos);
    } catch (error) {
        console.log(error);        
    }
}
const formatDate = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
</script>
<style></style>