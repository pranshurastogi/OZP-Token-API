require('dotenv').config()
var express =  require('express');
var async = require('async');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction
var eth = require('web3-eth')
const stringify = require('json-stringify-safe')
var HookedWeb3Provider = require('hooked-web3-provider');
const await = require('await');
const app = express();
const bodyParser = require('body-parser');
var request = require("request");
var requireHeader = require('require-header');


const web3 = new Web3('https://mainnet.infura.io/v3/91fb417790664dc9ae4b321b138a3885')



const port = 3003;
app.use(express.json());



// Owner account 
var account = process.env.OWNER_ACC
var contractAddress = process.env.CONTRACT_ADD
const privateKey = Buffer.from(process.env.PRIV_KEY, 'hex')

// OZP Referral Account
var OZP_Ref_acc = process.env.OZP_REFERRAL_ACC
const OZP_Ref_PK = Buffer.from(process.env.OZP_REFERRAL_PK, 'hex')

// Ether sender account to user

var ETH_acc = process.env.ETH_SENDER_USER_ACC
const ETH_PK = process.env.ETH_SENDER_USER_PK




const myContract = new web3.eth.Contract([
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ozpDecimal",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "supplyRegulator",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "counter",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "Price_OZP_Euro",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lawEnforcementRole",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "supplyController",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "nextStep",
        "type": "string"
      }
    ],
    "name": "LogConstructorInitiated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "price",
        "type": "string"
      }
    ],
    "name": "LogPriceUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "description",
        "type": "string"
      }
    ],
    "name": "LogNewOraclizeQuery",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Pause",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Unpause",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "AddressFrozen",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "AddressUnfrozen",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "FrozenAddressWiped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "oldLawEnforcementRole",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newLawEnforcementRole",
        "type": "address"
      }
    ],
    "name": "LawEnforcementRoleSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SupplyIncreased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SupplyDecreased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "oldSupplyController",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newSupplyController",
        "type": "address"
      }
    ],
    "name": "SupplyControllerSet",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "myid",
        "type": "bytes32"
      },
      {
        "name": "result",
        "type": "string"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "myid",
        "type": "bytes32"
      },
      {
        "name": "result",
        "type": "string"
      },
      {
        "name": "proof",
        "type": "bytes"
      }
    ],
    "name": "__callback",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "updatePrice",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sendCoin",
    "outputs": [
      {
        "name": "sufficient",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newLawEnforcementRole",
        "type": "address"
      }
    ],
    "name": "setLawEnforcementRole",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "freeze",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "unfreeze",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "wipeFrozenAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "isFrozen",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newSupplyController",
        "type": "address"
      }
    ],
    "name": "setSupplyController",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "increaseSupply",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "decreaseSupply",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
],contractAddress, {
  defaultAccount:account, // default from address
  defaultGasPrice: '3000000' // default gas price in wei, 20 gwei in this case
});







// ---------------------------------------*****************************--------------------------------
// ------------------------------------Creating wallet address and accounts---------------------------------------
//----------------------------------------******************************---------------------------------





app.get('/getName',(req,res) => {
    myContract.methods.name().call().then(function(data){
        console.log("\n Name of token \t",data);
        res.send(data)
    }).catch(function(err) {
        console.log(err);
        res.send(err);
    });
  })


  app.get('/getSymbol',(req,res) => {
    myContract.methods.symbol().call().then(function(data){
        console.log("\n Symbol of token \t",data);
        res.send(data)
    }).catch(function(err) {
        console.log(err);
    });
  })


  app.get('/getDecimals',(req,res) => {
    myContract.methods.decimals().call().then(function(data){
        console.log("\n Decimals of token \t",data);
        res.json({"Decimals":data})
    }).catch(function(err) {
        console.log(err);
        res.json({"Error":err})

    });
  })




