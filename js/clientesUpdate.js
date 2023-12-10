document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            id: 1,  // Puedes inicializar con los valores correspondientes
            nombre: '',
            correo: '',
            telefono: ''
        },
        methods: {
            fetchData() {
                const url = `http://127.0.0.1:5000/clientes/${this.id}`;
                axios.get(url)
                    .then(response => {
                        const data = response.data;
                        this.nombre = data.nombre;
                        this.correo = data.correo;
                        this.telefono = data.telefono;
                    })
                    .catch(error => {
                        console.error(error);
                        // Manejar el error según tus necesidades
                    });
            },
            modificar() {
                const cliente = {
                    id: this.id,
                    nombre: this.nombre,
                    correo: this.correo,
                    telefono: this.telefono
                };

                const url = `http://127.0.0.1:5000/clientes/${this.id}`;
                axios.put(url, cliente)
                    .then(() => {
                        alert("Registro modificado");
                        // Puedes redirigir o hacer otras acciones después de la modificación
                    })
                    .catch(error => {
                        console.error(error);
                        alert("Error al Modificar");
                    });
            }
        },
        created() {
            this.fetchData();
        }
    });
});
