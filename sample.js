const googlehome = require('google-home-notifier')
const language = 'ja';

googlehome.device('Google-Home', language); 

googlehome.notify('sample.jsから話しかけています', function(res) {
	  console.log(res);
});

