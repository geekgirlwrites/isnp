document.getElementById('checkPhishing').addEventListener("click", checkPhishing)
document.getElementById('checkURL').addEventListener("click", checkPhishingURL)
function checkPhishingURL() {
  const urlInput = document.getElementById('urlInput');
  const resultDiv = document.getElementById('result');

  const apiUrl = 'https://www.ipqualityscore.com/api/json/url/ayb7ip6d1Ckc9dAbmeMPplfsFd8GpCQY/'; // Replace with the actual API endpoint

  // Perform the API request
  console.log(urlInput.value)
  var host = new URL(urlInput.value)
  host = host.hostname
  fetch(apiUrl + host)
    .then(response => response.json())
    .then(data => {
      // Process the API response
      resultDiv.innerHTML = `Domain: ${host} \n Phishing: ${data.unsafe} \n Risk Score: ${data.risk_score}`;
    })
    .catch(error => {
      resultDiv.innerHTML = 'Error checking phishing status';
      console.error('Error:', error);
    });
}
function checkPhishing() {
    const resultDiv = document.getElementById('result');
  
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const apiUrl = 'https://www.ipqualityscore.com/api/json/url/ayb7ip6d1Ckc9dAbmeMPplfsFd8GpCQY/'; // Replace with the actual API endpoint
  
        // Perform the API request
        const current_url = currentTab.url
        var host = new URL(current_url)
        host = host.hostname
        console.log(host)
      fetch(apiUrl + encodeURIComponent(host))
        .then(response => response.json())
        .then(data => {
          // Process the API response
          resultDiv.innerHTML = `Domain: ${host} <br> Phishing: ${data.risk_score > 60 ? true : false} <br> Risk Score: ${data.risk_score}`;
        })
        .catch(error => {
          resultDiv.innerHTML = 'Error checking phishing status';
          console.error('Error:', error);
        });
    });
  }
  