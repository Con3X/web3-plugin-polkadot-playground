import { Web3 } from 'web3';
import { PolkaPlugin } from '@conx3/web3-plugin-polkadot';

// the following shows how to use the plugin
// you can call any rpc method using the convention: web3.polka.<network>.<namespace>.<method>
async function main() {
  const web3 = new Web3('wss://rpc.polkadot.io');
  web3.provider?.on('error', (error: any) => {
    console.error('Caught provider error when connecting to Polkadot: ', error.message || error);
  });
  const polkadotPlugin = new PolkaPlugin();
  web3.registerPlugin(polkadotPlugin);
  // to get the last block from Polkadot network
  const polkadotBlockData = await web3.polka.polkadot.rpc.chain.getBlock();

  // call web3 methods as usual. Like updating the provider to Kusama network:
  web3.provider = 'wss://kusama-rpc.polkadot.io';
  web3.provider?.on('error', (error: any) => {
    console.error('Caught provider error when connecting to Kusama: ', error.message || error);
  });
  // to get the last block from Kusama network
  const kusamaBlockData = await web3.polka.kusama.rpc.chain.getBlock();

  // Updating the provider to a local substrate node for example:
  web3.provider = 'ws://127.0.0.1:9944/';
  web3.provider?.on('error', (error: any) => {
    console.error(
      'Caught provider error (double check your running local node at port 9944): ',
      error.message || error,
    );
  });
  // to get the last block from a Substrate network
  const substrateBlockData = await web3.polka.substrate.rpc.chain.getBlock();

  console.log('polkadot block header stateRoot:', polkadotBlockData.block.header.stateRoot);
  console.log('kusama block header stateRoot:', kusamaBlockData.block.header.stateRoot);
  console.log('substrate block header stateRoot:', substrateBlockData.block.header.stateRoot);

  // stateRoot is something like: 0xa18402bc3a2249d6af8e2ad6241e5b1b60360abd1b4e2c7c733c8c980331d278

  // if you want to log the full response
  // console.log(JSON.stringify(substrateBlockData, null, 2));
  // {
  //   "jsonrpc": "2.0",
  //   "result": {
  //     "block": {
  //       "header": {
  //         "parentHash": "0x205d46cdcd9db4f795067718ef73292ab065aa08cec1ad6788b2c24028b160ea",
  //         "number": "0x6cc7",
  //         "stateRoot": "0xa18402bc3a2249d6af8e2ad6241e5b1b60360abd1b4e2c7c733c8c980331d278",
  //         "extrinsicsRoot": "0x345fc26b56a2a682a52ab5860b18df0a1698b0a6ac0cadd9bcba713d1a6f54d0",
  //         "digest": {
  //           "logs": [
  //             "0x0661757261203b5ee81000000000",
  //             "0x05617572610101187f7e10b05cd255b4ab0d3894b2c3c15bc4294a4124a7188981e3833af3440ae4322bec54ff65cb561e9fdfb4d02a5496fc64ea5991fcd4d42b43c48cd2588d"
  //           ]
  //         }
  //       },
  //       "extrinsics": [
  //         "0x280401000bd08620468c01"
  //       ]
  //     },
  //     "justifications": null
  //   },
  //   "id": 43
  // }
}
main();

// // Import the API
// import { ApiPromise } from '@polkadot/api';

// async function main() {
//   // Here we don't pass the (optional) provider, connecting directly to the default
//   // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
//   // the API has connected to the node and completed the initialisation process
//   const api = await ApiPromise.create();

//   // We only display a couple, then unsubscribe
//   let count = 0;

//   // Subscribe to the new headers on-chain. The callback is fired when new headers
//   // are found, the call itself returns a promise with a subscription that can be
//   // used to unsubscribe from the newHead subscription
//   const unsubscribe = await api.rpc.chain.subscribeNewHeads((header: any) => {
//     console.log(`Chain is at block: #${header.number}`);

//     if (++count === 256) {
//       unsubscribe();
//       process.exit(0);
//     }
//   });
// }

// main().catch(console.error);
