App = {
    web3Provider: null,
    contracts: {},

    init: async() => {
        return App.initWeb3();
    },

    initWeb3: async function() {
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },


    initContract: () => {
        $.getJSON("Xcoin.json", (xcoin) => {
            // Instantiate a new truffle contract from the artifact
            var XcoinArtifact = xcoin;
            App.contracts.Xcoin = TruffleContract(XcoinArtifact);
            // Connect provider to interact with contract
            App.contracts.Xcoin.setProvider(App.web3Provider);
            return App.render();
        });
    },

    render: () => {
        var xcoinInstance;
        web3.eth.getCoinbase((err, account) => {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });
    },

    getBalance: () => {
        App.contracts.Xcoin.deployed().then((instance) => {
            xcoinInstance = instance;
            return instance.getBalance();
        }).then((balance) => {
            alert('Votre solde actuel est de: ' + balance + ' ETH 🤑');
        })
    },

    depositBalance: (amount) => {
        App.contracts.Xcoin.deployed().then((instance) => {
            return instance.depositBalance(amount, { from: App.account });
        }).then(() => {
            alert('Votre dépot de : ' + amount + ' ETH a été bien prise en compte 🤑!');
            $("#form")[0].reset();
        })
    },

    withdrawBalance: (amount) => {
        App.contracts.Xcoin.deployed().then((instance) => {
            return instance.withdrawBalance(amount, { from: App.account });
        }).then(() => {
            alert('Votre retrait de : ' + amount + ' ETH a été bien prise en compte 🤫!');
            $("#form")[0].reset();
        })
    }

};

$(() => {
    $(window).load(() => {
        App.init();
    });
});