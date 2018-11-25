document.getElementById("boton").addEventListener("click", medPass);

var IPFS = require('ipfs-api')
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

//makes links: ipfs link and download qr link
function addQrLink(hashAdded){
  //Creates link to file added
   document.getElementById("link").innerHTML= "https://ipfs.infura.io/ipfs/"+ hashAdded
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

  document.getElementById("butonD").addEventListener("click", display)
  function display(){
  var hash = "QmWn7UKhENJAfSpMCqewPrizM6R8byVNSh35XWHbMeE2o1"
  document.getElementById('hash1').innerHTML = hash
  }
