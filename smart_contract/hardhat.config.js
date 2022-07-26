require('@nomiclabs/hardhat-waffle')

module.exports= {
  solidity: '0.8.0',
  networks: {
    goerli:{
      url: 'https://eth-goerli.alchemyapi.io/v2/7CdbjUPk8P3FAdwuI1sYh5V0zdW8X3c8',
      accounts: ['b4bd9615b24d9d780ce31f6d28af2a12c0894fb92cdf300efbb1af312cd594cf']
    }
  }
}