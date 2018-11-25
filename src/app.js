
var IPFS = require('ipfs-api')
var CryptoJS = require("crypto-js")

document.getElementById("boton").addEventListener("click", medPass);

function medPass() {
    const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

    //take from from place it in toUp
    document.getElementById('toUp-nombre').innerHTML = document.getElementById('nombre').value
    document.getElementById('toUp-fechaDeNacimiento').innerHTML = document.getElementById('fechaDeNacimiento').value
    document.getElementById('toUp-obraSocial').v = document.getElementById('form-obraSocial').value
    document.getElementById('toUp-medicacion').innerHTML = document.getElementById('form-medicacion').value
    document.getElementById('toUp-enfermedadActual').innerHTML = document.getElementById('form-enfermedadActual').value
    document.getElementById('toUp-enfermedadPasada').innerHTML = document.getElementById('form-enfermedadesPasadas').value
    document.getElementById('toUp-grupoSanguineo').innerHTML = document.getElementById('form-grupoSanguineo').value
    document.getElementById('toUp-notas').innerHTML = document.getElementById('form-notas').value


    var toUpDiv = document.getElementById('toUp').innerHTML
    //encrypt
    var key = makeKey()
    console.log (key)
    var toStore = encrypt(toUpDiv, key)

    ipfs.add(Buffer.from(toStore), function (err, res) {
      if (err || !res) {
        return console.error('ipfs add error', err, res)
      }

      res.forEach(function (file) {
        if (file && file.hash) {
          console.log('successfully stored', file.hash)
          addQrLink(file.hash, key)
        }
      })
    })
    }

//makes links: ipfs link and download qr link
function addQrLink(hashAdded, key){
  //Creates link to file added
   document.getElementById("link").innerHTML= ("https://scammi.github.io/MedPass/decrypt.html?hash="+ hashAdded + "&k=" + key)

   var links = document.getElementById("link").innerHTML
   var qrlink = document.getElementById("downloadLink")
   var qrdiv = document.getElementById("qrcode")
    //Creates Qr
    if (qrdiv.hasChildNodes()) {
      qrdiv.innerHTML =''
    }
    new QRCode(qrdiv, links)
    //gives time qrcode maker to render the image
    setTimeout(makeDownloadLink, 1000)

}

//grabs src from qr code and copies it to download link
function makeDownloadLink(){
  var qrlink = document.getElementById("downloadLink")
  qrlink.href = document.getElementsByTagName("img")[0].src
  qrlink.innerHTML = "Click here to downloar your QRcode"
}
//encrypt messaje
function encrypt(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}
function makeKey() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
