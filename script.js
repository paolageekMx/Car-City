//Variables
var nubes = [];
var baches = [];
var frames = 0;
var intervalo;
var frames2 = 0;
var intervalo2;
var lines = [];
var lado = 0;
var espacio = 10;
var speed = 27;
var drawDark = true;
var offset = 0;
var cielo = document.getElementById("cielo");
var ctx = cielo.getContext("2d");
var starkdark = 0;
var zepelin = new Zepelin();
var tierra = document.getElementById("tierra");
var ctx2 = tierra.getContext("2d");
var ground = new Ground();
var road = new Road();
var jeep = new Jeep();
var menos =0;
startGame();

//CONSTRUCTORES
function Ground() {
  this.x = 0;
  this.y = 0;
  this.width = tierra.width;
  this.height = tierra.height;
  this.stepsize = norm(this.y, this.width, this.height);
  this.darkcolor = "#734d26";
  this.lightColor = "#96754B";
  this.min = 4;
  this.max = 120;
  pos = 0;
  stepSize = 1;
  starkdark = 0;
  this.draw = function() {
    this.move();
    ctx2.beginPath();
    ctx2.fillStyle = "#96754B";
    ctx2.fillRect(0, 0, this.width, this.height / 2);
    ctx2.fillStyle = "#886a44";
    ctx2.fillRect(0, (this.height / 3) - 1, this.width, this.height);
    ctx2.fillStyle = "#96754B";
    ctx2.fillRect(0, (this.height / 3)*2, this.width, this.height);
      //this.y = 0;
    }

    if (drawDark) {
      ctx2.fillStyle = this.darkcolor;
      ctx2.fillRect(this.x, this.y, this.width, pos);
      ctx2.closePath();
    } /*else {
      ctx2.fillStyle = this.light;
      ctx2.fillRect(this.x,this.y,this.width, pos);
    }*/
    firstRow = false;
    pos += stepSize;
    drawDark = !drawDark;



  this.move = function() {
    //var starkdark = false;
    offset += speed * 0.05;
    if (offset > this.min) {
      offset = this.min - offset;
      //startDark = !startDark;
    }
    this.y = this.y + offset;
  };
};

function city() {
  img = new Image();
  img.src = "images/ciudad3.png";
  ctx.drawImage(img, 0, 40, 1280, 300);
  ctx2.drawImage(img, 0, -210, 1280, 300);
}