//-----------------------------------------Start of Transfer Function ---------------------------------
app.post('/transfer',(req,res) => {
    var address = req.body.address
    var amount = req.body.amount
    var sender = req.body.sender
    amount = amount.toFixed(3)
    var value = amount
    amount = amount * 1000 
    num = web3.utils.toBN(1000000000000000)
    amount = web3.utils.toBN(amount)
    var result = amount.mul(num)
    
    if (sender == account)
    {

    web3.eth.getTransactionCount(sender,(err,txCount) =>{
        console.log("In the Block")
        console.log("Error",err)
       
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        value:'0x00',
        data:myContract.methods.transfer(address,result).encodeABI(),
        gasLimit:web3.utils.toHex(62000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei')),
        chainId: 0x01
    }
    
    // console.log("Transaction Object",txObject)
    
    const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' },)
    // console.log("tx obj",tx)
    tx.sign(privateKey)
    const serializedTransaction = tx.serialize()
    
    // console.log("serialized Transaction",serializedTransaction)
    const raw = '0x'+ serializedTransaction.toString('hex')
    // console.log("Raw Transaction",raw)
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
      if(err)
      {
        res.json({ERROR:"Error - Possibly because of insufficent ETH  ",ERRMSG:err})
        console.log("Error",err)


      }
      else
      {
        console.log('txHash:',txHash)
        res.json({Tx:txHash,From:sender,value:value})
      }
    })
    })}
    else if (sender == OZP_Ref_acc)
    {

    web3.eth.getTransactionCount(sender,(err,txCount) =>{
        console.log("In the Block")
        console.log("Error",err)
       
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        value:'0x00',
        data:myContract.methods.transfer(address,result).encodeABI(),
        gasLimit:web3.utils.toHex(62000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei')),
        chainId: 0x01
    }
    
    // console.log("Transaction Object",txObject)
    
    const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' },)
    // console.log("tx obj",tx)
    tx.sign(OZP_Ref_PK)
    const serializedTransaction = tx.serialize()
    
    // console.log("serialized Transaction",serializedTransaction)
    const raw = '0x'+ serializedTransaction.toString('hex')
    // console.log("Raw Transaction",raw)
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
      if(err)
      {
        res.json({ERROR:"Error - Possibly because of insufficent ETH  "})
        console.log("Error",err)


      }
      else
      {
        console.log('txHash:',txHash)
        res.json({Tx:txHash,From:sender,value:value})
      }
    })
    })}

    else{
        var userPrivateKey = req.body.userPrivateKey
        const privateKeyUS = Buffer.from(userPrivateKey,'hex')


        web3.eth.getTransactionCount(sender,(err,txCount) =>{
            console.log("In the Block")
            console.log("Error",err)
           
        const txObject = {
            nonce:web3.utils.toHex(txCount),
            to:contractAddress,
            value:'0x00',
            data:myContract.methods.transfer(address,result).encodeABI(),
            gasLimit:web3.utils.toHex(62000),
            gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei')),
            chainId: 0x01
        }
        
        // console.log("Transaction Object",txObject)
        
        const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' },)
        console.log("tx obj",tx)
        tx.sign(privateKeyUS)
        const serializedTransaction = tx.serialize()
        
        console.log("serialized Transaction",serializedTransaction)
        const raw = '0x'+ serializedTransaction.toString('hex')
        console.log("Raw Transaction",raw)
        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
          if(err)
          {
            res.json({ERROR:"Error - Possibly because of insufficent ETH  "})
            console.log("Error",err)
  
  
          }
          else
          {
            console.log('txHash:',txHash)
            res.json({Tx:txHash,From:sender,value:value})
          }
          })
        })


    }


  })

//---------------------------------------End of Transfer Function------------------------------------




app.get('/getTotalSupply',(req,res) => {
    myContract.methods.totalSupply().call().then(function(data){
	var a = web3.utils.toBN(data)
      var result = web3.utils.fromWei(a, 'ether')
        console.log("\n Total SUpply \t",result);
        res.send(result)
    }).catch(function(err) {
        console.log(err);
    });
  })


app.get('/getOwner',(req,res) => {
myContract.methods.owner().call().then(function(data){
    console.log("\n Owner Address \t",data);
    res.send(data)
}).catch(function(err) {
    console.log(err);
});
})

app.get('/PriceOZP',(req,res) => {

  var data = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1'
  var options = { method: 'GET',
  url: 'https://api.pro.coinbase.com/products/ETH-EUR/ticker',
  headers: 
   { 'cache-control': 'no-cache', 'user-agent': data } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var obj = JSON.parse(body)
  var ozp_price = 1/obj['price']
  res.json({"OZP_ETH_PRICE":ozp_price})
});

  })







app.post('/BalanceOf',(req,res)=>{
    var address = req.body.address
    console.log(address)
    myContract.methods.balanceOf(address).call().then(function(data){
      var a = web3.utils.toBN(data)
      var result = web3.utils.fromWei(a, 'ether')
        console.log("\n User balance \t",result);
        res.send(result)
    }).catch(function(err) {
        console.log(err);
    });
})




