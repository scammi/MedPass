document.getElementById("boton").addEventListener("click", myFunction);

var links;

function myFunction() {
    //Initializes node
    const IPFS = require('ipfs')
    const node = new IPFS()

    node.on('ready', async () => {
    const version = await node.version()
    
    //Adds file to ipfs
    const filesAdded = await node.files.add({
        path: 'text.txt',
        content: Buffer.from(document.getElementById("textfield").value)
      })
     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
     
    //Makes creates link to file added
     document.getElementById("link").innerHTML= "https://ipfs.io/ipfs/"+filesAdded[0].hash
     links = document.getElementById("link").innerHTML   
     node.stop(() => {
        console.log("done")
        })
            
    //Creates Qr     
    new QRCode(document.getElementById("qrcode"), links);
        
    });
    
   
}

