const { createApp } = Vue;

createApp({
    data() {
        return {
            clientes: [],
            url: 'http://localhost:5000/clientes',
            error: false,
            cargando: true,
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.clientes = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error('Error al obtener datos:', err);
                    this.error = true;
                });
        },
        eliminar(cliente) {
            const url = this.url + '/' + cliente;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    // Actualiza la lista de clientes después de eliminar
                    this.clientes = this.clientes.filter(c => c.id !== cliente);
                })
                .catch(error => {
                    console.error('Error al eliminar el cliente:', error);
                });
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');


