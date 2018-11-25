
//  document.getElementById("butonD").addEventListener("click", display)

  var IPFS = require('ipfs-api')
  const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })



  function display (hash) {
    ipfs.cat(hash, function (err, res) {
      if (err || !res) {
        return console.error('ipfs cat error', err, res)
      }
      document.getElementById('hash').innerText = hash
      document.getElementById('content').innerText = res.toString()
    })
  }


const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('hash');
display(myParam)
