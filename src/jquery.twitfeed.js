( function($, window) {
  $.extend({
    twitfeed: function(){
      if ( ! arguments || typeof arguments[0] != 'string' ){
        throw "TwitFeed error: query string required as first argument";
      }
      //var search_service = 'http://search.twitter.com/search.json?q=' + arguments[0];
      var search_service = 'src/mock.js';
      var _results = [];
      var _cb = null;
      $.each( arguments, function(k, v) {
        if (typeof v == "function") {
          _cb = v;
        } 
      });
      $.getJSON( search_service, function(data) {
        $.each( data.results, function(k, v) {
          item = {
            created_at: v.created_at,
            language: v.iso_language_code,
            text: v.text
          }
          _results.push( item );
        });
        if (_cb) {
          _cb.apply( this, [_results] );
        }
      });
      return this;
    }
  });
})( jQuery );
