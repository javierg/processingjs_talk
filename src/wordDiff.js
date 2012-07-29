function wordScore( str, flags ) {
  var score = 0;
  var arr = flags.split(" ");
  for( i in arr ) {
    if ( str.toLowerCase().indexOf( arr[i].toLowerCase() ) !== -1 ){
      score++;
    }
  }
  return score;
}
