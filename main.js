const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index
            + this.previousHash
            + this.timestamp
            + JSON.stringify(this.data)).toString();
    }
}


class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "First block created", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    //verify integrity
    isChainValid(){
        //since block 0 is the genesis block, we begin verification @ block 1
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log(JSON.stringify("exiting at one", null, 4));
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                console.log(JSON.stringify("exiting at two", null, 4));
                return false;
            }
        }

        return true;
    }
}

////////////////////////////////////////////////////////////////
let saveTheIdea = new Blockchain();
saveTheIdea.addBlock(new Block(1, "02/08/2017", { amount: 4 }));
saveTheIdea.addBlock(new Block(2, "04/08/2017", { amount: 10 }));

console.log(JSON.stringify(saveTheIdea, null, 4));

console.log('Is the blockchain valid? ' + saveTheIdea.isChainValid());
//let's tamper with the block
index = 1;
saveTheIdea.chain[index].data = {amount: 100};
saveTheIdea.chain[index].hash = saveTheIdea.chain[index].calculateHash();
saveTheIdea.chain[index].previousHash = saveTheIdea.chain[index-1].hash;
saveTheIdea.chain[index].hash = saveTheIdea.chain[index+1].previousHash;

console.log(JSON.stringify(saveTheIdea, null, 4));

console.log('Is the blockchain valid? ' + saveTheIdea.isChainValid());
