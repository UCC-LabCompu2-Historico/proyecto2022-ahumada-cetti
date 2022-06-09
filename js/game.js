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
var probabilidad_pelota_mala = 0; //Mientras mas chico mas probable a que te toque una mala
var pelotas = [];

document.addEventListener("keydown", key_presionada, false);
document.addEventListener("keyup", key_soltada, false);
document.addEventListener("mousemove", movimiento_mouse, false);

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function key_presionada(e) {
  if (e.keyCode == 39) {
    flecha_der_presionada = true;
  }
  else if (e.keyCode == 37) {
    flecha_izq_presionada = true;
  }
}
function key_soltada(e) {
  if (e.keyCode == 39) {
    flecha_der_presionada = false;
  }
  else if (e.keyCode == 37) {
    flecha_izq_presionada = false;
  }
}
function movimiento_mouse(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paleta_en_x = relativeX - anchoPaleta / 2;
  }
}

function movimiento_flechas() {
  if (flecha_der_presionada && paleta_en_x < canvas.width - anchoPaleta) {
    paleta_en_x += 7;
  }
  else if (flecha_izq_presionada && paleta_en_x > 0) {
    paleta_en_x -= 7;
  }
}

function paleta() {
  ctx.beginPath();
  ctx.rect(paleta_en_x, canvas.height - alturaPaleta, anchoPaleta, alturaPaleta);
  ctx.fillStyle = "#ee6e73";
  ctx.fill();
  ctx.closePath();
}

function pelota_nueva() {
  pelotas.push({ x: random(10, canvas.width - 10), y: -5, mala: random(0, probabilidad_pelota_mala) });
}

function dibujar_pelotas() {
  for (let i = 0; i < pelotas.length; i++) {
    ctx.beginPath();
    ctx.arc(pelotas[i].x, pelotas[i].y, radio_pelota, 0, Math.PI * 2);
    if (pelotas[i].mala == 0) {
      ctx.fillStyle = "#000000";;
    }
    else {
      ctx.fillStyle = "#ee6e73";
    }

    ctx.fill();
    ctx.closePath();
  }
}

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
          //alert("FOL")
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
        }
      }
      pelotas.shift();

    }
  }
}

function dibujar_puntaje() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Puntaje: " + puntaje, 8, 20);
}
function dibujar_vidas() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Vidas: " + vidas, canvas.width - 65, 20);
}

function juego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paleta();
  dibujar_puntaje();
  dibujar_vidas();
  dibujar_pelotas();
  detectar_colisiones();


  for (let i = 0; i < pelotas.length; i++) {
    pelotas[i].y += 1;
  }
  movimiento_flechas();
}

setInterval(juego, 10);
setInterval(pelota_nueva, 2000);