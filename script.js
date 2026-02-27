// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.querySelector('.lightbox-close');

// ===== Countdown Timer =====
function updateCountdown() {
    // Tết Nguyên Đán 2027: 06/02/2027 (Mùng 1 Tết)
    const tetDate = new Date('February 6, 2027 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = tetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Tết đã đến!
        document.getElementById('days').textContent = '🎊';
        document.getElementById('hours').textContent = '🧧';
        document.getElementById('minutes').textContent = '🎆';
        document.getElementById('seconds').textContent = '🏮';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Current Date Display (Solar & Lunar) =====
function updateCurrentDate() {
    const now = new Date();
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

    // Solar date
    const solarStr = `${weekdays[now.getDay()]}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const solarEl = document.getElementById('solarDate');
    if (solarEl) solarEl.textContent = solarStr;

    // Lunar date calculation
    const lunar = solarToLunar(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const lunarStr = `${lunar.day} tháng ${lunar.month}${lunar.leap ? ' nhuận' : ''} năm ${lunar.yearName}`;
    const lunarEl = document.getElementById('lunarDate');
    if (lunarEl) lunarEl.textContent = lunarStr;
}

// Simple Solar to Lunar converter
function solarToLunar(yy, mm, dd) {
    const lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ];

    const can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

    function lYearDays(y) {
        let sum = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return sum + leapDays(y);
    }

    function leapDays(y) {
        if (leapMonth(y)) return (lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
        return 0;
    }

    function leapMonth(y) { return lunarInfo[y - 1900] & 0xf; }

    function monthDays(y, m) {
        return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
    }

    let offset = Math.floor((Date.UTC(yy, mm - 1, dd) - Date.UTC(1900, 0, 31)) / 86400000);
    let year = 1900;

    for (; year < 2100 && offset > 0; year++) offset -= lYearDays(year);
    if (offset < 0) { offset += lYearDays(--year); }

    const leap = leapMonth(year);
    let isLeap = false;
    let month = 1;

    for (; month < 13 && offset > 0; month++) {
        if (leap > 0 && month === (leap + 1) && !isLeap) {
            --month;
            isLeap = true;
            offset -= leapDays(year);
        } else {
            offset -= monthDays(year, month);
        }
        if (isLeap && month === (leap + 1)) isLeap = false;
    }

    if (offset === 0 && leap > 0 && month === leap + 1) {
        if (isLeap) isLeap = false;
        else { isLeap = true; --month; }
    }
    if (offset < 0) { offset += monthDays(year, --month); }

    const day = offset + 1;
    const yearName = can[(year - 4) % 10] + ' ' + chi[(year - 4) % 12];

    return { year, month, day, leap: isLeap, yearName };
}

updateCurrentDate();
setInterval(updateCurrentDate, 60000); // Update every minute

// ===== Mobile Navigation =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Navbar effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
});

// Back to top click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .info-card, .symbol-card, .tradition-card, ' +
        '.timeline-item, .gallery-item, .checklist-category, .about-content, ' +
        '.about-illustration, .illustration-box'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== Gallery Lightbox =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.dataset.title;
        const img = item.querySelector('.gallery-img');

        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = title;
        }

        lightboxTitle.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Checklist Interactive =====
document.querySelectorAll('.checklist-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('checked');
    });
});

// ===== Parallax Effect for Hero =====
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroImage && scrolled < 800) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0002})`;
            heroImage.style.opacity = Math.max(0.15 - scrolled * 0.0002, 0.05);
        }
        if (heroContent && scrolled < 600) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = Math.max(1 - scrolled * 0.002, 0);
        }
    });
}

// ===== Floating Particles Effect =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    hero.appendChild(particleContainer);

    const particles = ['🌸', '✨', '🏮', '🎊', '💮'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('span');
        particle.className = 'floating-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (5 + Math.random() * 5) + 's';
        particle.style.fontSize = (12 + Math.random() * 16) + 'px';
        particleContainer.appendChild(particle);
    }
}

// ===== Typing Effect for Hero Title =====
function initTypingEffect() {
    const titleSub = document.querySelector('.title-sub');
    if (!titleSub) return;

    const text = titleSub.textContent;
    titleSub.textContent = '';
    titleSub.style.borderRight = '2px solid var(--color-gold)';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleSub.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        } else {
            titleSub.style.borderRight = 'none';
        }
    };

    setTimeout(typeWriter, 1000);
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.countdown-number');
    counters.forEach(counter => {
        counter.style.transition = 'transform 0.3s ease';
    });
}

// ===== Card Tilt Effect =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.tradition-card, .symbol-card, .gallery-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== Smooth Number Animation for Countdown =====
function animateNumber(element, newValue) {
    const currentValue = element.textContent;
    if (currentValue !== newValue) {
        element.style.transform = 'translateY(-10px)';
        element.style.opacity = '0';

        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateY(10px)';

            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 50);
        }, 150);
    }
}

// ===== Gallery Navigation with Keyboard =====
let currentGalleryIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

function updateLightboxCounter() {
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
    }
}

function navigateGallery(direction) {
    if (!lightbox.classList.contains('active')) return;

    currentGalleryIndex += direction;
    if (currentGalleryIndex < 0) currentGalleryIndex = galleryItems.length - 1;
    if (currentGalleryIndex >= galleryItems.length) currentGalleryIndex = 0;

    const item = galleryItems[currentGalleryIndex];
    const img = item.querySelector('.gallery-img');
    const title = item.dataset.title;

    lightboxImage.style.opacity = '0';
    lightboxImage.style.transform = direction > 0 ? 'translateX(30px)' : 'translateX(-30px)';

    setTimeout(() => {
        lightboxImage.src = img.src;
        lightboxTitle.textContent = title;
        lightboxImage.style.transform = 'translateX(0)';
        lightboxImage.style.opacity = '1';
        updateLightboxCounter();
    }, 200);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigateGallery(-1);
    if (e.key === 'ArrowRight') navigateGallery(1);
});

// Navigation button clicks
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(-1);
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(1);
    });
}

// Track current gallery index when opening
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentGalleryIndex = index;
        updateLightboxCounter();
    });
});

// ===== Confetti Effect on CTA =====
function createConfetti() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerConfetti();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(ctaSection);
}

function triggerConfetti() {
    const colors = ['#D32F2F', '#FFD700', '#FF6B6B', '#FFC107'];
    const ctaSection = document.querySelector('.cta-section');

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        ctaSection.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== Progress Bar =====
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    createParticles();
    initTypingEffect();
    animateCounters();
    initTiltEffect();
    createConfetti();
    initProgressBar();
});


// ===== GREETING CARD GENERATOR =====
const greetingMessages = {
    '1': 'Chúc bạn và gia đình năm mới An Khang Thịnh Vượng, vạn sự như ý, tỷ sự như mơ!',
    '2': 'Chúc bạn năm mới Vạn Sự Như Ý, công việc thuận lợi, gia đình hạnh phúc!',
    '3': 'Chúc bạn Phúc Lộc Đầy Nhà, tiền vào như nước, của cải dồi dào!',
    '4': 'Chúc bạn Tài Lộc Dồi Dào, buôn may bán đắt, làm ăn phát đạt!',
    '5': 'Chúc bạn Sức Khỏe Bình An, thân thể khỏe mạnh, tinh thần sảng khoái!'
};

document.getElementById('generateCard')?.addEventListener('click', () => {
    const name = document.getElementById('recipientName').value.trim();
    const template = document.getElementById('greetingTemplate').value;

    if (!name) {
        alert('Vui lòng nhập tên người nhận!');
        return;
    }

    document.getElementById('previewName').textContent = name;
    document.getElementById('previewMessage').textContent = greetingMessages[template];
    document.getElementById('greetingPreview').style.display = 'block';
});

document.getElementById('downloadCard')?.addEventListener('click', () => {
    alert('Tính năng tải thiệp đang được phát triển! 🎴');
});

document.getElementById('shareCard')?.addEventListener('click', () => {
    const name = document.getElementById('recipientName').value;
    const template = document.getElementById('greetingTemplate').value;
    const message = `🧧 Thiệp Chúc Tết gửi ${name}:\n\n${greetingMessages[template]}\n\n🌸 Xuân Đinh Mùi 2027`;

    if (navigator.share) {
        navigator.share({
            title: 'Thiệp Chúc Tết 2027',
            text: message
        });
    } else {
        navigator.clipboard.writeText(message);
        alert('Đã sao chép lời chúc vào clipboard!');
    }
});

// ===== XONG DAT CHECKER =====
// Năm 2027 là năm Đinh Mùi
// Tam hợp Mùi: Hợi - Mão - Mùi (rất tốt)
// Lục hợp Mùi: Ngọ (tốt)
// Tương xung Mùi: Sửu (xấu)
// Tương hại Mùi: Tý (xấu)
// Tương hình Mùi: Tuất (xấu)

