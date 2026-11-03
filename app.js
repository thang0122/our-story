/*
 * OUR STORY – prototype boardgame
 * Vanilla JavaScript, no framework and no backend.
 * All game state is temporary in the current browser tab.
 */

const CARD_GROUPS = {
  location: { label: 'ĐỊA ĐIỂM', name: 'Địa điểm', accent: '#849db5', soft: '#eaf0f6', count: 6 },
  situation: { label: 'TÌNH HUỐNG', name: 'Tình huống', accent: '#d58a75', soft: '#fff0eb', count: 8 },
  need: { label: 'NHU CẦU', name: 'Nhu cầu', accent: '#7d9b80', soft: '#edf4ed', count: 8 },
  communication: { label: 'GIAO TIẾP', name: 'Giao tiếp', accent: '#7291ad', soft: '#eaf0f7', count: 8 },
  action: { label: 'HÀNH ĐỘNG', name: 'Hành động', accent: '#a18fbe', soft: '#f0edfa', count: 8 },
  rest: { label: 'NGHỈ NGƠI', name: 'Nghỉ ngơi', accent: '#c39a50', soft: '#f8f0df', count: 6 }
};

const CARDS = [
  // Địa điểm – chỉ tên địa điểm ở mặt trước.
  { id: 'loc-home', group: 'location', title: 'NHÀ', description: 'Bối cảnh quen thuộc để nói về sinh hoạt, sở thích và các hoạt động thường ngày.' },
  { id: 'loc-school', group: 'location', title: 'TRƯỜNG HỌC', description: 'Bối cảnh có thể gợi chuyện về lớp học, bạn bè, giờ học hoặc giờ ra chơi.' },
  { id: 'loc-market', group: 'location', title: 'SIÊU THỊ', description: 'Bối cảnh để khám phá lựa chọn, âm thanh, đông người hoặc việc tìm đồ vật.' },
  { id: 'loc-park', group: 'location', title: 'CÔNG VIÊN', description: 'Bối cảnh để chia sẻ hoạt động ngoài trời, vận động hoặc quan sát xung quanh.' },
  { id: 'loc-playground', group: 'location', title: 'SÂN CHƠI', description: 'Bối cảnh để lựa chọn trò chơi, lượt chơi và cách tham gia cùng người khác.' },
  { id: 'loc-relative', group: 'location', title: 'NHÀ NGƯỜI THÂN', description: 'Bối cảnh quen thuộc hoặc mới, có thể gợi chuyện về thăm hỏi và thay đổi môi trường.' },

  // Tình huống.
  { id: 'sit-crowded', group: 'situation', title: 'NƠI ĐÔNG NGƯỜI', description: 'Có nhiều người ở xung quanh. Trẻ có thể muốn tiếp tục, đổi chỗ hoặc nghỉ.' },
  { id: 'sit-noise', group: 'situation', title: 'TIẾNG ỒN LỚN', description: 'Một âm thanh lớn xuất hiện. Không giả lập âm thanh thật trong trò chơi.' },
  { id: 'sit-toy', group: 'situation', title: 'ĐỒ CHƠI BỊ RƠI', description: 'Một món đồ chơi rơi xuống đất. Có thể cùng quyết định nhặt, nhờ giúp hoặc đổi hoạt động.' },
  { id: 'sit-friend', group: 'situation', title: 'BẠN MUỐN CHƠI CÙNG', description: 'Một người khác muốn tham gia. Trẻ có thể đồng ý, từ chối hoặc chọn cách khác.' },
  { id: 'sit-turn', group: 'situation', title: 'ĐẾN LƯỢT CỦA CON', description: 'Đến lượt trẻ trong một hoạt động. Có thể chơi tiếp, chờ thêm hoặc bỏ lượt.' },
  { id: 'sit-change', group: 'situation', title: 'HOẠT ĐỘNG BỊ THAY ĐỔI', description: 'Kế hoạch hoặc hoạt động thay đổi. Có thể báo trước và đưa ra lựa chọn thay thế.' },
  { id: 'sit-lost', group: 'situation', title: 'KHÔNG TÌM THẤY ĐỒ VẬT', description: 'Món đồ đang tìm chưa được thấy. Có thể cùng tìm hoặc yêu cầu hỗ trợ.' },
  { id: 'sit-home', group: 'situation', title: 'ĐẾN GIỜ VỀ NHÀ', description: 'Một hoạt động sắp kết thúc. Có thể báo trước, chọn cách kết thúc hoặc xin thêm thời gian nếu phù hợp.' },

  // Nhu cầu.
  { id: 'need-rest', group: 'need', title: 'CON MUỐN NGHỈ', description: 'Thể hiện mong muốn tạm dừng hoạt động.' },
  { id: 'need-help', group: 'need', title: 'CON MUỐN GIÚP ĐỠ', description: 'Thể hiện mong muốn có người hỗ trợ.' },
  { id: 'need-continue', group: 'need', title: 'CON MUỐN TIẾP TỤC', description: 'Thể hiện mong muốn tiếp tục hoạt động đang diễn ra.' },
  { id: 'need-stop', group: 'need', title: 'CON MUỐN DỪNG LẠI', description: 'Thể hiện mong muốn dừng hoạt động hiện tại.' },
  { id: 'need-other-place', group: 'need', title: 'CON MUỐN ĐI NƠI KHÁC', description: 'Thể hiện mong muốn thay đổi vị trí hoặc môi trường.' },
  { id: 'need-together', group: 'need', title: 'CON MUỐN CHƠI CÙNG', description: 'Thể hiện mong muốn có người tham gia hoạt động.' },
  { id: 'need-alone', group: 'need', title: 'CON MUỐN Ở MỘT MÌNH', description: 'Thể hiện mong muốn có không gian riêng.' },
  { id: 'need-unknown', group: 'need', title: 'CON CHƯA BIẾT', description: 'Cho phép trẻ chưa có câu trả lời hoặc chưa muốn lựa chọn.' },

  // Giao tiếp.
  { id: 'com-speak', group: 'communication', title: 'NÓI', description: 'Dùng lời nói nếu đây là cách trẻ muốn và có thể sử dụng.' },
  { id: 'com-point', group: 'communication', title: 'CHỈ TAY', description: 'Chỉ vào vật, hình ảnh hoặc lựa chọn.' },
  { id: 'com-picture', group: 'communication', title: 'CHỌN HÌNH', description: 'Chọn một hình ảnh để thể hiện ý muốn.' },
  { id: 'com-card', group: 'communication', title: 'CHỌN THẺ', description: 'Đưa hoặc chỉ vào thẻ có nội dung phù hợp.' },
  { id: 'com-gesture', group: 'communication', title: 'DÙNG CỬ CHỈ', description: 'Dùng cử chỉ quen thuộc để thể hiện thông tin.' },
  { id: 'com-aac', group: 'communication', title: 'DÙNG THIẾT BỊ AAC', description: 'Sử dụng hệ thống hoặc thiết bị AAC trẻ đang quen dùng.' },
  { id: 'com-draw', group: 'communication', title: 'VIẾT / VẼ', description: 'Viết, vẽ hoặc tạo dấu hiệu trực quan để truyền đạt.' },
  { id: 'com-not-now', group: 'communication', title: 'CHƯA MUỐN TRẢ LỜI', description: 'Cho phép trẻ không phản hồi ở thời điểm này.' },

  // Hành động.
  { id: 'act-play', group: 'action', title: 'CÙNG CHƠI', description: 'Hai người cùng tham gia hoạt động mà trẻ lựa chọn.' },
  { id: 'act-break', group: 'action', title: 'NGHỈ MỘT CHÚT', description: 'Tạm dừng hoạt động và dành thời gian nghỉ.' },
  { id: 'act-quiet', group: 'action', title: 'TÌM NƠI YÊN TĨNH', description: 'Cùng tìm một không gian phù hợp hơn nếu trẻ muốn.' },
  { id: 'act-help', group: 'action', title: 'NHỜ GIÚP ĐỠ', description: 'Tìm người hoặc nguồn hỗ trợ phù hợp.' },
  { id: 'act-change', group: 'action', title: 'ĐỔI HOẠT ĐỘNG', description: 'Chuyển sang hoạt động khác theo lựa chọn của trẻ.' },
  { id: 'act-continue', group: 'action', title: 'TIẾP TỤC HÀNH TRÌNH', description: 'Tiếp tục khi cả hai sẵn sàng.' },
  { id: 'act-explore', group: 'action', title: 'CÙNG KHÁM PHÁ', description: 'Cùng quan sát hoặc thử một hoạt động mới nếu trẻ muốn.' },
  { id: 'act-home', group: 'action', title: 'VỀ NHÀ', description: 'Kết thúc hoạt động và chuyển về nhà theo cách phù hợp.' },

  // Nghỉ ngơi.
  { id: 'rest-rest', group: 'rest', title: 'NGHỈ NGƠI', description: 'Tạm dừng trò chơi; không cần giải thích lý do.' },
  { id: 'rest-pause', group: 'rest', title: 'TẠM DỪNG', description: 'Để trò chơi ở trạng thái chờ và chỉ tiếp tục khi sẵn sàng.' },
  { id: 'rest-no-play', group: 'rest', title: 'KHÔNG MUỐN CHƠI', description: 'Tôn trọng việc trẻ không muốn tham gia hoặc không muốn tiếp tục.' },
  { id: 'rest-noise', group: 'rest', title: 'GIẢM TIẾNG ỒN', description: 'Giảm âm thanh hoặc loại bỏ nguồn âm thanh gây khó chịu nếu có thể.' },
  { id: 'rest-quiet', group: 'rest', title: 'Ở NƠI YÊN TĨNH', description: 'Chuyển đến nơi yên tĩnh hơn nếu đó là điều trẻ mong muốn.' },
  { id: 'rest-finish', group: 'rest', title: 'KẾT THÚC TRÒ CHƠI', description: 'Kết thúc lượt chơi ngay khi trẻ hoặc người chơi muốn dừng.' }
];

