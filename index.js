//Elementos html
const botonEmpezar = document.getElementById("empezar");
const barraProgreso = document.querySelector("#barraProgreso div");
const correctasElement = document.querySelector("#correctas span");
const incorrectasElement = document.querySelector("#incorrectas span");
const ppmElement = document.querySelector("#ppm span");
const final = document.querySelector("#final");
const botonReiniciar = document.querySelector("#final button");
const palabraContainer = document.getElementById("palabraActual");
const input = document.querySelector("input");
let jugando = false;

//Variables
const tiempoJuego = 60;
let letrasCorrectas;
let letrasIncorrectas;
let palabrasTerminadas;
let listaLetras = [];
let indiceActual;

//Funciones
function empezar(){
	jugando=true;
	palabraContainer.classList.toggle("escondido",false)
	nuevaPalabra();
	letrasCorrectas = 0;
	letrasIncorrectas = 0;
	palabrasTerminadas = 0;
	final.classList.toggle("escondido",true);
	listaLetras[0].classList.toggle("letraActual")
	barraProgreso.classList.toggle("completarTiempo",true);
	botonEmpezar.classList.toggle("escondido",true);
}

function nuevaPalabra(){
	if(listaLetras.length > 0) listaLetras.forEach(letra => palabraContainer.removeChild(letra))
	const nPalabraElegida = Math.floor(Math.random()*palabrasArray.length);
	const palabraElegida = palabrasArray[nPalabraElegida];
	listaLetras = []
	indiceActual = 0;
	for (let i = 0; i < palabraElegida.length; i++) {
		const letraElement = document.createElement("span");
		letraElement.textContent = palabraElegida[i];
		palabraContainer.appendChild(letraElement);
		listaLetras.push(letraElement);
	}
}

function crearLetraEfecto(element){
	element.classList.toggle("invisible",true)
	const letra = element.textContent;
	const posicionLetra = element.getBoundingClientRect();
	const nuevaLetra = document.createElement("span");
	nuevaLetra.style = `
		left: ${posicionLetra.left}px;
		top: ${posicionLetra.top}px;
	`
	nuevaLetra.classList.add("desaparecer");
	nuevaLetra.textContent = letra;
	document.body.appendChild(nuevaLetra);
}



//Eventos
botonEmpezar.addEventListener("click",()=> empezar())
botonReiniciar.addEventListener("click",()=>empezar())

barraProgreso.addEventListener("animationend", ()=>{
	jugando=false;
	final.classList.toggle("escondido",false)
	barraProgreso.classList.toggle("completarTiempo",false);
	correctasElement.textContent = letrasCorrectas;
	incorrectasElement.textContent = letrasIncorrectas;
	ppmElement.textContent = palabrasTerminadas*(60/tiempoJuego);
	palabraContainer.classList.toggle("escondido",true)
})





//Ejecución
input.focus();
document.documentElement.style.setProperty("--tiempo", tiempoJuego+"s");
//nuevaPalabra()

input.addEventListener("input",(event) => {
	// console.log(event, listaLetras[indiceActual])

	if(!jugando){
		if(event.data === " ") empezar();
		return
	}

	if(event.data === listaLetras[indiceActual].textContent){
		// console.log("LETRA CORRECTA"),
		crearLetraEfecto(listaLetras[indiceActual])
		indiceActual++;
		letrasCorrectas++
		if(indiceActual === listaLetras.length){
			nuevaPalabra();
			palabrasTerminadas++;
		}
		listaLetras[indiceActual].classList.toggle("letraActual")
	}	
	else{
		letrasIncorrectas++;
		//marcar que hubo un error
	}
	
	

})
input.addEventListener("blur",() => input.focus());