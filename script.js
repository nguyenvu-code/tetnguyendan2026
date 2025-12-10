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
    // Tết Nguyên Đán 2026: 17/02/2026 (Mùng 1 Tết)
    const tetDate = new Date('February 17, 2026 00:00:00').getTime();
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
    anchor.addEventListener('click', function(e) {
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


// ===== LUNAR CALENDAR =====
// Accurate lunar calendar conversion using lookup table
const LUNAR_INFO = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252
];

function lYearDays(y) {
    let sum = 348;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
    }
    return sum + leapDays(y);
}

function leapMonth(y) {
    return LUNAR_INFO[y - 1900] & 0xf;
}

function leapDays(y) {
    if (leapMonth(y)) {
        return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
}

function monthDays(y, m) {
    return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function solarToLunar(date) {
    const baseDate = new Date(1900, 0, 31);
    let offset = Math.floor((date - baseDate) / 86400000);
    
    let lunarYear = 1900;
    let lunarMonth = 1;
    let lunarDay = 1;
    let isLeap = false;
    
    // Calculate year
    let daysInYear = lYearDays(lunarYear);
    while (offset >= daysInYear) {
        offset -= daysInYear;
        lunarYear++;
        daysInYear = lYearDays(lunarYear);
    }
    
    // Calculate month
    let leap = leapMonth(lunarYear);
    let daysInMonth;
    
    for (let i = 1; i <= 12; i++) {
        if (leap > 0 && i === leap + 1 && !isLeap) {
            --i;
            isLeap = true;
            daysInMonth = leapDays(lunarYear);
        } else {
            daysInMonth = monthDays(lunarYear, i);
        }
        
        if (isLeap && i === leap + 1) {
            isLeap = false;
        }
        
        if (offset < daysInMonth) {
            lunarMonth = i;
            break;
        }
        offset -= daysInMonth;
    }
    
    lunarDay = offset + 1;
    
    return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap };
}

function getLunarDate() {
    const today = new Date();
    const lunar = solarToLunar(today);
    
    const canChi = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const diaChi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    const zodiacAnimals = ['🐀 Chuột', '🐂 Trâu', '🐅 Hổ', '🐇 Mèo', '🐉 Rồng', '🐍 Rắn', '🐴 Ngựa', '🐐 Dê', '🐵 Khỉ', '🐔 Gà', '🐕 Chó', '🐷 Lợn'];
    
    const canIndex = (lunar.year - 4) % 10;
    const chiIndex = (lunar.year - 4) % 12;
    const yearName = `${canChi[canIndex]} ${diaChi[chiIndex]}`;
    const zodiac = zodiacAnimals[chiIndex];
    
    document.getElementById('lunarDate').textContent = `${lunar.day}/${lunar.month}`;
    document.getElementById('lunarDay').textContent = `Ngày ${lunar.day}`;
    document.getElementById('lunarMonth').textContent = `Tháng ${lunar.month}`;
    document.getElementById('lunarYear').textContent = `Năm ${yearName}`;
    document.getElementById('lunarZodiac').textContent = zodiac;
}

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
    const message = `🧧 Thiệp Chúc Tết gửi ${name}:\n\n${greetingMessages[template]}\n\n🌸 Xuân Bính Ngọ 2026`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Thiệp Chúc Tết 2026',
            text: message
        });
    } else {
        navigator.clipboard.writeText(message);
        alert('Đã sao chép lời chúc vào clipboard!');
    }
});

// ===== XONG DAT CHECKER =====
const xongdatData = {
    // Tuổi hợp xông đất cho từng tuổi gia chủ (simplified)
    goodYears: {
        'Tý': ['Thân', 'Thìn', 'Sửu'],
        'Sửu': ['Tỵ', 'Dậu', 'Tý'],
        'Dần': ['Ngọ', 'Tuất', 'Hợi'],
        'Mão': ['Hợi', 'Mùi', 'Tuất'],
        'Thìn': ['Tý', 'Thân', 'Dậu'],
        'Tỵ': ['Dậu', 'Sửu', 'Thân'],
        'Ngọ': ['Dần', 'Tuất', 'Mùi'],
        'Mùi': ['Mão', 'Hợi', 'Ngọ'],
        'Thân': ['Tý', 'Thìn', 'Tỵ'],
        'Dậu': ['Tỵ', 'Sửu', 'Thìn'],
        'Tuất': ['Dần', 'Ngọ', 'Mão'],
        'Hợi': ['Mão', 'Mùi', 'Dần']
    },
    badYears: {
        'Tý': ['Ngọ', 'Mão', 'Mùi'],
        'Sửu': ['Mùi', 'Ngọ', 'Tuất'],
        'Dần': ['Thân', 'Tỵ'],
        'Mão': ['Dậu', 'Thìn'],
        'Thìn': ['Tuất', 'Mão'],
        'Tỵ': ['Hợi', 'Dần'],
        'Ngọ': ['Tý', 'Sửu'],
        'Mùi': ['Sửu', 'Tý'],
        'Thân': ['Dần', 'Hợi'],
        'Dậu': ['Mão', 'Tuất'],
        'Tuất': ['Thìn', 'Dậu'],
        'Hợi': ['Tỵ', 'Thân']
    }
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
    resultDiv.innerHTML = `
        <h4>🏠 Gia chủ tuổi ${zodiac} (${year})</h4>
        <p><strong>Năm Bính Ngọ 2026 - Tuổi hợp xông đất:</strong></p>
        <ul>
            ${goodYears.map(y => `<li class="tuoi-tot">✅ Tuổi ${y} - Hợp, mang lại may mắn</li>`).join('')}
        </ul>
        <p><strong>Tuổi nên tránh:</strong></p>
        <ul>
            ${badYears.map(y => `<li class="tuoi-xau">❌ Tuổi ${y} - Xung khắc</li>`).join('')}
        </ul>
        <p style="margin-top: 12px; font-style: italic; color: var(--color-text-light);">
            💡 Giờ tốt xông đất: 23h-1h (Tý), 5h-7h (Mão), 7h-9h (Thìn)
        </p>
    `;
    resultDiv.style.display = 'block';
});

// ===== QUIZ TET =====
const quizQuestions = [
    {
        question: 'Tết Nguyên Đán 2026 rơi vào ngày nào dương lịch?',
        options: ['15/02/2026', '16/02/2026', '17/02/2026', '18/02/2026'],
        correct: 2
    },
    {
        question: 'Năm 2026 là năm con gì theo âm lịch?',
        options: ['Rắn', 'Ngựa', 'Dê', 'Khỉ'],
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

// ===== SOCIAL SHARE =====
const pageUrl = encodeURIComponent(window.location.href);
const pageTitle = encodeURIComponent('Tết Nguyên Đán 2026 - Khởi Đầu An Khang Thịnh Vượng');
const pageDesc = encodeURIComponent('Khám phá Tết Việt 2026 - Năm Bính Ngọ với phong tục, món ăn, và lời chúc tốt đẹp!');

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

// Initialize lunar calendar
document.addEventListener('DOMContentLoaded', () => {
    getLunarDate();
});


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
