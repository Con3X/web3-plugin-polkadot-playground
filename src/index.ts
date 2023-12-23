import { Web3 } from 'web3';
import { PolkaPlugin } from '@conx3/web3-plugin-polkadot';

// the following shows how to use the plugin
// you can call any rpc method using the convention:
// web3.polka.<network>.rpc.<namespace>.<method>
async function main() {
  const web3 = new Web3('wss://rpc.polkadot.io');
  const polkadotPlugin = new PolkaPlugin();
  web3.registerPlugin(polkadotPlugin);
  // to get the last block from Polkadot network
  const polkadotBlock = await web3.polka.polkadot.rpc.chain.getBlock();

  // call many web3 methods as usual...
  // Like updating the provider to Kusama network:
  web3.provider = 'wss://kusama-rpc.polkadot.io';
  // to get the last block from Kusama network
  const kusamaBlock = await web3.polka.kusama.rpc.chain.getBlock();

  // Updating the provider to a local substrate node for example:
  web3.provider = 'ws://127.0.0.1:9944/';
  web3.provider?.on('error', (error: any) => {
    console.error(
      'Caught provider error' + '(double check your running local node at port 9944): ',
      error.message || error,
    );
  });
  // to get the last block from a Substrate network
  const substrateBlock = await web3.polka.substrate.rpc.chain.getBlock();

  console.log('polkadot block header stateRoot:', polkadotBlock.block.header.stateRoot);
  console.log('kusama block header stateRoot:', kusamaBlock.block.header.stateRoot);
  console.log('substrate block header stateRoot:', substrateBlock.block.header.stateRoot);

  // stateRoot is something like: 0xa18402bc3a2249d...

  // if you want to log the full response
  console.log(JSON.stringify(substrateBlock, null, 2));
  // {
  //   "jsonrpc": "2.0",
  //   "result": {
  //     "block": {
  //       "header": {
  //         "parentHash": "0x205d46cdcd9db4...",
  //         "number": "0x6cc7",
  //         "stateRoot": "0xa18402bc3a2249d...",
  //         "extrinsicsRoot": "0x345fc26b56a2a68...",
  //         "digest": {
  //           "logs": [
  //             "0x0661757261203b5ee81000000000",
  //             "0x056175726101011..."
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