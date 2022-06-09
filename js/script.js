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

/*
* Al hacer click en el boton, desactiva o activa la musica
* @method onclick
* @return null
*/
var volume = true;
document.getElementById("mute").onclick = function(){
  if (volume){
    document.getElementById("muteicon").textContent="volume_off";
    volume = false;
  }
  else{
    document.getElementById("muteicon").textContent="volume_up";
    volume = true;
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
    window.location.replace("game.html");
  }
}
