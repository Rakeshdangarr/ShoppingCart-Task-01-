// using DOM for Table get

document.addEventListener("DOMContentLoaded", function () {
    const cartBody = document.getElementById("cart-body");
    const totalPriceElement = document.getElementById("total-price");

    // function for Subtotal
    function updateSubtotal(row) {
      const quantityInput = row.querySelector(".quantity");
      const pricePerUnit = parseFloat(
        quantityInput.getAttribute("data-price")
      );
      const quantity = parseInt(quantityInput.value, 10);
      if (isNaN(quantity) || quantity < 0) {
        quantityInput.value = 0; //
      }
      const subtotal = pricePerUnit * parseInt(quantityInput.value, 10);
      row.querySelector(".subtotal").textContent = `$${subtotal.toFixed(
        2
      )}`;
      updateTotal();
    }

    //  function for update total
    function updateTotal() {
      let total = 0;
      document.querySelectorAll(".subtotal").forEach((subtotal) => {
        total += parseFloat(subtotal.textContent.replace("$", ""));
      });
      totalPriceElement.textContent = `$${total.toFixed()}`;
    }

    // function for remove button
    function removeItem(event) {
      const button = event.target;
      const row = button.closest("tr");
      cartBody.removeChild(row);
      updateTotal();
    }

    
    cartBody.addEventListener("input", function (event) {
      if (event.target.classList.contains("quantity")) {
        const row = event.target.closest("tr");
        updateSubtotal(row);
      }
    });

    // Remove button event listener
    cartBody.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-button")) {
        removeItem(event);
      }
    });
  });
