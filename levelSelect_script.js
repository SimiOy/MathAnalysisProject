var image = [
'url(sprites/level0.gif)',
'url(sprites/level1.gif)',
'url(sprites/level2.gif)',
'url(sprites/level3.gif)',
'url(sprites/level4.gif)',
'url(sprites/level5.gif)',
'url(sprites/level6.gif)'
]

var cell;
var unlocked = [];

window.onload = function()
{
  $('#loader1').fadeOut();
  cell = document.getElementsByClassName("cells")[0];
  for(let i=0; i<16; i++)
    document.getElementById('cellText' + i).innerHTML = 'Level ' + (i+1);
}

function projectCell(x)
{
  cell.style.backgroundImage = image[x];
  if(!unlocked[x])
  {
    document.getElementById('cellText' + x).innerHTML += "<br>LOCKED";
  }
  for(let i=0; i<x; i++)
    document.getElementById('cellText' + i).innerHTML = '';
  for(let i=x+1; i<16; i++)
    document.getElementById('cellText' + i).innerHTML = '';
}
function normalCell(x)
{
  cell.style.backgroundImage = 'none';
  for(let i=0; i<16; i++)
    document.getElementById('cellText' + i).innerHTML = 'Level ' + (i+1);
}

function level(x)
{
  if(unlocked[x]){
    $("#loader2").fadeIn();
    setTimeout(function(){
      window.location = ("level.php?levelNo=").concat(String(x));
    }, 300);
  }
}

function home()
{
  $("#loader1").fadeIn();
  setTimeout(function(){
    window.location = "index.php";
  }, 250);
}