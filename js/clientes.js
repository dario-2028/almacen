const { createApp } = Vue;

createApp({
    data() {
        return {
            clientes: [],
            url: 'http://127.0.0.1:5000/clientes',
            error: false,
            cargando: true,
        };
    },
    methods: {
        fetchData(url) {
            axios.get(url)
                .then(response => {
                    this.clientes = response.data;
                    this.cargando = false;
                })
                .catch(error => {
                    console.error('Error al obtener datos:', error);
                    this.error = true;
                });
        },
        eliminar(cliente) {
            const url = `${this.url}/${cliente}`;
            axios.delete(url)
                .then(() => {
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


