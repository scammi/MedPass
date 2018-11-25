
//  document.getElementById("butonD").addEventListener("click", display)

  var IPFS = require('ipfs-api')
  const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })



  function display (hash) {
    ipfs.cat(hash, function (err, res) {
      if (err || !res) {
        return console.error('ipfs cat error', err, res)
      }
      var elementIn = res.toString()
      document.getElementById('hash').innerText = hash
      var div = document.createElement('div');
      div.innerHTML= elementIn
      document.getElementById('content').appendChild(div)
    })
  }

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('hash');
display(myParam)
