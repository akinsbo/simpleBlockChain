# My Blockchain Sample


Safety comes mostly from this line:

```js
        newBlock.previousHash = this.getLatestBlock().hash;
```
The next block typically saves the correct hash of the block we want to attack

#### Setting Current previousHash to Hash of Previous Block
```js
        saveTheIdea.chain[index].hash = saveTheIdea.chain[index+1].previousHash;
```

 breaks isValid() at: 

```js
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
```
#### Setting Current Hash to PreviousHash of Next Block
```js
        saveTheIdea.chain[index].hash = saveTheIdea.chain[index+1].previousHash;
```
 breaks isValid() at:

```js
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
```

Obviously, this is just a proof of concept. Other activities related to a blockchain are not included.