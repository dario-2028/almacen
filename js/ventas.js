document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            id: 1,
            producto_id: 1,
            cantidad: 0,
            fecha: ''
        },
        methods: {
            modificar: function () {
                // Obtener los datos del formulario
                const productoId = this.producto_id;
                const cantidad = this.cantidad;
                const fecha = this.fecha;

                // Validar los campos del formulario
                if (!productoId || cantidad <= 0 || !fecha) {
                    console.error('Por favor, completa todos los campos correctamente.');
                    return;
                }

                // Crear objeto con los datos a enviar al servidor
                const data = {
                    producto_id: productoId,
                    cantidad: cantidad,
                    fecha: fecha
                };

                // Enviar la solicitud al servidor utilizando Axios
                axios.put(`http://127.0.0.1:5000/ventas/${this.id}`, data)
                    .then(response => {
                        // Manejar la respuesta del servidor
                        console.log('Respuesta del servidor:', response.data);
                    })
                    .catch(error => {
                        // Manejar errores de la solicitud
                        console.error('Error al enviar la solicitud al servidor:', error);
                    });
            }
        }
    });
});

