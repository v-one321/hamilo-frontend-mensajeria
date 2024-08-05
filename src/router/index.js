import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import Chat from '@/views/chat/Chat.vue'
import Principal from '@/views/pedidos/Principal.vue'
import AppLayout from '@/views/layout/AppLayout.vue'
import TerminarPedido from '@/views/pedidos/TerminarPedido.vue'
import PedidosLista from '@/views/pedidos/PedidosLista.vue'
import CajaFormulario from '@/views/caja/CajaFormulario.vue'
import Caja from '@/views/caja/Caja.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: Principal
        },
        {
          path: '/procesar-pago',
          component: TerminarPedido
        },
        {
          path: '/lista-pedidos',
          component: PedidosLista
        },
        {
          path: '/caja',
          component: Caja
        },
        {
          path: '/caja-formulario/:idCaja?',
          component: CajaFormulario
        },
        {
          path: '/chats',
          component: Chat
        },
      ]
    }
  ]
})

export default router