app.post('/increaseSupply',(req,res) => {
    var amount = req.body.amount
    var sender = req.body.sender
    num = web3.utils.toBN(1000000000000000000)
    amount = web3.utils.toBN(amount)
    var result = amount.mul(num)

    
   

    web3.eth.getTransactionCount(sender,(err,txCount) =>{
        console.log("In the Block")
        console.log("Error",err)
       
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        value:'0x00',
        data:myContract.methods.increaseSupply(result).encodeABI(),
        gasLimit:web3.utils.toHex(62000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei')),
        chainId: 0x01
    }
    
    console.log("Transaction Object",txObject)
    
    const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' },)
    console.log("tx obj",tx)
    tx.sign(privateKey)
    const serializedTransaction = tx.serialize()
    
    console.log("serialized Transaction",serializedTransaction)
    const raw = '0x'+ serializedTransaction.toString('hex')
    console.log("Raw Transaction",raw)
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log("Error",err)
        console.log('txHash:',txHash)
        res.send(txHash)
    })
    })
  })


  app.post('/decreaseSupply',(req,res) => {
    var amount = req.body.amount
    var sender = req.body.sender
    num = web3.utils.toBN(1000000000000000000)
    amount = web3.utils.toBN(amount)
    var result = amount.mul(num)
   

    web3.eth.getTransactionCount(sender,(err,txCount) =>{
        console.log("In the Block")
        console.log("Error",err)
       
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        value:'0x00',
        data:myContract.methods.decreaseSupply(result).encodeABI(),
        gasLimit:web3.utils.toHex(62000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei')),
        chainId: 0x01
    }
    
    console.log("Transaction Object",txObject)
    
    const tx = new Tx(txObject, { chain: 'mainnet', hardfork: 'petersburg' },)
    console.log("tx obj",tx)
    tx.sign(privateKey)
    const serializedTransaction = tx.serialize()
    
    console.log("serialized Transaction",serializedTransaction)
    const raw = '0x'+ serializedTransaction.toString('hex')
    console.log("Raw Transaction",raw)
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log("Error",err)
        console.log('txHash:',txHash)
        res.send(txHash)
    })
    })
  })




app.post('/transactionHash',(req,res) => {
    var hash = req.body.hash
    var txReceipt;
  
    console.log(hash)
  
    web3.eth.getTransactionReceipt(hash,(err,txReceipt) =>{
        console.log("In the Block",txReceipt)
        console.log("Error",err)
        res.send(txReceipt)       

    })

  })


//0.0028 ETH 45gwei

app.post('/getEtherBalance',async(req,res) =>
{
  var address = req.body.address;
  console.log(address)
 web3.eth.getBalance(address).then(s => {
  var result = web3.utils.fromWei(s, 'ether')  
  console.log(result)
    res.json({"ETH_balance":result})
   }).catch(err =>{
    console.log("Error", err)
    res.send(err)
   })
})


app.post('/sendETH',(req,res) => {
  var amount = req.body.amount
  var receiver = req.body.receiver
  var sender = req.body.sender
  var SenderPrivateKey = req.body.SenderPrivateKey 
  console.log("Amount",amount)
  var privateKeyUS = ''
  if(sender == account)
  {
    privateKeyUS = privateKey
  }
  else
  {
   privateKeyUS = Buffer.from(SenderPrivateKey,'hex')
  }
  
  try {
  web3.eth.getTransactionCount(sender,(err,txCount) =>{
      console.log("In the Block")
      console.log("Error",err)
     
      const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:receiver,
        value:web3.utils.toHex(web3.utils.toWei(amount,'ether')),
        gasLimit:web3.utils.toHex(62000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('45','gwei'))
    }
  
  console.log("Transaction Object",txObject)
  
  const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' },)
  console.log("tx obj",tx)
  tx.sign(privateKeyUS)
  const serializedTransaction = tx.serialize()
  
  console.log("serialized Transaction",serializedTransaction)
  const raw = '0x'+ serializedTransaction.toString('hex')
  console.log("Raw Transaction",raw)
  web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
    if (err)
        {
          res.json({"ERROR":"POSSIBLY INSUFFICENT ETH"})
          console.log("Error",err)
        }
    else{
        console.log('txHash:',txHash)
        res.json({Success:1,TxHash:txHash})
        }
  })
  })
}
catch(error){
  error = error.toString();
  res.json({Success:0,Error:error})

}
  })
  
  













  // Start the server
  const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
})


