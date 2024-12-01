# Salón de Juegos Retro - Es Tim

Bienvenido al proyecto **Es Tim**, una tienda en línea donde puedes explorar, comprar y jugar videojuegos retro. Diseñado con **HTML**, **CSS**, **JavaScript**, y utilizando **Bootstrap** para un diseño responsive, este proyecto incluye una variedad de funcionalidades que mejoran la experiencia de los usuarios.

## Características Principales

- **Autenticación de Usuarios**:
  - Registro e inicio de sesión para acceder a funcionalidades exclusivas como el carrito y los juegos comprados.
  - Verificación en tiempo real para garantizar que solo los usuarios autenticados accedan a ciertas páginas.

- **Gestión de Juegos**:
  - Visualización de juegos retro en tarjetas interactivas con detalles como género, descripción y precio.
  - Funcionalidad para agregar juegos al carrito y confirmar la compra.

- **Carrito de Compras**:
  - Contador dinámico que actualiza en tiempo real la cantidad de juegos en el carrito.
  - Resumen de compra con total acumulado y opciones para vaciar o confirmar la compra.

- **Perfil de Usuario**:
  - Sección donde el usuario puede actualizar su información personal y añadir saldo a su cuenta.
  - Visualización del saldo y listado de juegos comprados.

- **APIs Integradas**:
  - **Clima**: Muestra efectos visuales en la página, como sol, nubes o lluvia, según el estado del clima real o simulado.
  - **Simulación del Clima**: Los usuarios pueden alternar entre clima real y efectos simulados directamente en la interfaz.

- **Juegos Interactivos Integrados**:
  - Juegos simples como "Simón Dice", "Adivina el Número" y "Matemáticas" que los usuarios pueden jugar directamente desde la web.

## Nuevas Funcionalidades

1. **API del Clima**:
   - Obtiene el estado actual del clima y actualiza los efectos visuales en la página.
   - Alternativa para simular condiciones climáticas (sol, nubes, lluvia).

2. **Verificación y Métodos de Usuario**:
   - Métodos para verificar autenticación y garantizar que los usuarios solo puedan acceder a funciones específicas tras iniciar sesión.
   - Gestión avanzada de saldo y prevención de duplicados en compras.

3. **Manejo Avanzado del Carrito**:
   - Los juegos se guardan en `sessionStorage` y pueden ser editados, confirmados o eliminados.
   - Al confirmar una compra, los juegos se transfieren al perfil del usuario.

4. **Archivos Dinámicos de Juegos**:
   - Los juegos disponibles se cargan dinámicamente desde `localStorage`, permitiendo futuras actualizaciones o expansiones.

5. **Efectos Visuales Mejorados**:
   - Animaciones para sol, nubes y lluvia personalizadas, integradas al encabezado de la página.
   - Adaptación según el horario (día/noche).

## Estructura de Archivos

### Páginas Principales

- **`index.html`**: Página de inicio que muestra los juegos disponibles y efectos climáticos.
- **`registro.html`**: Registro para nuevos usuarios.
- **`carrito.html`**: Gestión de juegos añadidos al carrito.
- **`misJuegos.html`**: Listado de juegos comprados por el usuario.
- **`datosPersonales.html`**: Perfil de usuario para edición de datos y saldo.

### Scripts

- **`auth.js`**: Maneja la autenticación y verificación de usuarios.
- **`carrito.js`**: Lógica para añadir, eliminar, vaciar y confirmar juegos en el carrito.
- **`misJuegos.js`**: Renderiza los juegos comprados por el usuario.
- **`clima.js`**: Integra la API del clima y gestiona los efectos visuales (sol, nubes, lluvia).
- **`inicializacion.js`**: Carga los datos iniciales en `localStorage` para usuarios y juegos.
- **`usuario.js`**: Modela los métodos y atributos del usuario (saldo, juegos comprados).
- **`juegos.js`**: Define los atributos de los juegos disponibles.
- **`script.js`**: Funciones generales para la tienda.

## Modelos de Clases

- **`Usuarios.js`**: Define la estructura del usuario y métodos para gestionar saldo, información y juegos comprados.
- **`Login.js`**: Modelo para la gestión de datos de inicio de sesión.
- **`Juegos.js`**: Modelo para los juegos, gestionando atributos como nombre, descripción, género, precio, y métodos para obtener información.

## Cómo Usar

1. **Inicio**:
   - Abre `index.html` en tu navegador para acceder a la tienda.
   - Navega por los juegos disponibles y revisa los efectos climáticos en tiempo real.

2. **Registro e Inicio de Sesión**:
   - Crea una cuenta en `registro.html` e inicia sesión para acceder a tu perfil, carrito y juegos comprados.

3. **Explorar y Comprar**:
   - Agrega juegos al carrito, verifica el total y confirma tu compra si tienes saldo suficiente.
   - Los juegos comprados se trasladan automáticamente a tu perfil en `misJuegos.html`.

4. **Jugar y Disfrutar**:
   - Haz clic en "Jugar" desde tu lista de juegos comprados para disfrutar de tus juegos favoritos directamente desde la web.

## Estructura Modular

Este proyecto sigue una arquitectura modular para facilitar su mantenimiento y expansión. Cada funcionalidad principal tiene su propio archivo, asegurando una separación clara de responsabilidades y simplificando futuras integraciones.

---

¡Explora la tienda, juega, y disfruta del mundo retro! 🎮
