var form = document.querySelector('#form');
var amount = document.querySelector("#amount");
var option = document.querySelector("#option");
var button = document.querySelector("#submitBtn");

option.addEventListener('change', () => {
    if (option.value == "get") {
        amount.disabled = true;
        button.disabled = true;
        App.getBalance();
    } else {
        amount.disabled = false;
        button.disabled = false;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(amount.value);
    console.log(option.value);
    if (option.value == "deposit") {
        App.depositBalance(amount.value);
    } else {
        App.withdrawBalance(amount.value);
    }
});