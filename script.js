const tablero = document.getElementById('tablero');  
let piezas = [  
    //blancas
    { tipo: 'torre', color: 'blanco', posicion: 'a1' },  
    { tipo: 'caballo', color: 'blanco', posicion: 'b1' },
    { tipo: 'alfil', color: 'blanco', posicion: 'c1' },
    { tipo: 'reina', color: 'blanco', posicion: 'd1' },
    { tipo: 'rey', color: 'blanco', posicion: 'e1' },
    { tipo: 'alfil', color: 'blanco', posicion: 'f1' },
    { tipo: 'caballo', color: 'blanco', posicion: 'g1' },
    { tipo: 'torre', color: 'blanco', posicion: 'h1' },
    { tipo: 'peon', color: 'blanco', posicion: 'a2' },
    { tipo: 'peon', color: 'blanco', posicion: 'b2' },
    { tipo: 'peon', color: 'blanco', posicion: 'c2' },
    { tipo: 'peon', color: 'blanco', posicion: 'd2' },
    { tipo: 'peon', color: 'blanco', posicion: 'e2' },
    { tipo: 'peon', color: 'blanco', posicion: 'f2' },
    { tipo: 'peon', color: 'blanco', posicion: 'g2' },
    { tipo: 'peon', color: 'blanco', posicion: 'h2' },
    //negras
    { tipo: 'torre', color: 'negro', posicion: 'a8' },  
    { tipo: 'caballo', color: 'negro', posicion: 'b8' },
    { tipo: 'alfil', color: 'negro', posicion: 'c8' },
    { tipo: 'reina', color: 'negro', posicion: 'd8' },
    { tipo: 'rey', color: 'negro', posicion: 'e8' },
    { tipo: 'alfil', color: 'negro', posicion: 'f8' },
    { tipo: 'caballo', color: 'negro', posicion: 'g8' },
    { tipo: 'torre', color: 'negro', posicion: 'h8' },
    { tipo: 'peon', color: 'negro', posicion: 'a7' },
    { tipo: 'peon', color: 'negro', posicion: 'b7' },
    { tipo: 'peon', color: 'negro', posicion: 'c7' },
    { tipo: 'peon', color: 'negro', posicion: 'd7' },
    { tipo: 'peon', color: 'negro', posicion: 'e7' },
    { tipo: 'peon', color: 'negro', posicion: 'f7' },
    { tipo: 'peon', color: 'negro', posicion: 'g7' },
    { tipo: 'peon', color: 'negro', posicion: 'h7' },

];  

function crearTablero() {  
    for (let i = 0; i < 8; i++) {  
        for (let j = 0; j < 8; j++) {  
            const casilla = document.createElement('div');  
            casilla.className = 'casilla ' + ((i + j) % 2 === 0 ? 'blanco' : 'negro');  
            casilla.dataset.posicion = String.fromCharCode(97 + j) + (8 - i);  
            casilla.addEventListener('click', moverPieza);  
            tablero.appendChild(casilla);  
        }  
    }  
    dibujarPiezas();  
}  

function dibujarPiezas() {  
    piezas.forEach(pieza => {  
        const casilla = document.querySelector(`[data-posicion="${pieza.posicion}"]`);  
        const img = document.createElement('img');  
        img.src = `${pieza.tipo}_${pieza.color}.gif`; // imágenes de piezas
        img.className = 'pieza';  
        img.dataset.tipo = pieza.tipo;  
        img.dataset.color = pieza.color;  
        casilla.appendChild(img);  
    });  
}  

function moverPieza(event) {  
    const casillaDestino = event.currentTarget;  
    const piezaSeleccionada = document.querySelector('.pieza.seleccionada');  

    if (piezaSeleccionada) {  
        const piezaCapturada = casillaDestino.querySelector('.pieza');  
        if (piezaCapturada && piezaCapturada.dataset.color !== piezaSeleccionada.dataset.color) {  
            // Captura la pieza, moverla a la zona de capturadas  
            const piezaCapturadaTipo = piezaCapturada.dataset.tipo;  
            const piezaCapturadaColor = piezaCapturada.dataset.color;  

            // Eliminar la pieza capturada del tablero  
            piezaCapturada.parentElement.removeChild(piezaCapturada);  

            // Agregar la pieza capturada a la zona de capturadas  
            const imgCapturada = document.createElement('img');  
            imgCapturada.src = `${piezaCapturadaTipo}_${piezaCapturadaColor}.gif`;  
            imgCapturada.className = 'capturada';  
            zonaCapturadas.appendChild(imgCapturada);  
        }  

        // Mover la pieza que captura a la casilla de la pieza capturada  
        casillaDestino.appendChild(piezaSeleccionada);  
        piezaSeleccionada.classList.remove('seleccionada');  

        // Lógica de promoción de peón  
        if (piezaSeleccionada.dataset.tipo === 'peon' &&   
            (casillaDestino.dataset.posicion[1] === '8' || casillaDestino.dataset.posicion[1] === '1')) {  
            const nuevaPieza = prompt("¿Qué pieza deseas? (reina, torre, alfil, caballo)");  
            piezaSeleccionada.src = `${nuevaPieza}_${piezaSeleccionada.dataset.color}.gif`;  
            piezaSeleccionada.dataset.tipo = nuevaPieza;  
        }  

        // Lógica de enroque  
        if (piezaSeleccionada.dataset.tipo === 'rey' &&  
            Math.abs(casillaDestino.dataset.posicion.charCodeAt(0) - piezaSeleccionada.parentElement.dataset.posicion.charCodeAt(0)) > 2) {  
            const torrePosicion = piezaSeleccionada.dataset.color === 'blanco' ? 'h1' : 'h8'; // Cambia según el color  
            const torre = document.querySelector(`[data-posicion="${torrePosicion}"] .pieza`);  
            if (torre) {  
                const nuevaPosicion = String.fromCharCode(casillaDestino.dataset.posicion.charCodeAt(0) - 1) + casillaDestino.dataset.posicion[1];  
                torre.parentElement.removeChild(torre);  
                const nuevaCasilla = document.querySelector(`[data-posicion="${nuevaPosicion}"]`);  
                nuevaCasilla.appendChild(torre);  
            }  
        }  
    } else {  
        const pieza = casillaDestino.querySelector('.pieza');  
        if (pieza) {  
            pieza.classList.add('seleccionada');  
        }  
    }  
}  



crearTablero();