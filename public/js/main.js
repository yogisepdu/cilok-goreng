//   --﷽--

// selecting all necessary dom element

//select for menu
const menuBar = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");

//select for menu image
const catagory = document.querySelectorAll(".catagory input");
const cataImg = document.querySelector("#c-img");

// select for connect section with nav item
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

// event listener for toggle menu
menuBar.addEventListener("click", () => {
  menuBar.classList.toggle("fa-times");
  menuBar.classList.toggle("active");
  navbar.classList.toggle("active");
});

// scroll event
document.addEventListener("scroll", () => {
  menuBar.classList.remove("fa-times");
  menuBar.classList.remove("active");
  navbar.classList.remove("active");

  // conect With nav link
  connectSecWithNavLink();
});

// controlling menu image
catagory.forEach((element) => {
  element.addEventListener("click", () => {
    catagory.forEach((ele) => {
      ele.classList.remove("active");
    });

    let values = element.value;
    element.classList.add("active");
    cataImg.src = `./images/menu-${values}.jpg`;
  });
});

// handeling scroll event and mar nav item
const connectSecWithNavLink = () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    let linkAttribute = link.attributes.href.value;
    link.classList.remove("active");

    if (linkAttribute === `#${current}`) {
      link.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-list");
  const orderButton = document.getElementById("order-button");
  let cart = [];

  // Fungsi untuk menambahkan item ke keranjang
  function addToCart(item) {
    cart.push(item);
    renderCart();
  }

  // Fungsi untuk merender isi keranjang
  function renderCart() {
    cartList.innerHTML = "";
    if (cart.length === 0) {
      cartList.innerHTML = "<p>Keranjang Anda kosong.</p>";
      return;
    }

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <h4>${item.name} - Rp ${item.price}</h4>
        <button onclick="removeFromCart(${index})">Hapus</button>
      `;
      cartList.appendChild(cartItem);
    });
  }

  // Fungsi untuk menghapus item dari keranjang
  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
  };

  // Fungsi untuk mengirim pesanan ke WhatsApp
  function sendOrderToWhatsApp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !email || !phone || !address) {
      alert("Harap lengkapi semua data pelanggan.");
      return;
    }

    if (cart.length === 0) {
      alert("Keranjang Anda kosong. Tambahkan item sebelum memesan.");
      return;
    }

    const orderDetails = cart
      .map((item, index) => `${index + 1}. ${item.name} - Rp ${item.price}`)
      .join("\n");
    const message = `
Pesanan Baru:
Nama: ${name}
Email: ${email}
Nomor Telepon: ${phone}
Alamat: ${address}

Detail Pesanan:
${orderDetails}
    `;
    const whatsappURL = `https://wa.me/6282210535103?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  }

  // Event listener untuk tombol Order Sekarang
  orderButton.addEventListener("click", sendOrderToWhatsApp);

  // Simulasi: Tambahkan fungsi addToCart ke tombol Add to Cart di produk
  document
    .querySelectorAll(".p-card input[type='button']")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const item = {
          name: button.parentElement.querySelector("h4").innerText,
          price: button.parentElement
            .querySelector(".price")
            .innerText.replace("Rp ", ""),
        };
        addToCart(item);
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(
    "input[type='button'][value='add to cart']"
  );
  const popup = document.getElementById("popup-notification");
  const closePopup = document.getElementById("close-popup");
  const overlay = document.createElement("div");

  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Fungsi untuk menampilkan popup
  const showPopup = () => {
    popup.classList.add("visible");
    overlay.classList.add("visible");
  };

  // Fungsi untuk menyembunyikan popup
  const hidePopup = () => {
    popup.classList.remove("visible");
    overlay.classList.remove("visible");
  };

  // Tambahkan event listener ke setiap tombol "add to cart"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showPopup();
    });
  });

  // Tambahkan event listener untuk tombol close
  closePopup.addEventListener("click", hidePopup);

  // Tambahkan event listener untuk overlay
  overlay.addEventListener("click", hidePopup);
});

// happy coding!!!!
// this project made by Fahad at 27th April, 2022.
