( function($, window) {
  $.extend({
    tjnow: function(_cb) {
      var url =  "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      var data = {tags: "tijuana", format: "json"};
      $.getJSON( url, data, function(data) {
        index = Math.floor(( Math.random()* data.items.length ));
        flkrPattern = /http:\/\/farm(\d)\.staticflickr\.com/;
        source = data.items[index].media.m.replace(/_m/,'')
        img = source.replace(flkrPattern,'');
        host_number = source.match(flkrPattern);
        data = {i: img, h: host_number[1] };
        _cb.apply(this, [data]);
      });
      return this;
    }
  });
})( jQuery );