const xongdatData = {
    // Năm Đinh Mùi 2027 - Tuổi hợp xông đất dựa trên Tam hợp, Lục hợp với tuổi gia chủ
    // Ưu tiên: Tam hợp > Lục hợp > Tương sinh
    goodYears: {
        'Tý': ['Thân', 'Thìn', 'Sửu'],      // Tam hợp: Thân-Tý-Thìn, Lục hợp: Sửu
        'Sửu': ['Tỵ', 'Dậu', 'Tý'],          // Tam hợp: Tỵ-Dậu-Sửu, Lục hợp: Tý
        'Dần': ['Ngọ', 'Tuất', 'Hợi'],       // Tam hợp: Dần-Ngọ-Tuất, Lục hợp: Hợi
        'Mão': ['Hợi', 'Mùi', 'Tuất'],       // Tam hợp: Hợi-Mão-Mùi, Lục hợp: Tuất
        'Thìn': ['Tý', 'Thân', 'Dậu'],       // Tam hợp: Thân-Tý-Thìn, Lục hợp: Dậu
        'Tỵ': ['Dậu', 'Sửu', 'Thân'],        // Tam hợp: Tỵ-Dậu-Sửu, Lục hợp: Thân
        'Ngọ': ['Dần', 'Tuất', 'Mùi'],       // Tam hợp: Dần-Ngọ-Tuất, Lục hợp: Mùi
        'Mùi': ['Hợi', 'Mão', 'Ngọ'],        // Tam hợp: Hợi-Mão-Mùi, Lục hợp: Ngọ
        'Thân': ['Tý', 'Thìn', 'Tỵ'],        // Tam hợp: Thân-Tý-Thìn, Lục hợp: Tỵ
        'Dậu': ['Tỵ', 'Sửu', 'Thìn'],        // Tam hợp: Tỵ-Dậu-Sửu, Lục hợp: Thìn
        'Tuất': ['Dần', 'Ngọ', 'Mão'],       // Tam hợp: Dần-Ngọ-Tuất, Lục hợp: Mão
        'Hợi': ['Mão', 'Mùi', 'Dần']         // Tam hợp: Hợi-Mão-Mùi, Lục hợp: Dần
    },
    // Tuổi xung khắc (Lục xung, Lục hại, Tương hình)
    badYears: {
        'Tý': ['Ngọ', 'Mùi', 'Mão'],         // Xung: Ngọ, Hại: Mùi, Hình: Mão
        'Sửu': ['Mùi', 'Ngọ', 'Tuất'],       // Xung: Mùi, Hại: Ngọ, Hình: Tuất
        'Dần': ['Thân', 'Tỵ'],               // Xung: Thân, Hại+Hình: Tỵ
        'Mão': ['Dậu', 'Thìn', 'Tý'],        // Xung: Dậu, Hại: Thìn, Hình: Tý
        'Thìn': ['Tuất', 'Mão', 'Thìn'],     // Xung: Tuất, Hại: Mão, Tự hình
        'Tỵ': ['Hợi', 'Dần', 'Thân'],        // Xung: Hợi, Hại: Dần, Hình: Thân
        'Ngọ': ['Tý', 'Sửu', 'Ngọ'],         // Xung: Tý, Hại: Sửu, Tự hình
        'Mùi': ['Sửu', 'Tý', 'Tuất'],        // Xung: Sửu, Hại: Tý, Hình: Tuất
        'Thân': ['Dần', 'Hợi', 'Tỵ'],        // Xung: Dần, Hại: Hợi, Hình: Tỵ
        'Dậu': ['Mão', 'Tuất', 'Dậu'],       // Xung: Mão, Hại: Tuất, Tự hình
        'Tuất': ['Thìn', 'Dậu', 'Sửu'],      // Xung: Thìn, Hại: Dậu, Hình: Sửu
        'Hợi': ['Tỵ', 'Thân', 'Hợi']         // Xung: Tỵ, Hại: Thân, Tự hình
    },
    // Ghi chú đặc biệt cho năm Đinh Mùi 2027
    note2027: 'Năm 2027 Đinh Mùi, tuổi Hợi-Mão-Mùi (Tam hợp) và Ngọ (Lục hợp) đặc biệt tốt để xông đất.'
};

function getZodiac(year) {
    const diaChi = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];
    return diaChi[year % 12];
}

document.getElementById('checkXongdat')?.addEventListener('click', () => {
    const yearSelect = document.getElementById('homeownerYear');
    const year = parseInt(yearSelect.value);

    if (!year) {
        alert('Vui lòng chọn năm sinh gia chủ!');
        return;
    }

    const zodiac = getZodiac(year);
    const goodYears = xongdatData.goodYears[zodiac] || [];
    const badYears = xongdatData.badYears[zodiac] || [];

    const resultDiv = document.getElementById('xongdatResult');

    // Kiểm tra tuổi đặc biệt tốt cho năm Đinh Mùi 2027
    const bestYears2027 = ['Hợi', 'Mão', 'Mùi', 'Ngọ'];
    const goodYearsWithNote = goodYears.map(y => {
        const isBest = bestYears2027.includes(y);
        return `<li class="tuoi-tot">✅ Tuổi ${y}${isBest ? ' ⭐ (Đặc biệt hợp năm Đinh Mùi)' : ' - Tam hợp/Lục hợp'}</li>`;
    }).join('');

    resultDiv.innerHTML = `
        <h4>🏠 Gia chủ tuổi ${zodiac} (${year})</h4>
        <p><strong>Năm Đinh Mùi 2027 - Tuổi hợp xông đất:</strong></p>
        <ul>${goodYearsWithNote}</ul>
        <p><strong>Tuổi nên tránh (Lục xung, Lục hại):</strong></p>
        <ul>
            ${badYears.map(y => `<li class="tuoi-xau">❌ Tuổi ${y} - Xung khắc</li>`).join('')}
        </ul>
        <div style="margin-top: 12px; padding: 10px; background: var(--color-gold-light); border-radius: 8px;">
            <p style="margin: 0; font-size: 0.9rem;">
                💡 <strong>Giờ tốt xông đất Tết 2027:</strong><br>
                • Giờ Tý (23h-1h) - Giờ đầu tiên của năm mới<br>
                • Giờ Mão (5h-7h) - Tam hợp với Mùi<br>
                • Giờ Ngọ (11h-13h) - Lục hợp với Mùi<br>
                • Giờ Mùi (13h-15h) - Chính vị năm Đinh Mùi
            </p>
        </div>
        <p style="margin-top: 10px; font-style: italic; color: var(--color-text-light); font-size: 0.85rem;">
            📌 Lưu ý: Tuổi Hợi, Mão, Mùi (Tam hợp) và Ngọ (Lục hợp với Mùi) đặc biệt tốt cho năm 2027.
        </p>
    `;
    resultDiv.style.display = 'block';
});

// ===== QUIZ TET =====
const quizQuestions = [
    {
        question: 'Tết Nguyên Đán 2027 rơi vào ngày nào dương lịch?',
        options: ['04/02/2027', '05/02/2027', '06/02/2027', '07/02/2027'],
        correct: 2
    },
    {
        question: 'Năm 2027 là năm con gì theo âm lịch?',
        options: ['Ngựa', 'Dê', 'Khỉ', 'Gà'],
        correct: 1
    },
    {
        question: 'Ngày cúng ông Công ông Táo là ngày nào?',
        options: ['20 tháng Chạp', '23 tháng Chạp', '25 tháng Chạp', '28 tháng Chạp'],
        correct: 1
    },
    {
        question: 'Hoa nào là biểu tượng Tết của miền Nam?',
        options: ['Hoa Đào', 'Hoa Mai', 'Hoa Cúc', 'Hoa Lan'],
        correct: 1
    },
    {
        question: 'Bánh chưng tượng trưng cho điều gì?',
        options: ['Trời', 'Đất', 'Nước', 'Lửa'],
        correct: 1
    },
    {
        question: '"Xông đất" có nghĩa là gì?',
        options: ['Dọn dẹp nhà cửa', 'Người đầu tiên đến nhà năm mới', 'Đốt pháo', 'Cúng giao thừa'],
        correct: 1
    },
    {
        question: 'Mâm ngũ quả thường có bao nhiêu loại quả?',
        options: ['3 loại', '5 loại', '7 loại', '9 loại'],
        correct: 1
    },
    {
        question: 'Lì xì có nguồn gốc từ đâu?',
        options: ['Việt Nam', 'Trung Quốc', 'Nhật Bản', 'Hàn Quốc'],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

document.getElementById('startQuiz')?.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizStarted = true;
    document.getElementById('quizContainer').classList.add('active');
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('quizResult').style.display = 'none';
    showQuestion();
});

function showQuestion() {
    if (currentQuestion >= 5) {
        endQuiz();
        return;
    }

    const q = quizQuestions[currentQuestion];
    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizProgress').textContent = `Câu ${currentQuestion + 1}/5`;
    document.getElementById('quizScore').textContent = `Điểm: ${score}`;

    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = q.options.map((opt, i) =>
        `<div class="quiz-option" data-index="${i}">${opt}</div>`
    ).join('');

    optionsDiv.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => selectAnswer(parseInt(opt.dataset.index)));
    });
}

function selectAnswer(index) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (index === q.correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1000);
}

function endQuiz() {
    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('startQuiz').style.display = 'block';
    document.getElementById('startQuiz').textContent = 'Chơi Lại';

    let message = '';
    if (score === 5) message = '🏆 Xuất sắc! Bạn là chuyên gia về Tết Việt!';
    else if (score >= 4) message = '🎉 Tuyệt vời! Bạn hiểu rất rõ về Tết!';
    else if (score >= 3) message = '👍 Khá tốt! Bạn biết khá nhiều về Tết!';
    else message = '📚 Hãy tìm hiểu thêm về Tết Việt nhé!';

    document.getElementById('quizResult').innerHTML = `
        <h4>Kết Quả Quiz</h4>
        <p>Bạn đạt <strong>${score}/5</strong> điểm</p>
        <p>${message}</p>
    `;
    document.getElementById('quizResult').style.display = 'block';
}

// ===== LUCKY MONEY / LÌ XÌ =====
const lixiAmounts = [
    { value: 500, label: '500đ', rarity: 'common' },
    { value: 1000, label: '1.000đ', rarity: 'common' },
    { value: 2000, label: '2.000đ', rarity: 'common' },
    { value: 5000, label: '5.000đ', rarity: 'common' },
    { value: 10000, label: '10.000đ', rarity: 'uncommon' },
    { value: 20000, label: '20.000đ', rarity: 'uncommon' },
    { value: 50000, label: '50.000đ', rarity: 'rare' },
    { value: 100000, label: '100.000đ', rarity: 'rare' },
    { value: 200000, label: '200.000đ', rarity: 'epic' },
    { value: 500000, label: '500.000đ', rarity: 'legendary' }
];

const lixiMessages = [
    // Câu chúc phúc
    { text: "Chúc bạn năm mới Phúc - Lộc - Thọ đầy nhà! 🏮", type: "blessing" },
    { text: "An Khang Thịnh Vượng, Vạn Sự Như Ý! ✨", type: "blessing" },
    { text: "Tiền vào như nước, tiền ra nhỏ giọt! 💰", type: "blessing" },
    { text: "Năm mới tấn tài tấn lộc, gia đình hạnh phúc! 🎊", type: "blessing" },
    { text: "Sức khỏe dồi dào, công việc hanh thông! 🌟", type: "blessing" },
    { text: "Xuân sang phú quý, Tết đến vinh hoa! 🌸", type: "blessing" },
    { text: "Cung chúc tân xuân, vạn sự cát tường! 🐐", type: "blessing" },
    // Câu hài hước
    { text: "Ít thôi nhưng tình cảm là chính! 😂", type: "funny" },
    { text: "Của ít lòng nhiều, đừng chê nha! 🤭", type: "funny" },
    { text: "Lì xì lấy hên, đừng tính tiền! 😜", type: "funny" },
    { text: "Năm nay hên quá, sang năm rút tiếp! 🎰", type: "funny" },
    { text: "Tiền này để dành mua trà sữa nha! 🧋", type: "funny" },
    { text: "Giàu rồi nhớ cho tui vay! 💸", type: "funny" },
    { text: "Đừng buồn, tiền chỉ là giấy thôi mà! 📄", type: "funny" },
    { text: "Rút được bao nhiêu yêu bấy nhiêu! ❤️", type: "funny" },
    { text: "Số này đẹp lắm, giữ lại làm kỷ niệm! 🎁", type: "funny" },
    { text: "Ai bảo tham, rút 1 lần thôi chứ! 😏", type: "funny" },
    { text: "Vận may đang đến, đừng vội nản! 🍀", type: "funny" },
    { text: "Tiền ảo thôi, vui là chính! 🎮", type: "funny" }
];

