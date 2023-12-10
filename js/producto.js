const { createApp } = Vue;

createApp({
    data() {
        return {
            productos: [],
            url: 'http://127.0.0.1:5000/productos',
            error: false,
            cargando: true,
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
        };
    },
    methods: {
        fetchData(url) {
            axios.get(url)
                .then(response => {
                    this.productos = response.data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = 'Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.';
                });
        },
        
        eliminar(producto) {
            const url = this.url + '/' + producto;
            axios.delete(url)
                .then(() => {
                    this.productos = this.productos.filter(p => p.id !== producto);
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al eliminar");
                });
        },
        
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
            };
            axios.post(this.url, producto)
                .then(() => {
                    alert("Registro grabado");
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar");
                });
        },
        getImagenUrl(imagen) {
            return `/app/static/img/${imagen}`;
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
