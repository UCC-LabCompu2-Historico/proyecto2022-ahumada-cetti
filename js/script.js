/*
* Al cargar la pagina, inicializa los objetos 
* de materialize (Selects, FloatingActionButton y Modals)
* @method EventListener - DOMContentLoaded
* @return null
*/
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);

  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);

  var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

let music_player = document.getElementById("music_player");
/*
* Al hacer click en el boton, desactiva o activa la musica
* @method onclick
* @return null
*/
var mute_volume = true;
document.getElementById("mute").onclick = function(){
  if (mute_volume){
    document.getElementById("muteicon").textContent="volume_up";
    music_player.src = "media/song.mp3";
    music_player.load();
    music_player.play();
    music_player.muted = false;

    mute_volume = false;
  }
  else{
    music_player.muted = true;
    document.getElementById("muteicon").textContent="volume_off";
    mute_volume = true;
  }
};

/*
* Al hacer click en el boton, verifica si el nombre ingresado no es vacio
* y de ser asi inicia el juego
* @method onclick
* @return null
*/
document.getElementById("playbtn").onclick = function(){
  if (document.getElementById("nombre_jugador").value == ""){
    M.toast({html: 'Ingrese un nombre'})
  }
  else{
    localStorage.setItem("nombre", document.getElementById("nombre_jugador").value);  
    localStorage.setItem("color", document.getElementById("color_jugador").value); 
    localStorage.setItem("mute_volume", mute_volume);  
    window.location.replace("game.html");
  }
}
