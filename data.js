/**
 * Dữ liệu vật phẩm Gacha 20/11 - CodeGym
 * Các cấp độ hiếm:
 * - SSR (Vàng Hoàng Kim): Các Giảng viên & Mentor huyền thoại
 * - SR  (Tím Huyền Bí): Vật phẩm buff sinh viên siêu cấp
 * - R   (Lam Hiếm): Công cụ dev & Cứu trợ
 * - COMMON (Đỏ/Xám): Các loại Bug, Conflict, Nỗi đau Lập Trình Viên
 */

const RARITY_CONFIG = {
    SSR: {
        id: 'SSR',
        name: 'Huyền Thoại (SSR)',
        color: '#f59e0b',
        bgColor: 'from-amber-500/20 to-yellow-600/30',
        borderColor: 'border-yellow-400',
        glowColor: 'rgba(245, 158, 11, 0.6)',
        badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-300 text-black font-extrabold shadow-lg shadow-yellow-500/50',
        rate: 0.08 // 8% cơ bản
    },
    SR: {
        id: 'SR',
        name: 'Thần Thánh (SR)',
        color: '#a855f7',
        bgColor: 'from-purple-500/20 to-fuchsia-600/30',
        borderColor: 'border-purple-400',
        glowColor: 'rgba(168, 85, 247, 0.5)',
        badgeClass: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg shadow-purple-500/40',
        rate: 0.22 // 22%
    },
    R: {
        id: 'R',
        name: 'Hiếm (R)',
        color: '#3b82f6',
        bgColor: 'from-blue-500/20 to-cyan-600/30',
        borderColor: 'border-blue-400',
        glowColor: 'rgba(59, 130, 246, 0.4)',
        badgeClass: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold shadow-md shadow-blue-500/30',
        rate: 0.35 // 35%
    },
    COMMON: {
        id: 'COMMON',
        name: 'Ác Mộng (Cursed)',
        color: '#ef4444',
        bgColor: 'from-red-950/40 to-slate-900/60',
        borderColor: 'border-red-500/60',
        glowColor: 'rgba(239, 68, 68, 0.3)',
        badgeClass: 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-semibold',
        rate: 0.35 // 35%
    }
};

