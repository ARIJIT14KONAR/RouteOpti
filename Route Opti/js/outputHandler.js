// Consolidate and Display Data
document.getElementById("submit-btn").addEventListener("click", function() {
    let output = "<h4>Warehouse Details</h4>";
    const warehouseAddress = document.getElementById("warehouse-address").value;
    const warehousePincode = document.getElementById("warehouse-pincode").value;
    const warehouseState = document.getElementById("warehouse-state").value;
    const warehouseCity = document.getElementById("warehouse-city").value;
    output += `<p><strong>Warehouse:</strong> ${warehouseAddress}, ${warehouseCity}, ${warehouseState} - ${warehousePincode}</p>`;

    // Delivery Locations Output
    output += "<h4>Delivery Locations</h4>";
    deliveryLocations.forEach((location, index) => {
        output += `<p><strong>Location ${index + 1}</strong>: ${location.address}, ${location.pincode}, Weight: ${location.weight}kg, Priority: ${location.priority}</p>`;
    });

    // Vehicle Details Output
    output += "<h4>Vehicles</h4>";
    for (let category in vehicles) {
        output += `<h5>${category.charAt(0).toUpperCase() + category.slice(1)} (${vehicles[category].length}):</h5>`;
        vehicles[category].forEach((vehicle, index) => {
            output += `<p>Vehicle ${index + 1}: ${vehicle}</p>`;
        });
    }

    document.getElementById("output").innerHTML = output;
});