function getRandomLixi() {
    // Equal chance for all amounts
    const randomIndex = Math.floor(Math.random() * lixiAmounts.length);
    return lixiAmounts[randomIndex];
}

function getRandomMessage(amount) {
    // Higher amounts get more blessing messages
    const blessings = lixiMessages.filter(m => m.type === 'blessing');
    const funny = lixiMessages.filter(m => m.type === 'funny');

    if (amount >= 100000) {
        return blessings[Math.floor(Math.random() * blessings.length)].text;
    } else if (amount <= 5000) {
        return funny[Math.floor(Math.random() * funny.length)].text;
    } else {
        const all = [...blessings, ...funny];
        return all[Math.floor(Math.random() * all.length)].text;
    }
}

function drawLixi() {
    const envelope = document.getElementById('lixiEnvelope');
    const container = document.getElementById('lixiContainer');
    const result = document.getElementById('lixiResult');
    const drawBtn = document.getElementById('drawLixi');

    // Shake animation
    envelope.classList.add('shake');

    setTimeout(() => {
        envelope.classList.remove('shake');
        envelope.classList.add('opened');

        // Get random amount and message
        const lixi = getRandomLixi();
        const message = getRandomMessage(lixi.value);

        // Hide envelope, show result
        setTimeout(() => {
            container.style.display = 'none';
            drawBtn.style.display = 'none';

            document.getElementById('lixiMoney').textContent = `🧧 ${lixi.label}`;
            document.getElementById('lixiMessage').textContent = message;
            result.style.display = 'block';

            // Add effects based on amount
            if (lixi.value === 500000) {
                createJackpotEffect();
            } else if (lixi.value >= 100000) {
                createLixiConfetti();
            }
        }, 400);
    }, 500);
}

function resetLixi() {
    const envelope = document.getElementById('lixiEnvelope');
    const container = document.getElementById('lixiContainer');
    const result = document.getElementById('lixiResult');
    const drawBtn = document.getElementById('drawLixi');
    const claimBtn = document.getElementById('claimLixi');
    const notice = document.getElementById('lixiClaimNotice');

    envelope.classList.remove('opened');
    container.style.display = 'flex';
    drawBtn.style.display = 'inline-flex';
    result.style.display = 'none';
    // Reset thông báo và nút nhận lì xì
    if (claimBtn) claimBtn.style.display = 'inline-flex';
    if (notice) notice.style.display = 'none';
}

function createLixiConfetti() {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const container = document.querySelector('.lixi-card');

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: 0;
            opacity: 1;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${1 + Math.random() * 2}s ease-out forwards;
            z-index: 10;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

function createJackpotEffect() {
    const container = document.querySelector('.lixi-card');

    // Massive confetti
    const colors = ['#FFD700', '#FF6B6B', '#E53935', '#FFC107', '#FF9800', '#FFEB3B'];
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: ${8 + Math.random() * 12}px;
            height: ${8 + Math.random() * 12}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: 0;
            opacity: 1;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${1.5 + Math.random() * 2}s ease-out forwards;
            z-index: 10;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }

    // Firework bursts
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            createFireworkBurst(container, 20 + Math.random() * 60, 30 + Math.random() * 40);
        }, burst * 400);
    }

    // Golden glow effect
    container.style.boxShadow = '0 0 60px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.5)';
    setTimeout(() => {
        container.style.boxShadow = '';
    }, 3000);

    // Jackpot text animation
    const moneyEl = document.getElementById('lixiMoney');
    moneyEl.innerHTML = '🎉 JACKPOT! 🎉<br>🧧 500.000đ 🧧';
    moneyEl.style.animation = 'jackpotPulse 0.5s ease infinite';
    setTimeout(() => {
        moneyEl.style.animation = '';
    }, 3000);
}

