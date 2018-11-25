
//  document.getElementById("butonD").addEventListener("click", display)

  var IPFS = require('ipfs-api')
  const ipfs = new IPFS({ host: "ipfs.infura.io", port: 5001, protocol: "https" })


  var hash1 = "Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a"

  function display (hash) {
    ipfs.cat(hash, function (err, res) {
      if (err || !res) {
        return console.error('ipfs cat error', err, res)
      }
      console.log(hash1)
      document.getElementById('hash').innerText = hash1
      document.getElementById('content').innerText = res.toString()
    })
  }

  display(hash1)
