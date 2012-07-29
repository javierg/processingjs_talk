/* @pjs 
crisp="true";
pauseOnBlur="true";
font="src/fonts/FullsizeSans.ttf";
*/

String good = "sexo tequila artistas abrazo bueno adelante sano bien trabajo feliz comida musica fiesta sabor cocina arte cultura exito";
String bad = "narcotúnel mal malo pobre narco violencia infeliz baches fraude robo trafico basura ruido policia";
Array twits = new Array();
Object o = new Object();
PImage bg = new PImage;

void setup(){
  size(500,399);
  frameRate(30); 
  defaults();
  requestMainBg();
  $.twitfeed( "tijuana", handleTwits );
}

void draw(){
  setMainBg();
  for (p in twits){
    renderTwit( twits[p] );
  }
}

void renderTwit(t) {
  mood = t.score >= 0 ? #CC0000 : #00CC00;
  size = t.text.length * 0.15;
  posx = o.x - t.score;
  posy = o.y - ( t.score * Math.sin(t.score) );
  fill( color(mood, 125) );
  noStroke();
  ellipse( tremor(posx), tremor(posy), size, size );
}

void handleTwits( results ) {
  for ( index in results ) {
    _twit = results[index];
    _good_score = wordScore( _twit.text, good );
    _bad_score  = wordScore( _twit.text, bad );
    _base_score = 144 - _twit.text.length
    _twit.score = 1/( _base_score + (_good_score - _bad_score)) * 1000;
    twits.push( _twit );
  }
  redraw();
}

void defaults(){
  smooth();
  o.x = width/2;
  o.y = height/2;
}

void requestMainBg () {
  $.tjnow( function(r){
    bg = requestImage( "http://localhost:8080/img/tjmood?f=" + r.i + "&h=" + r.h );
  });  
}

void setMainBg() {
  if ( bg.width !== 0 ) {
    bg.resize(width, height);
    background(bg);
    filter(BLUR, 6);
    stroke(255, 155);
    line(0, o.y, width, o.y);
    line(o.x, 0,  o.x, height);
  }  
}

float tremor(n) {
  return n + ( Math.sin(Math.random()) + Math.cos(Math.random()) );
}