const BOARD = [
  { n: 1, type: 'start', title: 'BẮT ĐẦU', short: 'Khởi hành', description: 'Hai người làm quen với bàn cờ, chọn quân cờ và thống nhất cách báo nghỉ hoặc dừng.', purpose: 'Tạo cảm giác dễ dự đoán và quyền chủ động tham gia.' },
  { n: 2, type: 'location', title: 'ĐỊA ĐIỂM', short: 'Chọn nơi', description: 'Chọn một thẻ địa điểm: Nhà, Trường học, Siêu thị, Công viên, Sân chơi hoặc Nhà người thân.', purpose: 'Tạo bối cảnh chung để cùng chú ý và chia sẻ sở thích.' },
  { n: 3, type: 'situation', title: 'TÌNH HUỐNG', short: 'Có chuyện xảy ra', description: 'Rút một thẻ tình huống hoặc để trẻ chọn tình huống muốn khám phá.', purpose: 'Mở ra cơ hội trao đổi về một sự việc quen thuộc.' },
  { n: 4, type: 'need', title: 'NHU CẦU', short: 'Con muốn gì?', description: 'Đặt các thẻ nhu cầu trong tầm nhìn và chờ trẻ thể hiện nếu muốn.', purpose: 'Tạo cơ hội thể hiện mong muốn, từ chối hoặc yêu cầu hỗ trợ.' },
  { n: 5, type: 'communication', title: 'GIAO TIẾP', short: 'Cách thể hiện', description: 'Trẻ có thể nói, chỉ tay, chọn hình, chọn thẻ, dùng cử chỉ, AAC hoặc chưa muốn trả lời.', purpose: 'Tôn trọng nhiều phương thức giao tiếp khác nhau.' },
  { n: 6, type: 'action', title: 'HÀNH ĐỘNG', short: 'Cùng chọn', description: 'Hai người xem các phương án hành động và cùng chọn bước tiếp theo.', purpose: 'Tạo cơ hội luân phiên, lựa chọn và phối hợp.' },
  { n: 7, type: 'rest', title: 'NGHỈ NGƠI', short: 'Điều chỉnh nhịp', description: 'Trẻ có thể chọn một thẻ nghỉ, nghỉ thật hoặc bỏ qua điểm dừng này.', purpose: 'Tôn trọng giới hạn và quyền điều chỉnh trải nghiệm.' },
  { n: 8, type: 'location', title: 'ĐỊA ĐIỂM', short: 'Chọn nơi', description: 'Chọn một địa điểm khác hoặc tiếp tục với bối cảnh đang chơi.', purpose: 'Tiếp tục xây dựng bối cảnh theo sở thích của trẻ.' },
  { n: 9, type: 'situation', title: 'TÌNH HUỐNG', short: 'Khám phá', description: 'Rút hoặc chọn một tình huống khác; không bắt buộc phải xử lý nếu trẻ không muốn.', purpose: 'Thực hành trao đổi trong một ngữ cảnh mới.' },
  { n: 10, type: 'need', title: 'NHU CẦU', short: 'Thể hiện', description: 'Trẻ có thể chọn nhu cầu mới, giữ lựa chọn cũ hoặc không chọn.', purpose: 'Nhận biết rằng nhu cầu có thể thay đổi theo tình huống.' },
  { n: 11, type: 'communication', title: 'GIAO TIẾP', short: 'Lắng nghe', description: 'Phụ huynh quan sát phương thức trẻ sử dụng và phản hồi phù hợp, không yêu cầu lặp lại.', purpose: 'Khuyến khích giao tiếp qua lại và phản hồi có tính đáp ứng.' },
  { n: 12, type: 'action', title: 'HÀNH ĐỘNG', short: 'Quyết định', description: 'Cùng chọn một cách tiếp tục, đổi hoạt động, nhờ giúp đỡ hoặc nghỉ.', purpose: 'Tập phối hợp để lựa chọn bước kế tiếp.' },
  { n: 13, type: 'location', title: 'ĐỊA ĐIỂM', short: 'Chọn nơi', description: 'Chọn nơi tiếp theo hoặc để trẻ tự chọn một địa điểm quen thuộc.', purpose: 'Tạo cơ hội chủ động và chia sẻ sở thích.' },
  { n: 14, type: 'situation', title: 'TÌNH HUỐNG', short: 'Cùng khám phá', description: 'Cùng khám phá một tình huống; phụ huynh có thể làm mẫu cách lựa chọn mà không ép trẻ làm theo.', purpose: 'Tạo cơ hội quan sát và trao đổi về phương án khác nhau.' },
  { n: 15, type: 'rest', title: 'NGHỈ NGƠI', short: 'Kiểm tra nhịp độ', description: 'Dừng lại để hỏi hoặc quan sát xem trẻ muốn tiếp tục, nghỉ hay kết thúc.', purpose: 'Giúp người lớn chú ý đến sự thoải mái của trẻ.' },
  { n: 16, type: 'location', title: 'ĐỊA ĐIỂM', short: 'Chọn nơi', description: 'Chọn một địa điểm cho phần cuối hành trình.', purpose: 'Cùng quyết định hướng đi và hoạt động cuối.' },
  { n: 17, type: 'need', title: 'NHU CẦU', short: 'Điều con muốn', description: 'Trẻ có thể thể hiện điều mình muốn ở thời điểm hiện tại hoặc chọn “Con chưa biết”.', purpose: 'Tôn trọng lựa chọn hiện tại, kể cả khi trẻ chưa xác định được nhu cầu.' },
  { n: 18, type: 'action', title: 'HÀNH ĐỘNG', short: 'Cùng thực hiện', description: 'Chọn hành động cuối cùng: tiếp tục, khám phá, nghỉ, đổi hoạt động hoặc về nhà.', purpose: 'Khép lại một tình huống bằng quyết định có sự tham gia của cả hai.' },
  { n: 19, type: 'location', title: 'ĐỊA ĐIỂM', short: 'Nơi mình chọn', description: 'Chọn hoặc nhắc lại địa điểm mà trẻ thích nhất trong hành trình.', purpose: 'Ghi nhận sở thích, không yêu cầu trẻ phải giải thích.' },
  { n: 20, type: 'finish', title: 'OUR STORY', short: 'Câu chuyện của chúng ta', description: 'Nếu cả hai muốn, cùng nhìn lại những thẻ đã chọn và ghép thành một câu chuyện ngắn.', purpose: 'Ghi nhận trải nghiệm chung và điều phụ huynh hiểu thêm về trẻ.' }
];