function Nube(x, y) {
  this.x = x;
  this.y = y;
  this.width = 60;
  this.height = 50;
  this.img = new Image();
  this.img.src = "images/nube.png";
  this.img.onload = function() {
    this.draw();
  }.bind(this);

  this.draw = function() {
    this.x -= 2;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}

function Zepelin() {
  this.x = cielo.width;
  this.width = 250;
  this.height = 100;
  this.y = Math.floor(Math.random() * (cielo.height - this.height));
  this.img = new Image();
  this.img.src = "images/zepelin.png";

  this.img.onload = function() {
    this.draw();
  }.bind(this);

  this.draw = function() {
    this.x -= 1;
    if (this.x === -250) {
      this.y = Math.floor(Math.random() * 240);
      this.x = cielo.width;
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };
}

function Road() {
  this.x = tierra.width + 2;
  this.y = tierra.height + 2;
  this.sound = new Audio("images/Defense Line.mp3");
  this.sound2 = new Audio("images/Metal Clang-SoundBible.com-19572601.mp3");
  this.sound.loop = "true";
  var cuadrante = this.x / 4;
  var mitad = this.x / 2; // 650
  var ancho = this.x / 3; // 433.33
  var factor = cuadrante / 5;

  this.draw = function() {
    //Coordenadas punta superior Derecha
    this.x_sup_derecha = mitad + factor;
    this.y_sup_derecha = 0;

    //Coordenadas punta superior Izquierda
    this.x_sup_izquierda = mitad - factor;
    this.y_sup_izquierda = 0;

    //Coordenadas punta inferior Derecha
    this.x_inf_derecha = mitad + cuadrante;
    this.y_inf_derecha = this.y;

    //Coordenads punta inferior Izquierda
    this.x_inf_izquierda = mitad - cuadrante;
    this.y_inf_izquierda = this.y;

    // Lineas laterales del Road
    ctx2.beginPath();
    ctx2.lineWidth = "7";
    ctx2.strokeStyle = "white";
    //Se dibuja Linea Izquierda
    ctx2.moveTo(this.x_sup_izquierda, this.y_sup_izquierda); // punta superior de linea izquierda
    ctx2.lineTo(this.x_inf_izquierda, this.y_inf_izquierda); // punta inferior de linea izquierda
    ctx2.lineTo(this.x_inf_derecha, this.y_inf_derecha);
    ctx2.lineTo(this.x_sup_derecha, this.y_sup_derecha);
    ctx.lineTo(this.x_sup_izquierda, this.y_sup_izquierda);
    ctx2.fillStyle = "#606a7c";
    ctx2.fill();
    ctx2.stroke();
    ctx2.closePath();
  };
}

function Line(inicio, fin) {
  
  this.x = tierra.width / 2;
  this.y = inicio;
  this.height = fin;
  
  //Lineas Medias del Road
  this.draw = function() {
    this.move();
    ctx2.beginPath();
    ctx2.lineWidth = "5";
    ctx2.strokeStyle = "white";
    ctx2.moveTo(this.x, this.y);
    ctx2.lineTo(this.x, this.height);
    ctx2.stroke();
    ctx2.closePath();
  };
  this.move = function() {
    if (fin <= fin + espacio) {
      this.y++;
      this.height++;
    }
  };
}

function Jeep() {
  this.y = tierra.height - 150;
  this.x = tierra.width / 2 - 75;
  this.height = 130;
  this.width = 150;
  this.img = new Image();
  this.img.src = "images/Jeep.gif";
  
  
  this.img.onload = function() {
    this.draw();
  }.bind(this);

  this.draw = function() {
    ctx2.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  this.move = function(direccion) {
    if (
      direccion == 0 &&
      this.x <= road.x_inf_derecha - road.x_inf_derecha / 4
    ) {
      this.x += 20;
    }

    if (direccion == 1 && this.x >= road.x_inf_izquierda + 50) {
      this.x -= 20;
      //this.y =
    }
    if (direccion == 2 && this.y <= tierra.height - 130) {
      this.y += 5;
    }

    if (direccion == 3 && this.y >= tierra.height / 1.5) {
      this.y -= 5;
    }
  };

  this.IsTouching = function(bache) {
    return (
      this.x < bache.x /*+ bache.width*/ &&
      this.x + this.width > bache.x &&
      this.y < bache.y /*+ bache.height */&&
      this.y + this.height > bache.y + bache.height
    ); //
  };

  this.drawScore = function() {
    this.gasolina = Math.floor(frames/60);
    ctx2.font = "50px Avenir";
    ctx2.fillStyle = "black";
    ctx2.fillText(this.gasolina, 1100, this.y+50);
  }
}

function generateLine() {
  if (frames % 15 === 0) {
    //return;
    var tamano = 5;
    inicio = 0;
    fin = 10;
    //for (espacio; espacio <= 50; espacio= espacio +2) {
    
    var line = new Line(inicio, fin);
    lines.push(line);
    var inicio = fin + espacio;
    var fin = inicio + tamano;
    espacio = espacio + 2;
    tamano = tamano + 2;
  }
}

function drawLines() {
  lines.forEach(function(line) {
    line.draw();
  });
}

function generateNube() {
  if (!(frames % 300 === 0)) return;
  randomWidth = cielo.width;
  randomHeight = Math.floor(Math.random() * cielo.height);
  var nube = new Nube(randomWidth, randomHeight - 50);
  nubes.push(nube); // La agrega al arreglo
}

//Para recorrer el arreglo y dibujarlas todas
function drawNube() {
  nubes.forEach(function(nube) {
    nube.draw();
  });
}

function Bache(x, y, lado) {
  this.x = x;
  this.y = y;
  this.height = 30;
  this.width = 15;
  this.img = new Image();
  this.img.src = "images/bache1.png";
  this.img.onload = function() {
    this.draw();
  }.bind(this);

  this.draw = function() {
    if (lado == 1) {
      this.x = this.x + 0.3;
    } else {
      this.x = this.x - 0.4;
    }
    ctx2.drawImage(this.img, this.x, this.y, this.height, this.width);
    this.y++;
    this.width = this.width + 0.2;
    this.height = this.height + 0.2;
  };
}

function generateBaches() {
  if (!(frames % 300 === 0)) return;

  var max = 0;
  var min = 0;

  lado = Math.floor(Math.random() * 2);
  if (lado == 1) {
    max = road.x_sup_derecha;
    min = tierra.width / 2;
    var randomWidth = Math.round(Math.random() * (max - min)) + min - 20;
    randomWidth += 15;
  } else {
    max = tierra.width / 2;
    min = road.x_sup_izquierda;
    var randomWidth = Math.round(Math.random() * (max - min)) + min;
  }

  var bache = new Bache(randomWidth, 0, lado);
  baches.push(bache);
}

function drawBaches() {
  baches.forEach(function(bache) {
    bache.draw();
  });
}

//LISTENERS
addEventListener("keydown", function(e) {
  //derecha
  if (e.keyCode === 39) {
    jeep.move(0);
  }
  //izquierda
  if (e.keyCode === 37) {
    jeep.move(1);
  }
  //Abajo
  if (e.keyCode === 40) {
    jeep.move(2);
  }
  //Arriba
  if (e.keyCode === 38) {
    jeep.move(3);
  }
});

//FUNCIONES AUXILIARES
//Calcula la proporcion
function norm(value, min, max) {
  return (value - min) / (max - min);
}

function checkCollition() {
  baches.forEach(function(bache) {
    if (jeep.IsTouching(bache)){
      jeep.gasolina = jeep.gasolina - 10;
      
    }
  
  });
}

function gameOver() {
  stop();
  ctx2.font = "120px courier";
  ctx2.strokeStyle = "red";
  ctx2.lineWidth = 5;
  ctx2.strokeText("Game Over", 350, 250);
}
function stop() {
  clearInterval(intervalo);
  intervalo = 0;
}

//MAIN
function update() {
  generateNube();
  generateBaches();
  generateLine();
  frames++;
  ctx.fillStyle = "#1E90FF";
  ctx.fillRect(0, 0, cielo.width, cielo.height);
  if (frames % 1 === 0) {
    drawNube();
    zepelin.draw();
    city();
  }

  ground.draw();
  road.draw();
  drawLines();
  drawBaches();
  jeep.draw();

  checkCollition();
  jeep.drawScore();
}

function update2() {}
function startGame() {
  
  if (intervalo > 0) return;
  intervalo = setInterval(function() {
    update();
    city();
  }, 1000 / 60);

  if (intervalo2 > 0) return;
  intervalo2 = setInterval(function() {
    //city();
  }, 1000 / 60);
  road.sound.play();

}
