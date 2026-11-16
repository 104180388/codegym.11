# -*- coding: utf-8 -*-
import os

base_dir = r'c:\Users\admin\OneDrive\Desktop\codegym11\images'
cards_dir = os.path.join(base_dir, 'cards')
avatars_dir = os.path.join(base_dir, 'avatars')
os.makedirs(cards_dir, exist_ok=True)
os.makedirs(avatars_dir, exist_ok=True)

def wrap_svg_text(text, max_chars=38):
    words = text.split(' ')
    lines = []
    cur = ''
    for w in words:
        if len(cur) + len(w) + 1 <= max_chars:
            cur = (cur + ' ' + w).strip()
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def xml_escape(val):
    if not isinstance(val, str):
        return val
    return val.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

ITEMS_META = [
    # === SSR MENTORS ===
    {
        'id': 'ssr-bach',
        'code': 'CG-SSR-01',
        'name': 'Thầy Ba "Chúa Tể Thuật Toán"',
        'role': 'Chief Architect & Algorithm King',
        'rarity': 'SSR',
        'theme_color': '#f59e0b',
        'sub_color': '#fbbf24',
        'bg_grad': ('#1a1102', '#2e1c02', '#080a12'),
        'quote': '“Code không bug đời không nể. Nhưng nộp bài có bug là ăn gậy ngay nhé!”',
        'wish': 'Nhân ngày 20/11, kính chúc Thầy luôn tràn đầy nhiệt huyết, sức khỏe vô biên để tiếp tục chèo lái con thuyền CodeGym dìu dắt bao thế hệ dev cập bến thành công!',
        'stat1': ('Sát thương Review', '9999+'),
        'stat2': ('Tốc độ bắt lỗi', 'Vô cực'),
        'stat3': ('Kiên nhẫn', '100%'),
        'stat4': ('Tuyệt kỹ', 'Clean Code Chưởng'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#f59e0b" stroke-width="2.5" filter="url(#glow)"/>
            <path d="M74 78 L83 52 L100 66 L117 52 L126 78 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
            <circle cx="100" cy="56" r="4.5" fill="#fef08a"/>
            <circle cx="83" cy="45" r="3.5" fill="#fef08a"/>
            <circle cx="117" cy="45" r="3.5" fill="#fef08a"/>
            <path d="M54 32 L146 32 M54 98 L146 98" stroke="#f59e0b" stroke-dasharray="5,4" stroke-width="1.5" opacity="0.6"/>
            <text x="100" y="92" font-family="'Segoe UI', monospace" font-size="8.5" font-weight="900" fill="#fef08a" text-anchor="middle">O(1) • MASTER ALGORITHM</text>
        '''
    },
    {
        'id': 'ssr-thao',
        'code': 'CG-SSR-02',
        'name': 'Cô Thảo "Nữ Thần Refactor"',
        'role': 'Lead Front-End & Code Cleanliness',
        'rarity': 'SSR',
        'theme_color': '#ec4899',
        'sub_color': '#fbbf24',
        'bg_grad': ('#240517', '#3b0625', '#080a12'),
        'quote': '“Ai đặt tên hàm `doSomething()` thì chuẩn bị sẵn tinh thần lên thớt nhé!”',
        'wish': 'Chúc Cô ngày 20/11 mãi mãi tươi trẻ rạng ngời, code không bao giờ warning, đời luôn rực rỡ và tràn đầy niềm hạnh phúc bên các lứa học trò thân yêu!',
        'stat1': ('Sát thương Review', '8888'),
        'stat2': ('Aura cảnh cáo', '+99% Sạch'),
        'stat3': ('Phạt biến a, b', 'Crit 100%'),
        'stat4': ('Tuyệt kỹ', 'Flexbox Bẻ Cong'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#ec4899" stroke-width="2.5" filter="url(#glow)"/>
            <polygon points="100,34 130,64 100,94 70,64" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="4,3"/>
            <text x="83" y="72" font-family="sans-serif" font-size="22" font-weight="900" fill="#fbcfe8" text-anchor="middle">&lt;</text>
            <text x="117" y="72" font-family="sans-serif" font-size="22" font-weight="900" fill="#fbcfe8" text-anchor="middle">&gt;</text>
            <circle cx="100" cy="64" r="8" fill="#fbbf24" filter="url(#glow)"/>
            <text x="100" y="68" font-family="sans-serif" font-size="10" font-weight="bold" fill="#831843" text-anchor="middle">★</text>
            <text x="100" y="92" font-family="'Segoe UI', monospace" font-size="8.5" font-weight="900" fill="#f472b6" text-anchor="middle">CLEAN CODE DEITY</text>
        '''
    },
    {
        'id': 'ssr-tuan',
        'code': 'CG-SSR-03',
        'name': 'Thầy Tuấn "Debug Vô Song"',
        'role': 'Senior Tech Lead & Hunter',
        'rarity': 'SSR',
        'theme_color': '#f97316',
        'sub_color': '#facc15',
        'bg_grad': ('#210c01', '#381402', '#080a12'),
        'quote': '“Bình tĩnh đọc log! Nếu log không có thì thêm log, thế thôi mà cũng khóc!”',
        'wish': 'Kính chúc Thầy 20/11 thật nhiều niềm vui! Cảm ơn Thầy đã luôn kiên nhẫn cứu vớt những pha code đi vào lòng đất của đàn em mỗi mùa đồ án!',
        'stat1': ('Sát thương Review', '9500'),
        'stat2': ('Tốc độ soi log', '0.1s / 1000 dòng'),
        'stat3': ('Né deadline', 'Bậc Thầy'),
        'stat4': ('Tuyệt kỹ', 'Hồi Sinh Server'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#f97316" stroke-width="2.5" filter="url(#glow)"/>
            <rect x="70" y="42" width="60" height="44" rx="6" fill="#0f172a" stroke="#ea580c" stroke-width="2"/>
            <circle cx="77" cy="49" r="2.5" fill="#ef4444"/>
            <circle cx="84" cy="49" r="2.5" fill="#f59e0b"/>
            <circle cx="91" cy="49" r="2.5" fill="#10b981"/>
            <polygon points="102,51 94,65 102,65 97,79 111,63 104,63" fill="#facc15" filter="url(#glow)"/>
            <text x="100" y="98" font-family="'Segoe UI', monospace" font-size="8.5" font-weight="900" fill="#fdba74" text-anchor="middle">ZERO MEMORY LEAK</text>
        '''
    },
    {
        'id': 'ssr-nam',
        'code': 'CG-SSR-04',
        'name': 'Thầy Nam "Hộ Pháp DevOps"',
        'role': 'Infrastructure & CI/CD Master',
        'rarity': 'SSR',
        'theme_color': '#10b981',
        'sub_color': '#34d399',
        'bg_grad': ('#011f13', '#033320', '#080a12'),
        'quote': '“Máy tao chạy bình thường mà? Đẩy lên server lỗi là do nhân phẩm của mày rồi!”',
        'wish': 'Chúc Thầy ngày 20/11 thật hạnh phúc và ý nghĩa! Chúc mọi pipeline của Thầy luôn xanh rì, server luôn mát lạnh và học trò luôn thành danh!',
        'stat1': ('Server Uptime', '99.999%'),
        'stat2': ('Chịu nhiệt đồ án', 'Max ping'),
        'stat3': ('Gank Docker', '9999 Sát thương'),
        'stat4': ('Tuyệt kỹ', 'Búng Tay Xanh CI'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#10b981" stroke-width="2.5" filter="url(#glow)"/>
            <path d="M100 35 L124 46 L124 70 C124 85 100 97 100 97 C100 97 76 85 76 70 L76 46 Z" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
            <path d="M90 65 C90 61 94 61 97 65 C100 69 104 69 104 65 C104 61 100 61 97 65 C94 69 90 69 90 65 Z" fill="none" stroke="#a7f3d0" stroke-width="2.5"/>
            <text x="100" y="86" font-family="'Segoe UI', monospace" font-size="7.5" font-weight="900" fill="#6ee7b7" text-anchor="middle">PIPELINE PASS 100%</text>
        '''
    },
    {
        'id': 'ssr-mai',
        'code': 'CG-SSR-05',
        'name': 'Cô Mai "Pixel Perfect"',
        'role': 'UI/UX Sorceress & CSS Queen',
        'rarity': 'SSR',
        'theme_color': '#8b5cf6',
        'sub_color': '#c084fc',
        'bg_grad': ('#130624', '#21083d', '#080a12'),
        'quote': '“Lệch 1 pixel trên mobile cũng làm cô mất ngủ cả đêm đấy nhé!”',
        'wish': 'Nhân ngày 20/11, chúc Cô luôn ngập tràn cảm hứng sáng tạo, nụ cười rạng rỡ và luôn nhận được sự yêu thương, kính trọng từ mọi thế hệ học viên!',
        'stat1': ('Độ lệch Pixel', '0.001px'),
        'stat2': ('Sát thương review', '7777'),
        'stat3': ('Animation FPS', '144Hz'),
        'stat4': ('Tuyệt kỹ', 'CSS Grid Xoay Càn'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#8b5cf6" stroke-width="2.5" filter="url(#glow)"/>
            <rect x="76" y="43" width="48" height="44" rx="8" fill="#2e1065" stroke="#c084fc" stroke-width="2"/>
            <line x1="100" y1="43" x2="100" y2="87" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="3,3"/>
            <line x1="76" y1="65" x2="124" y2="65" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="3,3"/>
            <circle cx="100" cy="65" r="9" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
            <circle cx="100" cy="65" r="2.5" fill="#f43f5e"/>
            <text x="100" y="102" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#ddd6fe" text-anchor="middle">PIXEL PERFECT</text>
        '''
    },
    {
        'id': 'ssr-hoang',
        'code': 'CG-SSR-06',
        'name': 'Thầy Hoàng "Pháp Sư Backend"',
        'role': 'Database Guru & Query Optimizer',
        'rarity': 'SSR',
        'theme_color': '#3b82f6',
        'sub_color': '#60a5fa',
        'bg_grad': ('#031229', '#052047', '#080a12'),
        'quote': '“Select * from bảng triệu dòng à? Gan to bằng quả dưa hấu rồi đấy!”',
        'wish': 'Kính chúc Thầy 20/11 ngập tràn niềm vui, sức khỏe dồi dào và luôn giữ vững phong độ người dẫn đường vĩ đại cho anh em coder qua miền giông bão!',
        'stat1': ('Tối ưu SQL', '10s -> 2ms'),
        'stat2': ('Sát thương review', '9200'),
        'stat3': ('Bắt Index sai', '100% Trúng'),
        'stat4': ('Tuyệt kỹ', 'Transaction Bất Tử'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#3b82f6" stroke-width="2.5" filter="url(#glow)"/>
            <ellipse cx="100" cy="48" rx="24" ry="6.5" fill="#1e40af" stroke="#93c5fd" stroke-width="1.5"/>
            <path d="M76 48 L76 62 C76 67 100 71 100 71 C100 71 124 67 124 62 L124 48" fill="#1e3a8a" stroke="#93c5fd" stroke-width="1.5"/>
            <path d="M76 62 L76 76 C76 81 100 85 100 85 C100 85 124 81 124 76 L124 62" fill="#172554" stroke="#93c5fd" stroke-width="1.5"/>
            <path d="M97 43 L103 43 L100 54 L106 54 L94 67 L98 57 L92 57 Z" fill="#fbbf24" filter="url(#glow)"/>
            <text x="100" y="98" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#bfdbfe" text-anchor="middle">SQL INDEX MASTER</text>
        '''
    },

    # === SR ITEMS ===
    {
        'id': 'sr-late-pass',
        'code': 'CG-SR-01',
        'name': 'Kim Bài Miễn Tử 20/11',
        'role': 'Vật Phẩm Thần Thoại Cấp Lớp',
        'rarity': 'SR',
        'theme_color': '#a855f7',
        'sub_color': '#f43f5e',
        'bg_grad': ('#1d0526', '#350a42', '#080a12'),
        'quote': '“Có tấm thẻ này trong tay, deadline chỉ là con muỗi!”',
        'wish': 'Cảm ơn các thầy cô đã luôn bao dung và cho chúng em cơ hội sửa sai trên con đường học tập!',
        'stat1': ('Tác dụng', 'Miễn nộp bài trễ'),
        'stat2': ('Thời hạn', 'Vĩnh viễn'),
        'stat3': ('Tỉ lệ giải cứu', '100%'),
        'stat4': ('Hào quang', 'Thở phào nhẹ nhõm'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#a855f7" stroke-width="2" filter="url(#glow)"/>
            <rect x="68" y="46" width="64" height="38" rx="6" fill="#581c87" stroke="#fbbf24" stroke-width="2"/>
            <circle cx="68" cy="65" r="4.5" fill="#080a12" stroke="#fbbf24" stroke-width="1.5"/>
            <circle cx="132" cy="65" r="4.5" fill="#080a12" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="100" y="61" font-family="sans-serif" font-size="10" font-weight="900" fill="#fde047" text-anchor="middle">VIP PASS</text>
            <text x="100" y="74" font-family="sans-serif" font-size="7.5" font-weight="bold" fill="#e9d5ff" text-anchor="middle">MIỄN DEADLINE</text>
        '''
    },
    {
        'id': 'sr-ta-help',
        'code': 'CG-SR-02',
        'name': 'Trợ Giảng Thức Trắng Đêm',
        'role': 'Người Đồng Hành Tận Tụy',
        'rarity': 'SR',
        'theme_color': '#c026d3',
        'sub_color': '#38bdf8',
        'bg_grad': ('#210324', '#3d0742', '#080a12'),
        'quote': '“Em share màn hình đi, anh xem cho tại sao nó lại null...”',
        'wish': 'Cảm ơn các bạn Trợ giảng đã không quản đêm ngày kề vai sát cánh gánh team cùng học viên!',
        'stat1': ('Thời gian online', '23h59 - 4h00'),
        'stat2': ('Độ kiên trì', '9999'),
        'stat3': ('Bình tĩnh', 'Vô cực'),
        'stat4': ('Cứu đồ án', 'Tức thì'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#c026d3" stroke-width="2" filter="url(#glow)"/>
            <ellipse cx="100" cy="65" rx="24" ry="20" fill="#3b0764" stroke="#e879f9" stroke-width="1.5"/>
            <circle cx="92" cy="62" r="5.5" fill="#080a12" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="108" cy="62" r="5.5" fill="#080a12" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="92" cy="62" r="2.5" fill="#38bdf8" filter="url(#glow)"/>
            <circle cx="108" cy="62" r="2.5" fill="#38bdf8" filter="url(#glow)"/>
            <path d="M72 62 C72 44 128 44 128 62" fill="none" stroke="#f472b6" stroke-width="2"/>
            <text x="100" y="98" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#f5d0fe" text-anchor="middle">ONLINE 03:00 AM</text>
        '''
    },
    {
        'id': 'sr-coffee-god',
        'code': 'CG-SR-03',
        'name': 'Thần Dược Cà Phê Cày Đêm',
        'role': 'Tiêu Hao Phẩm Thần Thánh',
        'rarity': 'SR',
        'theme_color': '#eab308',
        'sub_color': '#d97706',
        'bg_grad': ('#211501', '#382202', '#080a12'),
        'quote': '“Uống vào 1 ngụm, cả vũ trụ nhị phân hiện ra trước mắt!”',
        'wish': 'Chúc các thầy cô luôn có những ly cà phê thơm ngon mỗi sáng để tràn đầy năng lượng đứng lớp!',
        'stat1': ('Tỉnh táo', '+300%'),
        'stat2': ('Tốc độ gõ', '150 WPM'),
        'stat3': ('Chống ngủ', '8 tiếng'),
        'stat4': ('Fix bug', 'x2 Năng suất'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#eab308" stroke-width="2" filter="url(#glow)"/>
            <rect x="83" y="49" width="30" height="30" rx="5" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
            <path d="M113 55 C120 55 120 71 113 71" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <path d="M89 44 C86 39 92 35 89 30 M97 44 C94 39 100 35 97 30 M105 44 C102 39 108 35 105 30" fill="none" stroke="#fde68a" stroke-width="1.5" stroke-linecap="round"/>
            <text x="98" y="69" font-family="sans-serif" font-size="12" font-weight="bold" fill="#fde047" text-anchor="middle">⚡</text>
            <text x="100" y="98" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#fef08a" text-anchor="middle">+300% CAFFEINE</text>
        '''
    },
    {
        'id': 'sr-merge-pass',
        'code': 'CG-SR-04',
        'name': 'Bùa Merge Thẳng Main',
        'role': 'Vật Phẩm Hộ Mệnh Git',
        'rarity': 'SR',
        'theme_color': '#6366f1',
        'sub_color': '#ec4899',
        'bg_grad': ('#100829', '#1d0e42', '#080a12'),
        'quote': '“Chỉ dành cho những ai có nhân phẩm siêu cấp vô địch!”',
        'wish': 'Chúc tình thầy trò luôn hòa hợp, không bao giờ có xung đột (conflict) như dòng code trôi mượt!',
        'stat1': ('Xung đột code', '0%'),
        'stat2': ('May mắn', '+777%'),
        'stat3': ('Tránh va chạm', 'Tuyệt đối'),
        'stat4': ('Độ ngầu', 'Cực đỉnh'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#6366f1" stroke-width="2" filter="url(#glow)"/>
            <line x1="82" y1="43" x2="82" y2="89" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
            <circle cx="82" cy="50" r="4" fill="#6366f1" stroke="#e0e7ff" stroke-width="1.5"/>
            <circle cx="82" cy="82" r="4" fill="#6366f1" stroke="#e0e7ff" stroke-width="1.5"/>
            <path d="M82 72 C96 72 110 65 110 55 L110 43" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
            <circle cx="110" cy="43" r="4" fill="#f43f5e" stroke="#ffe4e6" stroke-width="1.5"/>
            <text x="100" y="103" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#c7d2fe" text-anchor="middle">MERGE WITHOUT CHECK</text>
        '''
    },

    # === R ITEMS ===
    {
        'id': 'r-stackoverflow',
        'code': 'CG-R-01',
        'name': 'Thần Đèn Stack Overflow',
        'role': 'Cứu Tinh Toàn Cầu',
        'rarity': 'R',
        'theme_color': '#3b82f6',
        'sub_color': '#f97316',
        'bg_grad': ('#09162b', '#102647', '#080a12'),
        'quote': '“Code này chạy được từ năm 2011, cứ copy vào là ăn!”',
        'wish': 'Cảm ơn thầy cô đã dạy chúng em cách tự học và tự đứng trên đôi chân của mình!',
        'stat1': ('Tìm đáp án', '5 giây'),
        'stat2': ('Copy-Paste', 'Siêu tốc'),
        'stat3': ('Hiểu bản chất', '50/50'),
        'stat4': ('Fix tạm', '85% Thành công'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#3b82f6" stroke-width="2" filter="url(#glow)"/>
            <rect x="79" y="76" width="42" height="6" rx="2" fill="#f97316"/>
            <rect x="80" y="66" width="42" height="6" rx="2" fill="#fb923c" transform="rotate(-6 100 70)"/>
            <rect x="82" y="56" width="42" height="6" rx="2" fill="#fdba74" transform="rotate(-15 100 62)"/>
            <rect x="86" y="44" width="42" height="6" rx="2" fill="#ffedd5" transform="rotate(-28 100 52)"/>
            <text x="100" y="99" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#93c5fd" text-anchor="middle">STACK OVERFLOW</text>
        '''
    },
    {
        'id': 'r-console-log',
        'code': 'CG-R-02',
        'name': 'Thanh Kiếm Console.log()',
        'role': 'Vũ Khí Thô Sơ Nhưng Hiệu Nghiệm',
        'rarity': 'R',
        'theme_color': '#06b6d4',
        'sub_color': '#10b981',
        'bg_grad': ('#041f24', '#06333b', '#080a12'),
        'quote': '“Dù có hàng tá tool debug xịn sò, console.log vẫn là chân ái!”',
        'wish': 'Chúc thầy cô luôn nhận được những bài code sạch đẹp, không còn vương vãi console.log!',
        'stat1': ('Số log cắm', '99 cái'),
        'stat2': ('Tuyệt vọng', 'Cực đại'),
        'stat3': ('Tìm ra lỗi', 'Hên xui'),
        'stat4': ('Dọn trước nộp', 'Hay quên'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#06b6d4" stroke-width="2" filter="url(#glow)"/>
            <line x1="72" y1="92" x2="124" y2="40" stroke="#22d3ee" stroke-width="3" stroke-linecap="round" filter="url(#glow)"/>
            <line x1="120" y1="44" x2="128" y2="36" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
            <line x1="68" y1="96" x2="79" y2="85" stroke="#0e7490" stroke-width="5"/>
            <text x="100" y="85" font-family="'Segoe UI', monospace" font-size="7" font-weight="900" fill="#67e8f9" text-anchor="middle">console.log("DM SAO K CHAY")</text>
        '''
    },
    {
        'id': 'r-chatgpt',
        'code': 'CG-R-03',
        'name': 'Cố Vấn AI Chém Gió',
        'role': 'Trợ Thủ Đắc Lực',
        'rarity': 'R',
        'theme_color': '#14b8a6',
        'sub_color': '#06b6d4',
        'bg_grad': ('#031f1e', '#053331', '#080a12'),
        'quote': '“Em thề đoạn code này là do tư duy của em, không hề qua chat!”',
        'wish': 'Dù AI có phát triển đến đâu, sự ân cần và tận tâm của người thầy vẫn là điều không gì thay thế được!',
        'stat1': ('Sinh code', 'Chớp mắt'),
        'stat2': ('Tự tin', '100%'),
        'stat3': ('Chính xác', 'Cần kiểm tra'),
        'stat4': ('Bị hỏi code', 'Ú ớ'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#14b8a6" stroke-width="2" filter="url(#glow)"/>
            <rect x="78" y="49" width="44" height="32" rx="8" fill="#134e4a" stroke="#2dd4bf" stroke-width="1.5"/>
            <circle cx="90" cy="63" r="3" fill="#5eead4" filter="url(#glow)"/>
            <circle cx="110" cy="63" r="3" fill="#5eead4" filter="url(#glow)"/>
            <path d="M96 72 Q100 76 104 72" fill="none" stroke="#2dd4bf" stroke-width="1.5"/>
            <line x1="100" y1="49" x2="100" y2="40" stroke="#2dd4bf" stroke-width="1.5"/>
            <circle cx="100" cy="39" r="2.5" fill="#facc15"/>
            <text x="100" y="98" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#99f6e4" text-anchor="middle">AI GENERATED CODE</text>
        '''
    },

    # === COMMON / CURSED BUGS ===
    {
        'id': 'c-red-bug',
        'code': 'CG-BUG-01',
        'name': 'Bug Đỏ Lòm Đỏ Hoe 🔴',
        'role': 'Nỗi Ám Ảnh Bậc Nhất',
        'rarity': 'COMMON',
        'theme_color': '#ef4444',
        'sub_color': '#f87171',
        'bg_grad': ('#240505', '#380808', '#080a12'),
        'quote': '“Mới sửa xong một dấu chấm, đỏ lòm nguyên cả Project!”',
        'wish': 'Chúc các thầy cô luôn có đôi mắt tinh anh để phát hiện ra ngay con bug ẩn nấp này!',
        'stat1': ('Độ dài Traceback', '999 dòng'),
        'stat2': ('Tinh thần', 'Gục ngã'),
        'stat3': ('Màu màn hình', 'Đỏ chói'),
        'stat4': ('Cách chữa', 'Cầu cứu Mentor'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#ef4444" stroke-width="2" filter="url(#glow)"/>
            <ellipse cx="100" cy="66" rx="18" ry="22" fill="#7f1d1d" stroke="#f87171" stroke-width="2"/>
            <line x1="100" y1="44" x2="100" y2="88" stroke="#f87171" stroke-width="1.5"/>
            <path d="M82 55 L65 48 M82 66 L61 66 M82 77 L65 84 M118 55 L135 48 M118 66 L139 66 M118 77 L135 84" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
            <path d="M94 44 Q86 30 76 34 M106 44 Q114 30 124 34" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
            <text x="100" y="103" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#fca5a5" text-anchor="middle">FATAL ERROR 500</text>
        '''
    },
    {
        'id': 'c-merge-conflict',
        'code': 'CG-BUG-02',
        'name': 'Merge Conflict 500 Files 💥',
        'role': 'Xung Đột Hủy Diệt',
        'rarity': 'COMMON',
        'theme_color': '#ea580c',
        'sub_color': '#f97316',
        'bg_grad': ('#260902', '#3d0f03', '#080a12'),
        'quote': '“Ai cho mày sửa vào file tao đang làm thế hả???”',
        'wish': 'Cảm ơn Thầy Cô đã luôn là trọng tài công tâm hòa giải mọi mâu thuẫn cho cả lớp!',
        'stat1': ('File conflict', '500+ files'),
        'stat2': ('HEAD <<<<<<<', 'Bủa vây'),
        'stat3': ('Tình anh em', 'Rạn nứt'),
        'stat4': ('Thời gian gỡ', 'Đến sáng mai'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#ea580c" stroke-width="2" filter="url(#glow)"/>
            <polygon points="100,38 107,55 125,48 116,64 132,76 113,79 116,95 100,84 84,95 87,79 68,76 84,64 75,48 93,55" fill="#c2410c" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="100" y="62" font-family="sans-serif" font-size="8.5" font-weight="900" fill="#fff" text-anchor="middle">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
            <text x="100" y="72" font-family="sans-serif" font-size="8.5" font-weight="900" fill="#fff" text-anchor="middle">=======</text>
            <text x="100" y="82" font-family="sans-serif" font-size="8.5" font-weight="900" fill="#fff" text-anchor="middle">&gt;&gt;&gt;&gt;&gt;&gt;&gt;</text>
            <text x="100" y="103" font-family="'Segoe UI', monospace" font-size="7" font-weight="900" fill="#fdba74" text-anchor="middle">500 FILES CONFLICT</text>
        '''
    },
    {
        'id': 'c-missing-semicolon',
        'code': 'CG-BUG-03',
        'name': 'Thiếu Dấu Chấm Phẩy ;',
        'role': 'Trinh Thám Tìm Kiếm',
        'rarity': 'COMMON',
        'theme_color': '#e11d48',
        'sub_color': '#fb7185',
        'bg_grad': ('#21040a', '#360610', '#080a12'),
        'quote': '“Tìm cả buổi chiều, hóa ra thiếu mỗi một hạt cát ;”',
        'wish': 'Chúc thầy cô luôn có sự kiên nhẫn vô tận trước những lỗi ngây ngô này của chúng em!',
        'stat1': ('Thời gian debug', '4 tiếng'),
        'stat2': ('Vị trí lỗi', 'Dòng 142'),
        'stat3': ('Cảm xúc', 'Đập bàn phím'),
        'stat4': ('Bài học', 'Bật Linter'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#e11d48" stroke-width="2" filter="url(#glow)"/>
            <circle cx="96" cy="59" r="18" fill="#4c0519" stroke="#fb7185" stroke-width="2.5"/>
            <line x1="109" y1="72" x2="125" y2="88" stroke="#fb7185" stroke-width="4.5" stroke-linecap="round"/>
            <circle cx="96" cy="52" r="2.5" fill="#f43f5e" filter="url(#glow)"/>
            <path d="M97 60 C97 64 93 68 91 69" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round"/>
            <text x="100" y="103" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#fecdd3" text-anchor="middle">UNEXPECTED TOKEN ;</text>
        '''
    },
    {
        'id': 'c-null-pointer',
        'code': 'CG-BUG-04',
        'name': 'NullPointerException 💀',
        'role': 'Cơn Ác Mộng Java',
        'rarity': 'COMMON',
        'theme_color': '#991b1b',
        'sub_color': '#f87171',
        'bg_grad': ('#210505', '#330808', '#080a12'),
        'quote': '“Khi cuộc đời cho bạn null, hãy ném ra NullPointerException!”',
        'wish': 'Chúc cuộc sống của Thầy Cô luôn ngập tràn giá trị (not null) và hạnh phúc đong đầy!',
        'stat1': ('Đối tượng rỗng', 'Tất cả'),
        'stat2': ('Nguyên nhân', 'Chưa khởi tạo'),
        'stat3': ('Bất ngờ', '100% khi demo'),
        'stat4': ('Sát thương', 'Crash app tức thì'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#991b1b" stroke-width="2" filter="url(#glow)"/>
            <path d="M82 59 C82 45 118 45 118 59 C118 69 112 74 112 80 L88 80 C88 74 82 69 82 59 Z" fill="#450a0a" stroke="#f87171" stroke-width="2"/>
            <circle cx="91" cy="61" r="3.5" fill="#080a12"/>
            <circle cx="109" cy="61" r="3.5" fill="#080a12"/>
            <text x="100" y="52" font-family="'Segoe UI', monospace" font-size="7.5" font-weight="900" fill="#fca5a5" text-anchor="middle">null.pointer</text>
            <text x="100" y="99" font-family="'Segoe UI', monospace" font-size="8" font-weight="900" fill="#ef4444" text-anchor="middle">CRASHED AT LINE 0</text>
        '''
    },
    {
        'id': 'c-demo-die',
        'code': 'CG-BUG-05',
        'name': 'Code Chết Lúc Demo 😱',
        'role': 'Lời Nguyền Công Nghệ',
        'rarity': 'COMMON',
        'theme_color': '#c2410c',
        'sub_color': '#fb923c',
        'bg_grad': ('#210c03', '#331205', '#080a12'),
        'quote': '“Dạ thưa thầy, em thề 5 phút trước ở dưới kia nó còn mượt lắm ạ!”',
        'wish': 'Cảm ơn các thầy cô luôn mỉm cười độ lượng trước màn ngụy biện kinh điển này!',
        'stat1': ('Ở nhà test', 'Ngon lành 100%'),
        'stat2': ('Lên thuyết trình', 'Trắng bệch'),
        'stat3': ('Độ run tay', 'Cấp độ 9'),
        'stat4': ('Giải thích', 'Hồi nãy chạy mà'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#c2410c" stroke-width="2" filter="url(#glow)"/>
            <rect x="73" y="44" width="54" height="36" rx="3" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
            <text x="79" y="58" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fff">:(</text>
            <text x="79" y="68" font-family="'Segoe UI', monospace" font-size="5.5" fill="#e0f2fe">SYSTEM CRASH</text>
            <path d="M100 80 L100 90 M90 90 L110 90" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="100" y="103" font-family="'Segoe UI', monospace" font-size="7" font-weight="900" fill="#fdba74" text-anchor="middle">DEMO EFFECT DETECTED</text>
        '''
    },
    {
        'id': 'c-deadline-crush',
        'code': 'CG-BUG-06',
        'name': 'Deadline Đè Bẹp Dí ⚡',
        'role': 'Kẻ Săn Đuổi Coder',
        'rarity': 'COMMON',
        'theme_color': '#b91c1c',
        'sub_color': '#f87171',
        'bg_grad': ('#210505', '#330808', '#080a12'),
        'quote': '“Nước đến chân mới nhảy là tầm thường, nước đến cổ mới lặn!”',
        'wish': 'Kính chúc quý thầy cô luôn an nhàn, thảnh thơi, không bao giờ bị deadline dí như học trò!',
        'stat1': ('Thời gian còn', '00:03:15'),
        'stat2': ('Nhịp tim', '180 bpm'),
        'stat3': ('Nhập code', 'Bằng bản năng'),
        'stat4': ('Lời cầu nguyện', 'Mạng đừng lag'),
        'svg_art': '''
            <circle cx="100" cy="65" r="46" fill="url(#core_grad)" stroke="#b91c1c" stroke-width="2" filter="url(#glow)"/>
            <polygon points="82,44 118,44 100,66" fill="#7f1d1d" stroke="#f87171" stroke-width="1.5"/>
            <polygon points="100,72 118,94 82,94" fill="#7f1d1d" stroke="#f87171" stroke-width="1.5"/>
            <line x1="82" y1="44" x2="118" y2="44" stroke="#f87171" stroke-width="2.5"/>
            <line x1="82" y1="94" x2="118" y2="94" stroke="#f87171" stroke-width="2.5"/>
            <circle cx="100" cy="69" r="2.5" fill="#facc15" filter="url(#glow)"/>
            <text x="100" y="104" font-family="'Segoe UI', monospace" font-size="7" font-weight="900" fill="#fca5a5" text-anchor="middle">TIME: 23:59:59</text>
        '''
    }
]

# === 1. TẠO TẤT CẢ FILE AVATAR SVG (200x200) ===
for item in ITEMS_META:
    avatar_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <defs>
        <radialGradient id="core_grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="{item['bg_grad'][1]}"/>
            <stop offset="100%" stop-color="{item['bg_grad'][0]}"/>
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
    <rect width="200" height="200" rx="30" fill="{item['bg_grad'][2]}"/>
    <rect x="4" y="4" width="192" height="192" rx="26" fill="none" stroke="{item['theme_color']}" stroke-width="2.5" opacity="0.75"/>
    <g transform="translate(0, 35)">
        {item['svg_art']}
    </g>
</svg>'''
    avatar_path = os.path.join(avatars_dir, f"{item['id']}.svg")
    with open(avatar_path, 'w', encoding='utf-8') as f:
        f.write(avatar_svg)

# === 2. TẠO TẤT CẢ FILE THẺ BÀI CARD SVG TOÀN DIỆN (440x640) - CHỮ TO RÕ NÉT ===
for item in ITEMS_META:
    is_ssr = item['rarity'] == 'SSR'
    border_thick = 4 if is_ssr else 3

    # 1. PILL BADGE RỘNG RÃI & CHỮ 11.5px TO RÕ, ĐẢM BẢO KHÔNG BAO GIỜ TRÀN (Đệm lề >= 35px):
    pill_text = f"{item['rarity']} • {item['code']}"
    pill_width = min(202, max(136, len(pill_text) * 8.4 + 44))
    pill_x = 412 - pill_width
    pill_center = pill_x + (pill_width / 2)

    # 2. ROLE CAPSULE VỚI CHỮ 12.5px:
    role_text = item['role']
    role_width = min(360, max(210, len(role_text) * 8.2 + 42))
    role_x = 220 - (role_width / 2)

    # Thoát các ký tự XML an toàn tuyệt đối
    safe_name = xml_escape(item['name'])
    safe_role = xml_escape(item['role'])
    safe_code = xml_escape(item['code'])
    safe_s1_l = xml_escape(item['stat1'][0])
    safe_s1_v = xml_escape(item['stat1'][1])
    safe_s2_l = xml_escape(item['stat2'][0])
    safe_s2_v = xml_escape(item['stat2'][1])
    safe_s3_l = xml_escape(item['stat3'][0])
    safe_s3_v = xml_escape(item['stat3'][1])
    safe_s4_l = xml_escape(item['stat4'][0])
    safe_s4_v = xml_escape(item['stat4'][1])

    # 3. CÂU NÓI BẤT HỦ VỚI CHỮ 13px - 14px TO RÕ (TỐI ƯU WRAP 48 KÝ TỰ, KHÔNG BỊ CẮT CHỮ):
    quote_lines = [xml_escape(l) for l in wrap_svg_text(item['quote'], max_chars=48)]
    if len(quote_lines) == 1:
        quote_svg = f'<text x="220" y="384" font-family="\'Segoe UI\', Roboto, Georgia, serif" font-size="14" font-style="italic" font-weight="bold" fill="#f8fafc" text-anchor="middle">{quote_lines[0]}</text>'
    else:
        quote_svg = f'''<text x="220" y="375" font-family="'Segoe UI', Roboto, Georgia, serif" font-size="13" font-style="italic" font-weight="bold" fill="#f8fafc" text-anchor="middle">
            <tspan x="220" dy="0">{quote_lines[0]}</tspan>
            <tspan x="220" dy="19">{quote_lines[1]}</tspan>
        </text>'''

    # 4. LỜI CHÚC TRI ÂN 20/11 VỚI CHỮ 13.5px TO RÕ, ĐẬM NÉT, ĐỌC CỰC DỄ (WRAP 46 KÝ TỰ):
    wish_lines = [xml_escape(l) for l in wrap_svg_text(item['wish'], max_chars=46)]
    wish_tspans = []
    for i, line in enumerate(wish_lines):
        dy = "0" if i == 0 else "22"
        wish_tspans.append(f'<tspan x="46" dy="{dy}">{line}</tspan>')
    wish_content_svg = "".join(wish_tspans)

    # Tiêu đề to bản 20.5px - 22.5px
    title_font_size = "20.5" if len(item['name']) > 26 else "22.5"

    card_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 640" width="440" height="640">
    <defs>
        <linearGradient id="card_bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{item['bg_grad'][0]}"/>
            <stop offset="50%" stop-color="{item['bg_grad'][1]}"/>
            <stop offset="100%" stop-color="{item['bg_grad'][2]}"/>
        </linearGradient>
        <linearGradient id="theme_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{item['theme_color']}"/>
            <stop offset="100%" stop-color="{item['sub_color']}"/>
        </linearGradient>
        <radialGradient id="core_grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="{item['bg_grad'][1]}"/>
            <stop offset="100%" stop-color="{item['bg_grad'][0]}"/>
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <pattern id="grid_pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
    </defs>

    <!-- Nền thẻ & Khung chính -->
    <rect width="440" height="640" rx="26" fill="url(#card_bg)"/>
    <rect width="440" height="640" rx="26" fill="url(#grid_pattern)"/>
    <rect x="10" y="10" width="420" height="620" rx="22" fill="none" stroke="{item['theme_color']}" stroke-width="{border_thick}" filter="url(#glow)"/>
    <rect x="16" y="16" width="408" height="608" rx="18" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

    <!-- 1. Thanh tiêu đề trên cùng (Top Bar) -->
    <text x="28" y="42" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="{item['theme_color']}" letter-spacing="1.5">CODEGYM 20/11</text>
    
    <!-- Huy hiệu Rarity Pill Badge (Chữ 11.5px, căn giữa chuẩn, đệm lề 35px cực rộng rãi) -->
    <rect x="{pill_x:.1f}" y="22" width="{pill_width:.1f}" height="28" rx="14" fill="url(#theme_grad)"/>
    <text x="{pill_center:.1f}" y="40.5" font-family="'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="900" fill="{"#000000" if is_ssr else "#ffffff"}" text-anchor="middle">{pill_text}</text>

    <!-- 2. Khung Tên & Chức Danh (Chữ to 22.5px) -->
    <text x="220" y="74" font-family="'Segoe UI', Roboto, sans-serif" font-size="{title_font_size}" font-weight="900" fill="#ffffff" text-anchor="middle">{safe_name}</text>
    <rect x="{role_x:.1f}" y="84" width="{role_width:.1f}" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="{item['theme_color']}" stroke-width="1" stroke-opacity="0.4"/>
    <text x="220" y="102" font-family="'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="bold" fill="{item['sub_color']}" text-anchor="middle">{safe_role}</text>

    <!-- 3. Khung Đồ Họa Vector Trung Tâm (Art Viewport) -->
    <rect x="30" y="116" width="380" height="130" rx="14" fill="#060912" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <g transform="translate(120, 114)">
        {item['svg_art']}
    </g>

    <!-- 4. Khung 4 Chỉ Số Lưới 2x2 (Chữ 16px số to, nhãn 12px đậm, cực rõ) -->
    <g transform="translate(30, 254)">
        <!-- Ô Chỉ Số 1 -->
        <rect x="0" y="0" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="14" y="18" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">{safe_s1_l}</text>
        <text x="14" y="37" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="{item['theme_color']}">{safe_s1_v}</text>

        <!-- Ô Chỉ Số 2 -->
        <rect x="195" y="0" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="209" y="18" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">{safe_s2_l}</text>
        <text x="209" y="37" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="{item['theme_color']}">{safe_s2_v}</text>

        <!-- Ô Chỉ Số 3 -->
        <rect x="0" y="48" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="14" y="66" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">{safe_s3_l}</text>
        <text x="14" y="85" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="{item['theme_color']}">{safe_s3_v}</text>

        <!-- Ô Chỉ Số 4 -->
        <rect x="195" y="48" width="185" height="44" rx="9" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(255,255,255,0.08)"/>
        <text x="209" y="66" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">{safe_s4_l}</text>
        <text x="209" y="85" font-family="'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="{item['theme_color']}">{safe_s4_v}</text>
    </g>

    <!-- 5. Khung Câu Nói Bất Hủ (Chữ 13px - 14px to rõ) -->
    <rect x="30" y="354" width="380" height="52" rx="10" fill="rgba(10, 15, 26, 0.95)" stroke="rgba(255,255,255,0.08)"/>
    {quote_svg}

    <!-- 6. Khung Lời Chúc Tri Ân 20/11 (Chữ 13.5px đậm nét, màu trắng sáng tương phản cao) -->
    <rect x="30" y="414" width="380" height="174" rx="12" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1.5"/>
    <path d="M44 427 L50 433 L44 439" fill="none" stroke="#fbbf24" stroke-width="2"/>
    <text x="58" y="437" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#fbbf24" letter-spacing="1">💌 LỜI CHÚC TRI ÂN 20/11</text>
    <line x1="44" y1="447" x2="396" y2="447" stroke="rgba(245, 158, 11, 0.2)" stroke-width="1"/>

    <text x="46" y="472" font-family="'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="600" fill="#ffffff">
        {wish_content_svg}
    </text>

    <!-- 7. Footer Watermark & Serial -->
    <line x1="30" y1="598" x2="410" y2="598" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <text x="220" y="618" font-family="monospace" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle" letter-spacing="1.5">✦ HỘI SĂN THẺ MENTOR SSR • {safe_code} • CODEGYM 20/11 ✦</text>
</svg>'''
    card_path = os.path.join(cards_dir, f"{item['id']}.svg")
    temp_card_path = card_path + ".tmp"
    with open(temp_card_path, 'w', encoding='utf-8') as f:
        f.write(card_svg)
    os.replace(temp_card_path, card_path)

print(f"SUCCESS: Generated {len(ITEMS_META)} cards with LARGE, HIGH-LEGIBILITY typography!")
