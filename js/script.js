document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);

  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);

  var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

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

document.getElementById("playbtn").onclick = function(){
  if (document.getElementById("nombre_jugador").value == ""){
    M.toast({html: 'Ingrese un nombre'})
  }
  else{
    window.location.replace("game.html");
  }
}
