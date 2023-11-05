// Variables
const fromCurrencyInput = document.getElementById("fromCurrency");
const toCurrencyInput = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");

// Event listeners
document.getElementById("convertBtn").addEventListener("click", handleCurrencyConversion);
document.getElementById("searchBtn").addEventListener("click", handleExchangeRateLookup);
document.getElementById("codeBtn").addEventListener("click", handleCurrencyCodeLookup);

// Load comments from local storage on page load
const commentsContainer = document.getElementById("comments");
const commentText = document.getElementById("comment-text");
const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", handleCommentSubmission);

// Load comments from local storage on page load
const comments = loadCommentsFromLocalStorage();
displayComments(comments);

// Function to load comments from local storage
function loadCommentsFromLocalStorage() {
  const commentsJSON = localStorage.getItem("comments");
  return commentsJSON ? JSON.parse(commentsJSON) : [];
}

// Function to save comments to local storage
function saveCommentsToLocalStorage(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Function to display comments
function displayComments(comments) {
  commentsContainer.innerHTML = "";
  for (const comment of comments) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.textContent = comment;
    commentsContainer.appendChild(commentElement);
  }
}

// Event handler for currency conversion
function handleCurrencyConversion() {
  const fromCurrency = fromCurrencyInput.value;
  const toCurrency = toCurrencyInput.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultDisplay.innerHTML = "Please enter a valid amount.";
    return;
  }

  fetchExchangeRate(fromCurrency, toCurrency, amount);
}

// Function to fetch exchange rate
function fetchExchangeRate(fromCurrency, toCurrency, amount) {
  const apiurl = `https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/latest/${fromCurrency}`;

  fetch(apiurl)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDisplay.innerHTML = `${amount} ${fromCurrency} is equivalent to ${convertedAmount} ${toCurrency}`;
    })
    .catch(error => {
      console.error("Error fetching exchange rate:", error);
      resultDisplay.innerHTML = "Error fetching exchange rate.";
    });
}

// Event handler for exchange rate lookup
function handleExchangeRateLookup() {
  const toCurrency = document.getElementById("xRate").value;
  const apiurl = "https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/latest/USD";

  fetch(apiurl)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[toCurrency];
      document.getElementById("display").innerHTML = `Exchange rate = ${rate}`;
    })
    .catch(error => {
      console.error("Error fetching exchange rate:", error);
      document.getElementById("display").innerHTML = "Error fetching exchange rate.";
    });
}

// Event handler for currency code lookup
function handleCurrencyCodeLookup() {
  const myWord = document.getElementById("findCode").value;
  const UrlApi = "https://v6.exchangerate-api.com/v6/218938046c0019a4b22b42f1/codes";

  fetch(UrlApi)
    .then(response => response.json())
    .then(data => {
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
        document.getElementById("displayFind").innerHTML = "Country name not found for this code.";
      }
    })
    .catch(error => {
      console.error("Error fetching currency code:", error);
      document.getElementById("displayFind").innerHTML = "Error fetching currency code.";
    });
}

// Event handler for adding a comment
function handleCommentSubmission(e) {
  e.preventDefault();

  const newComment = commentText.value.trim();
  if (newComment !== "") {
    comments.push(newComment);
    saveCommentsToLocalStorage(comments);
    displayComments(comments);
    commentText.value = "";
  }
}
