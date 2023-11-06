const { version } = require("../package.json");

const arbitrum_mainnet = require("./tokens/arbitrum_mainnet.json");
const avalanche_mainnet = require("./tokens/avalanche_mainnet.json");
const base_mainnet = require("./tokens/base_mainnet.json");
const bsc_mainnet = require("./tokens/bsc_mainnet.json");
const ethereum_mainnet = require("./tokens/ethereum_mainnet.json");
const gnosis_mainnet = require("./tokens/gnosis_mainnet.json");
const goerli = require("./tokens/goerli.json");
const optimism_mainnet = require("./tokens/optimism_mainnet.json");
const polygon_mainnet = require("./tokens/polygon_mainnet.json");
const ronin_mainnet = require("./tokens/ronin_mainnet.json");
const ronin_testnet = require("./tokens/ronin_testnet.json");
const scroll_testnet = require("./tokens/scroll_mainnet.json");

const bridgeUtils = require("@uniswap/token-list-bridge-utils");

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
    logoURI: "https://files.sablier.com/icon-180x180.png",
    keywords: ["sablier", "default"],
    tokens: [
      ...ethereum_mainnet,
      ...avalanche_mainnet,
      ...arbitrum_mainnet,
      ...base_mainnet,
      ...bsc_mainnet,
      ...goerli,
      ...gnosis_mainnet,
      ...optimism_mainnet,
      ...polygon_mainnet,
      ...ronin_mainnet,
      ...ronin_testnet,
      ...scroll_testnet,
    ]
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