function createFireworkBurst(container, x, y) {
    const colors = ['#FFD700', '#FF6B6B', '#00E676', '#2196F3', '#E91E63', '#9C27B0'];
    const particles = 20;

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            box-shadow: 0 0 6px ${color};
            animation: fireworkParticle 1s ease-out forwards;
            --tx: ${Math.cos(angle) * velocity}px;
            --ty: ${Math.sin(angle) * velocity}px;
            z-index: 20;
        `;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

document.getElementById('drawLixi')?.addEventListener('click', drawLixi);
document.getElementById('drawAgain')?.addEventListener('click', resetLixi);
document.getElementById('claimLixi')?.addEventListener('click', () => {
    const notice = document.getElementById('lixiClaimNotice');
    if (notice) {
        notice.style.display = 'block';
        // Ẩn nút nhận lì xì sau khi bấm
        document.getElementById('claimLixi').style.display = 'none';
    }
});

// ===== BẦU CUA GAME =====
const bcItems = ['bau', 'cua', 'tom', 'ca', 'ga', 'nai'];
const bcIcons = {
    bau: '🎃',
    cua: '🦀',
    tom: '🦐',
    ca: '🐟',
    ga: '🐓',
    nai: '🦌'
};

let bcBalance = 1000;
let bcBets = { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 };
let bcCurrentChip = 10;
let bcIsRolling = false;

// Chọn chip cược
document.querySelectorAll('.bc-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.bc-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        bcCurrentChip = parseInt(chip.dataset.value);
    });
});

// Đặt cược vào ô
document.querySelectorAll('.bc-item').forEach(item => {
    item.addEventListener('click', () => {
        if (bcIsRolling) return;

        const itemName = item.dataset.item;
        if (bcBalance >= bcCurrentChip) {
            bcBets[itemName] += bcCurrentChip;
            bcBalance -= bcCurrentChip;
            updateBCDisplay();
            item.classList.add('selected');

            // Hiệu ứng đặt chip
            item.style.transform = 'scale(0.95)';
            setTimeout(() => item.style.transform = '', 150);
        } else {
            showBCMessage('Không đủ xu! 😢', 'lose');
        }
    });
});

// Xóa cược
document.getElementById('bcClear')?.addEventListener('click', () => {
    if (bcIsRolling) return;

    // Hoàn lại xu
    const totalBet = Object.values(bcBets).reduce((a, b) => a + b, 0);
    bcBalance += totalBet;

    // Reset cược
    bcBets = { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 };
    updateBCDisplay();

    document.querySelectorAll('.bc-item').forEach(item => {
        item.classList.remove('selected', 'winner');
    });
    document.getElementById('bcResult').textContent = '';
    document.getElementById('bcResult').className = 'baucua-result';
});

// Lắc xúc xắc
document.getElementById('bcRoll')?.addEventListener('click', () => {
    if (bcIsRolling) return;

    const totalBet = Object.values(bcBets).reduce((a, b) => a + b, 0);
    if (totalBet === 0) {
        showBCMessage('Đặt cược trước đã! 🎯', 'lose');
        return;
    }

    bcIsRolling = true;

    // Xóa trạng thái winner cũ
    document.querySelectorAll('.bc-item').forEach(item => {
        item.classList.remove('winner');
    });

    // Animation lắc xúc xắc
    const dice = [
        document.getElementById('die1'),
        document.getElementById('die2'),
        document.getElementById('die3')
    ];

    dice.forEach(die => die.classList.add('rolling'));

    // Random kết quả trong khi lắc
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        dice.forEach(die => {
            const randomItem = bcItems[Math.floor(Math.random() * bcItems.length)];
            die.textContent = bcIcons[randomItem];
        });
        rollCount++;
        if (rollCount > 20) {
            clearInterval(rollInterval);

            // Kết quả cuối cùng - nai và cá có tỷ lệ cao hơn
            const results = [];
            const weightedItems = ['bau', 'cua', 'tom', 'ca', 'ca', 'ga', 'nai', 'nai'];
            dice.forEach(die => {
                die.classList.remove('rolling');
                const result = weightedItems[Math.floor(Math.random() * weightedItems.length)];
                die.textContent = bcIcons[result];
                results.push(result);
            });

            // Tính toán thắng thua
            calculateBCResult(results);
        }
    }, 100);
});

function calculateBCResult(results) {
    let totalWin = 0;

    // Đếm số lần xuất hiện của mỗi con
    const counts = {};
    results.forEach(r => {
        counts[r] = (counts[r] || 0) + 1;
    });

    // Tính tiền thắng
    bcItems.forEach(item => {
        if (bcBets[item] > 0 && counts[item]) {
            totalWin += bcBets[item] * (counts[item] + 1); // Cược + thắng x số lần xuất hiện

            // Highlight ô thắng
            document.querySelector(`.bc-item[data-item="${item}"]`).classList.add('winner');
        }
    });

    // Cập nhật số dư
    bcBalance += totalWin;

    // Hiển thị kết quả
    const totalBet = Object.values(bcBets).reduce((a, b) => a + b, 0);
    const profit = totalWin - totalBet;

    if (profit > 0) {
        showBCMessage(`🎉 Thắng ${profit} xu! Tổng: +${totalWin} xu`, 'win');
        createBCConfetti();
    } else if (profit === 0) {
        showBCMessage(`😌 Hòa! Lấy lại ${totalWin} xu`, 'win');
    } else {
        showBCMessage(`😢 Thua ${totalBet} xu! Chúc may mắn lần sau~`, 'lose');
    }

    // Reset cược
    bcBets = { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 };
    updateBCDisplay();

    setTimeout(() => {
        document.querySelectorAll('.bc-item').forEach(item => {
            item.classList.remove('selected');
        });
        bcIsRolling = false;
    }, 2000);
}

function updateBCDisplay() {
    document.getElementById('bcBalance').textContent = bcBalance;
    bcItems.forEach(item => {
        document.getElementById(`bet-${item}`).textContent = bcBets[item];
    });
}

function showBCMessage(msg, type) {
    const result = document.getElementById('bcResult');
    result.textContent = msg;
    result.className = `baucua-result ${type}`;
}

function createBCConfetti() {
    const container = document.querySelector('.baucua-card');
    const emojis = ['🎉', '✨', '🪙', '💰', '🎊'];

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 16}px;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: confettiFall ${1 + Math.random() * 2}s ease-out forwards;
            z-index: 10;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// ===== VÒNG QUAY MAY MẮN =====
const wheelPrizes = [
    { icon: '🧧', name: '100 Xu', message: 'Thêm 100 xu vào túi! Lộc nhỏ nhưng có tâm~', type: 'xu' },
    { icon: '💰', name: 'Tài Lộc', message: 'Năm mới tiền vào như nước, tiền ra nhỏ giọt!', type: 'blessing' },
    { icon: '❤️', name: 'Sức Khỏe', message: 'Sức khỏe dồi dào, bách niên giai lão!', type: 'blessing' },
    { icon: '✨', name: 'May Mắn', message: 'Vận may đang đến, mọi việc hanh thông!', type: 'blessing' },
    { icon: '🎊', name: '500 Xu', message: 'WOW! 500 xu! Hên quá đi thôi!', type: 'xu' },
    { icon: '🌟', name: 'Thành Công', message: 'Công thành danh toại, vạn sự như ý!', type: 'blessing' },
    { icon: '💕', name: 'Hạnh Phúc', message: 'Gia đình hạnh phúc, tình yêu viên mãn!', type: 'blessing' },
    { icon: '🏆', name: 'JACKPOT', message: '🎉 JACKPOT! Đại cát đại lợi! Năm nay phát tài lớn!', type: 'jackpot' }
];

let wheelSpinning = false;
let wheelRotation = 0;

document.getElementById('spinWheel')?.addEventListener('click', () => {
    if (wheelSpinning) return;

    wheelSpinning = true;
    const wheel = document.getElementById('luckyWheel');
    const spinBtn = document.getElementById('spinWheel');
    const resultDiv = document.getElementById('wheelResult');

    spinBtn.disabled = true;
    spinBtn.textContent = '🎰 Đang quay...';
    resultDiv.innerHTML = '';

    // Random prize (JACKPOT có tỷ lệ thấp hơn)
    let prizeIndex;
    const rand = Math.random();
    if (rand < 0.05) {
        prizeIndex = 7; // 5% JACKPOT
    } else {
        prizeIndex = Math.floor(Math.random() * 7); // 95% các giải khác
    }

    // Tính góc quay
    const segmentAngle = 360 / 8;
    const targetAngle = 360 - (prizeIndex * segmentAngle) - (segmentAngle / 2);
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 vòng
    const totalRotation = spins * 360 + targetAngle;

    wheelRotation += totalRotation;
    wheel.style.transform = `rotate(${wheelRotation}deg)`;

    // Hiển thị kết quả sau khi quay xong
    setTimeout(() => {
        const prize = wheelPrizes[prizeIndex];

        resultDiv.innerHTML = `
            <div class="prize-icon">${prize.icon}</div>
            <div class="prize-text">${prize.name}</div>
            <div class="prize-message">${prize.message}</div>
        `;

        // Hiệu ứng đặc biệt cho JACKPOT
        if (prize.type === 'jackpot') {
            createWheelConfetti();
            resultDiv.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.3) 100%)';
            resultDiv.style.border = '2px solid var(--color-gold)';
        } else {
            resultDiv.style.background = 'rgba(255, 255, 255, 0.1)';
            resultDiv.style.border = 'none';
        }

        spinBtn.disabled = false;
        spinBtn.textContent = '🎯 Quay Lại!';
        wheelSpinning = false;
    }, 4000);
});

function createWheelConfetti() {
    const container = document.querySelector('.wheel-card');
    const emojis = ['🎉', '✨', '🏆', '💰', '🎊', '⭐', '🌟'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: confettiFall ${1.5 + Math.random() * 2}s ease-out forwards;
            z-index: 10;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== OẲN TÙ TÌ (KÉO BÚA BAO) =====
const rpsChoices = {
    rock: { emoji: '✊', name: 'Búa', beats: 'scissors' },
    scissors: { emoji: '✌️', name: 'Kéo', beats: 'paper' },
    paper: { emoji: '🖐️', name: 'Bao', beats: 'rock' }
};

let rpsScore = { win: 0, lose: 0, draw: 0 };
let rpsPlaying = false;

document.querySelectorAll('.rps-choice').forEach(btn => {
    btn.addEventListener('click', () => {
        if (rpsPlaying) return;

        const playerChoice = btn.dataset.choice;
        playRPS(playerChoice);
    });
});

function playRPS(playerChoice) {
    rpsPlaying = true;

    const playerHand = document.getElementById('playerHand');
    const computerHand = document.getElementById('computerHand');
    const result = document.getElementById('rpsResult');

    // Reset classes
    playerHand.className = 'rps-hand';
    computerHand.className = 'rps-hand';
    result.className = 'rps-result';
    result.textContent = '';

    // Shake animation
    playerHand.classList.add('shake');
    computerHand.classList.add('shake');
    playerHand.textContent = '✊';
    computerHand.textContent = '✊';

    // Computer random choice
    const choices = ['rock', 'scissors', 'paper'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Show result after shake
    setTimeout(() => {
        playerHand.classList.remove('shake');
        computerHand.classList.remove('shake');

        playerHand.textContent = rpsChoices[playerChoice].emoji;
        computerHand.textContent = rpsChoices[computerChoice].emoji;

        // Determine winner
        let resultText = '';
        let resultClass = '';

        if (playerChoice === computerChoice) {
            resultText = '🤝 Hòa! Đấu lại nào~';
            resultClass = 'draw';
            rpsScore.draw++;
        } else if (rpsChoices[playerChoice].beats === computerChoice) {
            resultText = '🎉 Bạn thắng! ' + rpsChoices[playerChoice].name + ' thắng ' + rpsChoices[computerChoice].name;
            resultClass = 'win';
            rpsScore.win++;
            playerHand.classList.add('winner');
            computerHand.classList.add('loser');
            createRPSConfetti();
        } else {
            resultText = '😢 Bạn thua! ' + rpsChoices[computerChoice].name + ' thắng ' + rpsChoices[playerChoice].name;
            resultClass = 'lose';
            rpsScore.lose++;
            computerHand.classList.add('winner');
            playerHand.classList.add('loser');
        }

        result.textContent = resultText;
        result.classList.add(resultClass);

        // Update score
        document.getElementById('rpsWin').textContent = rpsScore.win;
        document.getElementById('rpsLose').textContent = rpsScore.lose;
        document.getElementById('rpsDraw').textContent = rpsScore.draw;

        rpsPlaying = false;
    }, 600);
}

function createRPSConfetti() {
    const container = document.querySelector('.rps-card');
    const emojis = ['🎉', '✨', '🏆', '⭐', '💫'];

    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: absolute;
            font-size: ${14 + Math.random() * 12}px;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: confettiFall ${1 + Math.random() * 1.5}s ease-out forwards;
            z-index: 10;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

// ===== TÍNH TUỔI ÂM LỊCH =====
const zodiacAnimals = [
    { name: 'Tý', animal: 'Chuột', emoji: '🐭', traits: 'Thông minh, nhanh nhẹn, khéo léo, tiết kiệm' },
    { name: 'Sửu', animal: 'Trâu', emoji: '🐂', traits: 'Chăm chỉ, kiên nhẫn, đáng tin cậy, bền bỉ' },
    { name: 'Dần', animal: 'Hổ', emoji: '🐅', traits: 'Dũng cảm, tự tin, mạnh mẽ, quyết đoán' },
    { name: 'Mão', animal: 'Mèo', emoji: '🐇', traits: 'Dịu dàng, tinh tế, khéo léo, may mắn' },
    { name: 'Thìn', animal: 'Rồng', emoji: '🐉', traits: 'Quyền lực, cao quý, thành công, tham vọng' },
    { name: 'Tỵ', animal: 'Rắn', emoji: '🐍', traits: 'Thông thái, bí ẩn, quyến rũ, trực giác tốt' },
    { name: 'Ngọ', animal: 'Ngựa', emoji: '🐴', traits: 'Năng động, tự do, nhiệt huyết, lạc quan' },
    { name: 'Mùi', animal: 'Dê', emoji: '🐐', traits: 'Hiền lành, nghệ sĩ, nhạy cảm, tốt bụng' },
    { name: 'Thân', animal: 'Khỉ', emoji: '🐵', traits: 'Thông minh, linh hoạt, hài hước, sáng tạo' },
    { name: 'Dậu', animal: 'Gà', emoji: '🐓', traits: 'Chăm chỉ, dũng cảm, tự tin, thẳng thắn' },
    { name: 'Tuất', animal: 'Chó', emoji: '🐕', traits: 'Trung thành, thật thà, bảo vệ, đáng tin' },
    { name: 'Hợi', animal: 'Lợn', emoji: '🐷', traits: 'Hào phóng, chân thành, may mắn, vui vẻ' }
];

const canChi = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

// Bảng Lục Thập Hoa Giáp - Ngũ hành nạp âm theo cặp năm
const napAmTable = {
    'Giáp Tý': { menh: 'Kim', tenMenh: 'Hải Trung Kim', desc: 'Vàng trong biển' },
    'Ất Sửu': { menh: 'Kim', tenMenh: 'Hải Trung Kim', desc: 'Vàng trong biển' },
    'Bính Dần': { menh: 'Hỏa', tenMenh: 'Lư Trung Hỏa', desc: 'Lửa trong lò' },
    'Đinh Mão': { menh: 'Hỏa', tenMenh: 'Lư Trung Hỏa', desc: 'Lửa trong lò' },
    'Mậu Thìn': { menh: 'Mộc', tenMenh: 'Đại Lâm Mộc', desc: 'Cây rừng lớn' },
    'Kỷ Tỵ': { menh: 'Mộc', tenMenh: 'Đại Lâm Mộc', desc: 'Cây rừng lớn' },
    'Canh Ngọ': { menh: 'Thổ', tenMenh: 'Lộ Bàng Thổ', desc: 'Đất ven đường' },
    'Tân Mùi': { menh: 'Thổ', tenMenh: 'Lộ Bàng Thổ', desc: 'Đất ven đường' },
    'Nhâm Thân': { menh: 'Kim', tenMenh: 'Kiếm Phong Kim', desc: 'Vàng mũi kiếm' },
    'Quý Dậu': { menh: 'Kim', tenMenh: 'Kiếm Phong Kim', desc: 'Vàng mũi kiếm' },
    'Giáp Tuất': { menh: 'Hỏa', tenMenh: 'Sơn Đầu Hỏa', desc: 'Lửa trên núi' },
    'Ất Hợi': { menh: 'Hỏa', tenMenh: 'Sơn Đầu Hỏa', desc: 'Lửa trên núi' },
    'Bính Tý': { menh: 'Thủy', tenMenh: 'Giản Hạ Thủy', desc: 'Nước dưới khe' },
    'Đinh Sửu': { menh: 'Thủy', tenMenh: 'Giản Hạ Thủy', desc: 'Nước dưới khe' },
    'Mậu Dần': { menh: 'Thổ', tenMenh: 'Thành Đầu Thổ', desc: 'Đất trên thành' },
    'Kỷ Mão': { menh: 'Thổ', tenMenh: 'Thành Đầu Thổ', desc: 'Đất trên thành' },
    'Canh Thìn': { menh: 'Kim', tenMenh: 'Bạch Lạp Kim', desc: 'Vàng trong nến' },
    'Tân Tỵ': { menh: 'Kim', tenMenh: 'Bạch Lạp Kim', desc: 'Vàng trong nến' },
    'Nhâm Ngọ': { menh: 'Mộc', tenMenh: 'Dương Liễu Mộc', desc: 'Cây dương liễu' },
    'Quý Mùi': { menh: 'Mộc', tenMenh: 'Dương Liễu Mộc', desc: 'Cây dương liễu' },
    'Giáp Thân': { menh: 'Thủy', tenMenh: 'Tuyền Trung Thủy', desc: 'Nước trong suối' },
    'Ất Dậu': { menh: 'Thủy', tenMenh: 'Tuyền Trung Thủy', desc: 'Nước trong suối' },
    'Bính Tuất': { menh: 'Thổ', tenMenh: 'Ốc Thượng Thổ', desc: 'Đất trên nóc' },
    'Đinh Hợi': { menh: 'Thổ', tenMenh: 'Ốc Thượng Thổ', desc: 'Đất trên nóc' },
    'Mậu Tý': { menh: 'Hỏa', tenMenh: 'Tích Lịch Hỏa', desc: 'Lửa sấm sét' },
    'Kỷ Sửu': { menh: 'Hỏa', tenMenh: 'Tích Lịch Hỏa', desc: 'Lửa sấm sét' },
    'Canh Dần': { menh: 'Mộc', tenMenh: 'Tùng Bách Mộc', desc: 'Cây tùng bách' },
    'Tân Mão': { menh: 'Mộc', tenMenh: 'Tùng Bách Mộc', desc: 'Cây tùng bách' },
    'Nhâm Thìn': { menh: 'Thủy', tenMenh: 'Trường Lưu Thủy', desc: 'Nước chảy dài' },
    'Quý Tỵ': { menh: 'Thủy', tenMenh: 'Trường Lưu Thủy', desc: 'Nước chảy dài' },
    'Giáp Ngọ': { menh: 'Kim', tenMenh: 'Sa Trung Kim', desc: 'Vàng trong cát' },
    'Ất Mùi': { menh: 'Kim', tenMenh: 'Sa Trung Kim', desc: 'Vàng trong cát' },
    'Bính Thân': { menh: 'Hỏa', tenMenh: 'Sơn Hạ Hỏa', desc: 'Lửa dưới núi' },
    'Đinh Dậu': { menh: 'Hỏa', tenMenh: 'Sơn Hạ Hỏa', desc: 'Lửa dưới núi' },
    'Mậu Tuất': { menh: 'Mộc', tenMenh: 'Bình Địa Mộc', desc: 'Cây đồng bằng' },
    'Kỷ Hợi': { menh: 'Mộc', tenMenh: 'Bình Địa Mộc', desc: 'Cây đồng bằng' },
    'Canh Tý': { menh: 'Thổ', tenMenh: 'Bích Thượng Thổ', desc: 'Đất trên vách' },
    'Tân Sửu': { menh: 'Thổ', tenMenh: 'Bích Thượng Thổ', desc: 'Đất trên vách' },
    'Nhâm Dần': { menh: 'Kim', tenMenh: 'Kim Bạc Kim', desc: 'Vàng lá mỏng' },
    'Quý Mão': { menh: 'Kim', tenMenh: 'Kim Bạc Kim', desc: 'Vàng lá mỏng' },
    'Giáp Thìn': { menh: 'Hỏa', tenMenh: 'Phú Đăng Hỏa', desc: 'Lửa đèn to' },
    'Ất Tỵ': { menh: 'Hỏa', tenMenh: 'Phú Đăng Hỏa', desc: 'Lửa đèn to' },
    'Bính Ngọ': { menh: 'Thủy', tenMenh: 'Thiên Hà Thủy', desc: 'Nước trên trời' },
    'Đinh Mùi': { menh: 'Thủy', tenMenh: 'Thiên Hà Thủy', desc: 'Nước trên trời' },
    'Mậu Thân': { menh: 'Thổ', tenMenh: 'Đại Trạch Thổ', desc: 'Đất nhà lớn' },
    'Kỷ Dậu': { menh: 'Thổ', tenMenh: 'Đại Trạch Thổ', desc: 'Đất nhà lớn' },
    'Canh Tuất': { menh: 'Kim', tenMenh: 'Thoa Xuyến Kim', desc: 'Vàng trang sức' },
    'Tân Hợi': { menh: 'Kim', tenMenh: 'Thoa Xuyến Kim', desc: 'Vàng trang sức' },
    'Nhâm Tý': { menh: 'Mộc', tenMenh: 'Tang Đố Mộc', desc: 'Cây dâu tằm' },
    'Quý Sửu': { menh: 'Mộc', tenMenh: 'Tang Đố Mộc', desc: 'Cây dâu tằm' },
    'Giáp Dần': { menh: 'Thủy', tenMenh: 'Đại Khê Thủy', desc: 'Nước khe lớn' },
    'Ất Mão': { menh: 'Thủy', tenMenh: 'Đại Khê Thủy', desc: 'Nước khe lớn' },
    'Bính Thìn': { menh: 'Thổ', tenMenh: 'Sa Trung Thổ', desc: 'Đất trong cát' },
    'Đinh Tỵ': { menh: 'Thổ', tenMenh: 'Sa Trung Thổ', desc: 'Đất trong cát' },
    'Mậu Ngọ': { menh: 'Hỏa', tenMenh: 'Thiên Thượng Hỏa', desc: 'Lửa trên trời' },
    'Kỷ Mùi': { menh: 'Hỏa', tenMenh: 'Thiên Thượng Hỏa', desc: 'Lửa trên trời' },
    'Canh Thân': { menh: 'Mộc', tenMenh: 'Thạch Lựu Mộc', desc: 'Cây thạch lựu' },
    'Tân Dậu': { menh: 'Mộc', tenMenh: 'Thạch Lựu Mộc', desc: 'Cây thạch lựu' },
    'Nhâm Tuất': { menh: 'Thủy', tenMenh: 'Đại Hải Thủy', desc: 'Nước biển lớn' },
    'Quý Hợi': { menh: 'Thủy', tenMenh: 'Đại Hải Thủy', desc: 'Nước biển lớn' }
};

const elementColors = {
    'Kim': '#FFD700',
    'Thủy': '#4FC3F7',
    'Hỏa': '#FF5722',
    'Thổ': '#8D6E63',
    'Mộc': '#66BB6A'
};

function calcZodiac(year) {
    const zodiacIndex = (year - 4) % 12;
    const canIndex = (year - 4) % 10;

    const can = canChi[canIndex];
    const chi = zodiacAnimals[zodiacIndex].name;
    const canChiKey = `${can} ${chi}`;

    const napAm = napAmTable[canChiKey] || { menh: 'Không xác định', tenMenh: '', desc: '' };

    return {
        zodiac: zodiacAnimals[zodiacIndex],
        can: can,
        chi: chi,
        canChi: canChiKey,
        element: napAm
    };
}

document.getElementById('calcZodiac')?.addEventListener('click', () => {
    const year = parseInt(document.getElementById('birthYear').value);

    if (!year || year < 1900 || year > 2100) {
        alert('Vui lòng nhập năm sinh hợp lệ (1900-2100)');
        return;
    }

    const result = calcZodiac(year);
    const resultDiv = document.getElementById('zodiacResult');

    // Tính tuổi âm năm 2027 (tuổi mụ = 2027 - năm sinh + 1)
    const lunarAge = 2027 - year + 1;

    document.getElementById('zodiacAnimal').textContent = result.zodiac.emoji;
    document.getElementById('zodiacName').textContent = `Tuổi ${result.canChi} (${result.zodiac.animal})`;
    document.getElementById('zodiacElement').innerHTML = `Mệnh <strong style="color:${elementColors[result.element.menh]}">${result.element.menh}</strong> - ${result.element.tenMenh} (${result.element.desc})`;
    document.getElementById('zodiacDesc').innerHTML = `<strong>🎂 ${lunarAge} tuổi âm (năm 2027)</strong><br>Tính cách: ${result.zodiac.traits}`;

    resultDiv.style.display = 'block';
});

document.getElementById('birthYear')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('calcZodiac').click();
});

// ===== XEM TỬ VI 2027 =====
const horoscope2027 = {
    ty: {
        icon: '🐭', name: 'Tý (Chuột)', rating: 4,
        content: 'Năm 2027 mang đến nhiều cơ hội phát triển cho tuổi Tý. Công việc hanh thông, tài chính ổn định. Tuy nhiên cần cẩn thận trong các mối quan hệ và tránh đầu tư mạo hiểm.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐', career: '⭐⭐⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    suu: {
        icon: '🐂', name: 'Sửu (Trâu)', rating: 3,
        content: 'Tuổi Sửu năm nay cần kiên nhẫn và nỗ lực hơn. Nửa đầu năm có thể gặp khó khăn nhưng nửa cuối năm sẽ gặt hái thành công. Chú ý sức khỏe và nghỉ ngơi hợp lý.',
        money: '⭐⭐⭐', love: '⭐⭐⭐⭐', career: '⭐⭐⭐', health: '⭐⭐⭐'
    },
    dan: {
        icon: '🐅', name: 'Dần (Hổ)', rating: 4,
        content: 'Năm Đinh Mùi tương hợp với tuổi Dần, mang lại nhiều may mắn. Sự nghiệp thăng tiến, có quý nhân phù trợ. Tình duyên thuận lợi, người độc thân dễ gặp ý trung nhân.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐⭐⭐', career: '⭐⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    mao: {
        icon: '🐇', name: 'Mão (Mèo)', rating: 3,
        content: 'Tuổi Mão năm nay nên thận trọng trong công việc và tài chính. Tránh vay mượn và đầu tư lớn. Tập trung vào sức khỏe và các mối quan hệ gia đình.',
        money: '⭐⭐⭐', love: '⭐⭐⭐', career: '⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    thin: {
        icon: '🐉', name: 'Thìn (Rồng)', rating: 5,
        content: 'Năm đại cát cho tuổi Thìn! Mọi việc hanh thông, tài lộc dồi dào. Đây là thời điểm tốt để khởi nghiệp, đầu tư hoặc thăng tiến trong sự nghiệp.',
        money: '⭐⭐⭐⭐⭐', love: '⭐⭐⭐⭐', career: '⭐⭐⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    ti: {
        icon: '🐍', name: 'Tỵ (Rắn)', rating: 4,
        content: 'Tuổi Tỵ năm nay có nhiều cơ hội tốt trong công việc. Tài chính ổn định, có thể có thu nhập bất ngờ. Chú ý giữ gìn sức khỏe, đặc biệt là hệ tiêu hóa.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐', career: '⭐⭐⭐⭐', health: '⭐⭐⭐'
    },
    ngo: {
        icon: '🐴', name: 'Ngọ (Ngựa)', rating: 5,
        content: 'Năm Đinh Mùi, tuổi Ngọ được Lục Hợp với Mùi, vận may tăng cao. Công việc hanh thông, có quý nhân phù trợ. Tình duyên tốt đẹp, gia đình hạnh phúc.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐⭐', career: '⭐⭐⭐⭐⭐', health: '⭐⭐⭐'
    },
    mui: {
        icon: '🐐', name: 'Mùi (Dê)', rating: 4,
        content: 'Năm Đinh Mùi là năm bản mệnh của tuổi Mùi! Đây là năm đặc biệt quan trọng. Cần cẩn thận đầu năm, nhưng cuối năm sẽ gặp nhiều may mắn. Nên đeo vật phẩm phong thủy để hóa giải.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐⭐⭐', career: '⭐⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    than: {
        icon: '🐵', name: 'Thân (Khỉ)', rating: 3,
        content: 'Năm nay tuổi Thân cần cẩn thận trong giao tiếp và các mối quan hệ. Tài chính có biến động, nên tiết kiệm. Sức khỏe cần được chú ý, tránh làm việc quá sức.',
        money: '⭐⭐⭐', love: '⭐⭐⭐', career: '⭐⭐⭐', health: '⭐⭐⭐'
    },
    dau: {
        icon: '🐓', name: 'Dậu (Gà)', rating: 3,
        content: 'Tuổi Dậu năm nay nên tập trung vào công việc hiện tại, tránh thay đổi lớn. Tài chính ổn định nếu biết tiết kiệm. Chú ý sức khỏe đường hô hấp.',
        money: '⭐⭐⭐', love: '⭐⭐⭐⭐', career: '⭐⭐⭐', health: '⭐⭐⭐'
    },
    tuat: {
        icon: '🐕', name: 'Tuất (Chó)', rating: 4,
        content: 'Năm 2027 mang lại nhiều điều tốt đẹp cho tuổi Tuất. Công việc hanh thông, tài chính ổn định. Tình duyên thuận lợi, có thể có tin vui về hôn nhân.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐⭐⭐', career: '⭐⭐⭐⭐', health: '⭐⭐⭐⭐'
    },
    hoi: {
        icon: '🐷', name: 'Hợi (Lợn)', rating: 4,
        content: 'Tuổi Hợi năm nay có nhiều cơ hội phát triển. Tài lộc khá tốt, có thể có thu nhập từ nhiều nguồn. Sức khỏe tốt, tinh thần lạc quan.',
        money: '⭐⭐⭐⭐', love: '⭐⭐⭐⭐', career: '⭐⭐⭐⭐', health: '⭐⭐⭐⭐⭐'
    }
};

document.getElementById('horoscopeZodiac')?.addEventListener('change', (e) => {
    const zodiac = e.target.value;
    if (!zodiac) {
        document.getElementById('horoscopeResult').style.display = 'none';
        return;
    }

    const data = horoscope2027[zodiac];
    const resultDiv = document.getElementById('horoscopeResult');

    document.getElementById('horoscopeIcon').textContent = data.icon;
    document.getElementById('horoscopeTitle').textContent = data.name + ' - Năm 2027';
    document.getElementById('horoscopeRating').textContent = '⭐'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    document.getElementById('horoscopeContent').textContent = data.content;
    document.getElementById('horoscopeMoney').textContent = data.money;
    document.getElementById('horoscopeLove').textContent = data.love;
    document.getElementById('horoscopeCareer').textContent = data.career;
    document.getElementById('horoscopeHealth').textContent = data.health;

    resultDiv.style.display = 'block';
});

// ===== MEMORY CARD GAME =====
const memoryIcons = ['🧧', '🏮', '🎊', '🌸', '�', '🎆'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryTimer = null;
let memorySeconds = 0;
let memoryLocked = false;

function initMemoryGame() {
    // Reset
    matchedPairs = 0;
    memoryMoves = 0;
    memorySeconds = 0;
    flippedCards = [];
    memoryLocked = false;

    if (memoryTimer) clearInterval(memoryTimer);

    // Update display
    document.getElementById('memoryPairs').textContent = '0';
    document.getElementById('memoryMoves').textContent = '0';
    document.getElementById('memoryTime').textContent = '00:00';
    document.getElementById('memoryResult').style.display = 'none';

    // Create cards (pairs)
    memoryCards = [...memoryIcons, ...memoryIcons];

    // Shuffle
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }

    // Render board
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';

    memoryCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${icon}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });

    // Start timer
    memoryTimer = setInterval(() => {
        memorySeconds++;
        const mins = Math.floor(memorySeconds / 60).toString().padStart(2, '0');
        const secs = (memorySeconds % 60).toString().padStart(2, '0');
        document.getElementById('memoryTime').textContent = `${mins}:${secs}`;
    }, 1000);
}

function flipCard(card) {
    if (memoryLocked) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;
    if (flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        memoryMoves++;
        document.getElementById('memoryMoves').textContent = memoryMoves;

        checkMatch();
    }
}

function checkMatch() {
    memoryLocked = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        // Match!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('memoryPairs').textContent = matchedPairs;

        flippedCards = [];
        memoryLocked = false;

        // Check win
        if (matchedPairs === memoryIcons.length) {
            clearInterval(memoryTimer);
            showMemoryResult();
        }
    } else {
        // No match - flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            memoryLocked = false;
        }, 1000);
    }
}

function showMemoryResult() {
    const result = document.getElementById('memoryResult');
    const mins = Math.floor(memorySeconds / 60);
    const secs = memorySeconds % 60;

    let rating = '';
    if (memoryMoves <= 10) rating = '🏆 Xuất sắc!';
    else if (memoryMoves <= 15) rating = '⭐ Giỏi lắm!';
    else if (memoryMoves <= 20) rating = '👍 Tốt!';
    else rating = '💪 Cố gắng hơn nhé!';

    result.innerHTML = `
        <h4>🎉 Hoàn thành!</h4>
        <p>${rating}</p>
        <p>Thời gian: ${mins} phút ${secs} giây | Số lượt: ${memoryMoves}</p>
    `;
    result.style.display = 'block';

    // Confetti
    createMemoryConfetti();
}

function createMemoryConfetti() {
    const container = document.querySelector('.memory-card-game');
    const emojis = ['🎉', '✨', '🏆', '⭐', '🎊'];

    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: absolute;
            font-size: ${14 + Math.random() * 14}px;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: confettiFall ${1 + Math.random() * 2}s ease-out forwards;
            z-index: 10;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

document.getElementById('resetMemory')?.addEventListener('click', initMemoryGame);

// Auto init when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('memoryBoard')) {
        initMemoryGame();
    }
});

// ===== SCRATCH CARD GAME =====
const scratchPrizes = [
    { amount: '5.000 VNĐ', message: 'Lộc Nhỏ Góp Gió' },
    { amount: '10.000 VNĐ', message: 'May Mắn Đầu Xuân' },
    { amount: '20.000 VNĐ', message: 'Xuân Sang Phát Tài' },
    { amount: '50.000 VNĐ', message: 'Tài Lộc Dồi Dào' },
    { amount: '100.000 VNĐ', message: 'Phú Quý Vinh Hoa 🎉' }
];

let scratchCanvas, scratchCtx;
let isScratching = false;
let scratchRevealed = false;

function initScratchCard() {
    scratchCanvas = document.getElementById('scratchCanvas');
    if (!scratchCanvas) return;

    scratchCtx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    scratchRevealed = false;

    // Set canvas size
    const container = document.getElementById('scratchContainer');
    scratchCanvas.width = container.offsetWidth;
    scratchCanvas.height = container.offsetHeight;

    // Draw scratch layer with gradient
    const gradient = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#ef4444');
    gradient.addColorStop(0.5, '#dc2626');
    gradient.addColorStop(1, '#b91c1c');

    scratchCtx.fillStyle = gradient;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);

    // Draw decorative circles
    scratchCtx.globalAlpha = 0.2;
    for (let i = 0; i < 8; i++) {
        const x = Math.random() * scratchCanvas.width;
        const y = Math.random() * scratchCanvas.height;
        const r = 20 + Math.random() * 40;
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, r, 0, Math.PI * 2);
        scratchCtx.fillStyle = '#fbbf24';
        scratchCtx.fill();
    }
    scratchCtx.globalAlpha = 1;

    // Draw text
    scratchCtx.fillStyle = '#fbbf24';
    scratchCtx.font = 'bold 28px Playfair Display, serif';
    scratchCtx.textAlign = 'center';
    scratchCtx.fillText('CÀO TẠI ĐÂY', scratchCanvas.width / 2, scratchCanvas.height / 2);

    scratchCtx.fillStyle = '#fef3c7';
    scratchCtx.font = '14px Inter, sans-serif';
    scratchCtx.fillText('Scratch Here', scratchCanvas.width / 2, scratchCanvas.height / 2 + 25);

    // Set random prize
    const prize = scratchPrizes[Math.floor(Math.random() * scratchPrizes.length)];
    document.getElementById('scratchPrize').textContent = prize.amount;
    document.getElementById('scratchMessage').textContent = prize.message;

    // Show canvas
    scratchCanvas.style.opacity = '1';
}

function scratch(x, y) {
    if (scratchRevealed) return;

    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 18, 0, Math.PI * 2);
    scratchCtx.fill();

    checkScratchProgress();
}

function checkScratchProgress() {
    const imageData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentPixels++;
    }

    const totalPixels = pixels.length / 4;
    const percentage = (transparentPixels / totalPixels) * 100;

    if (percentage > 50 && !scratchRevealed) {
        scratchRevealed = true;
        scratchCanvas.style.transition = 'opacity 0.5s';
        scratchCanvas.style.opacity = '0';

        // Celebration effect
        const prize = document.getElementById('scratchPrize').textContent;
        if (prize.includes('100.000') || prize.includes('50.000')) {
            createScratchConfetti();
        }
    }
}

function createScratchConfetti() {
    const container = document.querySelector('.scratch-card-wrapper');
    const emojis = ['🎉', '✨', '🪙', '💰', '🧧', '🎊'];

    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 16}px;
            left: ${Math.random() * 100}%;
            top: 50%;
            opacity: 1;
            pointer-events: none;
            z-index: 100;
            animation: scratchConfettiFall ${1.5 + Math.random() * 1.5}s ease-out forwards;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Mouse events
document.getElementById('scratchCanvas')?.addEventListener('mousedown', (e) => {
    isScratching = true;
    const rect = scratchCanvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
});

document.getElementById('scratchCanvas')?.addEventListener('mousemove', (e) => {
    if (!isScratching) return;
    const rect = scratchCanvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
});

document.addEventListener('mouseup', () => {
    isScratching = false;
});

// Touch events
document.getElementById('scratchCanvas')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isScratching = true;
    const rect = scratchCanvas.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
});

document.getElementById('scratchCanvas')?.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isScratching) return;
    const rect = scratchCanvas.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
});

document.addEventListener('touchend', () => {
    isScratching = false;
});

// Reset button
document.getElementById('scratchReset')?.addEventListener('click', initScratchCard);

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('scratchCanvas')) {
        initScratchCard();
    }
});

// ===== SOCIAL SHARE =====
const pageUrl = encodeURIComponent(window.location.href);
const pageTitle = encodeURIComponent('Tết Nguyên Đán 2027 - Khởi Đầu An Khang Thịnh Vượng');
const pageDesc = encodeURIComponent('Khám phá Tết Việt 2027 - Năm Đinh Mùi với phong tục, món ăn, và lời chúc tốt đẹp!');

document.getElementById('shareFacebook')?.addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank', 'width=600,height=400');
});

document.getElementById('shareZalo')?.addEventListener('click', () => {
    window.open(`https://zalo.me/share?url=${pageUrl}`, '_blank', 'width=600,height=400');
});

