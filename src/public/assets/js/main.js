// Grab elements
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);  
};

//Nav styles on scroll
const scrollHeader = () =>{
    const navbarElement = selectElement('#header');
    if(this.scrollY >= 15) {
        navbarElement.classList.add('activated');
    } else {
        navbarElement.classList.remove('activated');
    }
}

window.addEventListener('scroll', scrollHeader);

// Mở menu và bặt cửa sổ tìm kiếm

const menuToggleIcon = selectElement('#menu-toggle-icon');

const toogleMenu = () => {
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');

};

menuToggleIcon.addEventListener('click', toogleMenu);

//
const body = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

// Kiểm tra xem có tùy chọn theme nào trong Bộ nhớ cục bộ hay không, nếu có hãy thêm theme light vào nội dung
if (currentTheme) {
    body.classList.add('light-theme');
}

themeToggleBtn.addEventListener('click', function () {
    // Thêm chủ đề ánh sáng khi nhấp chuột
    body.classList.toggle('light-theme');

    // Nếu nội dung có lớp chủ đề ánh sáng thì hãy thêm nó vào Bộ nhớ cục bộ, nếu không, hãy xóa nó
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('currentTheme', 'themeActive');
    } else {
        localStorage.removeItem('currentTheme');
    }
});

// Mở và đóng tìm kiếm
const formOpenBtn = selectElement('#search-icon');
const formCloseBtn = selectElement('#form-close-btn');
const searchFormContainer = selectElement('#search-form-container');

formOpenBtn.addEventListener('click', () => searchFormContainer.classList.add('activated'));

formCloseBtn.addEventListener('click', () => searchFormContainer.classList.remove('activated'));

// Đóng bằng phím Esc
window.addEventListener('keyup', event => {
    if(event.key == 'Escape') searchFormContainer.classList.remove('activated');
});

// Swiper

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination'
    },
    breakpoints: {
        700: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    } ,
    loop: true, // Bật chế độ lặp
})
