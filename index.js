// Add an Event listener to the button

const convertBtn = document.getElementById("convertBtn");
if (convertBtn !== null) {
  convertBtn.addEventListener("click", function () {
    // Event handler code here
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    // Make an API request to exchange rate API
    const apiurl =
      "https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/latest/" +
      fromCurrency;
    fetch(apiurl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").innerHTML =
          amount +
          " " +
          fromCurrency +
          " is equivalent to " +
          convertedAmount +
          " " +
          toCurrency;
      })
      .catch(function (err) {
        console.error("Error fetching exchange rate:", err);
      });
  });
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
  const toCurrency = document.getElementById("xRate").value;
  const apiurl =
    "https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/latest/USD";
  fetch(apiurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const rate = data.conversion_rates[toCurrency];
      document.getElementById("display").innerHTML =
        "Exchange rate" + " " + "=" + " " + rate;
    })
    .catch(function (err) {
      console.error("Error fetching exchange rate:", err);
    });
});

document.getElementById("codeBtn").addEventListener("click", function () {
  const myWord = document.getElementById("findCode").value;
  const UrlApi =
    "https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/codes";

  fetch(UrlApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let newWord = null;

      for (const currency of data.supported_codes) {
        if (currency[0] === myWord) {
          newWord = currency[1];
          break;
        }
      }

      if (newWord) {
        document.getElementById("displayFind").innerHTML = newWord;
      } else {
        document.getElementById("displayFind").innerHTML =
          "Country name not found for this code.";
      }
    });
});
