詳細は本家リポジトリを参照

# setup
`npm install`


# run
`node {line|ifttt}_server_*.js`
※forever しても良い。
※line版を起動した際にはメッセージに従ってngrokを起動すること。


# Daemonize
ルータ再起動等でGoogleHomeのIPが変わった際に追従できるようにcrontabに下記を足す
```
0 5  *   *   *     forever restart /home/pi/googlehome-speak/line_server_without_ngrok.js
1 5  *   *   *     forever restart /home/pi/googlehome-speak/ifttt_server_with_ngrok.js
```

# Google HemeのIPをいちいち調べずに済ませる方法
https://github.com/noelportugal/google-home-notifier#after-npm-install