const DEFAULT_ITEMS = [
    // === SSR: DÀN MENTOR HUYỀN THOẠI ===
    {
        id: 'ssr-bach',
        name: 'Thầy Ba "Chúa Tể Thuật Toán"',
        role: 'Chief Architect & Algorithm King',
        rarity: 'SSR',
        avatar: '👑',
        avatarImg: 'images/avatars/ssr-bach.svg',
        cardImg: 'images/cards/ssr-bach.svg',
        avatarBg: 'bg-gradient-to-tr from-amber-600 to-yellow-400',
        stats: [
            { label: 'Sát thương Review Code', value: '9999+' },
            { label: 'Tốc độ bắt lỗi', value: 'Vô cực' },
            { label: 'Độ kiên nhẫn với học viên', value: '100%' },
            { label: 'Kỹ năng tối thượng', value: 'Clean Code Thần Chưởng' }
        ],
        quote: '“Code không bug đời không nể. Nhưng nộp bài có bug là ăn gậy ngay nhé các em!”',
        wish: 'Nhân ngày Nhà Giáo Việt Nam 20/11, kính chúc Thầy luôn tràn đầy nhiệt huyết, sức khỏe vô biên để tiếp tục chèo lái con thuyền CodeGym dìu dắt bao thế hệ dev cập bến thành công!'
    },
    {
        id: 'ssr-thao',
        name: 'Cô Thảo "Nữ Thần Refactor"',
        role: 'Lead Front-End & Code Cleanliness',
        rarity: 'SSR',
        avatar: '✨',
        avatarImg: 'images/avatars/ssr-thao.svg',
        cardImg: 'images/cards/ssr-thao.svg',
        avatarBg: 'bg-gradient-to-tr from-rose-500 to-amber-400',
        stats: [
            { label: 'Sát thương Review Code', value: '8888' },
            { label: 'Aura cảnh cáo', value: '+99% độ sạch' },
            { label: 'Ném gạch đặt biến a, b, c', value: '100% Crit' },
            { label: 'Tuyệt chiêu', value: 'Flexbox bẻ cong vạn vật' }
        ],
        quote: '“Ai đặt tên hàm `doSomething()` thì chuẩn bị sẵn tinh thần lên thớt nhé!”',
        wish: 'Chúc Cô ngày 20/11 mãi mãi tươi trẻ rạng ngời, code không bao giờ warning, đời luôn rực rỡ và tràn đầy niềm hạnh phúc bên các lứa học trò thân yêu!'
    },
    {
        id: 'ssr-tuan',
        name: 'Thầy Tuấn "Debug Vô Song"',
        role: 'Senior Tech Lead & Memory Leak Hunter',
        rarity: 'SSR',
        avatar: '⚡',
        avatarImg: 'images/avatars/ssr-tuan.svg',
        cardImg: 'images/cards/ssr-tuan.svg',
        avatarBg: 'bg-gradient-to-tr from-yellow-500 to-orange-600',
        stats: [
            { label: 'Sát thương Review Code', value: '9500' },
            { label: 'Tốc độ soi log', value: '0.1s / 1000 dòng' },
            { label: 'Né tránh deadline', value: 'Bậc Thầy' },
            { label: 'Kỹ năng tối thượng', value: 'Hồi sinh Server sập' }
        ],
        quote: '“Chỉ cần bình tĩnh đọc log, nếu log không có thì thêm log, thế thôi mà cũng khóc!”',
        wish: 'Kính chúc Thầy 20/11 thật nhiều niềm vui! Cảm ơn người Thầy đã luôn kiên nhẫn cứu vớt những pha code đi vào lòng đất của đàn em mỗi mùa đồ án!'
    },
    {
        id: 'ssr-nam',
        name: 'Thầy Nam "Hộ Pháp DevOps"',
        role: 'Infrastructure Guardian & CI/CD Master',
        rarity: 'SSR',
        avatar: '🛡️',
        avatarImg: 'images/avatars/ssr-nam.svg',
        cardImg: 'images/cards/ssr-nam.svg',
        avatarBg: 'bg-gradient-to-tr from-amber-500 to-emerald-500',
        stats: [
            { label: 'Server Uptime', value: '99.999%' },
            { label: 'Độ chịu nhiệt đồ án', value: 'Max ping' },
            { label: 'Sát thương gank Docker', value: '9999' },
            { label: 'Kỹ năng tối thượng', value: 'Búng tay xanh ngắt Pipeline' }
        ],
        quote: '“Máy tao chạy bình thường mà? Đẩy lên server lỗi là do nhân phẩm của mày rồi!”',
        wish: 'Chúc Thầy ngày 20/11 thật hạnh phúc và ý nghĩa! Chúc mọi pipeline của Thầy luôn xanh rì, server luôn mát lạnh và học trò luôn thành danh!'
    },
    {
        id: 'ssr-mai',
        name: 'Cô Mai "Pixel Perfect"',
        role: 'UI/UX Sorceress & CSS Queen',
        rarity: 'SSR',
        avatar: '🎨',
        avatarImg: 'images/avatars/ssr-mai.svg',
        cardImg: 'images/cards/ssr-mai.svg',
        avatarBg: 'bg-gradient-to-tr from-pink-500 to-amber-300',
        stats: [
            { label: 'Độ lệch Pixel mắt thường', value: '0.001px' },
            { label: 'Sát thương phản hồi', value: '7777' },
            { label: 'Animation FPS', value: '144Hz mượt mà' },
            { label: 'Tuyệt kỹ', value: 'CSS Grid xoay chuyển càn khôn' }
        ],
        quote: '“Lệch 1 pixel trên mobile cũng làm cô mất ngủ cả đêm đấy nhé!”',
        wish: 'Nhân ngày 20/11, chúc Cô luôn ngập tràn cảm hứng sáng tạo, nụ cười rạng rỡ và luôn nhận được sự yêu thương, kính trọng từ mọi thế hệ học viên CodeGym!'
    },
    {
        id: 'ssr-hoang',
        name: 'Thầy Hoàng "Pháp Sư Backend"',
        role: 'Database Guru & Query Optimizer',
        rarity: 'SSR',
        avatar: '🧙‍♂️',
        avatarImg: 'images/avatars/ssr-hoang.svg',
        cardImg: 'images/cards/ssr-hoang.svg',
        avatarBg: 'bg-gradient-to-tr from-amber-600 to-indigo-600',
        stats: [
            { label: 'Tối ưu Query SQL', value: 'Từ 10s về 2ms' },
            { label: 'Sát thương Review Code', value: '9200' },
            { label: 'Bắt Index sai', value: 'Bách phát bách trúng' },
            { label: 'Tuyệt kỹ', value: 'Transaction bất tử' }
        ],
        quote: '“Select * from bảng triệu dòng à? Gan to bằng quả dưa hấu rồi đấy!”',
        wish: 'Kính chúc Thầy 20/11 ngập tràn niềm vui, sức khỏe dồi dào và luôn giữ vững phong độ người dẫn đường vĩ đại cho anh em coder qua miền giông bão!'
    },

    // === SR: VẬT PHẨM TRỢ THỦ CỰC MẠNH ===
    {
        id: 'sr-late-pass',
        name: 'Kim Bài Miễn Tử 20/11',
        role: 'Vật Phẩm Thần Thoại Cấp Lớp',
        rarity: 'SR',
        avatar: '🎫',
        avatarImg: 'images/avatars/sr-late-pass.svg',
        cardImg: 'images/cards/sr-late-pass.svg',
        avatarBg: 'bg-gradient-to-tr from-purple-600 to-pink-500',
        stats: [
            { label: 'Tác dụng', value: 'Miễn trừ 1 lần nộp bài muộn' },
            { label: 'Thời hạn', value: 'Vĩnh viễn trong khóa' },
            { label: 'Tỉ lệ giải cứu', value: '100%' },
            { label: 'Hào quang', value: 'Thở phào nhẹ nhõm' }
        ],
        quote: '“Có tấm thẻ này trong tay, deadline chỉ là con muỗi!”',
        wish: 'Cảm ơn các thầy cô đã luôn bao dung và cho chúng em cơ hội sửa sai trên con đường học tập!'
    },
    {
        id: 'sr-ta-help',
        name: 'Trợ Giảng Thức Trắng Đêm',
        role: 'Người Đồng Hành Tận Tụy',
        rarity: 'SR',
        avatar: '🦉',
        avatarImg: 'images/avatars/sr-ta-help.svg',
        cardImg: 'images/cards/sr-ta-help.svg',
        avatarBg: 'bg-gradient-to-tr from-fuchsia-600 to-purple-800',
        stats: [
            { label: 'Thời gian online', value: '23h59 - 4h00 sáng' },
            { label: 'Độ kiên trì', value: '9999' },
            { label: 'Bình tĩnh giải thích', value: 'Vô cực' },
            { label: 'Cứu viện đồ án', value: 'Cực nhanh' }
        ],
        quote: '“Em share màn hình đi, anh xem cho tại sao nó lại null...”',
        wish: 'Cảm ơn các bạn Trợ giảng đã không quản đêm ngày kề vai sát cánh gánh team cùng học viên!'
    },
    {
        id: 'sr-coffee-god',
        name: 'Thần Dược Cà Phê Cày Đêm',
        role: 'Tiêu Hao Phẩm Thần Thánh',
        rarity: 'SR',
        avatar: '☕',
        avatarImg: 'images/avatars/sr-coffee-god.svg',
        cardImg: 'images/cards/sr-coffee-god.svg',
        avatarBg: 'bg-gradient-to-tr from-purple-700 to-amber-700',
        stats: [
            { label: 'Tỉnh táo', value: '+300%' },
            { label: 'Tốc độ gõ phím', value: '150 WPM' },
            { label: 'Chống buồn ngủ', value: '8 tiếng liên tục' },
            { label: 'Năng suất fix bug', value: 'x2' }
        ],
        quote: '“Uống vào 1 ngụm, cả vũ trụ nhị phân hiện ra trước mắt!”',
        wish: 'Chúc các thầy cô luôn có những ly cà phê thơm ngon mỗi sáng để tràn đầy năng lượng đứng lớp!'
    },
    {
        id: 'sr-merge-pass',
        name: 'Bùa Merge Thẳng Main Không Cần Check',
        role: 'Vật Phẩm Hộ Mệnh Git',
        rarity: 'SR',
        avatar: '📜',
        avatarImg: 'images/avatars/sr-merge-pass.svg',
        cardImg: 'images/cards/sr-merge-pass.svg',
        avatarBg: 'bg-gradient-to-tr from-purple-500 to-indigo-500',
        stats: [
            { label: 'Xung đột code', value: '0%' },
            { label: 'May mắn', value: '+777%' },
            { label: 'Tránh đụng chạm', value: 'Tuyệt đối' },
            { label: 'Độ mạo hiểm', value: 'Cao ngất' }
        ],
        quote: '“Chỉ dành cho những ai có nhân phẩm siêu cấp vô địch!”',
        wish: 'Chúc tình thầy trò luôn hòa hợp, không bao giờ có xung đột (conflict) như dòng code trôi mượt!'
    },

    // === R: CÔNG CỤ DEV QUEN THUỘC ===
    {
        id: 'r-stackoverflow',
        name: 'Thần Đèn Stack Overflow',
        role: 'Cứu Tinh Toàn Cầu',
        rarity: 'R',
        avatar: '📚',
        avatarImg: 'images/avatars/r-stackoverflow.svg',
        cardImg: 'images/cards/r-stackoverflow.svg',
        avatarBg: 'bg-gradient-to-tr from-blue-600 to-cyan-500',
        stats: [
            { label: 'Tìm câu trả lời', value: '5 giây' },
            { label: 'Copy-Paste', value: 'Siêu tốc' },
            { label: 'Hiểu bản chất', value: '50/50' },
            { label: 'Tỉ lệ fix tạm', value: '85%' }
        ],
        quote: '“Code này chạy được từ năm 2011, cứ copy vào là ăn!”',
        wish: 'Cảm ơn thầy cô đã dạy chúng em cách tự học và tự đứng trên đôi chân của mình!'
    },
    {
        id: 'r-console-log',
        name: 'Thanh Kiếm Console.log("DM SAO K CHAY")',
        role: 'Vũ Khí Thô Sơ Nhưng Hiệu Nghiệm',
        rarity: 'R',
        avatar: '🗡️',
        avatarImg: 'images/avatars/r-console-log.svg',
        cardImg: 'images/cards/r-console-log.svg',
        avatarBg: 'bg-gradient-to-tr from-blue-500 to-indigo-600',
        stats: [
            { label: 'Số lượng log cắm trong code', value: '99 cái' },
            { label: 'Độ tuyệt vọng', value: 'Cực đại' },
            { label: 'Tìm ra dòng lỗi', value: 'Hên xui' },
            { label: 'Dọn rác trước khi nộp', value: 'Dễ quên' }
        ],
        quote: '“Dù có hàng tá tool debug xịn sò, console.log vẫn là chân ái!”',
        wish: 'Chúc thầy cô luôn nhận được những bài code sạch đẹp, không còn vương vãi console.log!'
    },
    {
        id: 'r-chatgpt',
        name: 'Cố Vấn AI Chém Gió',
        role: 'Trợ Thủ Đắc Lực',
        rarity: 'R',
        avatar: '🤖',
        avatarImg: 'images/avatars/r-chatgpt.svg',
        cardImg: 'images/cards/r-chatgpt.svg',
        avatarBg: 'bg-gradient-to-tr from-cyan-600 to-teal-500',
        stats: [
            { label: 'Tốc độ sinh code', value: 'Chớp mắt' },
            { label: 'Độ tự tin', value: '100%' },
            { label: 'Độ chính xác', value: 'Cần kiểm chứng' },
            { label: 'Khả năng bị giảng viên hỏi', value: 'Ú ớ' }
        ],
        quote: '“Em thề đoạn code này là do tư duy của em, không hề qua chat!”',
        wish: 'Dù AI có phát triển đến đâu, sự ân cần và tận tâm của người thầy vẫn là điều không gì thay thế được!'
    },

    // === COMMON: BỘ SƯU TẬP BUG & THỬ THÁCH ĐẪM NƯỚC MẮT ===
    {
        id: 'c-red-bug',
        name: 'Bug Đỏ Lòm Đỏ Hoe 🔴',
        role: 'Nỗi Ám Ảnh Bậc Nhất',
        rarity: 'COMMON',
        avatar: '🐞',
        avatarImg: 'images/avatars/c-red-bug.svg',
        cardImg: 'images/cards/c-red-bug.svg',
        avatarBg: 'bg-gradient-to-tr from-red-600 to-rose-900',
        stats: [
            { label: 'Độ dài Traceback', value: '999 dòng' },
            { label: 'Sát thương tinh thần', value: 'Gục ngã' },
            { label: 'Độ đỏ của màn hình', value: 'Chói lóa' },
            { label: 'Biện pháp chữa trị', value: 'Nhờ Mentor cứu' }
        ],
        quote: '“Mới sửa xong một dấu chấm, đỏ lòm nguyên cả Project!”',
        wish: 'Chúc các thầy cô luôn có đôi mắt tinh anh để phát hiện ra ngay con bug ẩn nấp này!'
    },
    {
        id: 'c-merge-conflict',
        name: 'Merge Conflict 500 Files 💥',
        role: 'Xung Đột Hủy Diệt Tình Bạn',
        rarity: 'COMMON',
        avatar: '💥',
        avatarImg: 'images/avatars/c-merge-conflict.svg',
        cardImg: 'images/cards/c-merge-conflict.svg',
        avatarBg: 'bg-gradient-to-tr from-red-700 to-orange-950',
        stats: [
            { label: 'File bị conflict', value: '500+' },
            { label: 'HEAD <<<<<<<', value: 'Bủa vây' },
            { label: 'Tình anh em trong nhóm', value: 'Rạn nứt' },
            { label: 'Thời gian gỡ', value: 'Đến sáng mai' }
        ],
        quote: '“Ai cho mày sửa vào file tao đang làm thế hả???”',
        wish: 'Cảm ơn Thầy Cô đã luôn là trọng tài công tâm hòa giải mọi mâu thuẫn cho cả lớp!'
    },
    {
        id: 'c-missing-semicolon',
        name: 'Thiếu Dấu Chấm Phẩy Oan Nghiệt ;',
        role: 'Trinh Thám Tìm Kiếm',
        rarity: 'COMMON',
        avatar: '🔍',
        avatarImg: 'images/avatars/c-missing-semicolon.svg',
        cardImg: 'images/cards/c-missing-semicolon.svg',
        avatarBg: 'bg-gradient-to-tr from-rose-700 to-neutral-900',
        stats: [
            { label: 'Thời gian debug', value: '4 tiếng đồng hồ' },
            { label: 'Vị trí lỗi', value: 'Dòng 142 cột 89' },
            { label: 'Cảm xúc khi tìm ra', value: 'Muốn đập bàn phím' },
            { label: 'Bài học rút ra', value: 'Bật Linter lên' }
        ],
        quote: '“Tìm cả buổi chiều, hóa ra thiếu mỗi một hạt cát ;”',
        wish: 'Chúc thầy cô luôn có sự kiên nhẫn vô tận trước những lỗi ngây ngô này của chúng em!'
    },
    {
        id: 'c-null-pointer',
        name: 'NullPointerException 💀',
        role: 'Cơn Ác Mộng Java',
        rarity: 'COMMON',
        avatar: '💀',
        avatarImg: 'images/avatars/c-null-pointer.svg',
        cardImg: 'images/cards/c-null-pointer.svg',
        avatarBg: 'bg-gradient-to-tr from-red-900 to-zinc-900',
        stats: [
            { label: 'Đối tượng bị rỗng', value: 'Tất cả' },
            { label: 'Nguyên nhân', value: 'Chưa khởi tạo' },
            { label: 'Độ bất ngờ', value: '100% khi chạy demo' },
            { label: 'Sát thương', value: 'Crash app tức thì' }
        ],
        quote: '“Khi cuộc đời cho bạn null, hãy ném ra NullPointerException!”',
        wish: 'Chúc cuộc sống của Thầy Cô luôn ngập tràn giá trị (not null) và hạnh phúc đong đầy!'
    },
    {
        id: 'c-demo-die',
        name: 'Code Chết Đúng Lúc Demo 😱',
        role: 'Lời Nguyền Công Nghệ',
        rarity: 'COMMON',
        avatar: '⏱️',
        avatarImg: 'images/avatars/c-demo-die.svg',
        cardImg: 'images/cards/c-demo-die.svg',
        avatarBg: 'bg-gradient-to-tr from-orange-800 to-red-950',
        stats: [
            { label: 'Ở nhà test', value: 'Chạy ngon lành 100%' },
            { label: 'Lên bục thuyết trình', value: 'Trắng bệch màn hình' },
            { label: 'Độ run của tay', value: 'Cấp độ 9' },
            { label: 'Lời giải thích', value: 'Hồi nãy nó chạy mà thầy' }
        ],
        quote: '“Dạ thưa thầy, em thề 5 phút trước ở dưới kia nó còn mượt lắm ạ!”',
        wish: 'Cảm ơn các thầy cô luôn mỉm cười độ lượng trước màn ngụy biện kinh điển này!'
    },
    {
        id: 'c-deadline-crush',
        name: 'Deadline Đè Bẹp Dí ⚡',
        role: 'Kẻ Săn Đuổi Coder',
        rarity: 'COMMON',
        avatar: '⏳',
        avatarImg: 'images/avatars/c-deadline-crush.svg',
        cardImg: 'images/cards/c-deadline-crush.svg',
        avatarBg: 'bg-gradient-to-tr from-amber-900 to-red-900',
        stats: [
            { label: 'Thời gian còn lại', value: '00:03:15' },
            { label: 'Nhịp tim', value: '180 bpm' },
            { label: 'Nhập code', value: 'Bằng bản năng' },
            { label: 'Lời cầu nguyện', value: 'Lạy trời mạng đừng lag' }
        ],
        quote: '“Nước đến chân mới nhảy là tầm thường, nước đến cổ mới lặn!”',
        wish: 'Kính chúc quý thầy cô luôn an nhàn, thảnh thơi, không bao giờ bị deadline dí như học trò!'
    }
];

