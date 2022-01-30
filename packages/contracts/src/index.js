import erc20Abi from "./abis/erc20";
import ownableAbi from "./abis/ownable";
import epnscoreAbi from "./abis/epnscore";
import daiAbi from "./abis/dai";
import epnsTokenAbi from "./abis/EPNS.json";
import stakingAbi from "./abis/Staking.json";
import yieldFarmingAbi from "./abis/YieldFarm.json";
import rockstarAbi from "./abis/Rockstar.json";
import ec721Abi from "./abis/ERC721.json";
import NFTRewards from "./abis/NFTRewards.json";
import MerkleDistributorAbi from "./abis/MerkleDistributor.json";
import UniswapV2Router02Abi from "./abis/UniswapV2Router02.json";

export const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  epnscore: epnscoreAbi,
  dai: daiAbi,
  epnsToken: epnsTokenAbi,
  staking: stakingAbi,
  yieldFarming: yieldFarmingAbi,
  rockstar: rockstarAbi,
  erc721: ec721Abi,
  NFTRewards: NFTRewards,
  distributor: MerkleDistributorAbi,
  uniswapV2Router02: UniswapV2Router02Abi,
};

export { default as addresses } from "./addresses";
