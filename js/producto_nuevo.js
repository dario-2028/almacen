document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            nombre: '',
            precio: 0,
            stock: 0,
            imagen: ''
        },
        methods: {
            grabar: function () {
                // Aquí puedes realizar la lógica para enviar los datos al servidor
                let producto = {
                    nombre: this.nombre,
                    precio: this.precio,
                    stock: this.stock,
                    imagen: this.imagen
                };

                axios.post('http://127.0.0.1:5000/productos', producto)
                    .then(() => {
                        alert('Producto grabado exitosamente');
                        // Puedes redirigir a otra página después de grabar el producto
                        window.location.href = './productos.html';
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Error al grabar el producto');
                    });
            }
        }
    });
});