const PAGE_IDS = ['tong-quan', 'bo-the', 'ban-co', 'choi-thu', 'hanh-trinh', 'luat-choi'];
const CATEGORY_COLORS = Object.fromEntries(Object.entries(CARD_GROUPS).map(([key, value]) => [key, value.accent]));

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2300);
}

// Page navigation
function navigate(pageId, filter = null) {
  if (!PAGE_IDS.includes(pageId)) return;
  document.querySelectorAll('.page').forEach(page => {
    const active = page.id === `page-${pageId}`;
    page.classList.toggle('active', active);
    page.hidden = !active;
  });
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === pageId));
  document.getElementById('mainNav').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  if (pageId === 'bo-the' && filter) setCardFilter(filter);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.page)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go, button.dataset.filter || null)));

document.getElementById('menuToggle').addEventListener('click', () => {
  const nav = document.getElementById('mainNav');
  const isOpen = nav.classList.toggle('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded', String(isOpen));
});

// Card library: filtering, searching, and accessible card rendering.
let activeFilter = 'all';
function renderCards() {
  const query = document.getElementById('cardSearch').value.trim().toLocaleLowerCase('vi');
  const filtered = CARDS.filter(card => {
    const matchesGroup = activeFilter === 'all' || card.group === activeFilter;
    const text = `${card.title} ${card.description} ${CARD_GROUPS[card.group].name}`.toLocaleLowerCase('vi');
    return matchesGroup && text.includes(query);
  });
  const grid = document.getElementById('cardGrid');
  grid.innerHTML = filtered.map(card => {
    const group = CARD_GROUPS[card.group];
    return `<article class="content-card" style="--card-accent:${group.accent}">
      <div class="card-topline"></div><div class="card-content">
        <div class="card-meta"><span>${escapeHTML(group.label)}</span><span class="card-code">${escapeHTML(card.id.toUpperCase())}</span></div>
        <div class="card-face">${escapeHTML(card.title)}</div>
        <div class="card-description">${escapeHTML(card.description)}</div>
      </div></article>`;
  }).join('');
  document.getElementById('librarySummary').textContent = `Đang hiển thị ${filtered.length} / ${CARDS.length} lá thẻ`;
  document.getElementById('cardEmpty').hidden = filtered.length !== 0;
}
function setCardFilter(filter) {
  activeFilter = CARD_GROUPS[filter] || filter === 'all' ? filter : 'all';
  document.querySelectorAll('.filter-chip').forEach(button => button.classList.toggle('active', button.dataset.filter === activeFilter));
  renderCards();
}
document.getElementById('cardFilters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (button) setCardFilter(button.dataset.filter);
});
document.getElementById('cardSearch').addEventListener('input', renderCards);
document.addEventListener('keydown', event => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    navigate('bo-the');
    document.getElementById('cardSearch').focus();
  }
  if (event.key === 'Escape' && document.activeElement.id === 'cardSearch') {
    document.getElementById('cardSearch').value = '';
    renderCards();
    document.activeElement.blur();
  }
});
renderCards();

