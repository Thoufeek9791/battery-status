const charge = document.getElementById("charge");
const chargeLevel = document.getElementById("charge-level");
const chargingTime = document.getElementById("charging-time");

window.onload = function () {
  //For Browsers that dont' support the battery status API

  if (!navigator.getBattery) {
    alert("Battery Status API is not supported in your Browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  //when the charging status changing
  battery.addEventListener("chargingchange", () => {
    updateChargingInfo();
  });

  //when the battery level changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
      charge.classList.add("active");
      chargingTime.innerText = "";
    } else {
      charge.classList.remove("active");
    }

    //Display time left to discharge only when it is a integer value i.e not infinity
    if (parseInt(battery.dischargingTime)) {
      let hr = parseInt(battery.dischargingTime / 3600);
      let min = parseInt(battery.dischargingTime / 60 - hr * 60);
      chargingTime.innerText = `${hr}hr ${min} mins remaining`;
    }
  }

  //updating battery level
  function updateLevelInfo() {
    let batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
  }
});
