/**
 * LOGIC ĐIỀU KHIỂN GAME "MỞ HÒM NHÂN PHẨM - SĂN MENTOR SSR" 20/11
 * TỐI ƯU TOÀN DIỆN: LAYOUT, KHUNG CHỮ & TRẢI NGHIỆM NGƯỜI DÙNG
 */

document.addEventListener('DOMContentLoaded', () => {
    // === CÁC THÀNH PHẦN DOM CHÍNH ===
    const rouletteContainer = document.getElementById('rouletteContainer');
    const rouletteTrack = document.getElementById('rouletteTrack');
    const spin1Btn = document.getElementById('spin1Btn');
    const spin10Btn = document.getElementById('spin10Btn');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');
    const pityCountEl = document.getElementById('pityCount');
    const pityProgressEl = document.getElementById('pityProgress');
    const hackLuckToggle = document.getElementById('hackLuckToggle');
    const fastSpinToggle = document.getElementById('fastSpinToggle');
    const playerNameInput = document.getElementById('playerName');

    // Winner Modal Elements
    const winnerModal = document.getElementById('winnerModal');
    const closeWinnerModalTopBtn = document.getElementById('closeWinnerModalTopBtn');
    const winnerRarityTitle = document.getElementById('winnerRarityTitle');
    const winnerCardFullImg = document.getElementById('winnerCardFullImg');
    const downloadCardBtn = document.getElementById('downloadCardBtn');
    const downloadSvgBtn = document.getElementById('downloadSvgBtn');
    const copyWishBtn = document.getElementById('copyWishBtn');
    const spinAgainBtn = document.getElementById('spinAgainBtn');
    const cardCaptureArea = document.getElementById('cardCaptureArea');

    // 10x Results Modal
    const multiModal = document.getElementById('multiModal');
    const closeMultiModalBtn = document.getElementById('closeMultiModalBtn');
    const multiResultsGrid = document.getElementById('multiResultsGrid');

    // Custom Mentor Modal
    const addMentorBtn = document.getElementById('addMentorBtn');
    const customMentorModal = document.getElementById('customMentorModal');
    const closeCustomModalBtn = document.getElementById('closeCustomModalBtn');
    const customMentorForm = document.getElementById('customMentorForm');
    const customMentorFileInput = document.getElementById('customMentorFile');

    // Collection Modal
    const viewCollectionBtn = document.getElementById('viewCollectionBtn');
    const collectionModal = document.getElementById('collectionModal');
    const closeCollectionModalBtn = document.getElementById('closeCollectionModalBtn');
    const collectionGrid = document.getElementById('collectionGrid');
    const collectionCountEl = document.getElementById('collectionCount');

    // Gallery Modal (Kho Thư Viện Thẻ)
    const viewGalleryBtn = document.getElementById('viewGalleryBtn');
    const galleryModal = document.getElementById('galleryModal');
    const closeGalleryModalBtn = document.getElementById('closeGalleryModalBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');

    // Toast
    const toastEl = document.getElementById('toast');

    // === HẰNG SỐ KÍCH THƯỚC ĐỒNG BỘ CSS ===
    let isSpinning = false;
    let currentWonItem = null;
    const CARD_WIDTH = 154; // Đồng bộ biến --card-width trong CSS
    const CARD_GAP = 12;   // Đồng bộ --card-gap
    const STRIDE = CARD_WIDTH + CARD_GAP; // 166px
    const TOTAL_ROULETTE_CARDS = 75;
    const WINNING_INDEX = 58; // Vị trí thẻ trúng thưởng trong dải trượt

    // Khởi tạo trạng thái âm thanh & Pity & Dải thẻ
    updateSoundUI();
    updatePityUI();
    updateCollectionBadge();
    initInitialRouletteStrip();
    setupCardTiltEffect();

    // === SỰ KIỆN NÚT BẤM & PHÍM TẮT ===
    muteBtn.addEventListener('click', () => {
        window.Sound.toggleMute();
        updateSoundUI();
    });

    spin1Btn.addEventListener('click', () => {
        if (isSpinning) return;
        spinRoulette();
    });

    spin10Btn.addEventListener('click', () => {
        if (isSpinning) return;
        open10Cases();
    });

    // Phím tắt Space để quay nhanh tiện lợi
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (!isSpinning && winnerModal.classList.contains('hidden') && galleryModal.classList.contains('hidden')) {
                spinRoulette();
            }
        }
    });

    if (closeWinnerModalTopBtn) {
        closeWinnerModalTopBtn.addEventListener('click', closeWinnerModal);
    }

    spinAgainBtn.addEventListener('click', () => {
        closeWinnerModal();
        setTimeout(spinRoulette, 250);
    });

    copyWishBtn.addEventListener('click', copyWishToClipboard);
    downloadCardBtn.addEventListener('click', downloadCardScreenshot);
    if (downloadSvgBtn) {
        downloadSvgBtn.addEventListener('click', downloadCardSvgDirect);
    }

    // Modal Custom Mentor
    addMentorBtn.addEventListener('click', () => {
        window.Sound.playClick();
        customMentorModal.classList.remove('hidden');
    });

    closeCustomModalBtn.addEventListener('click', () => {
        customMentorModal.classList.add('hidden');
    });

    customMentorForm.addEventListener('submit', handleAddCustomMentor);

    // Modal Bộ Sưu Tập
    viewCollectionBtn.addEventListener('click', () => {
        window.Sound.playClick();
        openCollectionModal();
    });

    closeCollectionModalBtn.addEventListener('click', () => {
        collectionModal.classList.add('hidden');
    });

    // Modal Kho Thư Viện Thẻ (Gallery)
    viewGalleryBtn.addEventListener('click', () => {
        window.Sound.playClick();
        openGalleryModal('ALL');
    });

    closeGalleryModalBtn.addEventListener('click', () => {
        galleryModal.classList.add('hidden');
    });

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => {
                b.classList.remove('bg-amber-500', 'text-black');
                b.classList.add('bg-slate-800', 'text-amber-400', 'text-purple-400', 'text-blue-400', 'text-red-400');
            });
            btn.classList.add('bg-amber-500', 'text-black');
            const filter = btn.getAttribute('data-filter');
            openGalleryModal(filter);
        });
    });

    closeMultiModalBtn.addEventListener('click', () => {
        multiModal.classList.add('hidden');
    });

    // === HÀM CẬP NHẬT GIAO DIỆN ===
    function updateSoundUI() {
        if (window.Sound.isMuted) {
            muteIcon.textContent = '🔇';
            muteBtn.classList.add('opacity-60');
        } else {
            muteIcon.textContent = '🔊';
            muteBtn.classList.remove('opacity-60');
        }
    }

    function updatePityUI() {
        const pity = window.ItemRepo.getPity();
        const maxPity = 15;
        pityCountEl.textContent = `${pity}/${maxPity}`;
        const percent = Math.min(100, Math.round((pity / maxPity) * 100));
        pityProgressEl.style.width = `${percent}%`;

        if (pity >= maxPity) {
            pityProgressEl.style.background = 'linear-gradient(90deg, #facc15 0%, #f59e0b 100%)';
            pityProgressEl.parentElement.classList.add('ring-2', 'ring-amber-400', 'animate-pulse');
        } else {
            pityProgressEl.style.background = 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)';
            pityProgressEl.parentElement.classList.remove('ring-2', 'ring-amber-400', 'animate-pulse');
        }
    }

    function updateCollectionBadge() {
        const inv = window.ItemRepo.getInventory();
        const ssrMentors = inv.filter(x => x.rarity === 'SSR');
        if (collectionCountEl) {
            collectionCountEl.textContent = `${ssrMentors.length} SSR`;
        }
    }

    function showToast(message, type = 'success') {
        toastEl.textContent = message;
        toastEl.className = `fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 transform ${
            type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white' : 'bg-red-600 text-white'
        }`;
        toastEl.classList.remove('hidden', 'opacity-0', 'translate-y-4');
        setTimeout(() => {
            toastEl.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => toastEl.classList.add('hidden'), 300);
        }, 2600);
    }

    // === TẠO DẢI THẺ ROULETTE BAN ĐẦU ===
    function initInitialRouletteStrip() {
        rouletteTrack.innerHTML = '';
        rouletteTrack.style.transition = 'none';
        rouletteTrack.style.transform = 'translate3d(0, 0, 0)';

        const allItems = window.ItemRepo.getAllItems();
        for (let i = 0; i < 20; i++) {
            const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
            const cardEl = createRouletteCardElement(randomItem);
            rouletteTrack.appendChild(cardEl);
        }
    }

    // Tạo HTML cho 1 thẻ trong dải trượt (Đồng bộ khung chữ chuẩn xác)
    function createRouletteCardElement(item) {
        const card = document.createElement('div');
        const rarityCfg = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.COMMON;
        const rarityBorderClass = `card-${item.rarity.toLowerCase()}`;

        card.className = `roulette-card ${rarityBorderClass}`;

        // Nền đổi màu theo độ hiếm
        const bgDiv = document.createElement('div');
        bgDiv.className = `absolute inset-0 bg-gradient-to-b ${rarityCfg.bgColor} opacity-60 pointer-events-none`;
        card.appendChild(bgDiv);

        // Header: Badge độ hiếm
        const badge = document.createElement('div');
        badge.className = `card-badge ${rarityCfg.badgeClass}`;
        badge.textContent = item.rarity;
        card.appendChild(badge);

        // Avatar SVG trung tâm
        const avatarBox = document.createElement('div');
        avatarBox.className = 'card-avatar-box';
        const avatarSrc = item.avatarImg || 'images/avatars/ssr-bach.svg';
        avatarBox.innerHTML = `<img src="${avatarSrc}" alt="${item.name}">`;
        card.appendChild(avatarBox);

        // Khung chữ: Tên và vai trò
        const titleBox = document.createElement('div');
        titleBox.className = 'card-title-box';
        titleBox.innerHTML = `
            <div class="card-name">${item.name}</div>
            <span class="card-role">${item.role || item.rarity}</span>
        `;
        card.appendChild(titleBox);

        return card;
    }

    // === HỆ THỐNG GACHA RANDOM & BẢO HIỂM ===
    function rollRandomItem() {
        const pity = window.ItemRepo.getPity();
        const isHackLuck = hackLuckToggle && hackLuckToggle.checked;
        const ssrItems = window.ItemRepo.getItemsByRarity('SSR');
        const srItems = window.ItemRepo.getItemsByRarity('SR');
        const rItems = window.ItemRepo.getItemsByRarity('R');
        const commonItems = window.ItemRepo.getItemsByRarity('COMMON');

        let chosenRarity = 'COMMON';

        if (pity >= 15 || isHackLuck) {
            chosenRarity = 'SSR';
            window.ItemRepo.resetPity();
        } else {
            const rand = Math.random();
            if (rand < RARITY_CONFIG.SSR.rate) {
                chosenRarity = 'SSR';
                window.ItemRepo.resetPity();
            } else if (rand < RARITY_CONFIG.SSR.rate + RARITY_CONFIG.SR.rate) {
                chosenRarity = 'SR';
                window.ItemRepo.incrementPity();
            } else if (rand < RARITY_CONFIG.SSR.rate + RARITY_CONFIG.SR.rate + RARITY_CONFIG.R.rate) {
                chosenRarity = 'R';
                window.ItemRepo.incrementPity();
            } else {
                chosenRarity = 'COMMON';
                window.ItemRepo.incrementPity();
            }
        }

        updatePityUI();

        let pool = commonItems;
        if (chosenRarity === 'SSR' && ssrItems.length > 0) pool = ssrItems;
        else if (chosenRarity === 'SR' && srItems.length > 0) pool = srItems;
        else if (chosenRarity === 'R' && rItems.length > 0) pool = rItems;

        return pool[Math.floor(Math.random() * pool.length)];
    }

    // === HIỆU ỨNG QUAY HÒM ROULETTE FPS ===
    function spinRoulette() {
        if (isSpinning) return;
        isSpinning = true;
        spin1Btn.disabled = true;
        spin10Btn.disabled = true;

        window.Sound.playWhoosh();

        const isFastSpin = fastSpinToggle && fastSpinToggle.checked;
        const spinDuration = isFastSpin ? 600 : 5200;

        const winningItem = rollRandomItem();
        currentWonItem = winningItem;

        // Sinh 75 thẻ ngẫu nhiên dọc dải trượt
        rouletteTrack.innerHTML = '';
        rouletteTrack.style.transition = 'none';
        rouletteTrack.style.transform = 'translate3d(0, 0, 0)';

        const allItems = window.ItemRepo.getAllItems();
        const ssrItems = window.ItemRepo.getItemsByRarity('SSR');
        const cardsArray = [];

        for (let i = 0; i < TOTAL_ROULETTE_CARDS; i++) {
            if (i === WINNING_INDEX) {
                cardsArray.push(winningItem);
            } else if (i === WINNING_INDEX - 1 || i === WINNING_INDEX + 1) {
                if (Math.random() < 0.5 && ssrItems.length > 0) {
                    cardsArray.push(ssrItems[Math.floor(Math.random() * ssrItems.length)]);
                } else {
                    cardsArray.push(allItems[Math.floor(Math.random() * allItems.length)]);
                }
            } else {
                cardsArray.push(allItems[Math.floor(Math.random() * allItems.length)]);
            }
        }

        cardsArray.forEach(item => {
            const cardEl = createRouletteCardElement(item);
            rouletteTrack.appendChild(cardEl);
        });

        // Tính toạ độ dừng chính xác đến từng pixel
        const containerWidth = rouletteContainer.clientWidth;
        const centerNeedleX = containerWidth / 2;
        const targetCardCenterX = WINNING_INDEX * STRIDE + (CARD_WIDTH / 2);
        const jitter = (Math.random() - 0.5) * (CARD_WIDTH * 0.6);
        const targetTranslateX = -(targetCardCenterX - centerNeedleX) + jitter;

        void rouletteTrack.offsetHeight;

        rouletteTrack.style.transition = `transform ${spinDuration}ms cubic-bezier(0.12, 0.8, 0.15, 1)`;
        rouletteTrack.style.transform = `translate3d(${targetTranslateX}px, 0, 0)`;

        // Phát tiếng "tách... tách" đồng bộ
        let lastTickedCard = -1;
        let animationFrameId;
        const startTime = performance.now();

        function checkTicks(now) {
            const elapsed = now - startTime;
            if (elapsed < spinDuration) {
                const style = window.getComputedStyle(rouletteTrack);
                const matrix = new DOMMatrixReadOnly(style.transform);
                const currentX = matrix.m41;

                const needlePosOnTrack = centerNeedleX - currentX;
                const currentCardIdx = Math.floor(needlePosOnTrack / STRIDE);

                if (currentCardIdx !== lastTickedCard && currentCardIdx >= 0 && currentCardIdx < TOTAL_ROULETTE_CARDS) {
                    lastTickedCard = currentCardIdx;
                    const progress = elapsed / spinDuration;
                    const pitch = 1 + (1 - progress) * 0.4;
                    window.Sound.playTick(pitch);
                }

                animationFrameId = requestAnimationFrame(checkTicks);
            }
        }

        animationFrameId = requestAnimationFrame(checkTicks);

        setTimeout(() => {
            cancelAnimationFrame(animationFrameId);
            isSpinning = false;
            spin1Btn.disabled = false;
            spin10Btn.disabled = false;

            const winningCardEl = rouletteTrack.children[WINNING_INDEX];
            if (winningCardEl) {
                winningCardEl.classList.add('scale-105', 'z-20', 'ring-4', 'ring-amber-400');
            }

            window.ItemRepo.addToInventory(winningItem);
            updateCollectionBadge();
            openWinnerModal(winningItem);
        }, spinDuration + 120);
    }

    // === POPUP NHẬN THẺ CHIẾN THẮNG (THẺ BÀI MASTERPIECE) ===
    function openWinnerModal(item) {
        currentWonItem = item;

        if (item.rarity === 'SSR') {
            window.Sound.playSsrFanfare();
            triggerConfetti('gold');
            winnerRarityTitle.textContent = '🌟 CHÚC MỪNG BẠN SĂN ĐƯỢC GIẢNG VIÊN SSR HOÀNG KIM!';
            winnerRarityTitle.className = 'text-xs font-black uppercase tracking-widest text-amber-400';
            winnerCardFullImg.classList.add('ssr-glow-active');
        } else if (item.rarity === 'SR') {
            window.Sound.playSrSound();
            triggerConfetti('purple');
            winnerRarityTitle.textContent = '🔮 BẠN ĐÃ NHẬN ĐƯỢC VẬT PHẨM TRỢ THỦ CẤP SR!';
            winnerRarityTitle.className = 'text-xs font-black uppercase tracking-widest text-purple-400';
            winnerCardFullImg.classList.remove('ssr-glow-active');
        } else if (item.rarity === 'R') {
            window.Sound.playRSound();
            winnerRarityTitle.textContent = '📘 BẠN ĐÃ NHẬN ĐƯỢC CÔNG CỤ HỖ TRỢ CẤP R!';
            winnerRarityTitle.className = 'text-xs font-black uppercase tracking-widest text-blue-400';
            winnerCardFullImg.classList.remove('ssr-glow-active');
        } else {
            window.Sound.playBugSound();
            winnerRarityTitle.textContent = '🔴 ÔI KHÔNG! BẠN VỪA DÍNH PHẢI CƠN ÁC MỘNG DEV!';
            winnerRarityTitle.className = 'text-xs font-black uppercase tracking-widest text-red-400';
            winnerCardFullImg.classList.remove('ssr-glow-active');
        }

        // Tải thẻ bài đồ họa đầy đủ (440x640)
        const cardImagePath = item.cardImg || `images/cards/${item.id}.svg`;
        winnerCardFullImg.src = cardImagePath;
        winnerCardFullImg.alt = item.name;

        winnerModal.classList.remove('hidden');
    }

    function closeWinnerModal() {
        winnerModal.classList.add('hidden');
    }

    // Hiệu ứng rê chuột nghiêng 3D Hologram mượt mà
    function setupCardTiltEffect() {
        winnerCardFullImg.onmousemove = (e) => {
            const rect = winnerCardFullImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            winnerCardFullImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        };

        winnerCardFullImg.onmouseleave = () => {
            winnerCardFullImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };
    }

    // Pháo hoa Confetti chúc mừng
    function triggerConfetti(theme = 'gold') {
        if (typeof confetti === 'function') {
            if (theme === 'gold') {
                const duration = 2200;
                const end = Date.now() + duration;

                (function frame() {
                    confetti({
                        particleCount: 5,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#f59e0b', '#fbbf24', '#fef08a', '#ea580c']
                    });
                    confetti({
                        particleCount: 5,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#f59e0b', '#fbbf24', '#fef08a', '#ea580c']
                    });
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                })();
            } else if (theme === 'purple') {
                confetti({
                    particleCount: 75,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#d946ef', '#c084fc', '#e879f9']
                });
            }
        }
    }

    // === TÍNH NĂNG CHỤP MÀN HÌNH THẺ BÀI (XUẤT PNG CHẤT LƯỢNG CAO) ===
    async function downloadCardScreenshot() {
        if (!currentWonItem) return;
        window.Sound.playClick();
        downloadCardBtn.disabled = true;
        downloadCardBtn.innerHTML = '<span>⏳ Đang xuất ảnh...</span>';

        const safeName = currentWonItem.name.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');

        try {
            // Tải file SVG gốc vào HTML Image để vẽ lên Canvas độ phân giải cao 2x (880x1280)
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = currentWonItem.cardImg || `images/cards/${currentWonItem.id}.svg`;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 880;
                canvas.height = 1280;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 880, 1280);

                const link = document.createElement('a');
                link.download = `CodeGym_20_11_${safeName}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                showToast('🎉 Đã tải ảnh PNG sắc nét! Thả ngay vào bình luận nhé!');
                downloadCardBtn.disabled = false;
                downloadCardBtn.innerHTML = '<span>📸 Chụp Khoe Ngay</span>';
            };

            img.onerror = () => {
                // Fallback nếu ảnh không tải được
                downloadCardSvgDirect();
                downloadCardBtn.disabled = false;
                downloadCardBtn.innerHTML = '<span>📸 Chụp Khoe Ngay</span>';
            };
        } catch (e) {
            console.error(e);
            downloadCardSvgDirect();
            downloadCardBtn.disabled = false;
            downloadCardBtn.innerHTML = '<span>📸 Chụp Khoe Ngay</span>';
        }
    }

    // Tải trực tiếp file SVG vector gốc
    function downloadCardSvgDirect() {
        if (!currentWonItem) return;
        window.Sound.playClick();
        const safeName = currentWonItem.name.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
        const link = document.createElement('a');
        link.download = `CodeGym_20_11_${safeName}.svg`;
        link.href = currentWonItem.cardImg || `images/cards/${currentWonItem.id}.svg`;
        link.click();
        showToast('📥 Đã tải file SVG thẻ bài!');
    }

    // === COPY LỜI CHÚC VÀO CLIPBOARD ===
    function copyWishToClipboard() {
        if (!currentWonItem) return;
        window.Sound.playClick();

        const playerName = (playerNameInput && playerNameInput.value.trim()) || 'Học viên CodeGym';
        const statsText = currentWonItem.stats ? currentWonItem.stats.map(s => `• ${s.label}: ${s.value}`).join('\n') : '';

        const textToCopy = `🎉 [TRI ÂN NGÀY NHÀ GIÁO VIỆT NAM 20/11] 💐\n` +
            `Học viên [${playerName}] vừa săn được thẻ: ${currentWonItem.name} (${currentWonItem.rarity})\n` +
            `Chức danh: ${currentWonItem.role || ''}\n` +
            (statsText ? `${statsText}\n` : '') +
            `\n💌 Lời chúc 20/11:\n"${currentWonItem.wish || 'Kính chúc quý Thầy Cô luôn tràn đầy sức khỏe và hạnh phúc!'}"\n` +
            `\n#CodeGym #20_11 #SanTheMentorSSR #MoHomNhanPham`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('📋 Đã copy lời chúc 20/11! Dán vào Facebook/Zalo ngay!');
        }).catch(() => {
            showToast('Không thể copy tự động, vui lòng chọn để copy', 'error');
        });
    }

    // === MỞ 10 HÒM LIÊN TIẾP (10x PULL) ===
    function open10Cases() {
        if (isSpinning) return;
        window.Sound.playWhoosh();

        const results = [];
        let hasSSR = false;
        let hasSR = false;

        for (let i = 0; i < 10; i++) {
            const item = rollRandomItem();
            results.push(item);
            window.ItemRepo.addToInventory(item);
            if (item.rarity === 'SSR') hasSSR = true;
            if (item.rarity === 'SR') hasSR = true;
        }

        updateCollectionBadge();

        if (hasSSR) {
            window.Sound.playSsrFanfare();
            triggerConfetti('gold');
        } else if (hasSR) {
            window.Sound.playSrSound();
            triggerConfetti('purple');
        } else {
            window.Sound.playBugSound();
        }

        multiResultsGrid.innerHTML = '';
        results.forEach((item, idx) => {
            const rarityCfg = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.COMMON;
            const el = document.createElement('div');
            el.className = `p-2.5 rounded-2xl border-2 ${rarityCfg.borderColor} bg-slate-900/90 flex flex-col items-center justify-between shadow-lg transform transition-all duration-200 hover:scale-105 cursor-pointer relative overflow-hidden`;

            const avatarSrc = item.avatarImg || 'images/avatars/ssr-bach.svg';

            el.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-b ${rarityCfg.bgColor} opacity-60 pointer-events-none"></div>
                <div class="relative z-10 w-full flex justify-between items-center text-[10px]">
                    <span class="px-1.5 py-0.5 rounded font-black ${rarityCfg.badgeClass}">#${idx + 1}</span>
                    <span class="font-bold text-slate-300">${item.rarity}</span>
                </div>
                <div class="relative z-10 w-12 h-12 rounded-xl my-2 border border-white/20 shadow overflow-hidden flex items-center justify-center">
                    <img src="${avatarSrc}" alt="${item.name}" class="w-full h-full object-contain">
                </div>
                <div class="relative z-10 text-center w-full px-1">
                    <h5 class="text-xs font-bold text-white truncate">${item.name}</h5>
                    <p class="text-[9.5px] text-slate-400 truncate mt-0.5">${item.role || ''}</p>
                </div>
            `;

            el.addEventListener('click', () => {
                multiModal.classList.add('hidden');
                openWinnerModal(item);
            });

            multiResultsGrid.appendChild(el);
        });

        multiModal.classList.remove('hidden');
    }

    // === BỘ SƯU TẬP (COLLECTION MODAL) ===
    function openCollectionModal() {
        const inv = window.ItemRepo.getInventory();
        const allItems = window.ItemRepo.getAllItems();
        const ssrItems = allItems.filter(x => x.rarity === 'SSR');

        collectionGrid.innerHTML = '';

        ssrItems.forEach(mentor => {
            const owned = inv.find(x => x.id === mentor.id);
            const count = owned ? owned.count : 0;
            const isUnlocked = count > 0;

            const card = document.createElement('div');
            card.className = `relative p-3.5 rounded-2xl border-2 transition-all ${
                isUnlocked 
                    ? 'border-amber-400 bg-slate-900/95 shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105' 
                    : 'border-slate-800 bg-slate-950/60 opacity-50 grayscale'
            } flex flex-col items-center justify-between text-center overflow-hidden`;

            const avatarSrc = mentor.avatarImg || 'images/avatars/ssr-bach.svg';
            const avatarDisplay = isUnlocked 
                ? `<div class="w-16 h-16 rounded-2xl my-2 shadow-md border border-white/20 overflow-hidden"><img src="${avatarSrc}" alt="${mentor.name}" class="w-full h-full object-contain"></div>`
                : '<div class="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl my-2 shadow-md border border-white/20">🔒</div>';

            card.innerHTML = `
                <div class="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isUnlocked ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                }">
                    ${isUnlocked ? `x${count}` : 'Chưa có'}
                </div>
                ${avatarDisplay}
                <div class="w-full px-1">
                    <h4 class="font-extrabold text-xs sm:text-sm text-white truncate">${isUnlocked ? mentor.name : '??? Giảng Viên Ẩn'}</h4>
                    <p class="text-[10px] text-amber-300 font-medium truncate mt-0.5">${isUnlocked ? mentor.role : 'Mở thêm hòm để tìm thấy'}</p>
                </div>
                ${isUnlocked ? '<button class="mt-2.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold hover:bg-amber-500/30">Xem Thẻ</button>' : ''}
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    collectionModal.classList.add('hidden');
                    openWinnerModal(mentor);
                });
            }

            collectionGrid.appendChild(card);
        });

        collectionModal.classList.remove('hidden');
    }

    // === KHO THƯ VIỆN HÌNH ẢNH THẺ BÀI (GALLERY VIEW) ===
    function openGalleryModal(filter = 'ALL') {
        const allItems = window.ItemRepo.getAllItems();
        let itemsToShow = allItems;
        if (filter !== 'ALL') {
            itemsToShow = allItems.filter(x => x.rarity === filter);
        }

        galleryGrid.innerHTML = '';

        itemsToShow.forEach(item => {
            const rarityCfg = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.COMMON;
            const cardEl = document.createElement('div');
            cardEl.className = 'gallery-card-item';

            const cardImgSrc = item.cardImg || `images/cards/${item.id}.svg`;

            cardEl.innerHTML = `
                <div class="gallery-card-thumb">
                    <img src="${cardImgSrc}" alt="${item.name}">
                </div>
                <div class="w-full text-center px-1 mt-2">
                    <h5 class="text-xs font-bold text-white truncate">${item.name}</h5>
                    <span class="inline-block px-1.5 py-0.5 text-[9px] rounded font-bold uppercase mt-1 ${rarityCfg.badgeClass}">
                        ${item.rarity}
                    </span>
                </div>
                <div class="w-full mt-2 flex gap-1">
                    <button class="gallery-inspect-btn flex-1 py-1 text-center bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-300 text-[10px] font-bold rounded-lg transition-colors cursor-pointer">
                        🔍 Xem Thẻ
                    </button>
                    <a href="${cardImgSrc}" download="CodeGym_20_11_${item.id}.svg" class="px-2 py-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-colors" title="Tải file SVG gốc">
                        📥
                    </a>
                </div>
            `;

            cardEl.querySelector('.gallery-card-thumb').addEventListener('click', () => {
                galleryModal.classList.add('hidden');
                openWinnerModal(item);
            });

            cardEl.querySelector('.gallery-inspect-btn').addEventListener('click', () => {
                galleryModal.classList.add('hidden');
                openWinnerModal(item);
            });

            galleryGrid.appendChild(cardEl);
        });

        galleryModal.classList.remove('hidden');
    }

    // === TÙY CHỈNH THÊM MENTOR CỦA LỚP MÌNH ===
    function handleAddCustomMentor(e) {
        e.preventDefault();
        const name = document.getElementById('customMentorName').value.trim();
        const role = document.getElementById('customMentorRole').value.trim();
        const stat1 = document.getElementById('customMentorStat1').value.trim() || '9999';
        const stat2 = document.getElementById('customMentorStat2').value.trim() || 'Vô cực';
        const quote = document.getElementById('customMentorQuote').value.trim();
        const wish = document.getElementById('customMentorWish').value.trim();

        if (!name) {
            alert('Vui lòng nhập tên Thầy/Cô!');
            return;
        }

        const file = customMentorFileInput && customMentorFileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                saveNewMentor(evt.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            saveNewMentor(null);
        }

        function saveNewMentor(imgUrl) {
            const finalQuote = quote || '“Cố lên các em, tương lai là do chính các em code nên!”';
            const finalWish = wish || `Kính chúc ${name} ngày 20/11 thật nhiều niềm vui, sức khỏe và luôn đồng hành cùng tập thể lớp chúng em!`;
            const customCode = 'CG-CLASS-' + Math.floor(10 + Math.random() * 89);
            const customCardSvg = buildCustomMentorCardSvg(name, role || 'Giảng Viên Kính Yêu', stat1, stat2, finalQuote, finalWish, customCode, imgUrl);

            window.ItemRepo.addCustomMentor({
                name: name,
                role: role || 'Giảng Viên Kính Yêu',
                code: customCode,
                avatar: '⭐',
                avatarImg: imgUrl || 'images/avatars/ssr-bach.svg',
                cardImg: customCardSvg,
                avatarBg: 'bg-gradient-to-tr from-amber-500 to-rose-500',
                stats: [
                    { label: 'Sát thương Review Code', value: stat1 },
                    { label: 'Tốc độ bắt lỗi', value: stat2 },
                    { label: 'Độ tận tâm', value: '100%' },
                    { label: 'Tuyệt kỹ', value: 'Truyền lửa đam mê lập trình' }
                ],
                quote: finalQuote,
                wish: finalWish
            });

            customMentorForm.reset();
            customMentorModal.classList.add('hidden');
            showToast(`✨ Đã thêm Thầy/Cô "${name}" vào bể thẻ SSR thành công!`);
            updateCollectionBadge();
        }

        // Tạo thẻ bài SVG chuẩn 440x640 đồng bộ cho Thầy Cô thêm mới (Chữ to rõ nét)
        function buildCustomMentorCardSvg(cName, cRole, s1, s2, cQuote, cWish, cCode, customImg) {
            function escapeXml(str) {
                if (!str) return '';
                return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            const safeName = escapeXml(cName);
            const safeRole = escapeXml(cRole);
            const safeCode = escapeXml(cCode);
            const safeS1 = escapeXml(s1);
            const safeS2 = escapeXml(s2);

            const pillText = `SSR • ${safeCode}`;
            const pillWidth = Math.min(202, Math.max(136, pillText.length * 8.4 + 44));
            const pillX = 412 - pillWidth;
            const pillCenter = pillX + (pillWidth / 2);

            const roleWidth = Math.min(360, Math.max(210, safeRole.length * 8.2 + 42));
            const roleX = 220 - (roleWidth / 2);

            function wrap(text, maxChars) {
                const words = text.split(' ');
                const lines = [];
                let cur = '';
                for (let w of words) {
                    if ((cur + ' ' + w).trim().length <= maxChars) {
                        cur = (cur + ' ' + w).trim();
                    } else {
                        if (cur) lines.push(cur);
                        cur = w;
                    }
                }
                if (cur) lines.push(cur);
                return lines;
            }

            const qLines = wrap(cQuote, 48).map(escapeXml);
            const quoteSvg = qLines.length === 1
                ? `<text x="220" y="384" font-family="'Segoe UI', Roboto, Georgia, serif" font-size="14" font-style="italic" font-weight="bold" fill="#f8fafc" text-anchor="middle">${qLines[0]}</text>`
                : `<text x="220" y="375" font-family="'Segoe UI', Roboto, Georgia, serif" font-size="13" font-style="italic" font-weight="bold" fill="#f8fafc" text-anchor="middle">
                    <tspan x="220" dy="0">${qLines[0] || ''}</tspan>
                    <tspan x="220" dy="19">${qLines[1] || ''}</tspan>
                   </text>`;

            const wLines = wrap(cWish, 46).map(escapeXml);
            const wishTspans = wLines.map((line, i) => `<tspan x="46" dy="${i === 0 ? 0 : 22}">${line}</tspan>`).join('');

            const titleFontSize = cName.length > 26 ? "20.5" : "22.5";

            const artContent = customImg
                ? `<image href="${customImg}" x="120" y="116" width="140" height="128" preserveAspectRatio="xMidYMid meet" clip-path="inset(0% round 14px)"/>`
                : `<circle cx="190" cy="180" r="48" fill="url(#core_grad)" stroke="#f59e0b" stroke-width="2.5"/><text x="190" y="196" font-size="44" text-anchor="middle">👨‍🏫</text>`;

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 640" width="440" height="640">
    <defs>
        <linearGradient id="card_bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a1102"/>
            <stop offset="50%" stop-color="#2e1c02"/>
            <stop offset="100%" stop-color="#080a12"/>
        </linearGradient>
        <linearGradient id="theme_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#fbbf24"/>
        </linearGradient>
        <radialGradient id="core_grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#2e1c02"/>
            <stop offset="100%" stop-color="#1a1102"/>
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
    </defs>
    <rect width="440" height="640" rx="26" fill="url(#card_bg)"/>
    <rect x="10" y="10" width="420" height="620" rx="22" fill="none" stroke="#f59e0b" stroke-width="4" filter="url(#glow)"/>
    <rect x="16" y="16" width="408" height="608" rx="18" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <text x="28" y="42" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#f59e0b" letter-spacing="1.5">CODEGYM 20/11</text>
    <rect x="${pillX.toFixed(1)}" y="22" width="${pillWidth.toFixed(1)}" height="28" rx="14" fill="url(#theme_grad)"/>
    <text x="${pillCenter.toFixed(1)}" y="40.5" font-family="'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="900" fill="#000000" text-anchor="middle">${pillText}</text>
    <text x="220" y="74" font-family="'Segoe UI', Roboto, sans-serif" font-size="${titleFontSize}" font-weight="900" fill="#ffffff" text-anchor="middle">${safeName}</text>
    <rect x="${roleX.toFixed(1)}" y="84" width="${roleWidth.toFixed(1)}" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.4"/>
    <text x="220" y="102" font-family="'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="bold" fill="#fbbf24" text-anchor="middle">${safeRole}</text>
    <rect x="30" y="116" width="380" height="130" rx="14" fill="#060912" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    ${artContent}
    <g transform="translate(30, 254)">
        <rect x="0" y="0" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="14" y="18" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">Sát thương Review</text>
        <text x="14" y="37" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#f59e0b">${safeS1}</text>
        <rect x="195" y="0" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="209" y="18" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">Tốc độ bắt lỗi</text>
        <text x="209" y="37" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#f59e0b">${safeS2}</text>
        <rect x="0" y="48" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="14" y="66" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">Độ tận tâm</text>
        <text x="14" y="85" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#f59e0b">100%</text>
        <rect x="195" y="48" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="209" y="66" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">Tuyệt kỹ</text>
        <text x="209" y="85" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#f59e0b">Truyền cảm hứng</text>
    </g>
    <rect x="30" y="354" width="380" height="52" rx="10" fill="rgba(10, 15, 26, 0.95)" stroke="rgba(255,255,255,0.08)"/>
    ${quoteSvg}
    <rect x="30" y="414" width="380" height="174" rx="12" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1.5"/>
    <path d="M44 427 L50 433 L44 439" fill="none" stroke="#fbbf24" stroke-width="2"/>
    <text x="58" y="437" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#fbbf24" letter-spacing="1">💌 LỜI CHÚC TRI ÂN 20/11</text>
    <line x1="44" y1="447" x2="396" y2="447" stroke="rgba(245, 158, 11, 0.2)" stroke-width="1"/>
    <text x="46" y="472" font-family="'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="600" fill="#ffffff">${wishTspans}</text>
    <line x1="30" y1="598" x2="410" y2="598" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <text x="220" y="618" font-family="monospace" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle" letter-spacing="1.5">✦ HỘI SĂN THẺ MENTOR SSR • ${safeCode} • CODEGYM 20/11 ✦</text>
</svg>`;

            return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        }
    }
});
