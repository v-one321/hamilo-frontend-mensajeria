import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
/*import '../public/plantilla_admin/dist/css/adminlte.min.css'
import '../public/plantilla_admin/plugins/jquery/jquery.min.js'
import '../public/plantilla_admin/plugins/bootstrap/js/bootstrap.bundle.min.js'
import '../public/plantilla_admin/dist/js/adminlte.min.js'*/
import 'sweetalert2/dist/sweetalert2.min.css'
import VueTheMask from 'vue-the-mask';
import '@/assets/style.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTheMask);
app.mount('#app')
