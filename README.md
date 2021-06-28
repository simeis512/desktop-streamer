# Desktop Streamer
## なにこれ
デスクトップのキャプチャ動画をLANに公開するアプリ

## 使い方
1. オレオレ証明書発行
`openssl req -x509 -newkey rsa:2048 -keyout privatekey.pem -out cert.pem -nodes -days 365`
1. npm install
1. npm run start
1. https://[LAN IP]:8800 にアクセス
