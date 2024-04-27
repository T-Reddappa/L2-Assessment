document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json"
  )
    .then((response) => response.json())
    .then(({ product }) => {
      console.log(product.images[0].src);
      document.getElementById("product-image").src =
        "https://s3-alpha-sig.figma.com/img/d636/7d6d/f34ce14e7187edeeb026d73413e4a29c?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nejz5M5nvkC~ufQ6L~VnA1ATv-nDdbhOpUONmrNOKs053lqTtnY58s-zNJuJEMI4Vf3qUdsjgrpGY7h6z516wfe~uP-y5IH6uA8w5YatUGJ8WcNC~34AJGTYXtAJhg65xAksMNcjOqHoa333mqgjUZkioDqHMyENuIQ-BCaQ0lmrQfN-tEf~JgOT0LBvMfEIsD6SmDuqBC9a6TfarxaPINCJBva65uwUy1jDI4vazV-oteyKhx4ZqUMsgZxWXUdwEd4M5AE8fs0649bWpgKgasM~GiPDr6Ws3sxJzQo3JoXX0546yXxve49shSedcSxulVrJKl~tfkoLZddSOu2LYw__";
      //   document.getElementById("product-image").src = product.images[2].src;

      document.getElementById("product-title").textContent = product.title;
      document.getElementById("product-vendor").textContent = product.vendor;

      document.getElementById("product-description").textContent =
        product.description.replace(/<\/?p[^>]*>/g, "");

      const price = product.price.slice(1);
      const sellingPrice = product.compare_at_price.slice(1);

      const discount = ((+sellingPrice - +price) / +sellingPrice) * 100;
      //   console.log("Compare at price:", product.compare_at_price);
      //   console.log("Price:", product.price);
      //   console.log(typeof +product.compare_at_price);
      //   console.log(Math.floor(discount));

      document.getElementById("product-price").textContent =
        "$" + Number(product.price.slice(1)).toFixed(2);

      document.getElementById("compare-at-price").textContent =
        "$" + Number(product.compare_at_price.slice(1)).toFixed(2);

      document.getElementById("discount").textContent =
        Math.floor(discount) + "% Off";

      const colorOptionsDiv = document.getElementById("color-options");

      product.options.forEach((option) => {
        if (option.name === "Color") {
          option.values.forEach((value) => {
            const colorName = Object.keys(value)[0];
            const colorHex = value[colorName];

            const colorOptionDiv = document.createElement("div");
            colorOptionDiv.classList.add("color-option");
            colorOptionDiv.style.backgroundColor = colorHex;

            colorOptionsDiv.appendChild(colorOptionDiv);
          });
        }
      });

      const sizeOptionsDiv = document.getElementById("size-options");

      product.options.forEach((option) => {
        if (option.name === "Size") {
          option.values.forEach((size) => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "size";
            radioInput.value = size;

            const label = document.createElement("label");
            label.textContent = size;

            const sizeOptionDiv = document.createElement("div");
            sizeOptionDiv.classList.add("size-option");

            sizeOptionDiv.appendChild(radioInput);
            sizeOptionDiv.appendChild(label);

            sizeOptionsDiv.appendChild(sizeOptionDiv);
          });
        }
      });
      const addToCartBtn = document.getElementById("add-to-cart-btn");

      addToCartBtn.addEventListener("click", function () {
        document.getElementById("add-to-cart-message").textContent =
          product.title + " is added to cart";

        document.getElementById("add-to-cart-message").style.display = "block";
      });
    });
});
