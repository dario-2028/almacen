const { createApp } = Vue;

createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            correo: "",
            telefono: "",
            url: 'http://127.0.0.1:5000/clientes',
        };
    },
    methods: {
        grabar() {
            let cliente = {
                nombre: this.nombre,
                correo: this.correo,
                telefono: this.telefono,
            };

            var options = {
                body: JSON.stringify(cliente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };

            axios.post(this.url, cliente)
                .then(() => {
                    alert("Registro grabado");
                    window.location.href = "./clientes.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        }
    },
}).mount('#app');
