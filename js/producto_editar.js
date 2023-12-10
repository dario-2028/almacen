const { createApp } = Vue;

createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            url: 'http://127.0.0.1:5000/producto/' + this.getIdFromQueryString(),
        };
    },
    methods: {
        getIdFromQueryString() {
            return location.search.substr(4);
        },
        fetchData(url) {
            axios.get(url)
                .then(response => {
                    const data = response.data;
                    this.id = data.id;
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.stock = data.stock;
                    this.precio = data.precio;
                })
                .catch(error => {
                    console.error(error);
                    this.error = true;
                });
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
            };
            axios.put(this.url, producto)
                .then(() => {
                    alert("Registro modificado");
                    window.location.href = "./productos.html";
                })
                .catch(error => {
                    console.error(error);
                    alert("Error al Modificar");
                });
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
