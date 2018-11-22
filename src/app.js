document.getElementById("boton").addEventListener("click", medPass);
var IPFS = require('ipfs-api')

function medPass() {
    const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })

    document.getElementById('love').innerHTML = document.getElementById('textfield').value
    var toStore = document.getElementById('toUp').innerHTML
    ipfs.add(Buffer.from(toStore), function (err, res) {
      if (err || !res) {
        return console.error('ipfs add error', err, res)
      }

      res.forEach(function (file) {
        if (file && file.hash) {
          console.log('successfully stored', file.hash)
          addQrLink(file.hash)
        }
      })
    })
    }

function addQrLink(fileAdded){
  //Creates link to file added
   document.getElementById("link").innerHTML= "https://ipfs.infura.io/ipfs/"+ fileAdded
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
  var imgsrc = document.getElementsByTagName("img")[0].src
  qrlink.href = imgsrc
  qrlink.innerHTML = "Click here to downloar your QRcode"
}