// Board view: click any square to inspect its role.
function boardCellClass(cell) {
  if (cell.type === 'start') return 'start-cell';
  if (cell.type === 'finish') return 'finish-cell';
  return '';
}
function renderBoard() {
  const track = document.getElementById('boardTrack');
  track.innerHTML = BOARD.map(cell => {
    const accent = cell.type === 'location' ? '#849db5' : cell.type === 'situation' ? '#d58a75' : cell.type === 'need' || cell.type === 'communication' ? '#7d9b80' : cell.type === 'action' ? '#a18fbe' : cell.type === 'rest' ? '#c39a50' : '#eab45f';
    return `<button class="board-cell ${boardCellClass(cell)}" data-board-cell="${cell.n}" style="--cell-accent:${accent}" aria-label="Ô ${cell.n}: ${escapeHTML(cell.title)}">
      <span class="cell-num">Ô ${String(cell.n).padStart(2, '0')}</span><strong>${escapeHTML(cell.title)}</strong><small>${escapeHTML(cell.short)}</small>
    </button>`;
  }).join('');
}
function showBoardDetail(number) {
  const cell = BOARD.find(item => item.n === Number(number));
  if (!cell) return;
  document.querySelectorAll('.board-cell').forEach(button => button.classList.toggle('selected', Number(button.dataset.boardCell) === cell.n));
  const panel = document.getElementById('boardDetail');
  panel.innerHTML = `<div class="detail-kicker">Ô ${String(cell.n).padStart(2, '0')} / 20 · ${escapeHTML(cell.short.toUpperCase())}</div>
    <h2>${escapeHTML(cell.title)}</h2><p>${escapeHTML(cell.description)}</p><div class="detail-action"><strong>Mục đích:</strong> ${escapeHTML(cell.purpose)}</div>`;
}
document.getElementById('boardTrack').addEventListener('click', event => {
  const button = event.target.closest('[data-board-cell]');
  if (button) showBoardDetail(button.dataset.boardCell);
});
renderBoard();

