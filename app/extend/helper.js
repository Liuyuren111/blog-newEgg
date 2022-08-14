// 封装公用方法
const CryptoJS = require('crypto-js');
module.exports = {
  // 加密
  encrypt(word, keyStr, ivStr) {
    let key = this.config.KEY;
    let iv = this.config.IV;
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
  // 解密
  decrypt(word, keyStr, ivStr) {
    let key = this.config.KEY;
    let iv = this.config.IV;

    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    const base64 = CryptoJS.enc.Base64.parse(word);
    const src = CryptoJS.enc.Base64.stringify(base64);

    const decrypt = CryptoJS.AES.decrypt(src, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });

    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  // 生成token
  setToken(opt) {
    return this.app.jwt.sign(opt, this.app.config.jwt.secret, {
      expiresIn: '7d', // 设置时效 后面会该短 根据请求更新时效
    });
  },
};
