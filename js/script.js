// functions
function getId(id) {
  return document.getElementById(id);
}

function alterInnerText(id, theText) {
  getId(id).innerText = theText;
}

function removeDisabled(id) {
  getId(id).removeAttribute("disabled");
  getId(id).classList.remove("cursor-not-allowed");
}

function addDisabled(id) {
  getId(id).setAttribute("disabled", true);
  getId(id).classList.add("cursor-not-allowed");
}

function checkInput(id, checkInput) {
  if (getId(id).value.toUpperCase() === checkInput.toUpperCase()) return true;
  return false;
}

function createdLI(id, theText, classAdd) {
  const li = document.createElement("li");
  li.innerText = theText;
  if (classAdd === "right") li.className = "text-right";
  else if (classAdd === "center") li.className = "text-center";
  else if (classAdd === "end") li.className = "place-self-end";
  getId(id).append(li);
}
// main part
let seatCount = 0,
  totalPrice = 0;

const seats = document.querySelectorAll("#bookingBtn");

seats.forEach((seat) => {
  seat.addEventListener("click", (e) => {
    if (seatCount < 4) {
      // The Calculation
      seatCount += 1;
      totalPrice += 550;

      //Dynamic Style
      e.target.style.background = "#1DD100";
      e.target.style.color = "#FFFFFF";

      //Selected color change, seat can select one time, Next button check
      getId("unselected").classList.replace("flex", "hidden");
      getId("selected").classList.replace("hidden", "flex");
      seat.setAttribute("disabled", true);
      if (getId("passengerNumb").value !== "") removeDisabled("nextBtn");
      else addDisabled("nextBtn");

      // Appending
      createdLI("selectedSeat", e.target.innerText, "okay");
      createdLI("selectedSeat", "Economy", "center");
      createdLI("selectedSeat", 550, "right");

      // Changing The Value
      alterInnerText("seatCount", seatCount);
      alterInnerText("seatsLeft", 40 - seatCount);
      alterInnerText("totalPrice", totalPrice);
      alterInnerText("grandTotal", totalPrice);

      //Enabling The Button
      if (seatCount === 4) removeDisabled("couponSubmit");
    } else {
      alert(
        "We apologize for the inconvenience. Our system currently only supports up to four bookings at once."
      );
    }
  });
});

// Next button check
getId("passengerNumb").addEventListener("keyup", (e) => {
  if (e.target.value !== "" && seatCount > 0) {
    removeDisabled("nextBtn");
  } else {
    addDisabled("nextBtn");
  }
});

//Coupon calculation
getId("couponSubmit").addEventListener("click", (e) => {
  if (checkInput("couponInput", "NEW15")) {
    const discountedPrice = totalPrice * 0.15;
    createdLI("theprice", "Discount Price", "okay");
    createdLI("theprice", discountedPrice, "end");
    alterInnerText("grandTotal", totalPrice - discountedPrice);
    getId("removable").remove();
  } else if (checkInput("couponInput", "Couple 20")) {
    const discountedPrice = totalPrice * 0.2;
    createdLI("theprice", "Discount Price", "okay");
    createdLI("theprice", discountedPrice, "end");
    alterInnerText("grandTotal", totalPrice - discountedPrice);
    getId("removable").remove();
  } else {
    alert(
      "To get a discount, please use the following two coupons: 'NEW15' and 'Couple 20'. Note that these are the only coupons that can be used for the discount."
    );
  }
});
