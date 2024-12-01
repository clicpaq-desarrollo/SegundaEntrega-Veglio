# Salón de Juegos Retro - Es Tim

Bienvenido al proyecto **Es Tim**, una tienda de juegos retro en línea donde los usuarios pueden registrarse, iniciar sesión, explorar una selección de juegos clásicos y realizar compras. Este programa está diseñado en **HTML**, **CSS**, y **JavaScript** y utiliza **Bootstrap** para el estilo y diseño responsive.

## Características Principales

- **Registro e Inicio de Sesión**: Los usuarios pueden crear una cuenta ingresando sus datos y luego iniciar sesión para acceder a funcionalidades exclusivas, como el carrito de compras y el perfil personal.
- **Selección de Juegos Retro**: Incluye juegos clásicos como "Piedra, Papel, Tijera", "Adivina el número" y "Matemáticas", entre otros.
- **Interfaz Interactiva**: Los usuarios pueden ver detalles de cada juego en tarjetas interactivas y añadir juegos a su carrito.
- **Gestión de Saldo**: Cada usuario cuenta con un saldo que puede ser utilizado para realizar compras de juegos. 
- **Carrito de Compras**: Los usuarios pueden agregar juegos al carrito, ver el total y confirmar su compra si cuentan con saldo suficiente.
- **Perfil de Usuario**: Se puede acceder a un perfil donde el usuario puede actualizar su información y saldo.

## Mejoras y Funcionalidades Futuras

- **Historial de Compras**: Se añadirá un historial de compras para que los usuarios puedan ver sus transacciones anteriores y detalles de las compras realizadas. 
- **Sistema de Puntaje**: Los usuarios podrán acumular puntos al realizar compras, los cuales podrán canjear en el futuro por beneficios adicionales. 
- **Estadísticas de Juego**: Cada juego permitirá a los usuarios ver y comparar sus puntajes o tiempos de juego, añadiendo un aspecto de competencia.

## Estructura de Archivos

- **index.html**: Página principal que muestra la tienda de juegos.
- **registro.html**: Página de registro para nuevos usuarios.
- **carrito.html**: Página donde los usuarios pueden ver los juegos agregados al carrito y confirmar su compra.
- **misJuegos.html**: Página que muestra la lista de juegos comprados, con acceso a cada juego.
- **datosPersonales.html**: Perfil del usuario donde pueden editar su información y agregar saldo.

### Scripts

- **auth.js**: Maneja el registro, inicio de sesión, verificación de autenticación y funciones de acceso restringido.
- **carrito.js**: Controla la lógica del carrito de compras, incluyendo el contador de juegos en el carrito, eliminar y vaciar el carrito, y confirmar la compra.
- **misJuegos.js**: Gestiona la visualización y el acceso a los juegos comprados por el usuario.
- **inicializacion.js**: Carga y configura los datos iniciales en `localStorage` para usuarios y juegos.
- **script.js**: Contiene funciones generales, como la generación de las tarjetas de juegos y el manejo de eventos.
- **usuario.js**: Permite al usuario modificar su perfil y saldo.

### Modelos de Clases

- **Usuarios.js**: Define la estructura del usuario, incluyendo métodos para gestionar su saldo, información personal y juegos comprados.
- **Login.js**: Modelo para la gestión de datos de inicio de sesión.
- **Juegos.js**: Modelo para los juegos, gestionando atributos como nombre, descripción, género, precio, y métodos para obtener su información.

## Cómo Usar

1. **Inicio**: Abre el archivo `index.html` en un navegador para acceder a la tienda de juegos.
2. **Registro e Inicio de Sesión**: Si eres nuevo, ve a la página de registro para crear una cuenta. Luego, inicia sesión para acceder a todas las funciones.
3. **Explorar y Agregar Juegos**: Explora los juegos en la tienda y agrégalos al carrito de compras.
4. **Carrito de Compras**: Visualiza y confirma tu compra si tienes saldo suficiente. También puedes eliminar juegos del carrito antes de confirmar.
5. **Perfil y Saldo**: Accede a tu perfil para agregar saldo y editar tus datos. Podrás usar el saldo para adquirir juegos.
