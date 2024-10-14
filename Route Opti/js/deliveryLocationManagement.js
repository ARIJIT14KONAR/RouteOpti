let deliveryLocations = [];

// Fetch State and City from Pincode
function fetchStateCityFromPincode(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data[0].Status === "Success") {
                const postOfficeData = data[0].PostOffice[0];
                document.getElementById("warehouse-state").value = postOfficeData.State;
                document.getElementById("warehouse-city").value = postOfficeData.Block;
            } else {
                alert("Invalid Pincode. Please try again.");
            }
        })
        .catch(error => console.error("Error fetching data from API:", error));
}

// Add Delivery Location
document.getElementById("add-location-btn").addEventListener("click", function() {
    const pincode = document.getElementById("pincode").value;
    const address = document.getElementById("address").value;
    const weight = document.getElementById("weight").value;
    const priority = document.getElementById("priority").value;

    if (pincode && address && weight && priority) {
        deliveryLocations.push({ pincode, address, weight, priority });
        alert("Delivery Location Added!");
    } else {
        alert("Please fill in all fields!");
    }
});

// Remove Last Delivery Location
document.getElementById("remove-location-btn").addEventListener("click", function() {
    if (deliveryLocations.length > 0) {
        deliveryLocations.pop();
        alert("Last Delivery Location Removed!");
    } else {
        alert("No delivery locations to remove!");
    }
});
