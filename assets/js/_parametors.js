//USUARIOS 
const usuario1 = new Usuario("Gonzalo", "Veglio", 20);
usuario1. setId(1);
usuario1.setLogin("gveglio", "pass1234");
usuario1.setDinero(10600);

const usuario2 = new Usuario("Maria", "Jimenez", 20);
usuario2. setId(2);
usuario2.setLogin("mjimenez", "pass1234");

const usuario3 = new Usuario("Pedro", "Perez", 20);
usuario3. setId(3);
usuario3.setLogin("pperez", "pass1234");

let coleccion_usuarios = [usuario1, usuario2, usuario3];


//Juegos
const juego1 = new Juego("Piedra, Papel, Tijera","Selecciona una de las opciones válidas.","10500", "Aventura","ppt2");
juego1. setId(1);
const juego2 = new Juego("Adivina el numero","El objetivo es adivinar un número entre 1 y 10 ","10500", "Aventura","adiv_num");
juego2. setId(2);
const juego3 = new Juego("Matematicas","Resuelve las operaciones matemáticas que se muestran.","10500", "Ingenio","numbers2");  
juego3. setId(3); 

let coleccion_juegos = new Array();
coleccion_juegos.push(juego1);
coleccion_juegos.push(juego2);
coleccion_juegos.push(juego3); 

console.log(coleccion_juegos);
console.log(coleccion_usuarios); 

