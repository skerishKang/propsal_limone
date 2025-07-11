// 슬라이드 네비게이션 공통 함수
const SlideNav = {
    // 슬라이드 정보 (index.html = 표지, contents.html = 목차)
    slides: [
        { id: 0, name: 'title', file: 'index.html' },
        { id: 1, name: 'contents', file: 'contents.html' },
        { id: 2, name: 'overview', file: 'slide2.html' },
        { id: 3, name: 'curriculum', file: 'slide3.html' },
        { id: 4, name: 'stage1', file: 'slide4.html' },
        { id: 5, name: 'stage2', file: 'slide5.html' },
        { id: 6, name: 'stage3', file: 'slide6.html' },
        { id: 7, name: 'stage4', file: 'slide7.html' },
        { id: 8, name: 'stage5', file: 'slide8.html' },
        { id: 9, name: 'effect', file: 'slide9.html' }
    ],
    
    // 프레젠터 노트 (각 슬라이드별)
    notes: {
        0: "프레젠테이션을 시작합니다. 5단계 체계적 AI 도입 프로그램을 소개하겠습니다.",
        1: "목차를 통해 전체 구성을 확인할 수 있습니다.",
        2: "사업 개요: 중소기업의 단계별 AI 도입을 통한 경쟁력 강화가 목적입니다.",
        3: "전체 커리큘럼 구성을 설명합니다.",
        4: "1단계: AI 도구 완전 정복 과정입니다.",
        5: "2단계: AI 자동화 마스터 과정입니다.",
        6: "3단계: AI+자동화 융합 심화 과정입니다.",
        7: "4단계: AI 전문 조직 구축 과정입니다.",
        8: "5단계: 업계 AI 선도 기업 도약 과정입니다.",
        9: "기대 효과를 구체적으로 설명합니다."
    },
    
    // 현재 슬라이드 번호 가져오기
    getCurrentSlide() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        const slide = this.slides.find(s => s.file === fileName);
        return slide ? slide.id : 0;
    },
    
    // 특정 슬라이드로 이동
    goToSlide(slideNumber) {
        try {
            if (slideNumber >= 0 && slideNumber < this.slides.length) {
                const targetFile = this.slides[slideNumber].file;
                if (targetFile) {
                    window.location.href = targetFile;
                } else {
                    console.error('대상 파일이 정의되지 않음:', slideNumber);
                    // 홈으로 돌아가기
                    window.location.href = 'index.html';
                }
            } else {
                console.warn('슬라이드 번호 범위 초과:', slideNumber);
            }
        } catch (error) {
            console.error('네비게이션 오류:', error);
            // 홈으로 돌아가기
            window.location.href = 'index.html';
        }
    },
    
    // 다음 슬라이드로 이동
    nextSlide() {
        const current = this.getCurrentSlide();
        // 목차에서는 slide2로, 마지막에서는 이동 없음
        if (current === 1) {
            this.goToSlide(2); // 목차에서 첫 번째 슬라이드로
        } else if (current < this.slides.length - 1) {
            this.goToSlide(current + 1);
        }
    },
    
    // 이전 슬라이드로 이동
    previousSlide() {
        const current = this.getCurrentSlide();
        // slide2에서는 목차로, 목차에서는 표지로
        if (current === 2) {
            this.goToSlide(1); // 첫 번째 슬라이드에서 목차로
        } else if (current > 0) {
            this.goToSlide(current - 1);
        }
    },
    
    // 네비게이션 UI 생성 (slide2.html부터 slide10.html만)
    createNavigation() {
        const current = this.getCurrentSlide();
        const total = this.slides.length;
        
        // 표지 페이지는 기존 HTML 네비게이션 유지
        if (current === 0) {
            // 표지 페이지에는 이미 HTML로 네비게이션이 있으므로 건드리지 않음
            return;
        }
        
        // 기존 네비게이션 요소들 제거 (중복 방지) - 표지 제외
        const existingNav = document.querySelector('.slide-nav');
        const existingIndicators = document.querySelector('.slide-indicators');
        
        if (existingNav) existingNav.remove();
        if (existingIndicators) existingIndicators.remove();
        
        // 목차 페이지(contents.html)는 별도 네비게이션
        if (current === 1) {
            this.createContentsNavigation();
            return;
        }
        
        // 슬라이드 번호 계산 (slide2 = 1/9, slide3 = 2/9, ...)
        const slideNumber = current - 1;
        const totalSlides = 9;
        
        // 인디케이터 생성 (slide2~slide9용)
        const indicators = document.createElement('div');
        indicators.className = 'slide-indicators';
        
        for (let i = 2; i < this.slides.length; i++) {
            const indicator = document.createElement('a');
            indicator.className = 'indicator';
            indicator.href = this.slides[i].file;
            if (i === current) {
                indicator.classList.add('active');
            }
            indicators.appendChild(indicator);
        }
        
        // 네비게이션 버튼 생성
        const nav = document.createElement('div');
        nav.className = 'slide-nav';
        
        const prevBtn = document.createElement('a');
        prevBtn.className = 'nav-btn';
        prevBtn.textContent = '◀ 이전';
        prevBtn.href = current > 2 ? this.slides[current - 1].file : 'contents.html';
        if (current === 2) {
            prevBtn.textContent = '◀ 목차';
        }
        
        const nextBtn = document.createElement('a');
        nextBtn.className = 'nav-btn';
        nextBtn.textContent = '다음 ▶';
        nextBtn.href = current < total - 1 ? this.slides[current + 1].file : '#';
        if (current === total - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.onclick = (e) => e.preventDefault();
        }
        
        
        const homeBtn = document.createElement('a');
        homeBtn.className = 'nav-btn';
        homeBtn.textContent = '표지';
        homeBtn.href = 'index.html';
        
        // 프레젠터 노트 버튼 추가
        const notesBtn = document.createElement('button');
        notesBtn.className = 'nav-btn';
        notesBtn.textContent = '노트';
        notesBtn.onclick = () => this.toggleNotes();
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        nav.appendChild(homeBtn);
        nav.appendChild(notesBtn);
        
        // DOM에 추가
        document.body.appendChild(indicators);
        document.body.appendChild(nav);
    },
    
    // 전체화면 토글
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('전체화면 모드 진입 실패:', err);
            });
        } else {
            document.exitFullscreen();
        }
    },
    
    // 키보드 이벤트 설정
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case 'Space':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0); // 표지로
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1); // 마지막 슬라이드로
                    break;
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });
    },
    
    // 마우스 휠 이벤트 설정
    setupWheel() {
        let wheelThrottle = false;
        document.addEventListener('wheel', (e) => {
            if (wheelThrottle) return;
            wheelThrottle = true;
            
            setTimeout(() => {
                wheelThrottle = false;
            }, 500);
            
            if (e.deltaY > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        });
    },
    
    // 터치 이벤트 설정 (모바일)
    setupTouch() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide(); // 왼쪽으로 스와이프 = 다음 슬라이드
                } else {
                    this.previousSlide(); // 오른쪽으로 스와이프 = 이전 슬라이드
                }
            }
        };
    },
    
    // 슬라이드별 동적 클래스 추가 시스템
    applySlideSpecificStyles() {
        const slideElement = document.querySelector('.slide');
        if (!slideElement) return;
        
        const current = this.getCurrentSlide();
        const slideName = this.slides[current]?.name;
        
        // 기존 슬라이드 클래스 제거
        slideElement.classList.remove('slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7', 'slide8', 'slide9', 'slide10');
        slideElement.classList.remove('content-heavy', 'content-light', 'content-medium', 'contents-slide');
        
        // 슬라이드별 특화 클래스 추가
        switch(slideName) {
            case 'contents': // 목차 페이지
                slideElement.classList.add('contents-slide');
                this.optimizeContentSpacing('contents');
                break;
            case 'overview': // slide2 - 사업 개요
                slideElement.classList.add('slide2', 'content-heavy');
                this.optimizeContentSpacing('heavy');
                break;
            case 'curriculum': // slide3 - 교육과정 구성
                slideElement.classList.add('slide3', 'content-heavy');
                this.optimizeContentSpacing('heavy');
                break;
            case 'stage1': // slide4
            case 'stage2': // slide5
            case 'stage3': // slide6
            case 'stage4': // slide7
            case 'stage5': // slide8
                slideElement.classList.add(`slide${current}`, 'content-medium');
                this.optimizeContentSpacing('medium');
                break;
            case 'effect': // slide9
            case 'operation': // slide10
                slideElement.classList.add(`slide${current}`, 'content-medium');
                this.optimizeContentSpacing('medium');
                break;
        }
        
        // 화면 높이에 따른 컴팩트 모드 적용
        this.applyCompactModeIfNeeded();
    },
    
    // 콘텐츠 간격 최적화
    optimizeContentSpacing(contentType) {
        const contentElement = document.querySelector('.slide-content');
        if (!contentElement) return;
        
        switch(contentType) {
            case 'contents':
                contentElement.style.gap = '16px';
                contentElement.style.padding = '20px 35px';
                contentElement.style.justifyContent = 'flex-start';
                break;
            case 'heavy':
                contentElement.style.gap = '12px';
                contentElement.style.padding = '20px 30px';
                break;
            case 'medium':
                contentElement.style.gap = '18px';
                contentElement.style.padding = '25px 35px';
                break;
            case 'light':
                contentElement.style.gap = '25px';
                contentElement.style.padding = '35px 40px';
                contentElement.style.justifyContent = 'center';
                break;
        }
    },
    
    // 화면 크기에 따른 컴팩트 모드 적용
    applyCompactModeIfNeeded() {
        const slideElement = document.querySelector('.slide');
        if (!slideElement) return;
        
        const viewportHeight = window.innerHeight;
        
        if (viewportHeight < 800) {
            slideElement.classList.add('compact-mode');
        } else {
            slideElement.classList.remove('compact-mode');
        }
    },
    
    // 콘텐츠 높이 자동 조절
    autoAdjustContentHeight() {
        const slideElement = document.querySelector('.slide');
        const contentElement = document.querySelector('.slide-content');
        
        if (!slideElement || !contentElement) return;
        
        // 콘텐츠 실제 높이 측정
        const headerHeight = document.querySelector('.slide-header')?.offsetHeight || 0;
        const availableHeight = window.innerHeight * 0.9; // 90vh
        const maxContentHeight = availableHeight - headerHeight - 40; // 여백 고려
        
        // 콘텐츠가 넘치는지 확인
        if (contentElement.scrollHeight > maxContentHeight) {
            slideElement.style.maxHeight = '95vh';
            this.optimizeContentSpacing('heavy');
        } else if (contentElement.scrollHeight < maxContentHeight * 0.7) {
            // 콘텐츠가 부족하면 여백 채우기
            contentElement.style.justifyContent = 'space-between';
        }
    },
    setupTimer() {
        this.presentationStartTime = Date.now();
        
        setInterval(() => {
            const elapsed = Date.now() - this.presentationStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            const current = this.getCurrentSlide();
            
            console.log(`발표 시간: ${timeStr}, 현재 슬라이드: ${current}/${this.slides.length - 1}`);
        }, 10000);
    },
    
    // 초기화
    init() {
        // 이미 초기화되었다면 중복 방지
        if (this.initialized) return;
        this.initialized = true;
        
        // DOM 로드 후 실행
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createNavigation();
                this.setupKeyboard();
                this.setupWheel();
                this.setupTouch();
                this.setupTimer();
                this.applySlideSpecificStyles();
                this.autoAdjustContentHeight();
                
                // 윈도우 리사이즈 이벤트
                window.addEventListener('resize', () => {
                    this.applyCompactModeIfNeeded();
                    this.autoAdjustContentHeight();
                });
            });
        } else {
            this.createNavigation();
            this.setupKeyboard();
            this.setupWheel();
            this.setupTouch();
            this.setupTimer();
            this.applySlideSpecificStyles();
            this.autoAdjustContentHeight();
            
            // 윈도우 리사이즈 이벤트
            window.addEventListener('resize', () => {
                this.applyCompactModeIfNeeded();
                this.autoAdjustContentHeight();
            });
        }
    },
    
    // 프레젠터 노트 토글
    toggleNotes() {
        const current = this.getCurrentSlide();
        const note = this.notes[current] || "이 슬라이드에 대한 노트가 없습니다.";
        
        // 기존 노트 패널 제거
        const existingPanel = document.querySelector('.presenter-notes');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }
        
        // 노트 패널 생성
        const notesPanel = document.createElement('div');
        notesPanel.className = 'presenter-notes';
        notesPanel.innerHTML = `
            <div class="notes-header">
                <span>프레젠터 노트 (슬라이드 ${current})</span>
                <button class="notes-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="notes-content">${note}</div>
        `;
        
        document.body.appendChild(notesPanel);
    },
    
    // 목차 페이지 전용 네비게이션 생성
    createContentsNavigation() {
        // 네비게이션 버튼 생성
        const nav = document.createElement('nav');
        nav.className = 'slide-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', '슬라이드 네비게이션');
        
        const homeBtn = document.createElement('a');
        homeBtn.className = 'nav-btn';
        homeBtn.textContent = '◀ 표지';
        homeBtn.href = 'index.html';
        homeBtn.setAttribute('aria-label', '표지로 이동');
        
        const nextBtn = document.createElement('a');
        nextBtn.className = 'nav-btn';
        nextBtn.textContent = '시작 ▶';
        nextBtn.href = 'slide2.html';
        nextBtn.setAttribute('aria-label', '프레젠테이션 시작');
        
        
        const homeBtn2 = document.createElement('a');
        homeBtn2.className = 'nav-btn';
        homeBtn2.textContent = '표지';
        homeBtn2.href = 'index.html';
        homeBtn2.setAttribute('aria-label', '표지로 이동');
        
        // 프레젠터 노트 버튼 추가
        const notesBtn = document.createElement('button');
        notesBtn.className = 'nav-btn';
        notesBtn.textContent = '노트';
        notesBtn.onclick = () => this.toggleNotes();
        notesBtn.setAttribute('aria-label', '프레젠터 노트 토글');
        
        nav.appendChild(homeBtn);
        nav.appendChild(nextBtn);
        nav.appendChild(homeBtn2);
        nav.appendChild(notesBtn);
        
        // DOM에 추가 (슬라이드 번호 없음)
        document.body.appendChild(nav);
    }
};

// 자동 초기화
SlideNav.init();

// 폰트 로딩 처리
if (document.fonts) {
    document.fonts.ready.then(() => {
        console.log('폰트 로딩 완료');
        document.body.classList.add('fonts-loaded');
    }).catch(() => {
        console.warn('폰트 로딩 실패 - fallback 적용');
        document.body.classList.add('fonts-fallback');
    });
} else {
    // document.fonts 미지원 브라우저 대응
    document.body.classList.add('fonts-fallback');
}