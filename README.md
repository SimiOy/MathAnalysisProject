# Secret Project - documentatie

# Scop
Prin acest proiect vrem sa incurajam elevii de liceu sa invete vizual analaiza matematica.
In ciuda complexitatii domeniului speam sa stimulam curiozitate si gandire matematica.

# TLDR
Scopul jocului este sa navighezi planul xOy printre o serie de obstacle utilizand 
puterea compunerii functiilor. Jocul permite toate operatiile cunoscute pe functii si dispune
de toate functiile elementare. 
Pe langa rezolvare a diferite nivele, un jucator poate sa isi si creeze propriile nivele,
avand abilitatea de a isi posta creatiile pentru alti jucatori. 

# Mecanici

## 1. Planul xOy

Juctatorul poate explora nivelul prin miscarea cursorului pe ecran sau prin inputuri de la tastatura (WASD)
De asemenea, poate amplifica sau micsora imagina prin scroll wheel pentru a vedea detaliile traiectoriei.

## 2. Modificare functiei

Jucatorul poate deschide un panou care ii permite construirea unei functii prin urmatoarele procedee:
- compunere binara de functii (+ | - | / | ^)
- compunere unara de functii ( fog(x) )
- ramificarea unei functii ( f(x) = { h(x) , x ∈ H    , H ∪ G =  F , H ∩ G = {}
                                    { g(x) , x ∈ G
                            )
- functiile elementare ( sin , cos, tg, ctg, arctrigo, e^x, ln x, x^a, ct)

Implementarea tuturor acestor mecanici foloseste diferite culori pentru a simplifica procesul de intelegere

## 3. Rulare / Pauza / Reset

Cand Jucatorul vrea sa verifice daca functia pe care a construit-o evita toate obstacolele, poate rula nivelul.
Un obiect custom va parcurge traiectoria impuse de functie si se va opri in eventualitae unei coliziuni.
Daca obiectul ajunge la capatul intervalului specific nivelului juctorul poate progresa la nivelul urmator.

In timpul miscarii obiectului, jucatprul poate pune pauza pentru a isi studia eventualele greseli.
De asemenea, poate reseta nivelul in cazul in care vrea sa modifice radical functia.

## 4. Platforma si Interfata

Pentru a incepe o aventura matematica in Secret Project, jucatorul are 2 oprtiuni :
- Primeste un utilizator de tip guest care tine minte informatiile per sesiune/device prin cookiuri.
    (odata ce cookiurile au fost sterse progresul lui s-ar pierde)
- Se logheaza cu contul de Google si este autentificat. Conturile developerilor au permisiuni suplimentare
    pentru a modifica nivele sau setari interne

# Procesul de instalare

Pentru ca suntem la inceput nu hostuim jpcul pe internet, in ciuda faptul ca infrastructura ne-ar permite cu usurinta.
    ( pentru a tine un site pe internet este nevoie de resurse financiare de care nu dispunem, dar cautam activ finantare )
In schimb cu putina rabdare, puteti urma pasii urmatori:
- dezarhivam rar-ul SecretProject.rar
- instalam XAMPP pentru decodificare fisierelor php si sql
- introducem in folderul '\xampp\mysql\data' folderul 'test' din arhiva
- introducem in folderul '\xampp\htdocs' urmatoarele :
    - fisierul index.php si connect.php
    - folderul SecretProject
- din panoul de control Xampp pornim serverele locale MySql si Apache
- deschidem in browser http://localhost/Secret%20Project/index.php

Gata! Treci la joaca!

# Provocari tehnice

## 0. Librarii si limbaje de programre
- limbaje: javascript, php/html/css, sql 
- librarii: p5.js , math.js, google-api

## 1. Planul xOy

```javascript

class Grid{
    constructor(){ ... }
    update(){ ... }
    draw(){ ... }
}

```

Calculele leagate de navigarea in planul xOy se petrec in fisierul 'grid.js' .
Clasa grid are:
- constructor ce initializeaza variabile de pozitie, orientare, si scara.

```javascript
	constructor(){
		this.norms = [1, 2, 5];
		this.normCount = 0;
		this.grid_norm = 1;
		this.offsetX = 0;
		this.offsetY = 0;
		this.scaleX = 0;
		this.scaleY = 0;
		this.decimalNumber = 10;
		this.endX = 0;
		this.endY = 0;
		this.startX = 0;
		this.startY = 0;
	}
```

- o metoda update ce asculta inputurile utilizatourlui si modifica variabilele mentionate mai sus

In exemplul de mai jos este abordata miscarea in plan prin tastele WASD 
```javascript
update(){
    ...
    if(!typing){
            if(keyIsDown(16))
                speed = 32;
            else
                speed = 10;
            if(keyIsDown(68))
                offsetX+=speed/scaleX;
            else if(keyIsDown(65))
                offsetX-=speed/scaleX;
            if(keyIsDown(87))
                offsetY-=speed/scaleY;
            else if(keyIsDown(83))
                offsetY+=speed/scaleY;
            }
    ... // urmeaza scalarea si calcurarea marimii indicilor numerici din planul xOy
}
```

- o metoda draw care deseneaza pe ecren frame de frame utilizand informatiile din update
 
```javascript
draw() {
    ...
    for(let x = 0; x<this.endX; x+=this.grid_norm) //desenam liniile verticale din cadranele 1 si 4
            {
                let p = worldToScreen(x, 0);

                stroke('black');
                strokeWeight(1);
                line(p.x, 0, p.x, windowHeight);
                strokeWeight(0.2);
                for(let j = x+this.grid_norm/5; j<x+this.grid_norm; j+=this.grid_norm/5)
                {
                    let sj = worldToScreen(j, 0).x;
                    line(sj, 0, sj, windowHeight);
                }
                if(x){
                    p.y = max(p.y, 0);
                    p.y = min(p.y, windowHeight - 30);
                    noStroke();
                    fill('white');
                    ellipse(p.x, p.y + 15, 10, 13);
                    fill('black');
                    textSize(15);
                    textAlign(CENTER);
                    if(this.grid_norm>=1){
                        text( x.toString(), p.x, p.y +20 );
                    }
                    else{
                        var rx = round(x, this.decimalNumber);
                        text( rx.toString(), p.x, p.y +20 );
                    }
                }
            }
    ...     // analog pentru cadranele 2 si 3 si liniile orizontale
}
``` 

![Image](https://raw.githubusercontent.com/NemoInfo/SecretProject/main/grid.png)

## 2. Desenarea functiilor

Acestea sunt organizate intr-o clasa astfel incat apelarea si utilizarea lor sa fie facuta cu usurinta.

(in ui.js)

```javascript
	p.setup = function()
	{
		inputNo = 0;
		inputs = [-1, -1];
		functionImg = [ {img:'blue', law:(x) => sin(x)},
					{img:'red' ,     law:(x) => cos(x)},
					{img:'green',    law:(x) => log(x)},
					{img:'lime',     law:(x) => exp(x)}, 
					{img:'yellow',  law:(x) => asin(x)},
					{img:'cyan',     law:(x) => tan(x)},
					{img:'orange',  law:(x) => acos(x)},
					{img:'pink',    law:(x) => sqrt(x)},
					{img:'purple',  law:(x) => atan(x)},
					{img:'white',    law:(x) => ct(x)}];

		intervalLaws[0] = functionImg[0];
		draggIndex = -1;
		s = 1-editMode;
	}
```

Pentru a desena pe ecran functiile am avut doua versiuni ale unei functii de plot. 
(in main.js)

```javascript
function plot( a, b, law, color ) // prima varianta de desenat, evalueaza functia
                                 // din pixel in pixel si conecteaza punctele obtiunete
                                 // PROBLEMA: functii discontiune cu limite laterale infinite (ln (la 0))
{
	var screenA = worldToScreen(a, 0).x;
	var screenB = worldToScreen(b, 0).x;
	beginShape();
	noFill();
	stroke(color);
	strokeWeight(3);
	var pwy = -law(a);
	for(let sx = screenA; sx<=screenB; sx++)
	{
		let wx = screenToWorld(sx, 0).x;
		let wy = -law(wx);
		if(wy){
			if( abs(pwy - wy)>50 && pwy*wy<0 )
			{
				endShape();
				beginShape();
			}
			let sy = worldToScreen(0, wy).y;
			sy = min(sy, windowHeight + 10);
			sy = max(sy, -10);
			vertex(sx, sy);
			pwy = wy;
		}
	}
	endShape();
}

function omegaPlot(a, b, law, color) // versiunea finala care a dat roade:
                                    // evaluam functia pe baza amplitudinii pantei:
                                   // cand functia se modifica putin folsim putine puncte
                                  // cand se modifica mult folosim din ce in ce mai multe
                                 // astfel, rezolvam problema discontinuitatilor de speta I si a II-a  
                                // in esenta cu cat functia este mai 'detaliata' cu atat ma multe puncte pe grafic calculam
{
	let wx = a;
	stroke(color);
	strokeWeight(3);
	beginShape();
	noFill();
	let pwy = -law(a);
	while(wx<b){
		let wy = -law(wx);
		if( abs(pwy - wy)>50 && pwy*wy<0 )
		{
			endShape();
			beginShape();
		}
		let s = worldToScreen(wx, wy);
		s.y = max( min(s.y,  windowHeight), -3 );
		vertex(s.x, s.y);
		let dx = min( 1/scaleX , abs(1/derivative(law)(wx)));
		dx = max( dx, 6.123233921028994e-4 );
		wx += dx;
		pwy = wy;
	}
	endShape();
}

function derivative(law){ // derivata evaluata numeric pentru omegaPlot
		return x0 => {
			let y0 = law(x0);
			let x = x0 + 1/100000000;
			let y = law(x); 
			return (y - y0) / (x - x0);
		};
}
```


## 3. Obstacole (in obstacles.js)

Acestea sunt impartite in difirete clase unite sub o clasa mare polimorfica pentru a 
apela aceleasi functii pentru obiecte diferite.

```javascript
class SceneObject // clasa polimorfica de obstacole
{
	constructor(fileXPos,fileYPos, scalex, scaley)
    {
        this.scalex = scalex;
        this.scaley = scaley;
        this.xPos = fileXPos;
        this.yPos = fileYPos;
        this.type = -1;
    }
}	

class Rect extends SceneObject{ // obstacolul dreptunghiular
	draw(){
		this.type = 1;
		let shape= worldToScreen(this.xPos,this.yPos);
		noStroke();
		fill(212, 61, 192);
		rect(shape.x,shape.y,this.scalex*scaleX,this.scaley*scaleY);
	}
	collide(x, y){
		return ( x>=this.xPos && x<=this.xPos + this.scalex && y>=this.yPos && y<=this.yPos + this.scaley );
	}
}

class Ellipse extends SceneObject{ // obstacol eliptic
	draw(){
		this.type = 0;
		let shape= worldToScreen(this.xPos,this.yPos);
		noStroke();
		fill(101, 173, 172);
		ellipse(shape.x, shape.y, this.scalex*scaleX, this.scaley*scaleY );
	}
	collide(x, y){
		return ( pow((x-this.xPos)/this.scalex2, 2) + pow((y-this.yPos)/this.scaley2, 2) <= 1 )
	}
}
```

Fiecare obiecat este construit din functia:
- draw() care deseneaza forma pe ecran
- collide() care returneza daca un punct se afla sau nu in interiorul functiei

## 4. Animatie (in animation.js)

Cand jucatorul ruleaza nivelul camera focalizeaza obiectul care parcurge functia.
Intreg procesul este descris matematic si impartit in secunde in functie de viteza obiectului si de oordonatele (x,y).
Orientarea/Rotatia obiectului pe grafic este redata de derivata intai.

O optimizare cruciala: 
Functia preCalculate() verifrica daca jucatorul a castigat sau nu in frame-ul in care ruleaza animatia, noi cunoastem locatia exacta
a unei eventuale ciocniri din starea initiala, astfel nu trebuie sa verifica coliziuni in fiecare frame.

```javascript
preCalculate()
	{
		this.color = 'yellow';
		var x = obstacles.length;
		var dx = 0.01;
		this.wx = this.a;
		this.deathPos = this.a-1;
		if(x==0)
			return;
		while(this.wx < this.b)
		{
			this.wx += dx;
			this.wy = -this.law(this.wx);
			for(let i=0;i<x;i++)
			{
				if(obstacles[i].collide(this.wx,this.wy))
				{
					this.deathPos = this.wx;
					this.wx = this.a;
					return;
				}
			}
		}
		this.wx = this.a;
		return;
	}
```

Metoda update() calculeaza coordonatele si orientare obiectul animat, oprind animatia cand ajunge
la coordonata finala (fie ea cea de coliziune sau de final de interval)

```javascript
update()
	{
		if(this.wx >= this.b || this.wx <= this.a)
			this.speed *= -1;
		var dx = 1/this.speed;
		if(this.wx<this.deathPos || this.deathPos==this.a - 1)
			this.wx += dx;
		if(this.wx > this.b)
			this.wx = this.b;
		else if(this.wx < this.a)
			this.wx = this.a;
		this.wy = this.law(this.wx);
		this.sx = worldToScreen(this.wx, 0).x;
		this.wy = min(100, this.wy);
		this.wy = max(-100, this.wy);
		this.wy = -this.wy;
		this.sy = worldToScreen(0, this.wy).y;
		if(this.deathPos !=0)
		{
			if(abs(this.deathPos-this.wx)<=0.01)
			{
				this.color = 'red';
			}
		} 
	}
```

## 5. UI (in ui.js)

Interfata poate fi unul dintre cele mai importante aspecte ale unui joc/aplicatie.
Noi am incercat sa pastram un design modern, minimalist, utilizand spatiul ecranului cat optim si estetic vizual.
Astfel orice meniu care nu este necesar la un moment de timp dispare automat de pe ecran.

Am folosit o combinatie de panouri html, elemente css si conexiuni javascript pentru a oferi o experienta seamless.

Spre exemplu, cand jucatorul pune pauza apelam functia pause() si oprim toate procesele active asteptand urmatorul input

```javascript
function pause()
{
	paused = 1-paused;
	bottomList.style.top = bottomListOptions[menuOn*(1-paused)];

	if(editMode)
		document.getElementById("shape_selector").style.right = rightOptions[menuOn*(1-paused)];

	document.getElementById("frame").style.filter = blurOptions[paused];
	playButton.style.display = playButtonOptions[paused];
	homeButton.style.display = playButtonOptions[paused];
	settingsButton.style.display = playButtonOptions[paused];
}
```

Meniul de modificare a functiei este cea mai complexa componenta a interfatei. El insusi este un nou canvas P5 suprapus cu cel principal
Intervalele pot fi miscate modificate, compuse. Bara de 2d de previzualizare reprezinta axa Ox, poate fi marita si explorata.

Pentru a desena diferitele intervale in meniul secundar iteram prin toate capetele de intervale si atribuim functia aleasa de jucator


(in cadrul metodei p.draw() atribuita meniului 'bottom_bar')
```javascript
for(let i=1; i<intervals.length-1; i++)
		{
			var sx = p.worldToScreen(intervals[i]);

			p.strokeWeight(2);
			p.stroke(46, 46, 46);
			p.line(sx, cheight/8, sx, cheight);

			p.fill('orange');
			p.stroke('black');
			p.strokeWeight(1);
			p.triangle(sx, 0, sx-6, cheight/8, sx+6, cheight/8);

			if(intervalLaws[i])
			{
				p.stroke(intervalLaws[i].img);
				p.strokeWeight(2);
				p.line(sx, cheight/16, p.worldToScreen(intervals[i+1]), cheight/16);
				var x = p.worldToScreen( intervals[i]) +15;
				var y = cheight/8 + 10;
				var w = p.worldToScreen( intervals[i+1] ) -15- x; 
				var h = cheight-cheight/8*3;

				if(w>0){
					p.fill(intervalLaws[i].img);
					p.rect( x, y, w, h, w/4);		
				}		
			}
```

## 6. Main (in main.js)

Fisierul main.js leaga toate componetele proiectului pentru a rula orice nivel.
Contine o serie de functii care primesc inputuri, si cheama functii externe.
Creeaza canvasul p5, il updateaza si desneaza, chemand functii pe obiecte, expresii, si inputuri.

Pentru a face tranzitia de la spatiul ecranului (spatiu practic) la spatiunl abstract xOy (spatiu teoretic),
folosim 2 functii care convertesc coordonate in functie de scara, pozitie a origini xOy, dimensiunile ecranului
si a paginii web in sine.

```javascript
function worldToScreen( worldX, worldY ){
		return { 
			x: (worldX - offsetX)*scaleX ,
			y: (worldY - offsetY)*scaleY }  ;
}
function screenToWorld( screenX, screenY ){
		return { 
			x: (screenX/scaleX + offsetX) ,
		 	y: (screenY/scaleY + offsetY) };
}
```

De asemenea, fisierul main contine o serie de eventuri care definesc game state-uri

```javascript
function keyPressed()
{
	if(typing)
		return;

	if(keyCode == 32 && gamePlaying){ //spacebar
		mode= !mode;
	}
	else if(keyCode == 8) //backspace begins game
    {
        startGame();
    }
    else if( keyCode == 69 ){ //E
    	allow = !allow;
    	toggleMenu();
    }
    else if(keyCode == 80 && editMode==1)//P
    	saveLevel();
    else if(keyCode == 72)//M
    	toggleHints();
    else if(keyCode == 13)
    	pause();
}

function mousePressed()
{
	if(editMode==0)
		return;
	if(mouseButton === LEFT && currentShape!=-1){ // Un exemplu bun de proces descris mai sus: creare obstacolelor atunci cand construim nivele
		let wmouse = screenToWorld(mouseX, mouseY);  
		if(currentShape==0)
			obstacles[obstacles.length] = new Ellipse(wmouse.x,wmouse.y, previewScaleX, previewScaleY); 
		else if(currentShape==1) // Se apleaza functiile de obstacole externe descrise mai sus
			obstacles[obstacles.length] = new Rect(wmouse.x - previewScaleX/2, wmouse.y -previewScaleY/2, previewScaleX, previewScaleY);
		obstaclePlaced = true;
	}
	else if(mouseButton === RIGHT)
	{
		if(currentShape!=-1)
			currentShape = -1;
		else{
			var w =  screenToWorld(mouseX, mouseY);
			for(let x = obstacles.length-1; x>=0 ; x--)
			{
				if(obstacles[x].collide(w.x, w.y)){
					obstacles.splice(x, 1);
					x--;
					return;
				}
			}
		}
	}
}
```

## 7. Backend (PHP, SQL, google-api)

La nivelul fiecarui jucator, fiecarui nivel, dar si obstacol, avem nevoie sa tinem minte anumite date separat de spatiul jocului.
Astfel folosim o baza de date Sql cu diferite tabele la care ne conectam, o actualizam si o folosim, prin apeluri din php.

- Baza de date:

Tabela players:
```
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| name      | varchar(30)      | NO   |     | NULL    |                |
| email     | varchar(30)      | YES  |     | NULL    |                |
| password  | varchar(30)      | NO   |     | NULL    |                |
| max_level | int(10) unsigned | NO   |     | 1       |                |
| player_id | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| session   | varchar(100)     | NO   |     | NULL    |                |
+-----------+------------------+------+-----+---------+----------------+
```

Tabela objects:
```
+----------+-----------------------+------+-----+---------+-------+
| Field    | Type                  | Null | Key | Default | Extra |
+----------+-----------------------+------+-----+---------+-------+
| number   | mediumint(8) unsigned | NO   | PRI | NULL    |       |
| xPos     | float                 | NO   |     | NULL    |       |
| yPos     | float                 | NO   |     | NULL    |       |
| xSize    | float                 | NO   |     | NULL    |       |
| ySize    | float                 | NO   |     | NULL    |       |
| shape    | tinyint(4)            | NO   |     | NULL    |       |
| level_id | int(10) unsigned      | NO   | PRI | NULL    |       |
+----------+-----------------------+------+-----+---------+-------+
```
Ruland comanda:
```
SELECT * FROM objects WHERE level_id = 1;
```
Se observa datele stocate despre obiectele prezente in niveul 1
```
+--------+---------+----------+-------+-------+-------+----------+
| number | xPos    | yPos     | xSize | ySize | shape | level_id |
+--------+---------+----------+-------+-------+-------+----------+
|      0 | 7.65462 | -5.20508 |   1.2 |   1.2 |     1 |        1 |
|      1 | 8.86926 | -2.56029 |   1.2 |   1.2 |     1 |        1 |
|      2 | 7.88372 | 0.980017 |   1.2 |   1.2 |     0 |        1 |
|      3 | 6.12419 | -2.58474 |   1.2 |   1.2 |     0 |        1 |
+--------+---------+----------+-------+-------+-------+----------+
```
Tabela levels:
```
+-------------+------------------+------+-----+---------+----------------+
| Field       | Type             | Null | Key | Default | Extra          |
+-------------+------------------+------+-----+---------+----------------+
| level_id    | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| level_start | float            | NO   |     | 0       |                |
| level_end   | float            | NO   |     | 20      |                |
| speed       | float            | NO   |     | 1       |                |
+-------------+------------------+------+-----+---------+----------------+
```

In fisierul connect.php conenctam proiectul nostru la baza de date 'test'

```php
<?php 

DEFINE('DB_USER', 'playerweb');
DEFINE('DB_PASSWORD',  'nemo');
DEFINE('DB_HOST', 'localhost');
DEFINE('DB_NAME', 'test');

$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
OR die('Could not connect ' .
	mysqli_connect_error() );

?>
```

Pentru a salva modifica datele despre un nivel folosim fisierul update.php

```php
<?php 
	session_start();
	require_once('../connect.php');

	if($_POST)
	{
		$id = $_COOKIE['id'];
		$max_level = $_POST['maxLevel'] ?? 0;
		if( $_SESSION['max_level'] < $max_level ){
			$query = "UPDATE players SET max_level = '$max_level' WHERE player_id = \"$id\"";
			mysqli_query($dbc, $query);
		}
	}
 ?>
```

In fisierul save.js controlam incarcarea si salvarea unui nivel:
```javascript
function loadLevel()
{
	var u = "map.php?levelNo=" + levelNo +"&type=0";
	$.ajax({
	    url : u,
	    type: "GET",
	    dataType : "json",
	    success: function(data){
	    	if(data[0]){
		    	intervals = [Number(data[0]["level_start"]), Number(data[0]["level_end"])];
		    	animation.a = Number(data[0]["level_start"]);
		    	animation.b = Number(data[0]["level_end"]);
	    	}
	    	else{
	    		intervals = [-10, 10];
	    	}
	    	obstacles = [];
	    	while(data[1][obstacles.length])
	    	{
	    		if(data[1][obstacles.length]["shape"]==0)
	    			obstacles[obstacles.length] = new Ellipse(Number(data[1][obstacles.length]["xPos"]), Number(data[1][obstacles.length]["yPos"]), 
													Number(data[1][obstacles.length]["xSize"]), Number(data[1][obstacles.length]["ySize"]));
	    		else if(data[1][obstacles.length]["shape"]==1)
	    			obstacles[obstacles.length] = new Rect(Number(data[1][obstacles.length]["xPos"]), Number(data[1][obstacles.length]["yPos"]), 
													Number(data[1][obstacles.length]["xSize"]), Number(data[1][obstacles.length]["ySize"]));
	    	}
	    }
	});
}

function saveLevel()
{
	var u = "map.php?levelNo=" + levelNo +"&type=1";
	var save = [];	
	for(let i=0; i<obstacles.length; i++)
	{
		save[i] = [ i, obstacles[i].xPos, obstacles[i].yPos,
					obstacles[i].scalex, obstacles[i].scaley, obstacles[i].type];
	}
	console.log(save);
	$.ajax({
		url: u,
		type: "post",
		data:{
			objects: save,
			objectsNumber: obstacles.length,
			level: [intervals[0], intervals[intervals.length-1]]
		},
		success:function(data)
		{
			console.log(data);
		},
		error:function(xhr, status, error)
		{
			console.error(xhr);
		}
	});
```

Fisierul controller.php centralizeaza si stocheaza cookieuri si date legate de in ce pagina se afla jucatorul.
Acesta nu permite accesul jucatorului la nivele sau pagini restrictionate prin schimbarea url-ului.

```php
<?php 
	require_once("controller.Class.php");
	require_once("config.php");
	
	if(isset($_GET["code"]))
		$token = $gClient->fetchAccessTokenWithAuthCode($_GET["code"]);
	else{


		$Controller = new Controller;
		echo $Controller ->insertGuest();

		header('Location: index.php');
		exit();
	}

	if(isset($token["error"]) != "invalid_grant"){
		$oAuth = new Google_Service_Oauth2($gClient);
		$userData = $oAuth->userinfo_v2_me->get();

		//insert data
		$Controller = new Controller;
		echo $Controller->insertData(array(
			'email' => $userData["email"],
			'name' => $userData["givenName"],	 
		 ));
	}
	else{
		header("Location: index.php");
		exit();
	}
 ?>
```

In fisierul index.php ne ocupam de logarea utilizatourui (prin guest sau google-api) si accesul restrictionat la sectiunea de editare a jocului

```php
<?php 
	require_once("config.php");
 ?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>GAME_NAME</title>
		<link rel="stylesheet" href="index_style.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script > 
		<script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
		<script type="text/javascript" language="javascript" src="index_script.js"></script>
	</head>
	<body>
		<div id="loader"></div>
		<div id="cont">
		<button id="play" onclick="play()" onmouseout="reset()">PLAY</button>
		<button id="settings">SETTINGS</button>
		<button id="edit"  onclick="edit()"  onmouseout="reset()">EDIT</button>
		</div>
		<div id="icon" onclick="toggle()">
			<img id="icon_image" src="sprites/user.png">
		</div>
		<div id="pannel">

		<?php if( ! ( isset($_COOKIE['id']) || isset($_COOKIE['sess']) ) ){ ?>

			<button onclick="window.location ='<?php echo $login_url; ?>' "  type="button" id="ggl">
			<i class="fa fa-google" aria-hidden="true"></i> Login </button>
			<p> Or </p>
			<button onclick="window.location = 'controller.php' " id="guest" type="button">Guest Login</button>

		<?php }else{ 
			require_once('../connect.php');

			$id = $_COOKIE['id'];
			$query = "SELECT name FROM players WHERE player_id = \"$id\" ";
			$response = @mysqli_query($dbc, $query);
			$row = mysqli_fetch_array($response);

			echo "<p style='color:rgb(45, 46, 43);'>Logged in as:</p>";
			?>
			<form id="changeName" action="name.php" onsubmit="return test()" method="get">
				<input spellcheck="false" autocomplete="off" type="text" id="name" name="name" value = '<?php echo $row["name"] ?>'></input>
				<input type="submit" id="ghost"></form>
			</form>

			<button id="logout" onclick="window.location = 'logout.php'">Logout</button>

		<?php } ?>
		</div>
	</body>
</html>
```

Fisierul map.php se ocupa de legarea efectiva a tabelei de obiecte din baza de date cu vectorii ce stocheaza aceste valori in fisierele javascript.

```php
?php
	session_start();
	require_once('../connect.php');

	$level = $_GET['levelNo'] + 1;
	if($_GET['type'] == 0){
		$query = "select * from objects where level_id = $level";
		$response = @mysqli_query($dbc, $query);
		$rows = [];
		while($row = mysqli_fetch_array($response))
		{
			$rows[] = $row;
		}
		$query = "select level_start, level_end from levels where level_id = $level";
		$response = @mysqli_query($dbc, $query);
		$row = mysqli_fetch_array($response);

		$total = [$row, $rows];
		$myJson = json_encode($total);
		echo $myJson;
	}
	else if($_POST && $_GET['type'] == 1){
		$query = "delete from objects where level_id = $level;";
		mysqli_query($dbc, $query);

		if($_POST["objectsNumber"]!=0){
			foreach ($_POST["objects"] as $object) {
				$query = "INSERT INTO objects VALUES ($object[0], $object[1], $object[2], $object[3], $object[4], $object[5], $level)";
				mysqli_query($dbc, $query);
			}
		}
		$ls = $_POST['level'][0];
		$le = $_POST['level'][1];
		$query = "UPDATE levels SET level_start = $ls, level_end = $le WHERE level_id = $level";
		mysqli_query($dbc, $query) or die;

		echo "Success";
	}

 ?>
```

## 8. Restul

Celelatlte fisiere din proiect nu sunt semnificative pentru complexitatea aplicatiei, tin de formatare sau conexiuni suplimentare.
Fiecare fisiera are totusi explicatii amanuntite prin comentarii. De asemenea am incercat sa numim variabilele cat mai clar si sa lasam
comentarii pe alocuri pentru a usura colaborarea.
