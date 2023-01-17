//Referencias a elementos
const palabras = palabrasArray;
const palabraContainer = document.getElementById("palabraActual");
const palabraAnteriorContainer = document.getElementById("palabraAnterior");
const input = document.querySelector("input");
const correctasElement = document.querySelector("#correctas span");
const incorrectasElement = document.querySelector("#incorrectas span");
const ppmElement = document.querySelector("#ppm span");
const empezarBoton = document.getElementById("empezar");
const barraProgreso = document.querySelector("#barraProgreso div");
const finalContainer = document.getElementById("final");

//Otras variables
let listaLetras;
let indiceActual = 0;
let letrasCorrectas;
let letrasIncorrectas;
let palabrasTerminadas;
let ppm;
let jugando = false;
const tiempoJuego = 60;
document.documentElement.style.setProperty("--tiempo",tiempoJuego+'s');

//Funciones
function nuevaPalabra(){
	indiceActual = 0;
	const	nPalabraElegida = Math.floor(Math.random()*(palabras.length-1));
	const	palabraElegida = palabras[nPalabraElegida];
	//console.log(palabraElegida)
	//Borro la palabraActual y creo los elementos de la nueva
	borrarHijos(palabraContainer)
	listaLetras = [];
	for (let i = 0; i < palabraElegida.length; i++) {
		const letraElement = document.createElement("span");
		letraElement.textContent = palabraElegida[i];
		letraElement.classList.add("aparecer");
		palabraContainer.appendChild(letraElement);
		listaLetras.push(letraElement);
		letraElement.addEventListener("animationend", ()=>{
			letraElement.classList.toggle("aparecer",false);
		})
	}
}

function empezar(){
	jugando = true;
	empezarBoton.classList.toggle("escondido",true);
	palabraContainer.classList.toggle("escondido",false);
	reset();
	nuevaPalabra();
	barraProgreso.classList.toggle("completarTiempo",true);
	finalContainer.classList.toggle("escondido",true);
	listaLetras[0].classList.add("letraActual")
}

function terminar(){
	jugando = false;
	palabraContainer.classList.toggle("escondido",true);
	finalContainer.classList.toggle("escondido",false);
	barraProgreso.classList.toggle("completarTiempo",false);
	ppm = palabrasTerminadas*(60/tiempoJuego);
	ppmElement.textContent = ppm;
}

function reset(){
	letrasCorrectas = 0;
	letrasIncorrectas = 0;
	ppm = 0;
	palabrasTerminadas = 0;
	correctasElement.textContent = letrasCorrectas;
	incorrectasElement.textContent = letrasIncorrectas;
}

function borrarHijos(element){
	Array.from(element.children).forEach(child => element.removeChild(child))
}

function crearLetraEfecto(element){
	const letra = element.textContent;
	const posicionLetra = element.getBoundingClientRect();
	element.classList.add("invisible");
	const nuevaLetra = document.createElement("span");
	nuevaLetra.textContent=letra;
	nuevaLetra.style = `
		--top: ${posicionLetra.top}px;
		--left: ${posicionLetra.left}px;
	`
	nuevaLetra.classList.add("desaparecer");
	document.body.appendChild(nuevaLetra);
	nuevaLetra.addEventListener("animationend", ()=>{
		document.body.removeChild(nuevaLetra);
	})
}

// Eventos
barraProgreso.addEventListener("animationend", ()=>{
	terminar();
})
document.getElementById("empezar").addEventListener("click", ()=> empezar());
input.addEventListener("input",(event)=>{
	//console.log(event)
	if(!jugando){
		if(event.data === " ") empezar();
		return;
	} 
	if(listaLetras[indiceActual].textContent === event.data){
		//console.log("Letra correcta", listaLetras[indiceActual].textContent);
		crearLetraEfecto(listaLetras[indiceActual])
		indiceActual++;
		letrasCorrectas++
		correctasElement.textContent = letrasCorrectas;
		if(indiceActual === listaLetras.length) {
			nuevaPalabra()
			palabrasTerminadas++;
		};
		listaLetras[indiceActual].classList.add("letraActual")
	}
	else{
		letrasIncorrectas++
		incorrectasElement.textContent = letrasIncorrectas;
	}
});
input.addEventListener("blur",()=> input.focus())

//Ejecución
input.focus();