document.getElementById('shareTwitter')?.addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`, '_blank', 'width=600,height=400');
});

document.getElementById('copyLink')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.getElementById('copyLink');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Đã sao chép!';
        setTimeout(() => btn.innerHTML = originalText, 2000);
    });
});

// Initialize lunar calendar - handled by updateCurrentDate() now


// ===== DARK MODE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIcon = darkModeToggle?.querySelector('.toggle-icon');

// Check saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    if (toggleIcon) toggleIcon.textContent = '☀️';
}

darkModeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
});

// ===== THEME SWITCHER =====
const themeSwitcher = document.getElementById('themeSwitcher');
const themeToggle = document.getElementById('themeToggle');
const themeOptions = document.querySelectorAll('.theme-option');

// Toggle theme options visibility
themeToggle?.addEventListener('click', () => {
    themeSwitcher.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (themeSwitcher && !themeSwitcher.contains(e.target)) {
        themeSwitcher.classList.remove('active');
    }
});

// Apply saved theme
const savedTheme = localStorage.getItem('theme') || 'default';
if (savedTheme !== 'default') {
    document.body.classList.add(`theme-${savedTheme}`);
}
updateActiveThemeOption(savedTheme);

// Theme option click
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.dataset.theme;

        // Remove all theme classes
        document.body.classList.remove('theme-pink', 'theme-green');

        // Add new theme if not default
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }

        // Save preference
        localStorage.setItem('theme', theme);

        // Update active state
        updateActiveThemeOption(theme);

        // Close options
        themeSwitcher.classList.remove('active');
    });
});

function updateActiveThemeOption(theme) {
    themeOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === theme);
    });
}

// ===== PETAL EFFECT =====
function createPetal() {
    const container = document.getElementById('petalContainer');
    if (!container) return;

    const petals = ['🌸', '🏮', '✨', '💮', '🎊'];
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (12 + Math.random() * 20) + 'px';
    petal.style.animationDuration = (5 + Math.random() * 5) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(petal);

    // Remove after animation
    setTimeout(() => petal.remove(), 12000);
}

// Create petals periodically
setInterval(createPetal, 800);

// Initial petals
for (let i = 0; i < 10; i++) {
    setTimeout(createPetal, i * 200);
}

// ===== CUSTOM CURSOR (optional - can be toggled) =====
// Uncomment to enable custom cursor
// document.body.classList.add('custom-cursor');


// ===== AUDIO PLAYER =====
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
const audioIcon = audioToggle?.querySelector('.nav-btn-icon');
let isPlaying = false;

// Welcome overlay and auto play music
const welcomeOverlay = document.getElementById('welcomeOverlay');
const enterSiteBtn = document.getElementById('enterSite');

enterSiteBtn?.addEventListener('click', () => {
    // Hide welcome overlay
    welcomeOverlay.classList.add('hidden');

    // Play music
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            isPlaying = true;
            if (audioIcon) audioIcon.textContent = '🎵';
            if (audioToggle) audioToggle.classList.add('playing');
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    }
});

// Toggle button
audioToggle?.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        if (audioIcon) audioIcon.textContent = '🔇';
        audioToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        if (audioIcon) audioIcon.textContent = '🎵';
        audioToggle.classList.add('playing');
        isPlaying = true;
    }
});

// ===== MOBILE CONTROLS =====
const mobileAudioToggle = document.getElementById('mobileAudioToggle');
const mobileDarkToggle = document.getElementById('mobileDarkToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileThemeOptions = document.getElementById('mobileThemeOptions');
const mobileThemeOpts = document.querySelectorAll('.mobile-theme-opt');
const mobileAudioIcon = mobileAudioToggle?.querySelector('.mobile-btn-icon');
const mobileDarkIcon = mobileDarkToggle?.querySelector('.mobile-toggle-icon');

// Sync mobile audio button
mobileAudioToggle?.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        if (audioIcon) audioIcon.textContent = '🔇';
        if (mobileAudioIcon) mobileAudioIcon.textContent = '🔇';
        audioToggle?.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        if (audioIcon) audioIcon.textContent = '🎵';
        if (mobileAudioIcon) mobileAudioIcon.textContent = '🎵';
        audioToggle?.classList.add('playing');
        isPlaying = true;
    }
});

// Sync mobile dark mode button
mobileDarkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    if (toggleIcon) toggleIcon.textContent = isDark ? '☀️' : '🌙';
    if (mobileDarkIcon) mobileDarkIcon.textContent = isDark ? '☀️' : '🌙';
});

// Mobile theme toggle
mobileThemeToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileThemeOptions?.classList.toggle('active');
});

// Mobile theme options
mobileThemeOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        const theme = opt.dataset.theme;
        document.body.classList.remove('theme-pink', 'theme-green');
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        localStorage.setItem('theme', theme);
        updateActiveThemeOption(theme);
        mobileThemeOpts.forEach(o => o.classList.toggle('active', o.dataset.theme === theme));
        mobileThemeOptions?.classList.remove('active');
    });
});

// Close mobile theme options when clicking outside
document.addEventListener('click', (e) => {
    if (mobileThemeOptions && !mobileThemeToggle?.contains(e.target) && !mobileThemeOptions.contains(e.target)) {
        mobileThemeOptions.classList.remove('active');
    }
});

// Sync initial state for mobile
if (localStorage.getItem('darkMode') === 'true' && mobileDarkIcon) {
    mobileDarkIcon.textContent = '☀️';
}

// ===== SERVICE WORKER REGISTRATION (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered:', registration.scope);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
});




// ===== FORTUNE TELLING =====
const fortunes = [
    {
        number: 1,
        title: "Thượng Thượng - Đại Cát",
        poem: "Rồng bay phượng múa trời xuân đẹp\nVạn sự hanh thông phúc lộc đầy\nCông danh sự nghiệp lên như diều\nGia đạo bình an tựa núi mây",
        meaning: "Quẻ cực tốt! Năm nay mọi việc đều thuận lợi, tài lộc dồi dào, gia đình hạnh phúc.",
        luck: "excellent",
        luckText: "⭐ Cực Tốt"
    },
    {
        number: 2,
        title: "Thượng Cát - May Mắn",
        poem: "Xuân về hoa nở khắp muôn nơi\nPhúc đức ông bà phù hộ đời\nLàm ăn thuận lợi tiền vào túi\nSức khỏe bình an sống thảnh thơi",
        meaning: "Quẻ tốt! Công việc suôn sẻ, có quý nhân phù trợ, tài chính ổn định.",
        luck: "good",
        luckText: "🌟 Tốt"
    },
    {
        number: 3,
        title: "Trung Cát - Bình An",
        poem: "Đường đời bằng phẳng bước thong dong\nChớ vội chớ vàng giữ tấm lòng\nKiên nhẫn chờ thời cơ hội đến\nMùa xuân hoa nở rộ thành công",
        meaning: "Quẻ trung bình khá! Cần kiên nhẫn, không nên vội vàng, cuối năm sẽ gặp may.",
        luck: "average",
        luckText: "✨ Khá"
    },
    {
        number: 4,
        title: "Trung Bình - Cẩn Thận",
        poem: "Mây che mặt nguyệt tạm thời thôi\nGiữ vững niềm tin chớ ngậm ngùi\nQua cơn mưa trời lại sáng\nPhúc lành sẽ đến với người ơi",
        meaning: "Quẻ trung bình! Đầu năm có chút trắc trở, cần cẩn thận trong giao tiếp và tài chính.",
        luck: "average",
        luckText: "💫 Trung Bình"
    },
    {
        number: 5,
        title: "Hạ Cát - Vượt Khó",
        poem: "Gian nan rèn luyện chí anh hùng\nVượt qua sóng gió đến thành công\nChớ nản lòng khi đường còn khó\nCuối năm vận đổi sẽ hanh thông",
        meaning: "Quẻ thử thách! Năm nay cần nỗ lực nhiều hơn, nhưng kiên trì sẽ được đền đáp.",
        luck: "challenging",
        luckText: "🔥 Cần Cố Gắng"
    },
    {
        number: 6,
        title: "Thượng Cát - Tài Lộc",
        poem: "Tiền tài như nước chảy vào nhà\nBuôn bán làm ăn thật thịnh đa\nGia đình sum họp vui xuân mới\nPhúc lộc song toàn đẹp mặn mà",
        meaning: "Quẻ tài lộc! Năm nay thuận lợi về tài chính, kinh doanh phát đạt.",
        luck: "excellent",
        luckText: "💰 Tài Lộc"
    },
    {
        number: 7,
        title: "Trung Thượng - Tình Duyên",
        poem: "Duyên lành kết nối tự trời xanh\nĐôi lứa sum vầy nghĩa trọn tình\nNgười độc thân sẽ gặp người ý\nGia đình hạnh phúc mãi an lành",
        meaning: "Quẻ tình duyên! Người độc thân có cơ hội gặp người phù hợp, người có đôi thêm gắn bó.",
        luck: "good",
        luckText: "💕 Tình Duyên"
    },
    {
        number: 8,
        title: "Thượng Cát - Sức Khỏe",
        poem: "Thân thể khỏe mạnh tinh thần vui\nBệnh tật tiêu tan chẳng ngại ngùi\nTập luyện đều đặn thêm sức sống\nSống lâu trăm tuổi hưởng xuân tươi",
        meaning: "Quẻ sức khỏe! Năm nay sức khỏe tốt, tinh thần sảng khoái, nên duy trì lối sống lành mạnh.",
        luck: "good",
        luckText: "💪 Sức Khỏe"
    }
];

let fortuneDrawn = false;

document.getElementById('drawFortune')?.addEventListener('click', () => {
    if (fortuneDrawn) {
        // Reset
        document.getElementById('fortuneResult').style.display = 'none';
        document.querySelectorAll('.stick').forEach(s => s.classList.remove('selected'));
        document.getElementById('drawFortune').textContent = '🎋 Rút Quẻ';
        fortuneDrawn = false;
        return;
    }

    // Animate sticks
    const sticks = document.querySelectorAll('.stick');
    sticks.forEach((stick, i) => {
        setTimeout(() => {
            stick.style.transform = `translateY(-${Math.random() * 20}px) rotate(${Math.random() * 10 - 5}deg)`;
        }, i * 100);
    });

    // Select random stick after animation
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * sticks.length);
        sticks[randomIndex].classList.add('selected');

        // Show fortune
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        showFortune(fortune);

        document.getElementById('drawFortune').textContent = '🔄 Rút Lại';
        fortuneDrawn = true;
    }, 600);
});

// Click on individual stick
document.querySelectorAll('.stick').forEach(stick => {
    stick.addEventListener('click', () => {
        if (fortuneDrawn) return;

        document.querySelectorAll('.stick').forEach(s => s.classList.remove('selected'));
        stick.classList.add('selected');

        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        showFortune(fortune);

        document.getElementById('drawFortune').textContent = '🔄 Rút Lại';
        fortuneDrawn = true;
    });
});

function showFortune(fortune) {
    const resultDiv = document.getElementById('fortuneResult');
    resultDiv.innerHTML = `
        <div class="fortune-number">Quẻ số ${fortune.number}</div>
        <div class="fortune-title">${fortune.title}</div>
        <div class="fortune-poem">${fortune.poem.replace(/\n/g, '<br>')}</div>
        <div class="fortune-meaning">${fortune.meaning}</div>
        <span class="fortune-luck ${fortune.luck}">${fortune.luckText}</span>
    `;
    resultDiv.style.display = 'block';
}


// ===== FAQ CHATBOT =====
const faqData = {
    1: {
        q: "Tết 2027 là ngày nào?",
        a: "Tết Nguyên Đán 2027 (Tết Đinh Mùi) rơi vào <strong>Thứ Bảy, ngày 06/02/2027</strong> dương lịch. Đây là ngày Mùng 1 Tết âm lịch. Giao thừa sẽ vào đêm 05/02/2027."
    },
    2: {
        q: "Được nghỉ Tết mấy ngày?",
        a: "Theo quy định, công chức được nghỉ <strong>9 ngày</strong> (từ 29 Tết đến hết Mùng 7). Vui lòng theo dõi thông báo chính thức từ Chính phủ!"
    },
    3: {
        q: "Năm 2027 là năm con gì?",
        a: "Năm 2027 là năm <strong>Đinh Mùi</strong> - con Dê. Người tuổi Mùi thường hiền lành, nhạy cảm và nghệ sĩ. Năm nay hợp với tuổi Hợi, Mão, Ngọ."
    },
    4: {
        q: "SV Duy Tân nghỉ Tết mấy ngày?",
        a: "Lịch nghỉ Tết Nguyên Đán 2027 của sinh viên ĐH Duy Tân sẽ được thông báo sau. Vui lòng theo dõi thông tin chính thức từ nhà trường trên MyDTU."
    },
    5: {
        q: "Ngày thần tài 2027?",
        a: "Ngày vía Thần Tài 2027 là <strong>Mùng 10 tháng Giêng</strong>, tức <strong>Thứ Hai 15/02/2027</strong>. Đây là ngày tốt để mua vàng cầu may mắn, tài lộc cả năm!"
    },
    6: {
        q: "Kiêng kỵ gì ngày Tết?",
        a: "Những điều nên kiêng:<br>• Không quét nhà Mùng 1 (quét tài lộc)<br>• Không cho vay/đòi nợ đầu năm<br>• Không mặc đồ trắng, đen<br>• Không cãi nhau, nói điều xui<br>• Không làm vỡ đồ vật"
    },
    7: {
        q: "Cách gói bánh Tét?",
        a: "Bạn hãy liên hệ trực tiếp với anh Vũ đẹp trai nhé! 😜🤣👨‍🍳"
    },

    9: {
        q: "Giờ tốt xuất hành?",
        a: "Giờ tốt xuất hành Mùng 1 Tết 2027:<br>• <strong>Giờ Mão (5-7h)</strong> - hướng Đông Nam<br>• <strong>Giờ Ngọ (11-13h)</strong> - hướng Nam<br>• <strong>Giờ Mùi (13-15h)</strong> - hướng Tây Nam"
    },
    10: {
        q: "Có nên dọn nhà ngày Tết?",
        a: "<strong>Không nên quét nhà Mùng 1 Tết</strong> vì quan niệm sẽ quét đi tài lộc. Nên dọn dẹp sạch sẽ trước Giao thừa. Từ Mùng 2 có thể dọn bình thường."
    },
    11: {
        q: "Mặc màu gì may mắn?",
        a: "Màu may mắn dịp Tết 2027:<br>• <strong>Đỏ:</strong> May mắn, thịnh vượng<br>• <strong>Vàng/Gold:</strong> Tài lộc, giàu sang<br>• <strong>Hồng:</strong> Tình duyên, hạnh phúc<br>Tránh: trắng, đen (tang tóc)"
    },
    12: {
        q: "Ý nghĩa Tết Nguyên Đán?",
        a: "<strong>Tết Nguyên Đán</strong> nghĩa là 'Tiết đầu năm mới'. Đây là dịp:<br>• Đoàn viên gia đình<br>• Tưởng nhớ tổ tiên<br>• Chào đón năm mới<br>• Cầu mong bình an, may mắn"
    },
    13: {
        q: "Ý nghĩa lì xì?",
        a: "<strong>Lì xì</strong> (hồng bao) mang ý nghĩa:<br>• Chúc may mắn, sức khỏe<br>• Truyền tài lộc đầu năm<br>• Thể hiện tình yêu thương<br>Tiền lì xì thường là số chẵn, tránh số 4."
    },
    14: {
        q: "Nên đi du lịch Tết không?",
        a: "Du lịch Tết 2027 phù hợp nếu:<br>• Đã cúng ông bà xong<br>• Gia đình đồng ý<br>Điểm đến hot: Đà Lạt, Phú Quốc, Sapa, Hội An. Nên đặt sớm vì giá tăng cao!"
    },
    15: {
        q: "Tết có từ bao giờ?",
        a: "Tết Nguyên Đán có <strong>lịch sử hàng nghìn năm</strong>, gắn liền với nền văn minh lúa nước. Bắt nguồn từ thời Hùng Vương, là lễ hội quan trọng nhất của người Việt."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const faqToggle = document.getElementById('faqToggle');
    const faqContainer = document.getElementById('faqContainer');
    const faqClose = document.getElementById('faqClose');
    const faqMessages = document.getElementById('faqMessages');
    const faqQuestions = document.getElementById('faqQuestions');

    if (!faqToggle) return;

    // Toggle chatbot
    faqToggle.addEventListener('click', () => {
        faqContainer.classList.toggle('active');
    });

    faqClose.addEventListener('click', () => {
        faqContainer.classList.remove('active');
    });

    // Handle question click
    faqQuestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('faq-btn')) {
            const qId = e.target.dataset.q;
            const data = faqData[qId];

            if (data) {
                // Add user question
                const userMsg = document.createElement('div');
                userMsg.className = 'faq-user-msg';
                userMsg.textContent = data.q;
                faqMessages.appendChild(userMsg);

                // Add bot answer after delay
                setTimeout(() => {
                    const botMsg = document.createElement('div');
                    botMsg.className = 'faq-bot-msg';
                    botMsg.innerHTML = data.a;
                    faqMessages.appendChild(botMsg);
                    faqMessages.scrollTop = faqMessages.scrollHeight;
                }, 500);

                faqMessages.scrollTop = faqMessages.scrollHeight;
            }
        }
    });

    // Handle custom input
    const faqInput = document.getElementById('faqInput');
    const faqSendBtn = document.getElementById('faqSendBtn');

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzTX7TlAEuRiyjb6JIfpFw82JiZxeZzTAU0hsPtZdtZV_mFpYy-WzgKnogUe-dhH9RXOA/exec';

    const saveToGoogleSheet = (message) => {
        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                userAgent: navigator.userAgent
            })
        }).catch(err => console.log('Log error:', err));
    };

    const handleCustomInput = () => {
        const text = faqInput.value.trim();
        if (!text) return;

        // Save to Google Sheet
        saveToGoogleSheet(text);

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'faq-user-msg';
        userMsg.textContent = text;
        faqMessages.appendChild(userMsg);
        faqInput.value = '';

        // Add bot response after delay
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'faq-bot-msg';
            botMsg.innerHTML = 'Ối! Mình chỉ là bot nhỏ thôi. Anh Vũ đang bận đẹp trai nên chưa dạy mình chat được. Hãy chọn câu hỏi có sẵn nhé! 😄';
            faqMessages.appendChild(botMsg);
            faqMessages.scrollTop = faqMessages.scrollHeight;
        }, 500);

        faqMessages.scrollTop = faqMessages.scrollHeight;
    };

    faqSendBtn.addEventListener('click', handleCustomInput);
    faqInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCustomInput();
    });
});