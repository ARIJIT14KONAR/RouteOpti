// Fetch State and City for Warehouse
document.getElementById("warehouse-pincode").addEventListener("blur", function() {
    const pincode = this.value.trim();
    if (pincode) {
        fetchStateCityFromPincode(pincode);
    }
});

// Address suggestions using HERE API
const apiKey = 'TyFZmoBafZzGPMstD5qWTtUrWu7CGG26oXbZehEsRs0';

async function getAddressSuggestions() {
    const query = document.getElementById('warehouse-address').value;

    if (query.length < 3) {
        document.getElementById('suggestionsList').innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://browse.search.hereapi.com/v1/discover?q=${query}&at=28.6139,77.2090&limit=5&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.items) {
            displaySuggestions(data.items);
        } else {
            document.getElementById('suggestionsList').innerHTML = '<li>No suggestions found</li>';
        }
    } catch (error) {
        document.getElementById('suggestionsList').innerHTML = '<li>Error fetching suggestions</li>';
    }
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion.address.label;
        listItem.addEventListener('click', function() {
            document.getElementById('warehouse-address').value = suggestion.address.label;
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(listItem);
    });
}

document.getElementById('warehouse-address').addEventListener('keyup', function() {
    getAddressSuggestions();
});
