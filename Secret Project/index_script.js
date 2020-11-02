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

window.onload = function()
{
    cell = document.getElementsByClassName("cells")[0];
    for(let i=0; i<16; i++)
      document.getElementById('cellText' + i).innerHTML = 'Level ' + (i+1);
    saveFunction = new SaveSystem();
}

function projectCell(x)
{
  cell.style.backgroundImage = image[x];
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
  document.location.href = ("level.html?levelNo=").concat(String(x));
}