// Playable prototype state.
const playStage = document.getElementById('playStage');
const game = {
  started: false,
  index: 0,
  selected: false,
  selectedCard: null,
  childName: 'Bạn nhỏ',
  story: { location: [], situation: [], need: [], communication: [], action: [], rest: [] },
  lastRandomSituation: null,
  endedEarly: false
};

function resetGameState() {
  game.started = false;
  game.index = 0;
  game.selected = false;
  game.selectedCard = null;
  game.story = { location: [], situation: [], need: [], communication: [], action: [], rest: [] };
  game.lastRandomSituation = null;
  game.endedEarly = false;
  updateProgress();
}

function updateProgress() {
  const current = game.started ? game.index + 1 : 0;
  const percent = game.started ? Math.round((current / BOARD.length) * 100) : 0;
  document.getElementById('progressText').textContent = game.started ? `Đang ở ô ${current}: ${BOARD[game.index].title}` : 'Chưa bắt đầu';
  document.getElementById('progressPercent').textContent = `${percent}%`;
  document.getElementById('progressBar').style.width = `${percent}%`;
  document.getElementById('miniTrack').innerHTML = BOARD.map((cell, idx) => {
    let cls = 'mini-cell';
    if (game.started && idx < game.index) cls += ' done';
    if (game.started && idx === game.index) cls += ' current';
    return `<span class="${cls}" title="Ô ${cell.n}: ${escapeHTML(cell.title)}">${String(cell.n).padStart(2, '0')}</span>`;
  }).join('');
}

