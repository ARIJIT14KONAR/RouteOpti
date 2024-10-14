// Vehicle data structure
let vehicles = {
    bike: [],
    truck: [],
    van: []
};

// Function to update vehicle count display
function updateVehicleCount() {
    document.getElementById("bike-count").textContent = `Bikes: ${vehicles.bike.length}`;
    document.getElementById("truck-count").textContent = `Trucks: ${vehicles.truck.length}`;
    document.getElementById("van-count").textContent = `Vans: ${vehicles.van.length}`;
}

// Add Vehicle
document.getElementById("add-vehicle-btn").addEventListener("click", function() {
    const vehicleType = document.getElementById("vehicle-type").value;
    const vehicleName = document.getElementById("vehicle-name").value;

    if (vehicleType && vehicleName) {
        vehicles[vehicleType].push(vehicleName);
        alert(`${vehicleName} added to ${vehicleType} category!`);
        updateVehicleCount();
    } else {
        alert("Please select a vehicle type and enter a vehicle name!");
    }
});

// Remove Last Vehicle
document.getElementById("remove-vehicle-btn").addEventListener("click", function() {
    const vehicleType = document.getElementById("vehicle-type").value;

    if (vehicleType && vehicles[vehicleType].length > 0) {
        const removedVehicle = vehicles[vehicleType].pop();
        alert(`${removedVehicle} removed from ${vehicleType} category!`);
        updateVehicleCount();
    } else {
        alert("No vehicles to remove or vehicle type not selected!");
    }
});
