<template>
    <div class="container mt-5">
        <div class="row gy-3">
            <div class="col-12 col-md-8">
                <div class="card border-0 shadow">
                    <div class="card-header bg-white">
                        <h5 class="card-title text-personalizado"><i class="fas fa-pencil me-2"></i>{{ titulo }}</h5>
                    </div>
                    <div class="card-body ">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                <label for="fecha" class="form-label fw-bold">Fecha</label>
                                <input type="text" id="fecha" class="form-control-plaintext text-personalizado"
                                    v-model="formulario.fecha" readonly>
                            </div>
                            <div class="col-12 col-md-4">
                                <label for="nro_respaldo" class="form-label fw-bold">
                                    Nro Respaldo
                                    <input type="checkbox" class="form-check-input" v-model="editarNro">
                                    <small class="fst-italic text-personalizado">(Editar)</small>
                                </label>
                                <input type="text" id="nro_respaldo"
                                    :class="editarNro ? 'form-control' : 'form-control-plaintext'"
                                    v-model="formulario.nro_respaldo" :readonly="!editarNro">
                                <small class="text-danger" v-if="errors.nro_respaldo">{{ errors.nro_respaldo[0]
                                    }}</small>
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label fw-bold">Tipo movimiento</label>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" value="Ingreso" id="ingreso"
                                                v-model="formulario.tipo_movimiento">
                                            <label for="ingreso" class="form-check-label">Ingreso</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" value="Egreso" id="egreso"
                                                v-model="formulario.tipo_movimiento">
                                            <label for="egreso" class="form-check-label">Egreso</label>
                                        </div>
                                    </div>
                                </div>
                                <small class="text-danger" v-if="errors.tipo_movimiento">{{ errors.tipo_movimiento[0]
                                    }}</small>
                            </div>
                        </div>
                        <div class="row gy-3">
                            <div class="col-12 col-md-5">
                                <label for="importe" class="form-label fw-bold">Importe</label>
                                <input type="number" id="importe" class="form-control" v-model="formulario.importe">
                                <small class="text-danger" v-if="errors.importe">{{ errors.importe[0] }}</small>
                            </div>
                            <div class="col-12 col-md-7">
                                <label for="detalle" class="form-label fw-bold">Detalle<small
                                        class="text-personalizado">(Opcional)</small></label>
                                <textarea id="detalle" class="form-control" v-model="formulario.detalle"></textarea>
                                <small class="text-danger" v-if="errors.detalle">{{ errors.detalle[0] }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white border-0 text-end">
                        <button type="button" class="btn btn-danger" @click="volver()"><i
                                class="fas fa-reply me-2"></i>Volver</button>
                        <button type="button" class="btn" style="background-color: #5000ab; color: white;"
                            @click="guardar()">Guardar<i class="fas fa-save ms-2"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-header bg-white">
                        <h5 class="card-title text-personalizado"><i class="fas fa-user me-2"></i>Seleccione persona
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12" v-show="personaSeleccionada.nombre">
                                <label class="form-label fw-bold">Persona seleccionada</label>
                                <p class="m-0"><span class="fw-bold text-personalizado">Nombre: </span>{{
                                    personaSeleccionada.nombre }} {{ personaSeleccionada.apellido }}</p>
                                <p class="m-0"><span class="fw-bold text-personalizado">Identificacion: </span>{{
                                    personaSeleccionada.identificacion }}</p>
                            </div>
                            <small class="text-danger" v-if="errors.persona_id">{{ errors.persona_id[0] }}</small>
                            <div class="col-12">
                                <label for="" class="form-label fw-bold"><i
                                        class="fas fa-search me-1 text-personalizado"></i>Buscar..</label>
                                <input type="text" class="form-control" v-model="searchPersona"
                                    placeholder="Nombre, Apellido, identificacion..." @change="filtrarPersona()">
                            </div>
                            <div class="col-12">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item list-group-item-action cursor" v-for="item in personas"
                                        :key="item.id" @click="selectPersona(item.id)">
                                        <img :src="`https://ui-avatars.com/api/?name=${item.nombre}+${item.apellido}&rounded=true&format=svg`"
                                            width="40" height="40" alt="">
                                        {{ item.nombre }} {{ item.apellido }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as cajaService from '@/services/cajasService'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const fecha = new Date();
const editarNro = ref(false);
const formulario = ref({
    fecha: fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }),
    nro_respaldo: 0
});
const idCaja = router.currentRoute.value.params.idCaja;
const searchPersona = ref('');
const personas = ref([]);
const personaSeleccionada = ref({});
const errors = ref({});
const titulo = ref("");
const filtrarPersona = async () => {
    try {
        const { data } = await cajaService.filtrarPersona(searchPersona.value);
        personas.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const selectPersona = async param => {
    try {
        const { data } = await cajaService.selectPersona(param);
        personaSeleccionada.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const guardar = async () => {
    try {
        formulario.value.persona_id = personaSeleccionada.value.id;
        let mensaje = "";
        if (idCaja != "") {
            const { data } = await cajaService.update(idCaja, formulario.value);
            mensaje = data.mensaje
        } else {
            const { data } = await cajaService.store(formulario.value);
            mensaje = data.mensaje
        }
        Swal.fire({
            title: "Bien!",
            text: mensaje,
            icon: "success"
        });
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const volver = () => {
    router.push({ path: '/caja' });
}
const verRegistro = async () => {
    try {
        const { data } = await cajaService.view(idCaja);
        formulario.value = {
            nro_respaldo: data.datos.nro_respaldo,
            tipo_movimiento: data.datos.tipo_movimiento,
            importe: data.datos.importe,
            detalle: data.datos.detalle,
            persona_id: data.datos.persona_id
        }
        personaSeleccionada.value = data.datos.persona
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    titulo.value = "Nuevo Registro"
    if (idCaja != "") {
        verRegistro();
        titulo.value = "Editar Registro"
    }
})
</script>
<style>
.cursor {
    cursor: pointer;
}
</style>