function getCards(group) { return CARDS.filter(card => card.group === group); }
function getRandomCard(group, avoidId = null) {
  const choices = getCards(group).filter(card => card.id !== avoidId);
  const pool = choices.length ? choices : getCards(group);
  return pool[Math.floor(Math.random() * pool.length)];
}
function storyAdd(group, card) {
  if (!game.story[group].includes(card.title)) game.story[group].push(card.title);
}
function cardButton(card, options = {}) {
  const group = CARD_GROUPS[card.group];
  const chosen = options.chosen ? 'chosen' : '';
  return `<button class="choice-card ${chosen}" data-play-action="select-card" data-card-id="${escapeHTML(card.id)}">
    ${escapeHTML(card.title)}<small>${escapeHTML(options.showDescription ? card.description : group.name)}</small>
  </button>`;
}
function renderStageControls({ nextLabel = 'Đi tới ô tiếp theo', showNext = false, extra = '' } = {}) {
  return `<div class="stage-controls">${showNext ? `<button class="btn btn-primary" data-play-action="next">${escapeHTML(nextLabel)} →</button>` : ''}
    <button class="btn btn-quiet" data-play-action="skip">Bỏ qua ô này</button>
    <button class="btn btn-warm" data-play-action="end">Dừng hành trình</button>${extra}</div>`;
}
function renderWelcomeStage() {
  playStage.innerHTML = `<div class="stage-welcome"><div class="stage-symbol">OUR<br>STORY</div><div class="eyebrow">SẴN SÀNG CHƯA?</div><h2>Bắt đầu bằng một lựa chọn nhỏ.</h2><p>Hai người chơi cùng đi qua các điểm dừng. Trẻ được chọn cách tham gia; phụ huynh đồng hành và điều chỉnh nhịp độ.</p><div class="start-options"><label for="childLabel">Tên gọi người chơi nhỏ tuổi <span>(không bắt buộc)</span></label><input id="childLabel" maxlength="24" placeholder="Ví dụ: Bạn nhỏ" value="Bạn nhỏ"></div><button class="btn btn-primary btn-wide" data-play-action="start">Bắt đầu hành trình →</button></div>`;
}
function startGame() {
  resetGameState();
  game.started = true;
  const nameInput = document.getElementById('childLabel');
  game.childName = (nameInput?.value || 'Bạn nhỏ').trim().slice(0, 24) || 'Bạn nhỏ';
  updateProgress();
  renderCurrentStep();
}

