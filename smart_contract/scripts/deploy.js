const main = async () => {
  const Billboards = await hre.ethers.getContractFactory("Billboards");
  const billboards = await Billboards.deploy();

  await billboards.deployed();

  console.log("Billboards deployed to:", billboards.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error){
    console.error(error)
    process.exit(1);
  }
}

runMain();