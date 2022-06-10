var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var alturaPaleta = 30;
var anchoPaleta = 90;
var radio_pelota = 10;
var paleta_en_x = (canvas.width - anchoPaleta) / 2;
var flecha_der_presionada = false;
var flecha_izq_presionada = false;
var puntaje = 0;
var vidas = 3;
var probabilidad_pelota_mala = 3; //Mientras mas chico mas probable a que te toque una mala
var tiempo_para_pelota_nueva = 2000;
var count_para_pelota_nueva = 0;
var rapidez_pelotas = 1;
var pelotas = [];
var musica = false;
var color = "#ee6e73";

if (localStorage.getItem("color") == "Rojo") {
  color = "#ee6e73";
}
else if (localStorage.getItem("color") == "Verde") {
  color = "#2e7d32";
}
else if (localStorage.getItem("color") == "Azul") {
  color = "#0277bd";
}

document.addEventListener("keydown", key_presionada, false);
document.addEventListener("keyup", key_soltada, false);
document.addEventListener("mousemove", movimiento_mouse, false);

/*
* Funcion que devuelve un numero aleatorio segun el rango establecido
* @method random
* @param {int} min - Extremo minimo del rango
* @param {int} max - Extremo maximo del rango
* @return Numero aleatorio segun el rango establecido
*/
function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/*
* Cambia los booleanos cuando una flecha esta presionada para mover la paleta
* @method key_presionada
* @param {Event} e - Evento de la key presionada
* @return null
*/
function key_presionada(e) {
  if (e.keyCode == 39) {
    flecha_der_presionada = true;
  }
  else if (e.keyCode == 37) {
    flecha_izq_presionada = true;
  }
}
/*
* Cambia los booleanos cuando se suelta una flecha para dejar de mover la paleta
* @method key_soltada
* @param {Event} e - Evento de la key soltada
* @return null
*/
function key_soltada(e) {
  if (e.keyCode == 39) {
    flecha_der_presionada = false;
  }
  else if (e.keyCode == 37) {
    flecha_izq_presionada = false;
  }
}
/*
* Detecta el movimiento del mouse y mueve la paleta con respecto al mismo
* @method movimiento_mouse
* @param {Event} e - Evento del movimiento del mouse
* @return null
*/
function movimiento_mouse(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paleta_en_x = relativeX - anchoPaleta / 2;
  }
/*
  if (!musica){
    if (localStorage.getItem("mute_volume")) {
      music_player.src = "media/song.mp3";
      music_player.load();
      music_player.play();
    }
    musica = true;
  }
*/
}

/*
* Mueve la paleta segun las flechas presionadas
* @method movimiento_flechas
* @return null
*/
function movimiento_flechas() {
  if (flecha_der_presionada && paleta_en_x < canvas.width - anchoPaleta) {
    paleta_en_x += 7;
  }
  else if (flecha_izq_presionada && paleta_en_x > 0) {
    paleta_en_x -= 7;
  }
}

/*
* Dibuja la paleta
* @method paleta
* @return null
*/
function paleta() {
  ctx.beginPath();
  ctx.rect(paleta_en_x, canvas.height - alturaPaleta, anchoPaleta, alturaPaleta);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

/*
* Agrega una nueva pelota al vector pelotas
* con coordenadas x random y decide si va a ser buena o mala
* @method pelota_nueva
* @return null
*/
function pelota_nueva() {
  pelotas.push({ x: random(10, canvas.width - 10), y: -5, mala: random(0, probabilidad_pelota_mala) });
}

/*
* Dibuja las pelotas segun el vector pelotas
* @method dibujar_pelotas
* @return null
*/
function dibujar_pelotas() {
  for (let i = 0; i < pelotas.length; i++) {
    pelotas[i].y += rapidez_pelotas;
    ctx.beginPath();
    ctx.arc(pelotas[i].x, pelotas[i].y, radio_pelota, 0, Math.PI * 2);
    if (pelotas[i].mala == 0) {
      ctx.fillStyle = "#000000";;
    }
    else {
      ctx.fillStyle = color;
    }

    ctx.fill();
    ctx.closePath();
  }
}

/*
* Detecta las colisiones de las pelotas tanto con la paleta como con el piso
* y actua en consecuencia sumando puntos o restando vidas
* @method detectar_colisiones
* @return null
*/
function detectar_colisiones() {
  for (let i = 0; i < pelotas.length; i++) {
    //Si esta a la altura de la paleta
    if (pelotas[i].y > canvas.height - alturaPaleta) {
      //Si esta en el rango de la paleta en x
      if (pelotas[i].x > paleta_en_x && pelotas[i].x < paleta_en_x + anchoPaleta) {
        //Si es mala
        if (pelotas[i].mala == 0) {
          vidas--;
          if (vidas == 0) {
            alert("GAME OVER");
            document.location.reload();
          }
        }
        //Si es buena
        else {
          puntaje++;
        }

        pelotas.shift();
      }
    }
    //Pelota perdida (Si esta a la altura del piso)
    if (pelotas[i].y > canvas.height) {
      //Si es mala
      if (pelotas[i].mala != 0) {
        vidas--;
        if (vidas == 0) {
          alert("GAME OVER");
          document.location.reload();
        }
      }
      pelotas.shift();

    }
  }
}

/*
* Dibuja el puntaje obtenido al lado del nombre del jugador
* @method dibujar_puntaje
* @return null
*/
function dibujar_puntaje() {
  nombre = localStorage.getItem("nombre");
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(nombre + " - Puntaje: " + puntaje, 8, 20);
}

/*
* Dibuja las vidas restantes del jugador
* @method dibujar_vidas
* @return null
*/
function dibujar_vidas() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Vidas: " + vidas, canvas.width - 65, 20);
}

/*
* Loop principal del juego, llama a todos los metodos
* para su correcto funcionamiento
* @method juego
* @return null
*/
function juego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paleta();
  dibujar_puntaje();
  dibujar_vidas();
  dibujar_pelotas();
  detectar_colisiones();
  movimiento_flechas();

  //Aumentar dificulad segun paso del tiempo
  rapidez_pelotas += 0.0005;

  count_para_pelota_nueva += 10;
  if (count_para_pelota_nueva == tiempo_para_pelota_nueva) {
    pelota_nueva();
    count_para_pelota_nueva = 0;
    tiempo_para_pelota_nueva -= 20;
  }


}

setInterval(juego, 10);