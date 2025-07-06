const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

// Sidebar toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.style.width = '250px';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.style.width = '0';
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- SLIDER ---
let currentIndex = 0;
const productList = document.querySelector('.product-list');

// Duplikasikan isi untuk efek looping
productList.innerHTML += productList.innerHTML;

// Setelah innerHTML digandakan, ambil ulang .product-item
let productItems = document.querySelectorAll('.product-item');
const totalProducts = productItems.length / 2; // Asli saja

function updateSlider() {
    const itemWidth = productItems[0].getBoundingClientRect().width;
    const offset = -currentIndex * itemWidth;
    productList.style.transition = "transform 0.5s ease-in-out";
    productList.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    currentIndex++;
    updateSlider();

    if (currentIndex === totalProducts) {
        setTimeout(() => {
            productList.style.transition = "none";
            currentIndex = 0;
            const offset = -currentIndex * productItems[0].getBoundingClientRect().width;
            productList.style.transform = `translateX(${offset}px)`;
        }, 500); // tunggu animasi selesai
    }
}

function prevSlide() {
    if (currentIndex === 0) {
        currentIndex = totalProducts;
        const offset = -currentIndex * productItems[0].getBoundingClientRect().width;
        productList.style.transition = "none";
        productList.style.transform = `translateX(${offset}px)`;
    }

    setTimeout(() => {
        currentIndex--;
        productList.style.transition = "transform 0.5s ease-in-out";
        updateSlider();
    }, 20);
}

// Tombol next/prev
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Auto-slide
setInterval(nextSlide, 3000);

let aktif = null;

function toggleNomor(elem) {
    const sedangAktif = aktif === elem;

    // Kembalikan elemen aktif sebelumnya ke nama
    if (aktif && !sedangAktif) {
        aktif.innerText = aktif.dataset.nama;
    }

    // Toggle elemen saat ini
    if (sedangAktif) {
        elem.innerText = elem.dataset.nama;
        aktif = null;
    } else {
        elem.innerText = elem.dataset.nomor;
        aktif = elem;
    }
}

// Klik di luar elemen, kembalikan yang aktif
document.addEventListener("click", function (event) {
    if (aktif && !aktif.contains(event.target)) {
        aktif.innerText = aktif.dataset.nama;
        aktif = null;
    }
});

let lastScrollY = window.scrollY;
const header = document.querySelector("header");
const toggle = document.querySelector(".sidebar-toggle");
let scrollTimeout;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scroll ke bawah: sembunyikan
    header.style.top = "-100px";
    toggle.style.top = "-100px";
  } else {
    // Scroll ke atas: munculkan
    header.style.top = "0";
    toggle.style.top = "10px";
  }

  // Jika scroll berhenti, tampilkan kembali setelah 150ms
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    header.style.top = "0";
    toggle.style.top = "10px";
  }, 150);

  lastScrollY = currentScrollY;
});
