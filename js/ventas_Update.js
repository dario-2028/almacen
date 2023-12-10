document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            id: 1,
            nombre: '',
            correo: '',
            telefono: ''
        },
        methods: {
            modificar: function () {
                const data = {
                    id: this.id,
                    nombre: this.nombre,
                    correo: this.correo,
                    telefono: this.telefono
                };

                // Realizar la solicitud de actualización usando Axios
                axios.put('http://127.0.0.1:5000/clientes/' + this.id, data)
                    .then(response => {
                        // Manejar la respuesta del servidor
                        console.log('Respuesta del servidor:', response.data);
                        // Puedes realizar otras acciones después de la actualización
                    })
                    .catch(error => {
                        // Manejar errores de la solicitud
                        console.error('Error al enviar la solicitud al servidor:', error);
                    });
            }
        }
    });
});

// Manejar el evento de envío del formulario
const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los valores del formulario
    const productoId = productoSelect.value;
    const cantidad = cantidadInput.value;

    // Validar los campos del formulario
    if (!productoId || !cantidad || cantidad <= 0) {
        // Mostrar un mensaje de error o realizar acciones correspondientes a la validación fallida
        console.error('Por favor, completa todos los campos y asegúrate de que la cantidad sea mayor que 0.');
        return;
    }

    // Aquí puedes realizar cualquier otra validación necesaria...

    // Procesar la venta (enviar datos al servidor, realizar acciones, etc.)
    realizarVenta(productoId, cantidad);

    // Limpiar el formulario después de procesar la venta
    form.reset();
});

// Función para realizar la venta
function realizarVenta(productoId, cantidad) {
    const data = {
        producto_id: productoId,
        cantidad: cantidad,
        fecha: new Date().toISOString() // Puedes ajustar cómo obtienes la fecha según tus necesidades
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