// Quản lý kho dữ liệu với localStorage để học viên có thể tùy chỉnh thêm Mentor của lớp mình
class ItemRepository {
    constructor() {
        this.storageKey = 'codegym_gacha_custom_items';
        this.inventoryKey = 'codegym_gacha_inventory';
        this.historyKey = 'codegym_gacha_history';
        this.pityKey = 'codegym_gacha_pity';
    }

    getAllItems() {
        const custom = this.getCustomItems();
        return [...DEFAULT_ITEMS, ...custom];
    }

    getItemsByRarity(rarity) {
        return this.getAllItems().filter(item => item.rarity === rarity);
    }

    getItemById(id) {
        return this.getAllItems().find(item => item.id === id);
    }

    getCustomItems() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading custom items', e);
            return [];
        }
    }

    addCustomMentor(mentorData) {
        const custom = this.getCustomItems();
        const newMentor = {
            id: 'custom-' + Date.now(),
            name: mentorData.name,
            role: mentorData.role || 'Giảng Viên Kính Mến',
            rarity: 'SSR',
            avatar: mentorData.avatar || '⭐',
            avatarImg: mentorData.avatarImg || null,
            cardImg: mentorData.cardImg || null,
            avatarBg: mentorData.avatarBg || 'bg-gradient-to-tr from-amber-500 to-yellow-400',
            stats: mentorData.stats || [
                { label: 'Sát thương Review Code', value: '9999' },
                { label: 'Tốc độ bắt lỗi', value: 'Tức thì' },
                { label: 'Độ tận tâm', value: '100%' },
                { label: 'Tuyệt kỹ', value: 'Truyền cảm hứng code' }
            ],
            quote: mentorData.quote || '“Học lập trình là không ngừng nỗ lực mỗi ngày!”',
            wish: mentorData.wish || 'Kính chúc Thầy/Cô ngày 20/11 tràn ngập niềm vui, sức khỏe và luôn đồng hành cùng chúng em!'
        };
        custom.push(newMentor);
        localStorage.setItem(this.storageKey, JSON.stringify(custom));
        return newMentor;
    }

    resetCustomItems() {
        localStorage.removeItem(this.storageKey);
    }

    // Pity counter
    getPity() {
        return parseInt(localStorage.getItem(this.pityKey) || '0', 10);
    }

    incrementPity() {
        const next = this.getPity() + 1;
        localStorage.setItem(this.pityKey, next.toString());
        return next;
    }

    resetPity() {
        localStorage.setItem(this.pityKey, '0');
    }

    // Inventory
    getInventory() {
        try {
            const data = localStorage.getItem(this.inventoryKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    addToInventory(item) {
        const inv = this.getInventory();
        const existing = inv.find(x => x.id === item.id);
        if (existing) {
            existing.count = (existing.count || 1) + 1;
            existing.lastWon = Date.now();
        } else {
            inv.push({
                ...item,
                count: 1,
                firstWon: Date.now(),
                lastWon: Date.now()
            });
        }
        localStorage.setItem(this.inventoryKey, JSON.stringify(inv));
        return inv;
    }

    clearInventory() {
        localStorage.removeItem(this.inventoryKey);
        this.resetPity();
    }
}

window.ItemRepo = new ItemRepository();
