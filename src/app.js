var links;

document.getElementById("boton").addEventListener("click", myFunction);
function myFunction() {
    //Initializes node
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

    node.on('ready', async () => {
    const version = await node.version()

    //Adds file to ipfs
    const filesAdded = await node.files.add({
        path: 'text.txt',
        content: Buffer.from(document.getElementById("textfield").value)
      })
     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)

    //Creates link to file added
     document.getElementById("link").innerHTML= "https://ipfs.io/ipfs/"+filesAdded[0].hash
     links = document.getElementById("link").innerHTML

    //Creates Qr
    var qrdiv = document.getElementById("qrcode")
    new QRCode(qrdiv, links)
    var imgsrc = document.getElementsByTagName("img")[0].src
    var url = imgsrc.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
    document.getElementById("downloadLink").href = url
    });
}
