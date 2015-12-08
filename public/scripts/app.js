$(document).ready(function() {


// $.ajax(getGoogle);
$.ajax(getPixabay);


});




// Using pixabay.com api
// https://pixabay.com/api/docs/
var getPixabay = {
  type: "GET",
  url: "https://pixabay.com/api/?",
  data: {
    key: "1737332-5558eecf939aa201f8d69e29b",
    q: '(inspire OR inspiration OR inspirational) OR (motivation OR motivational) AND life',
    image_type: "photo",
    per_page: 100, // max call is 200, default is 20
    orientation: "horizontal"
  },

  success: function(data) {
      var data = data;
      var counter = 0;
      console.table(data);
      $('body').append("<div id='dvImages'>");
      // $('p').append(data.name);
      $.each( data.hits, function( i, item ) {
        counter += 1;
        console.log(item.previewHeight);
        // this method doesn't allow specific size selection! boo
        // A work around is to call a lot of images
        // and only append those that fit the size requirement.
        // But you don't know if you will get enough images...
        if (item.previewHeight >= 90 && item.previewHeight <= 100) {
        console.log(item.previewURL);
        var img = $("<img />");
        img.attr("src", item.previewURL).appendTo("#dvImages");
        if (counter == 20) return false;
        }
      });
  },
  fail: function(error) {
      console.log("Something has gone wrong below");
      console.log(error);
      console.log("Something has gone wrong ^");
  }
};





// Apparently this method is using the public api call
var getFlickr = {
  type: "GET",
  url: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  // api_key: "fc74fd6c379e3e3913a81088efb308e8",
  dataType: 'json',
  data: {
    tags: "inspirational, insprire",
    tagmode: "any", // NOTE: https://www.flickr.com/services/feeds/docs/photos_public/
    format: "json"
                },
  success: function(data) {
      var data = data;
      console.table(data);
      $('body').append("<div id='dvImages'>");
      // $('p').append(data.name);
      $.each( data.items, function( i, item ) {

        // var img = $("<img />");
        // img.attr('width', '200px');
        // img.attr('height', '200px');
        // img.attr("src", item.media.m).appendTo("#dvImages");
        // if (i == 20) return false;


        var urlLength = item.media.m.length;
        var urlStr = item.media.m;
        var urlExt = urlStr.substring(urlLength - 3,urlLength);
        var newURL = urlStr.slice(0,urlLength - 5) + "q." + urlExt

        $('body').append("<img id='" + i + "'>");
        $("#" + i + "").attr( "src",newURL ).appendTo( "#images" );

        // if ( i === 1) {
        //   var firstImage = document.getElementById("1");
        //
        //   firstImage.addEventListener("click", function() {
        //     console.log("First Image Clicked");
        //
        //   })
        // };
        //
        //
        // console.log(urlStr.substring(urlLength - 3,urlLength));
        // console.log(urlStr.slice(0,urlLength - 5) + "q." + urlExt);
        // if ( i === 3 ) {
        //   return false;
        // }
      });
  },
  fail: function(error) {
      console.log("Something has gone wrong below");
      console.log(error);
      console.log("Something has gone wrong ^");
  }
};



//           //assign hover actions to each image
//           $('.image-container').live('mouseover', function(){
//               $(this).children('div').attr('class', 'image-info-active');
//           });
//           $('.image-container').live('mouseout', function(){
//               $(this).children('div').attr('class', 'image-info');
//           });
//
//           jQuery('#loader').remove();
//
// });
