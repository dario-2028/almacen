from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Crea una instancia de la clase Flask con el nombre de la aplicación
app = Flask(__name__)
# Configura CORS para permitir el acceso desde el frontend al backend
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:@localhost/proyecto"
# Configura el seguimiento de modificaciones de SQLAlchemy a False para mejorar el rendimiento
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Crea una instancia de la clase SQLAlchemy y la asigna al objeto db para interactuar con la base de datos
db = SQLAlchemy(app)
# Crea una instancia de la clase Marshmallow y la asigna al objeto ma para trabajar con serialización y deserialización de datos
ma = Marshmallow(app)

# Definición de la clase Producto
class Producto(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))

    def __init__(self, nombre, precio, stock, imagen):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen

# Definición de la clase Ventas
class Ventas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable=False)
    cantidad = db.Column(db.Integer)
    fecha = db.Column(db.Date)

    def __init__(self, producto_id, cantidad, fecha):
        self.producto_id = producto_id
        self.cantidad = cantidad
        self.fecha = fecha

# Definición de la clase Clientes
class Clientes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    correo = db.Column(db.String(100))
    telefono = db.Column(db.String(15))

    def __init__(self, nombre, correo, telefono):
        self.nombre = nombre
        self.correo = correo
        self.telefono = telefono

# Creación de todas las tablas en la base de datos
with app.app_context():
    db.create_all()

# Definición del esquema para la clase Producto
class ProductoSchema(ma.Schema):
    class Meta:
        fields = ("id", "nombre", "precio", "stock", "imagen")

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

# Definición del esquema para la clase Ventas
class VentasSchema(ma.Schema):
    class Meta:
        fields = ("id", "producto_id", "cantidad", "fecha")

ventas_schema = VentasSchema()
ventas_schema_multi = VentasSchema(many=True)

# Definición del esquema para la clase Clientes
class ClientesSchema(ma.Schema):
    class Meta:
        fields = ("id", "nombre", "correo", "telefono")

clientes_schema = ClientesSchema()
clientes_schema_multi = ClientesSchema(many=True)

# Rutas y funciones para la clase Producto
@app.route("/productos", methods=["GET"])
def get_productos():
    all_productos = Producto.query.all()
    result = productos_schema.dump(all_productos)
    return jsonify(result)

@app.route("/productos/<id>", methods=["GET"])
def get_producto(id):
    producto = Producto.query.get(id)
    return producto_schema.jsonify(producto)

@app.route("/productos/<id>", methods=["DELETE"])
def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route("/productos", methods=["POST"])
def create_producto():
    nombre = request.json["nombre"]
    precio = request.json["precio"]
    stock = request.json["stock"]
    imagen = request.json["imagen"]
    new_producto = Producto(nombre, precio, stock, imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@app.route("/productos/<id>", methods=["PUT"])
def update_producto(id):
    producto = Producto.query.get(id)
    producto.nombre = request.json["nombre"]
    producto.precio = request.json["precio"]
    producto.stock = request.json["stock"]
    producto.imagen = request.json["imagen"]
    db.session.commit()
    return producto_schema.jsonify(producto)

# Rutas y funciones para la clase Ventas
@app.route("/ventas", methods=["GET"])
def get_ventas():
    all_ventas = Ventas.query.all()
    result = ventas_schema_multi.dump(all_ventas)
    return jsonify(result)

@app.route("/ventas/<id>", methods=["GET"])
def get_venta(id):
    venta = Ventas.query.get(id)
    return ventas_schema.jsonify(venta)

@app.route("/ventas/<id>", methods=["DELETE"])
def delete_venta(id):
    venta = Ventas.query.get(id)
    db.session.delete(venta)
    db.session.commit()
    return ventas_schema.jsonify(venta)

@app.route("/ventas", methods=["POST"])
def create_venta():
    producto_id = request.json["producto_id"]
    cantidad = request.json["cantidad"]
    fecha = request.json["fecha"]
    new_venta = Ventas(producto_id, cantidad, fecha)
    db.session.add(new_venta)
    db.session.commit()
    return ventas_schema.jsonify(new_venta)

@app.route("/ventas/<id>", methods=["PUT"])
def update_venta(id):
    venta = Ventas.query.get(id)
    venta.producto_id = request.json["producto_id"]
    venta.cantidad = request.json["cantidad"]
    venta.fecha = request.json["fecha"]
    db.session.commit()
    return ventas_schema.jsonify(venta)

# Rutas y funciones para la clase Clientes
@app.route("/clientes", methods=["GET"])
def get_clientes():
    all_clientes = Clientes.query.all()
    result = clientes_schema_multi.dump(all_clientes)
    return jsonify(result)

@app.route("/clientes/<id>", methods=["GET"])
def get_cliente(id):
    cliente = Clientes.query.get(id)
    if cliente:
        return clientes_schema.jsonify(cliente)
    else:
        return jsonify({"message": "Cliente no encontrado"}), 404

@app.route("/clientes/<id>", methods=["DELETE"])
def delete_cliente(id):
    cliente = Clientes.query.get(id)
    db.session.delete(cliente)
    db.session.commit()
    return clientes_schema.jsonify(cliente)

@app.route("/clientes", methods=["POST"])
def create_cliente():
    nombre = request.json["nombre"]
    correo = request.json["correo"]
    telefono = request.json["telefono"]
    new_cliente = Clientes(nombre, correo, telefono)
    db.session.add(new_cliente)
    db.session.commit()
    return clientes_schema.jsonify(new_cliente)

@app.route("/clientes/<id>", methods=["PUT"])
def update_cliente(id):
    cliente = Clientes.query.get(id)
    if cliente is None:
        return jsonify({"message": "Cliente no encontrado"}), 404
    cliente.nombre = request.json["nombre"]
    cliente.correo = request.json["correo"]
    cliente.telefono = request.json["telefono"]
    db.session.commit()
    return clientes_schema.jsonify(cliente)

# Programa Principal
if __name__ == "__main__":
    # Ejecuta el servidor Flask en el puerto 5000 en modo de depuración
    app.run(debug=True, port=5000)