function renderCurrentStep() {
  if (!game.started) return renderWelcomeStage();
  const cell = BOARD[game.index];
  game.selected = false;
  game.selectedCard = null;
  updateProgress();

  if (cell.type === 'finish') return renderFinish(false);
  if (cell.type === 'start') {
    playStage.innerHTML = `<div class="stage-panel"><div class="stage-top"><span class="stage-badge">ĐIỂM KHỞI HÀNH</span><span class="stage-step">Ô 01 / 20</span></div><h2>Chào mừng đến với OUR STORY.</h2><p>${escapeHTML(game.childName)} và phụ huynh cùng chọn nhịp độ chơi. Có thể đi theo bàn cờ, bỏ qua bất kỳ ô nào hoặc dừng sớm.</p><div class="stage-prompt"><div class="prompt-label">CÙNG THỐNG NHẤT</div><div class="prompt-card">SẴN SÀNG · NGHỈ · DỪNG</div><p>Trẻ có thể dùng lời nói, cử chỉ, hình ảnh hoặc tín hiệu quen thuộc để báo lựa chọn.</p></div>${renderStageControls({ showNext: true })}</div>`;
    return;
  }

  const groupForType = { location: 'location', situation: 'situation', need: 'need', communication: 'communication', action: 'action', rest: 'rest' };
  const group = groupForType[cell.type];
  const groupMeta = CARD_GROUPS[group];
  const intro = `<div class="stage-top"><span class="stage-badge">${escapeHTML(groupMeta.label)}</span><span class="stage-step">Ô ${String(cell.n).padStart(2, '0')} / 20</span></div><h2>${escapeHTML(cell.title)}</h2><p>${escapeHTML(cell.description)}</p>`;

  if (cell.type === 'situation') {
    const card = getRandomCard('situation', game.lastRandomSituation);
    game.selectedCard = card;
    game.lastRandomSituation = card.id;
    playStage.innerHTML = `<div class="stage-panel">${intro}<div class="stage-prompt" style="background:${groupMeta.soft}"><div class="prompt-label">LÁ THẺ ĐƯỢC RÚT</div><div class="prompt-card">${escapeHTML(card.title)}</div><p>${escapeHTML(card.description)}</p></div><p class="stage-hint">Hai người có thể đọc, nhìn thẻ hoặc đổi sang tình huống khác. Không bắt buộc phải trả lời hay xử lý tình huống này.</p><div class="stage-controls"><button class="btn btn-primary" data-play-action="keep-situation">Giữ lá này →</button><button class="btn btn-quiet" data-play-action="redraw">Rút lá khác</button><button class="btn btn-warm" data-play-action="skip">Bỏ qua ô này</button><button class="btn btn-warm" data-play-action="end">Dừng hành trình</button></div></div>`;
    return;
  }

  const available = getCards(group);
  const selectedPrompt = group === 'location' ? 'Chọn một địa điểm hoặc để trẻ tự nêu địa điểm khác.' :
    group === 'need' ? 'Đặt các lựa chọn trước mặt trẻ. Chọn là tự nguyện; không chọn cũng được.' :
    group === 'communication' ? 'Đây là các cách thể hiện có thể dùng. Không cần trẻ phải chọn đúng một cách.' :
    group === 'action' ? 'Hai người có thể cùng xem phương án. Lựa chọn của trẻ cần được tôn trọng.' :
    'Có thể chọn thẻ nghỉ, nghỉ thật hoặc kết thúc trò chơi ngay bây giờ.';
  playStage.innerHTML = `<div class="stage-panel">${intro}<div class="stage-prompt" style="background:${groupMeta.soft}"><div class="prompt-label">${escapeHTML(groupMeta.label)} · ${available.length} LỰA CHỌN</div><p>${escapeHTML(selectedPrompt)}</p></div><div class="choice-grid">${available.map(card => cardButton(card)).join('')}</div><div class="stage-hint" id="selectionHint">Chưa có lựa chọn nào được ghi nhận. Có thể bỏ qua ô này.</div><div class="stage-controls" id="dynamicControls"><button class="btn btn-quiet" data-play-action="skip">Bỏ qua ô này</button><button class="btn btn-warm" data-play-action="end">Dừng hành trình</button></div></div>`;
}

function selectCard(cardId) {
  const card = CARDS.find(item => item.id === cardId);
  if (!card) return;
  const currentType = BOARD[game.index].type;
  if (card.group !== currentType) return;
  game.selected = true;
  game.selectedCard = card;
  storyAdd(card.group, card);
  document.querySelectorAll('.choice-card').forEach(button => button.classList.toggle('chosen', button.dataset.cardId === card.id));
  const hint = document.getElementById('selectionHint');
  if (hint) hint.textContent = `Đã ghi nhận lựa chọn: ${card.title}. Đây là ghi nhận của lượt chơi, không phải điểm đánh giá.`;
  const controls = document.getElementById('dynamicControls');
  if (controls) controls.innerHTML = `<button class="btn btn-primary" data-play-action="next">Đã chọn · Đi tiếp →</button><button class="btn btn-quiet" data-play-action="skip">Bỏ qua ô này</button><button class="btn btn-warm" data-play-action="end">Dừng hành trình</button>`;
  showToast(`Đã ghi nhận: ${card.title}`);
}

