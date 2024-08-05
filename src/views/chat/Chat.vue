<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12 mb-3 text-center">
                <div class="row">
                    <div class="col puntero" v-for="item in usuarios" :key="item.id" @click="viewChat(item.id, item.nombre, item.imagen_perfil)">
                        <img :src="item.imagen_perfil ? urlBaseAsset + 'fotos/' + item.imagen_perfil : 'https://ui-avatars.com/api/?name=' + item.nombre"
                            width="50px" height="50px" alt="" class="rounded-circle border border-2" :class="item.sesion? 'border-success':'border-danger'">
                        <p class="margen-reducido fw-bold">{{ item.nombre }}</p>
                    </div>
                </div>
            </div>
            <div class="col-3" v-if="chatsRecientes.length > 0">
                <div class="row gy-2">
                    <div class="col-12 puntero" v-for="item in chatsRecientes" :key="item.id" @click="usuario.rol == 'cliente' ? viewChat(item.trabajador.id, item.trabajador.nombre, item.trabajador.imagen_perfil): viewChat(item.cliente.id, item.cliente.nombre, item.cliente.imagen_perfil)">
                        <div class="card mt-0">
                    <div class="row">
                        <div class="col-4 d-flex align-items-center justify-content-center p-0">
                            <img :src="usuario.rol == 'cliente' ? (item.trabajador.imagen_perfil? urlBaseAsset + 'fotos/'+ item.trabajador.imagen_perfil:'https://ui-avatars.com/api/?name=' + item.trabajador.nombre): (item.cliente.imagen_perfil ? urlBaseAsset + 'fotos/'+ item.cliente.imagen_perfil:'https://ui-avatars.com/api/?name=' + item.cliente.nombre )"
                                width="50px" height="50px" alt="" class="rounded-circle">
                        </div>
                        <div class="col-8 px-0">
                            <div class="card-body px-0">
                                <p class="fw-bold margen-reducido">{{ usuario.rol == 'cliente' ? item.trabajador.nombre: item.cliente.nombre }}</p>
                                <span class="text-muted margen-reducido">{{ item.ultimo_detalle_chat.mensaje.substring(0, 20)+'...'  }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            <div class="col-3" v-else>
                <div class="card bg-warning-subtle">
                    <div class="card-body">
                        Ningun Chat Reciente
                    </div>
                </div>
            </div>
            <div class="col-9" v-if="formulario.destino_id">
                <div class="card ">
                    <div class="card-header">
                        <h5 class="card-title">{{ nombreChat.nombre }}</h5>
                    </div>
                    <div class="card-body overflow-auto" style="max-height: 60vh;">
                        <div class="row gy-2" v-if="mensajes != null">
                            <div class="col-12" v-for="item in mensajes.detalle_chat" :key="item.id">
                                <div class="card" v-if="item.tipo== usuario.rol">
                                    <div class="row text-end">
                                        <div class="col-10 px-0">
                                            <div class="card-body px-0">
                                                <p class="fw-bold margen-reducido">{{usuario.nombre}}</p>
                                                <span class="text-muted margen-reducido">{{ item.mensaje }}</span>
                                            </div>
                                        </div>
                                        <div class="col-2 d-flex align-items-center justify-content-center p-0">
                                            <img :src="usuario.image ? urlBaseAsset + 'fotos/'+ usuario.imagen: 'https://ui-avatars.com/api/?name=' + usuario.nombre"
                                                width="50px" height="50px" alt="" class="rounded-circle">
                                        </div>
                                    </div>
                                </div>                                
                                <div class="card bg-success-subtle" v-else>
                                    <div class="row">
                                        <div class="col-2 d-flex align-items-center justify-content-center p-0">
                                            <img :src="nombreChat.imagen ? urlBaseAsset + 'fotos/'+ nombreChat.imagen: 'https://ui-avatars.com/api/?name=' + nombreChat.nombre"
                                                width="50px" height="50px" alt="" class="rounded-circle">
                                        </div>
                                        <div class="col-10 px-0">
                                            <div class="card-body px-0">
                                                <p class="fw-bold margen-reducido">{{nombreChat.nombre}}</p>
                                                <span class="text-muted margen-reducido">{{ item.mensaje }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <input type="text" name="message" placeholder="Type Message ..." class="form-control" v-model="formulario.mensaje" />
                            <span class="input-group-append">
                                <button type="button" class="btn btn-primary" @click="enviarMensaje()">Send</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-9" v-else>
                <div class="card">
                    <div class="card-body">
                        <div class="alert alert-danger text-center">
                            Seleccione un chat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount, onUpdated } from "vue";
import { listarUsuarios, vistaChatCliente, sendMessage, ultimosMensajes } from "@/services/mensajesService"
import { cerrarSesion } from "@/services/authService";
import { useRouter } from "vue-router";
const usuarios = ref([]);
const mensajes = ref({});
const usuario = JSON.parse(localStorage.getItem('usuario'));
let interval = null;
const nombreChat = ref({
    nombre: null,
    imagen_perfil: null
});
const formulario = ref({
    mensaje: '',
    destino_id: null
});
const chatsRecientes = ref([]);
const listar = async () => {
    try {
        const { data } = await listarUsuarios();
        usuarios.value = data.datos.data;
    } catch (error) {
        console.log(error);
    }
}
const ultimosChats = async () => {
    try {
        const { data } = await ultimosMensajes();
        chatsRecientes.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const viewChat = async (param = null, nombre, imagen) => {
    try {
        if (param != null) {
            const { data } = await vistaChatCliente(param);
            mensajes.value = data.datos;
            formulario.value.destino_id = param;
            nombreChat.value.nombre = nombre;
            nombreChat.value.imagen = imagen;
        }
    } catch (error) {
        console.log(error);
    }
}
const enviarMensaje = async () => {
    try {
        const { data } = await sendMessage(formulario.value);
        formulario.value.mensaje = '';
        viewChat(formulario.value.destino_id, nombreChat.value.nombre, nombreChat.value.imagen);
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
    ultimosChats();    
    interval = setInterval( ()=> viewChat(formulario.value.destino_id, nombreChat.value.nombre, nombreChat.value.imagen), 15000);
})
onBeforeUnmount(() => {
    clearInterval(interval);
});
const router = useRouter();
const logout = async () => {
        try {
            const { data } = await cerrarSesion();
            localStorage.clear();
            router.push({path: '/login'});
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
.margen-reducido {
    margin: 0;
    font-size: 12px;
}

.puntero {
    cursor: pointer;
}
</style>