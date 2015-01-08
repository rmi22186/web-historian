$(function() {
    $('.urlForm').on('submit', function(e) {
      e.preventDefault();

      $.ajax({
        url: 'http://127.0.0.1:8080',
        type: 'POST',
        data: {url: $('.urlInput').val() },
        contentType: 'application/json',
        success: function(redirectUrl){
          // redirect to json
          console.log(redirectUrl);
          window.location.href = redirectUrl;
        },
        error: function() {
          console.log('error loading json')
        }
      });
    });


  });
