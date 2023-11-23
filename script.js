document.addEventListener('DOMContentLoaded', function () {
    const cookieButton = document.getElementById('cookie');
    const cookieCountSpan = document.getElementById('cookie-count');
    const buyAutoClickerButton = document.getElementById('buy-auto-clicker');
    const autoClickerButton = document.getElementById('auto-clicker');
    const autoClickerPriceSpan = document.getElementById('auto-clicker-price');
    const buyGrandmaButton = document.getElementById('buy-grandma');
    const grandmaButton = document.getElementById('grandma');
    const grandmaPriceSpan = document.getElementById('grandma-price');

    let cookieCount = 0;
    let autoClickerCount = 0;
    let grandmaCount = 0;
    let purchasedAutoClickers = 0;
    let purchasedGrandmas = 0;
    let cookiesPerSecond = 0;
    let autoClickerIntervals = [];

    // Function to update the cookie count on the page
    function updateCookieCount() {
        cookieCountSpan.textContent = cookieCount;
    }

    // Function to update the auto clicker button text
    function updateAutoClickerButton() {
        autoClickerButton.textContent = `Auto Clicker (${autoClickerCount}) (Cookies/sec: ${autoClickerCount})`;
    }

    // Function to update the grandma button text
    function updateGrandmaButton() {
        grandmaButton.textContent = `Grandma (${grandmaCount}) (Cookies/sec: ${grandmaCount * 5})`;
    }

    // Function to update the auto clicker price text
    function updateAutoClickerPrice() {
        autoClickerPriceSpan.textContent = `Price: ${10 + purchasedAutoClickers * 5} Cookies`;
        autoClickerPriceSpan.style.color = '#AEF98D';
    }

    // Function to update the grandma price text
    function updateGrandmaPrice() {
        grandmaPriceSpan.textContent = `Price: ${100 + purchasedGrandmas * 10} Cookies`;
        grandmaPriceSpan.style.color = '#AEF98D';
    }

    // Function to start an auto clicker at a 1-second interval
    function startAutoClicker() {
        autoClickerIntervals.push(
            setInterval(function () {
                cookieCount += autoClickerCount; // Add cookies per second for each auto clicker
                updateCookieCount();
            }, 1000)
        );
    }

    // Event listener for the cookie button click
    cookieButton.addEventListener('click', function () {
        // Increment the cookie count
        cookieCount++;

        // Update the cookie count on the page
        updateCookieCount();
    });

    // Function to handle the purchase of an auto clicker
    function purchaseAutoClicker() {
        // Spend 10 + (5 * purchasedAutoClickers) cookies to purchase an auto clicker
        const autoClickerPrice = 10 + purchasedAutoClickers * 5;
        if (cookieCount >= autoClickerPrice) {
            cookieCount -= autoClickerPrice;
            purchasedAutoClickers++;

            // Increase cookies per second with the number of auto clickers
            autoClickerCount = purchasedAutoClickers;
            cookiesPerSecond = autoClickerCount;

            // Start the new auto clicker(s) automatically
            startAutoClicker();

            // Update the cookie count, auto clicker button text, price, and cookies per second
            updateCookieCount();
            updateAutoClickerButton();
            updateAutoClickerPrice();
        }
    }

    // Event listener for the buy auto clicker button click
    buyAutoClickerButton.addEventListener('click', function () {
        purchaseAutoClicker();
    });

    // Function to handle the purchase of a grandma
    function purchaseGrandma() {
        // Spend 100 + (10 * purchasedGrandmas) cookies to purchase a grandma
        const grandmaPrice = 100 + purchasedGrandmas * 10;
        if (cookieCount >= grandmaPrice) {
            cookieCount -= grandmaPrice;
            grandmaCount++;
            purchasedGrandmas++;

            // Increase cookies per second with the number of grandmas
            cookiesPerSecond += purchasedGrandmas * 5;

            // Update the cookie count, grandma button text, price, and cookies per second
            updateCookieCount();
            updateGrandmaButton();
            updateGrandmaPrice();
        }
    }

    // Event listener for the buy grandma button click
    buyGrandmaButton.addEventListener('click', function () {
        purchaseGrandma();
    });

    // Event listener for the grandma button click
    grandmaButton.addEventListener('click', function () {
        // Start the grandma at a 1-second interval
        const grandmaInterval = setInterval(function () {
            cookieCount += grandmaCount * 5; // Add cookies per second for each grandma
            updateCookieCount();
        }, 1000);

        // Disable the button during grandma activity
        grandmaButton.disabled = true;

        // Stop the grandma after 30 seconds (for demonstration purposes)
        setTimeout(function () {
            clearInterval(grandmaInterval);
            grandmaButton.textContent = `Grandma (${grandmaCount}) (Cookies/sec: ${grandmaCount * 5}) (Expired)`;
            grandmaButton.disabled = false;
        }, 30000);
    });

    // Start the auto clickers automatically when the page loads
    startAutoClicker();

    // Update the initial prices beneath the buttons
    updateAutoClickerPrice();
    updateGrandmaPrice();
});
