<template>
    <div class="d-flex flex-column min-vh-100">
        <header>
            <div class="px-3 py-2 text-bg-dark">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <RouterLink  class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" to="/">
                            <i class="fas fa-pager fs-3 me-3"></i>
                            <span class="fs-4">Simple header</span>
                        </RouterLink>
                        <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                <RouterLink class="nav-link text-white text-center" to="/chats">
                                    <i class="fas fa-message bi d-block mx-auto mb-1 fs-4"></i>
                                    Chat
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink class="nav-link text-white text-center" to="/caja">
                                    <i class="fas fa-desktop bi d-block mx-auto mb-1 fs-4"></i>
                                    Caja
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink class="nav-link text-white text-center" to="/">
                                    <i class="fas fa-table bi d-block mx-auto mb-1 fs-4"></i>
                                    Productos
                                </RouterLink>
                            </li>
                            <li class="position-relative">
                                <RouterLink class="nav-link text-white text-center" to="/procesar-pago">
                                    <i class="fas fa-shopping-cart bi d-block mx-auto mb-1 fs-4"></i>
                                    <span class="badge badge-pill bg-danger position-absolute">{{
                                        productoStore.carrito.length }}</span>
                                    Carrito
                                </RouterLink>
                            </li>
                            <li class=" d-flex align-items-center">
                                <div class="dropdown">
                                    <a href="#" class="d-block link-body-emphasis text-decoration-none"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="mdo" width="45" height="45"
                                            class="rounded-circle">
                                        <i class="fas fa-sort-down text-white ms-1"></i>
                                    </a>
                                    <ul class="dropdown-menu text-small">
                                        <!--<li><a class="dropdown-item" href="#">New project...</a></li>
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Profile</a></li>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>-->
                                        <li><button type="button" class="dropdown-item" @click="logout()">Cerrar Sesion</button></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <main class="flex-grow-1">
            <RouterView />
        </main>
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
            </ul>
            <p class="text-center text-body-secondary">&copy; 2024 Company, Inc</p>
        </footer>
    </div>
</template>
<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router';
import { useProductoStore } from '@/stores/productos';
import { cerrarSesion } from '@/services/authService';
const router = useRouter();
const productoStore = useProductoStore();
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
.position-relative .badge {
    top: -5px;
    right: 0px;
}
.min-vh-100 {
    min-height: 100vh;
}
.flex-grow-1 {
    flex-grow: 1;
}
</style>