
//  document.getElementById("butonD").addEventListener("click", display)
  var CryptoJS = require("crypto-js")
  var IPFS = require('ipfs-api')
  const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })


  function decrypt(data, key) {
      return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }
  function display (hash, key) {
    ipfs.cat(hash, function (err, res) {
      if (err || !res) {
        return console.error('ipfs cat error', err, res)
      }
      var elementIn = res.toString()
      var decrypted = decrypt(elementIn, key)
      var div = document.createElement('div');
      div.innerHTML= decrypted
      document.getElementById('content').appendChild(div)
    })
  }

const urlParams = new URLSearchParams(window.location.search);
const hash = urlParams.get('hash');
const key = urlParams.get('k')
console.log (key)

display(hash, key)
