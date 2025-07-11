// 슬라이드 네비게이션 공통 함수
const SlideNav = {
    // 슬라이드 정보 (/ = 표지, /contents = 목차)
    slides: [
        { id: 0, name: 'title', file: './' },
        { id: 1, name: 'contents', file: './contents.html' },
        { id: 2, name: 'overview', file: './slide2.html' },
        { id: 3, name: 'curriculum', file: './slide3.html' },
        { id: 4, name: 'stage1', file: './slide4.html' },
        { id: 5, name: 'stage2', file: './slide5.html' },
        { id: 6, name: 'stage3', file: './slide6.html' },
        { id: 7, name: 'stage4', file: './slide7.html' },
        { id: 8, name: 'stage5', file: './slide8.html' },
        { id: 9, name: 'effect', file: './slide9.html' }
    ],
    
    // 슬라이드 요약 (각 슬라이드별 핵심 포인트)
    summaries: {
        0: "📌 핵심 포인트\n• 5단계 체계적 AI 도입 프로그램\n• 4주부터 1년까지 단계별 성장\n• 중소기업 맞춤형 교육과정\n\n🎯 다음: 전체 목차 확인",
        1: "📌 핵심 포인트\n• 표지 + 8개 주요 슬라이드 구성\n• AI 도구 4종류 (대화형/자동화/콘텐츠/개발)\n• 1단계 기초부터 5단계 선도까지\n\n🎯 다음: 사업 개요 상세 설명",
        2: "📌 핵심 포인트\n• 목적: 중소기업 AI 경쟁력 강화\n• 대상: CEO 및 핵심 직원 우선\n• 특징: 651개 검증된 AI 도구 활용\n\n🎯 다음: 5단계 교육과정 구성",
        3: "📌 핵심 포인트\n• 5단계 독립 교육과정 체계\n• 각 단계별 완결성 보장\n• 4주 → 8주 → 12주 → 6개월 → 1년\n\n🎯 다음: 1단계 상세 커리큘럼",
        4: "📌 핵심 포인트\n• 4주 과정으로 AI 도구 완전 정복\n• 업무 시간 30% 단축 효과\n• ChatGPT, Claude, Gemini 등 활용\n\n🎯 다음: 2단계 자동화 과정",
        5: "📌 핵심 포인트\n• 8주 과정으로 업무 자동화 50% 달성\n• Zapier/Make 기반 시스템 구축\n• AI API 연동 지능형 자동화\n\n🎯 다음: 3단계 융합 심화",
        6: "📌 핵심 포인트\n• 12주 과정으로 AI+자동화 융합\n• 업무 효율성 70% 이상 향상\n• n8n 고급 플랫폼 + AI 에이전트\n\n🎯 다음: 4단계 전문 시스템",
        7: "📌 핵심 포인트\n• 6개월 과정으로 전문 시스템 구축\n• 멀티모달 AI + 노코드 플랫폼\n• 실제 비즈니스 시스템 개발\n\n🎯 다음: 5단계 선도 기업",
        8: "📌 핵심 포인트\n• 1년 과정으로 업계 선도 기업 도약\n• AI 데이터 분석 전문가 수준\n• 맞춤형 AI 솔루션 개발 역량\n\n🎯 다음: 기대 효과 및 성과",
        9: "📌 핵심 포인트\n• ROI 3:1, 투자 회수 기간 6개월\n• 비용 절감 40%, 매출 증대 25%\n• 정책 목표 완벽 부합 (일자리/디지털전환)\n\n🎉 발표 완료!"
    },
    
    // 현재 슬라이드 번호 가져오기
    getCurrentSlide() {
        const path = window.location.pathname;
        
        // Netlify 경로 처리
        if (path === '/' || path === '/index' || path.includes('index')) {
            return 0; // 표지
        } else if (path === '/contents' || path.includes('contents')) {
            return 1; // 목차
        } else if (path.includes('slide2')) {
            return 2;
        } else if (path.includes('slide3')) {
            return 3;
        } else if (path.includes('slide4')) {
            return 4;
        } else if (path.includes('slide5')) {
            return 5;
        } else if (path.includes('slide6')) {
            return 6;
        } else if (path.includes('slide7')) {
            return 7;
        } else if (path.includes('slide8')) {
            return 8;
        } else if (path.includes('slide9')) {
            return 9;
        }
        
        return 0; // 기본값
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
                    window.location.href = './';
                }
            } else {
                console.warn('슬라이드 번호 범위 초과:', slideNumber);
            }
        } catch (error) {
            console.error('네비게이션 오류:', error);
            // 홈으로 돌아가기
            window.location.href = './';
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
        
        // 목차 페이지(/contents)는 별도 네비게이션
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
        prevBtn.href = current > 2 ? this.slides[current - 1].file : './contents';
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
        homeBtn.href = './';
        
        // 슬라이드 요약 버튼 추가
        const summaryBtn = document.createElement('button');
        summaryBtn.className = 'nav-btn';
        summaryBtn.textContent = '📋 요약';
        summaryBtn.onclick = () => this.toggleSummary();
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        nav.appendChild(homeBtn);
        nav.appendChild(summaryBtn);
        
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
    
    // 슬라이드 요약 토글
    toggleSummary() {
        const current = this.getCurrentSlide();
        const summary = this.summaries[current] || "이 슬라이드에 대한 요약이 없습니다.";
        
        // 기존 요약 패널 제거
        const existingPanel = document.querySelector('.slide-summary');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }
        
        // 요약 패널 생성
        const summaryPanel = document.createElement('div');
        summaryPanel.className = 'slide-summary';
        summaryPanel.innerHTML = `
            <div class="summary-header">
                <span>📋 슬라이드 요약 (${current + 1}/10)</span>
                <button class="summary-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="summary-content">${summary.replace(/\n/g, '<br>')}</div>
        `;
        
        document.body.appendChild(summaryPanel);
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
        homeBtn.href = './';  // Netlify 호환
        homeBtn.setAttribute('aria-label', '표지로 이동');
        
        const nextBtn = document.createElement('a');
        nextBtn.className = 'nav-btn';
        nextBtn.textContent = '시작 ▶';
        nextBtn.href = './slide2';  // Netlify 호환
        nextBtn.setAttribute('aria-label', '프레젠테이션 시작');
        
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'nav-btn';
        fullscreenBtn.textContent = '🖥️ 전체화면';
        fullscreenBtn.onclick = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        };
        fullscreenBtn.setAttribute('aria-label', '전체화면 토글');
        
        // 슬라이드 요약 버튼 추가
        const summaryBtn = document.createElement('button');
        summaryBtn.className = 'nav-btn';
        summaryBtn.textContent = '📋 요약';
        summaryBtn.onclick = () => this.toggleSummary();
        summaryBtn.setAttribute('aria-label', '슬라이드 요약 보기');
        
        nav.appendChild(homeBtn);
        nav.appendChild(nextBtn);
        nav.appendChild(fullscreenBtn);
        nav.appendChild(summaryBtn);
        
        // DOM에 추가
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