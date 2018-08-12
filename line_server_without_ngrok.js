const config = require('./config/default.json');

// for http server
const http = require('http');

// for googlehome
const googlehome = require('google-home-notifier');
const language = 'ja';


function googlehome_speak(text) {
  googlehome.notify(text, function (res) {
    console.log('googlehome_res : ' + res + '   speech_text : ' + text);
  });
}


// main()
googlehome.device('Google-Home', language); 

http.createServer(function (request, response) {
  let post_data = '';

  request.on('data', function (chunk) {
    post_data += chunk;
  });

  request.on('end', function () {
    console.log('post_data : ' + post_data);

    const webhook = JSON.parse(post_data).events[0];
    if (webhook.type != 'message' || webhook.message.type != 'text') {
      return;
    }

    // 特定の人からのメッセージのみ発話
    if (config.speakable_userid == '' || webhook.source.userId == config.speakable_userid) {
      const data_text = webhook.message.text;
      googlehome_speak(config.beginning_sentence + data_text);
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
  });
}).listen(config.server_port);

console.log("")
console.log("server_for_line is running on port 8080. please run ngrok manually.")
console.log("e.g.: ngrok http 8080 --region=au")

