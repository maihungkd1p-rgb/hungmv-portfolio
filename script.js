/**
 * MAI VĂN HƯNG - EXECUTIVE PORTFOLIO INTERACTION SYSTEM (2026)
 * Vanilla JavaScript (Zero Dependencies, High Performance)
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTimelineFilter();
    initAiSimulator();
    initLightbox();
    initContactCopy();
    initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE LINK SPY
   -------------------------------------------------------------------------- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link spy
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // Mobile Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '☰';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   2. TIMELINE CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initTimelineFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineNodes = document.querySelectorAll('.timeline-node');

    if (!filterBtns.length || !timelineNodes.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            timelineNodes.forEach(node => {
                const category = node.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    node.classList.remove('hidden');
                    node.style.opacity = '0';
                    node.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        node.style.opacity = '1';
                        node.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    node.classList.add('hidden');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   3. AI WORKFORCE INTERACTIVE SIMULATOR
   -------------------------------------------------------------------------- */
function initAiSimulator() {
    const storeSlider = document.getElementById('storeRange');
    const storeCountDisplay = document.getElementById('storeCountVal');
    const hoursSavedDisplay = document.getElementById('hoursSavedVal');
    const costSavedDisplay = document.getElementById('costSavedVal');
    const complianceDisplay = document.getElementById('complianceVal');

    if (!storeSlider) return;

    function updateSimulation() {
        const stores = parseInt(storeSlider.value, 10);
        storeCountDisplay.textContent = `${stores} Điểm bán`;

        // Tiết kiệm trung bình 4 giờ tổng hợp số liệu thủ công mỗi cửa hàng/tuần
        const hoursSavedPerMonth = Math.round(stores * 4 * 4.2);
        hoursSavedDisplay.textContent = `${hoursSavedPerMonth} Giờ / Tháng`;

        // Chi phí nhân lực và hao hụt tiết kiệm (triệu VNĐ/tháng)
        const costSaved = Math.round(stores * 2.8);
        costSavedDisplay.textContent = `~${costSaved} Triệu VNĐ`;

        // Tỷ lệ tuân thủ SOP tăng theo quy mô khi áp dụng Real-time Audit
        const compliance = Math.min(98, 91 + Math.round(stores * 0.2));
        complianceDisplay.textContent = `${compliance}%`;
    }

    storeSlider.addEventListener('input', updateSimulation);
    updateSimulation(); // initial
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX MODAL FOR GALLERY & CERTS
   -------------------------------------------------------------------------- */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .cert-card');
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    if (!modal || !modalImg) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                modalImg.src = img.src;
                modal.classList.add('active');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

/* --------------------------------------------------------------------------
   5. CONTACT QUICK COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initContactCopy() {
    const copyBtns = document.querySelectorAll('.copy-trigger');
    const toast = document.getElementById('toastMsg');

    function showToast(text) {
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const copyText = btn.getAttribute('data-copy');
            const copyLabel = btn.getAttribute('data-label') || 'Thông tin';

            if (navigator.clipboard && copyText) {
                navigator.clipboard.writeText(copyText).then(() => {
                    showToast(`✓ Đã sao chép ${copyLabel}: ${copyText}`);
                }).catch(() => {
                    // Fallback
                    showToast(`✓ Đã chọn: ${copyText}`);
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. SMOOTH SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
