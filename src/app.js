

document.getElementById("boton").addEventListener("click", medPass);

function medPass() {
    const IPFS = require('ipfs')

    const options = {
     "API": {
        "HTTPHeaders": {
            "Access-Control-Allow-Origin": [
                "*"
            ],
            "Access-Control-Allow-Methods": [
                "GET",
                "POST"
            ],
            "Access-Control-Allow-Headers": [
                "Authorization"
            ],
            "Access-Control-Expose-Headers": [
                "Location"
            ],
            "Access-Control-Allow-Credentials": [
                "true"
            ]
        }
     }
    }
    const node = new IPFS(options);
    //starts
    node.on('ready', async () => {
    //Adds file to ipfs
    const filesAdded = await node.files.add({
        path: 'text.txt',
        content: Buffer.from(document.getElementById("textfield").value)
      })
     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    //Creates link to file added
     document.getElementById("link").innerHTML= "https://ipfs.io/ipfs/"+filesAdded[0].hash
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
      });
      //grabs src from qr code and copies it to download link
    function makeDownloadLink(){
      var qrlink = document.getElementById("downloadLink")
      var imgsrc = document.getElementsByTagName("img")[0].src
      qrlink.href = imgsrc
      qrlink.innerHTML = "Click here to downloar your QRcode"
    }
}
