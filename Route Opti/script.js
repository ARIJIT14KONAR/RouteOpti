document.addEventListener('DOMContentLoaded', function() {
    // 1. Vehicles Data for Dropdown
    let vehicles = {
        bike: [],
        truck: [],
        van: []
    };

    // Function to update vehicle count display
    function updateVehicleCount() {
        const bikeCountElem = document.getElementById("bike-count");
        const truckCountElem = document.getElementById("truck-count");
        const vanCountElem = document.getElementById("van-count");

        if (bikeCountElem) bikeCountElem.textContent = `Bikes: ${vehicles.bike.length}`;
        if (truckCountElem) truckCountElem.textContent = `Trucks: ${vehicles.truck.length}`;
        if (vanCountElem) vanCountElem.textContent = `Vans: ${vehicles.van.length}`;
    }

    // Add Vehicle Event Listener
    const addVehicleBtn = document.getElementById("add-vehicle-btn");
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener("click", function() {
            const vehicleTypeElem = document.getElementById("vehicle-type");
            const vehicleNameElem = document.getElementById("vehicle-name");

            if (vehicleTypeElem && vehicleNameElem) {
                const vehicleType = vehicleTypeElem.value;
                const vehicleName = vehicleNameElem.value;

                if (vehicleType && vehicleName) {
                    vehicles[vehicleType].push(vehicleName);
                    alert(`${vehicleName} added to ${vehicleType} category!`);
                    updateVehicleCount(); // Update the count display after adding a vehicle
                } else {
                    alert("Please select a vehicle type and enter a vehicle name!");
                }
            }
        });
    }

    // Remove Last Vehicle from Selected Category
    const removeVehicleBtn = document.getElementById("remove-vehicle-btn");
    if (removeVehicleBtn) {
        removeVehicleBtn.addEventListener("click", function() {
            const vehicleTypeElem = document.getElementById("vehicle-type");

            if (vehicleTypeElem) {
                const vehicleType = vehicleTypeElem.value;
                if (vehicleType && vehicles[vehicleType].length > 0) {
                    const removedVehicle = vehicles[vehicleType].pop();
                    alert(`${removedVehicle} removed from ${vehicleType} category!`);
                    updateVehicleCount(); // Update the count display after removing a vehicle
                } else {
                    alert("No vehicles to remove or vehicle type not selected!");
                }
            }
        });
    }

    // Submit and Display the Result
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", function() {
            let output = "<h4>Vehicle Details</h4>";

            for (let category in vehicles) {
                output += `<h5>${category.charAt(0).toUpperCase() + category.slice(1)} (${vehicles[category].length}):</h5>`;
                vehicles[category].forEach((vehicle, index) => {
                    output += `<p>Vehicle ${index + 1}: ${vehicle}</p>`;
                });
            }

            const outputElem = document.getElementById("output");
            if (outputElem) {
                outputElem.innerHTML = output;
            }
        });
    }

    // Update count initially
    updateVehicleCount();

    // 2. Delivery Locations & Vehicle Details Logic
    let deliveryLocations = [];
    let vehicleDetails = [];

    // Fetching state and city from Pincode
    function fetchStateCityFromPincode(pincode) {
        const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data[0].Status === "Success") {
                    const postOfficeData = data[0].PostOffice[0];
                    const state = postOfficeData.State;
                    const city = postOfficeData.Block;

                    const stateElem = document.getElementById("warehouse-state");
                    const cityElem = document.getElementById("warehouse-city");

                    if (stateElem) stateElem.value = state;
                    if (cityElem) cityElem.value = city;
                } else {
                    alert("Invalid Pincode. Please try again.");
                    const stateElem = document.getElementById("warehouse-state");
                    const cityElem = document.getElementById("warehouse-city");
                    if (stateElem) stateElem.value = "";
                    if (cityElem) cityElem.value = "";
                }
            })
            .catch(error => {
                console.error("Error fetching data from the API:", error);
                alert("Failed to fetch location data. Please try again.");
            });
    }

    const warehousePincodeElem = document.getElementById("warehouse-pincode");
    if (warehousePincodeElem) {
        warehousePincodeElem.addEventListener("blur", function() {
            const pincode = this.value.trim();
            if (pincode) {
                fetchStateCityFromPincode(pincode);
            }
        });
    }

    // Add Delivery Location
    const addLocationBtn = document.getElementById("add-location-btn");
    if (addLocationBtn) {
        addLocationBtn.addEventListener("click", function() {
            const pincodeElem = document.getElementById("pincode");
            const regionElem = document.getElementById("region");
            const addressElem = document.getElementById("address");
            const weightElem = document.getElementById("weight");
            const priorityElem = document.getElementById("priority");
            const stateElem = document.getElementById("warehouse-state");
            const cityElem = document.getElementById("warehouse-city");

            if (pincodeElem && stateElem && cityElem && addressElem && weightElem && priorityElem) {
                const pincode = pincodeElem.value;
                const region = regionElem.value;
                const address = addressElem.value;
                const weight = weightElem.value;
                const priority = priorityElem.value;
                const state = stateElem.value;
                const city = cityElem.value;

                if (pincode && state && city && address && weight && priority) {
                    deliveryLocations.push({ pincode, state, city, address, weight, priority });
                    alert("Delivery Location Added!");
                } else {
                    alert("Please fill in all fields!");
                }
            }
        });
    }

    // Remove Last Delivery Location
    const removeLocationBtn = document.getElementById("remove-location-btn");
    if (removeLocationBtn) {
        removeLocationBtn.addEventListener("click", function() {
            if (deliveryLocations.length > 0) {
                deliveryLocations.pop();
                alert("Last Delivery Location Removed!");
            } else {
                alert("No delivery locations to remove!");
            }
        });
    }

    // Add Vehicle Details
    const addVehicleBtn2 = document.getElementById("add-vehicle-btn");
    if (addVehicleBtn2) {
        addVehicleBtn2.addEventListener("click", function() {
            const vehicleTypeElem = document.getElementById("vehicle-type");
            const fuelCapacityElem = document.getElementById("fuel-capacity");
            const fuelEfficiencyElem = document.getElementById("fuel-efficiency");
            const carryingCapacityElem = document.getElementById("carrying-capacity");

            if (vehicleTypeElem && fuelCapacityElem && fuelEfficiencyElem && carryingCapacityElem) {
                const vehicleType = vehicleTypeElem.value;
                const fuelCapacity = fuelCapacityElem.value;
                const fuelEfficiency = fuelEfficiencyElem.value;
                const carryingCapacity = carryingCapacityElem.value;

                if (vehicleType && fuelCapacity && fuelEfficiency && carryingCapacity) {
                    vehicleDetails.push({ vehicleType, fuelCapacity, fuelEfficiency, carryingCapacity });
                    alert("Vehicle Type Added!");
                } else {
                    alert("Please fill in all fields!");
                }
            }
        });
    }

    // Remove Last Vehicle
    const removeVehicleBtn2 = document.getElementById("remove-vehicle-btn");
    if (removeVehicleBtn2) {
        removeVehicleBtn2.addEventListener("click", function() {
            if (vehicleDetails.length > 0) {
                vehicleDetails.pop();
                alert("Last Vehicle Removed!");
            } else {
                alert("No vehicles to remove!");
            }
        });
    }

    // Submit and Display Form Data
    const submitBtn2 = document.getElementById("submit-btn");
    if (submitBtn2) {
        submitBtn2.addEventListener("click", function() {
            let output = "<h4>Warehouse Address</h4>";
            const warehouseAddressElem = document.getElementById("warehouse-address");
            const warehouseStateElem = document.getElementById("warehouse-state");
            const warehouseCityElem = document.getElementById("warehouse-city");
            const warehousePincodeElem = document.getElementById("warehouse-pincode");

            if (warehouseAddressElem && warehouseStateElem && warehouseCityElem && warehousePincodeElem) {
                const warehouseAddress = warehouseAddressElem.value;
                const warehouseState = warehouseStateElem.value;
                const warehouseCity = warehouseCityElem.value;
                const warehousePincode = warehousePincodeElem.value;

                output += `<p>Address: ${warehouseAddress}, ${warehouseCity}, ${warehouseState} - ${warehousePincode}</p>`;
            }

            output += "<h4>Delivery Locations</h4>";
            deliveryLocations.forEach((location, index) => {
                output += `<p>Location ${index + 1}: ${location.address}, ${location.city}, ${location.state} - ${location.pincode}, Weight: ${location.weight}kg, Priority: ${location.priority}</p>`;
            });

            output += "<h4>Vehicle Details</h4>";
            vehicleDetails.forEach((vehicle, index) => {
                output += `<p>Vehicle ${index + 1}: ${vehicle.vehicleType}, Fuel Capacity: ${vehicle.fuelCapacity}, Fuel Efficiency: ${vehicle.fuelEfficiency}, Carrying Capacity: ${vehicle.carryingCapacity}</p>`;
            });

            const outputElem = document.getElementById("output");
            if (outputElem) {
                outputElem.innerHTML = output;
            }
        });
    }
});
