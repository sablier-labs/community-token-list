const { version } = require("../package.json");
const ethereum_mainnet = require("./tokens/ethereum_mainnet.json");
const ropsten = require("./tokens/ropsten.json");
const rinkeby = require("./tokens/rinkeby.json");
const goerli = require("./tokens/goerli.json");
const kovan = require("./tokens/kovan.json");
const polygon_mainnet = require("./tokens/polygon_mainnet.json");
const optimism_mainnet = require("./tokens/optimism_mainnet.json");
const arbitrum_mainnet = require("./tokens/arbitrum_mainnet.json");
const avalanche_mainnet = require("./tokens/avalanche_mainnet.json");
const bsc_mainnet = require("./tokens/bsc_mainnet.json");
const ronin_mainnet = require("./tokens/ronin_mainnet.json");
const ronin_testnet = require("./tokens/ronin_testnet.json");
const bridgeUtils = require('@uniswap/token-list-bridge-utils');

module.exports = function buildList() {
  const parsed = version.split(".");
  const l1List = {
    name: "Sablier Community Default",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://sablier.finance/icon.png",
    keywords: ["sablier", "default"],
    tokens: [...ethereum_mainnet, ...ropsten, ...goerli, ...kovan, ...rinkeby, ...polygon_mainnet, ...ronin_mainnet, ...ronin_testnet, ...optimism_mainnet, ...bsc_mainnet, ...avalanche_mainnet, ...arbitrum_mainnet]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
  return bridgeUtils.chainify(l1List);
};
