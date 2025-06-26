const sidebar = document.getElementById('sidebar');
const overlay = document.querySelector('.overlay');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

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

let currentIndex = 0;
const productList = document.querySelector('.product-list');
const productItems = document.querySelectorAll('.product-item');
const totalProducts = productItems.length;

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalProducts - 1;
    }
    updateSlider();
});

document.querySelector('.next-btn').addEventListener('click', nextSlide);

function updateSlider() {
    const item = productItems[0];
    const itemWidth = item.getBoundingClientRect().width;
    const offset = -currentIndex * itemWidth;

    productList.style.transform = `translateX(${offset}px)`;
}


function nextSlide() {
    if (currentIndex < totalProducts - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
}

setInterval(nextSlide, 3000); 