<template>
    <div class="container mt-5">
        <div class="card border-0 shadow">
            <div class="card-header border-0">
                <h4 class="card-title" style="color:#5000ab;"><i class="fas fa-list me-2"></i>Lista de pedidos finalizados</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in datos" :key="item.id">
                                <td>{{ item.pago.nombre }}</td>
                                <td class="text-end">{{ item.total }}</td>
                                <td class="text-center">
                                    <button class="btn btn-warning btn-sm"><i class="fas fa-eye"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { index } from '@/services/pedidosService';
import { onMounted, ref } from 'vue';
const datos = ref();
const listar = async() => {
    try {
        const { data } = await index();
        datos.value = data.datos.data;
        console.log(data.value);
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
})
</script>
<style></style>