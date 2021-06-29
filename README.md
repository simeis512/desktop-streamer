# Desktop Streamer
## なにこれ
デスクトップのキャプチャ動画をLANに公開するアプリ（要するにミラーリング）

## 使い方
1. オレオレ証明書発行
```
openssl req -x509 -newkey rsa:2048 -keyout privatekey.pem -out cert.pem -nodes -days 365
```
2. `npm install`
3. `npm run start`
4. `https://192.168.XXX.XXX:8800` にアクセス

## FAQ
### 何に使えるの？

個人PCの画面を会社PCで見せたい時とか

### セキュリティ上の理由で `https://192.168.XXX.XXX:8800` にアクセスできないんだけど

ggってください（Macだとちょっとめんどい）

### WindowsだとOpenSSLが使えない

インストールが必要です
