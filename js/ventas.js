// Manejar el evento de envío del formulario
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

// Función para realizar la venta (puedes ajustar esto según tu lógica específica)
function realizarVenta(productoId, cantidad) {
    // Aquí puedes realizar una solicitud AJAX para enviar datos al servidor
    // o realizar acciones locales correspondientes a la venta
    console.log('Realizando venta con Producto ID:', productoId, 'Cantidad:', cantidad);

    // Puedes agregar más lógica aquí según tus necesidades
}