function nextStep() {
  if (!game.started) return;
  if (game.index >= BOARD.length - 1) return renderFinish(false);
  game.index += 1;
  renderCurrentStep();
}
function skipStep() {
  showToast('Đã bỏ qua ô này. Không có hình phạt hay điểm trừ.');
  nextStep();
}
function finishEarly() {
  game.endedEarly = true;
  renderFinish(true);
}
function formatStoryList(key, fallback) {
  return game.story[key].length ? game.story[key].join(' · ') : fallback;
}
function renderFinish(early) {
  game.started = true;
  game.endedEarly = early;
  document.getElementById('progressText').textContent = early ? 'Đã dừng hành trình' : 'Đã đến điểm cuối';
  document.getElementById('progressPercent').textContent = early ? `${Math.round(((game.index + 1) / BOARD.length) * 100)}%` : '100%';
  document.getElementById('progressBar').style.width = early ? `${Math.round(((game.index + 1) / BOARD.length) * 100)}%` : '100%';
  document.getElementById('miniTrack').innerHTML = BOARD.map((cell, idx) => `<span class="mini-cell ${idx <= game.index ? 'done' : ''}" title="Ô ${cell.n}">${String(cell.n).padStart(2, '0')}</span>`).join('');
  const place = formatStoryList('location', 'Chưa chọn địa điểm');
  const situation = formatStoryList('situation', 'Chưa chọn tình huống');
  const need = formatStoryList('need', 'Chưa ghi nhận nhu cầu');
  const communication = formatStoryList('communication', 'Chưa chọn cách giao tiếp');
  const action = formatStoryList('action', 'Chưa chọn hành động');
  const rest = formatStoryList('rest', 'Chưa ghi nhận thẻ nghỉ');
  const sentence = `${game.childName} và phụ huynh cùng khám phá ${place.toLocaleLowerCase('vi')}. Trong hành trình, hai người gặp ${situation.toLocaleLowerCase('vi')}. ${game.childName} thể hiện hoặc có thể đã chọn: ${need.toLocaleLowerCase('vi')}; cách giao tiếp được ghi nhận: ${communication.toLocaleLowerCase('vi')}. Hai người cùng xem xét: ${action.toLocaleLowerCase('vi')}. Quyền nghỉ và dừng luôn được giữ lại (${rest.toLocaleLowerCase('vi')}).`;
  playStage.innerHTML = `<div class="stage-panel"><div class="stage-finish"><div class="eyebrow">${early ? 'HÀNH TRÌNH ĐÃ TẠM DỪNG' : 'ĐÃ ĐẾN ĐIỂM CUỐI'}</div><h2>Câu chuyện của chúng ta.</h2><p>${early ? 'Dừng lại cũng là một lựa chọn hợp lệ. Những nội dung đã chọn vẫn được giữ trong bản tóm tắt này.' : 'Hai người đã cùng đi qua prototype. Đích đến không phải điểm số, mà là những điều đã có cơ hội chia sẻ.'}</p>
    <div class="story-lines">
      <div class="story-line"><strong>ĐỊA ĐIỂM</strong>${escapeHTML(place)}</div>
      <div class="story-line"><strong>TÌNH HUỐNG</strong>${escapeHTML(situation)}</div>
      <div class="story-line"><strong>NHU CẦU</strong>${escapeHTML(need)}</div>
      <div class="story-line"><strong>CÁCH GIAO TIẾP</strong>${escapeHTML(communication)}</div>
      <div class="story-line"><strong>HÀNH ĐỘNG</strong>${escapeHTML(action)}</div>
      <div class="story-line"><strong>NGHỈ NGƠI</strong>${escapeHTML(rest)}</div>
    </div><blockquote>${escapeHTML(sentence)}</blockquote>
    <p class="stage-hint">Bản tóm tắt chỉ phản ánh những thẻ đã được chọn trong mô phỏng. Nó không đánh giá khả năng hay tiến bộ của trẻ.</p>
    <div class="stage-controls"><button class="btn btn-primary" data-play-action="restart">Chơi lại từ đầu ↻</button><button class="btn btn-quiet" data-play-action="cards">Xem lại bộ thẻ</button></div></div></div>`;
  showToast(early ? 'Đã kết thúc hành trình theo lựa chọn.' : 'Đã hoàn thành hành trình mô phỏng.');
}

playStage.addEventListener('click', event => {
  const control = event.target.closest('[data-play-action]');
  if (!control) return;
  const action = control.dataset.playAction;
  if (action === 'start') startGame();
  else if (action === 'next') nextStep();
  else if (action === 'skip') skipStep();
  else if (action === 'end') finishEarly();
  else if (action === 'select-card') selectCard(control.dataset.cardId);
  else if (action === 'keep-situation') {
    if (game.selectedCard?.group === 'situation') storyAdd('situation', game.selectedCard);
    game.selected = true;
    playStage.querySelector('.stage-controls').innerHTML = `<button class="btn btn-primary" data-play-action="next">Đã giữ lá này · Đi tiếp →</button><button class="btn btn-quiet" data-play-action="skip">Bỏ qua ô này</button><button class="btn btn-warm" data-play-action="end">Dừng hành trình</button>`;
    showToast(`Đã ghi nhận: ${game.selectedCard.title}`);
  }
  else if (action === 'redraw') renderCurrentStep();
  else if (action === 'restart') {
    resetGameState();
    renderWelcomeStage();
  }
  else if (action === 'cards') navigate('bo-the');
});

renderWelcomeStage();
updateProgress();
