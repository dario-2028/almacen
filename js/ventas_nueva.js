document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            producto_id: 1,  // Puedes inicializar con los valores correspondientes
            cantidad: 0,
            cliente: '',
            fecha: ''
        },
        methods: {
            grabar: function () {
                const data = {
                    producto_id: this.producto_id,
                    cantidad: this.cantidad,
                    cliente: this.cliente,
                    fecha: this.fecha
                };

                // Realizar la solicitud de venta usando Axios
                axios.post('http://127.0.0.1:5000/ventas', data)
                    .then(response => {
                        // Manejar la respuesta del servidor
                        console.log('Respuesta del servidor:', response.data);
                        // Puedes realizar otras acciones después de la venta
                    })
                    .catch(error => {
                        // Manejar errores de la solicitud
                        console.error('Error al enviar la solicitud al servidor:', error);
                    });
            }
        }
    });
});
