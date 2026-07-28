/* =========================
   Device
========================= */
const Device = (function () {
    const isMobile = "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch);

    function setClass() {
        const $html = $("html");

        $html.removeClass("device-mo device-pc");
        $html.addClass(isMobile ? "device-mo" : "device-pc");
    }

    function getIsMobile() {
        return isMobile;
    }

    function init() {
        setClass();
    }

    return {
        init,
        isMobile: getIsMobile,
    };
})();

/* =========================
   Lenis
   - 스크롤 부드럽게: 부딪히는게 많다면 주석처리 하셔도 됩니다.
========================= */
// s:260728
// if (typeof Lenis !== "undefined") {
//     const lenis = new Lenis({
//         lerp: 0.06,
//         smoothWheel: true,
//         smoothTouch: false,
//     });

//     window.lenisScroll = lenis;

//     function raf(time) {
//         lenis.raf(time);
//         requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
// }
// e:260728

/* =========================
   Scroll Util
========================= */
const ScrollUtil = (function () {
    const $win = $(window);

    function getLenis() {
        if (window.lenisScroll) {
            return window.lenisScroll;
        }

        return null;
    }

    function scrollTopReset(duration = 0.8) {
        const lenis = getLenis();

        if (duration <= 0) {
            if (lenis && typeof lenis.scrollTo === "function") {
                lenis.scrollTo(0, {
                    immediate: true,
                });
            } else {
                $(window).scrollTop(0);
            }

            return;
        }

        if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(0, {
                duration,
            });
        } else {
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: 0,
                    },
                    duration * 1000,
                );
        }
    }

    function getScrollTop() {
        const lenis = getLenis();

        if (lenis && typeof lenis.getScrollTop === "function") {
            return lenis.getScrollTop();
        }

        if (lenis && typeof lenis.scroll === "number") {
            return lenis.scroll;
        }

        return $win.scrollTop();
    }

    return {
        getLenis,
        scrollTopReset,
        getScrollTop,
    };
})();

/* =========================
   Non Scroll
========================= */
const NonScroll = (function () {
    let nonScrollFlag = false;
    let scrollHeight = 0;
    let $frozenTarget = $();

    function set(flag, top, $target) {
        const lenis = ScrollUtil.getLenis();

        if (flag) {
            if (nonScrollFlag) return;

            nonScrollFlag = true;

            // 현재 위치 저장
            scrollHeight = ScrollUtil.getScrollTop();

            if (lenis && typeof lenis.stop === "function") {
                lenis.stop();
            }

            $frozenTarget = $target && $target.length ? $target : $("#wrap");

            $("html, body").addClass("no-scroll");

            $frozenTarget.addClass("is-frozen").css({
                "margin-top": -scrollHeight + "px",
            });

            return;
        }

        if (!nonScrollFlag) return;

        const restoreTop = top !== undefined ? top : scrollHeight;

        nonScrollFlag = false;
        if (lenis && typeof lenis.start === "function") {
            lenis.start();
        }

        $("html, body").removeClass("no-scroll").removeAttr("style");

        if ($frozenTarget.length) {
            $frozenTarget.removeClass("is-frozen").css({
                "margin-top": 0,
            });
        }

        $frozenTarget = $();

        scrollHeight = restoreTop;
        $("html, body").scrollTop(scrollHeight);
    }

    function enable($target) {
        set(true, undefined, $target);
    }

    function disable(top) {
        set(false, top);
    }

    function isLocked() {
        return nonScrollFlag;
    }

    return {
        set,
        enable,
        disable,
        isLocked,
    };
})();

/* =========================
   Breakpoint Handler
========================= */
function createBreakpointHandler(options = {}) {
    const $win = $(window);

    const BREAKPOINT = options.breakpoint ?? 1024;
    const EVENT_NAMESPACE = options.namespace || ".breakpointHandler";
    const RESIZE_DELAY = options.delay ?? 120;

    const onReset = options.onReset;
    const onOver = options.onOver;
    const onUnder = options.onUnder;
    const onChange = options.onChange;

    let resizeTimer = null;
    let orientationExecuted = false;

    // true = breakpoint 이하 / false = breakpoint 초과
    let isUnder = $win.width() <= BREAKPOINT;

    function run(force = false) {
        const nextIsUnder = $win.width() <= BREAKPOINT;

        if (!force && isUnder === nextIsUnder) return;

        isUnder = nextIsUnder;

        if (typeof onReset === "function") {
            onReset(isUnder);
        }

        if (isUnder) {
            if (typeof onUnder === "function") {
                onUnder(isUnder);
            }
        } else {
            if (typeof onOver === "function") {
                onOver(isUnder);
            }
        }

        if (typeof onChange === "function") {
            onChange(isUnder);
        }
    }

    function bindEvents() {
        $win.off(EVENT_NAMESPACE);

        if (Device.isMobile()) {
            $win.on(`orientationchange${EVENT_NAMESPACE}`, function () {
                if (orientationExecuted) return;

                orientationExecuted = true;
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function () {
                    run();
                    orientationExecuted = false;
                }, RESIZE_DELAY);
            });
        } else {
            $win.on(`resize${EVENT_NAMESPACE}`, function () {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function () {
                    run();
                }, RESIZE_DELAY);
            });
        }
    }

    function init(runOnInit = false) {
        bindEvents();

        if (runOnInit) {
            run(true);
        }
    }

    function destroy() {
        $win.off(EVENT_NAMESPACE);
        clearTimeout(resizeTimer);

        resizeTimer = null;
        orientationExecuted = false;
    }

    function update(force = false) {
        run(force);
    }

    function getState() {
        return {
            breakpoint: BREAKPOINT,
            isUnder,
            isOver: !isUnder,
        };
    }

    return {
        init,
        destroy,
        update,
        getState,
    };
}

/* =========================
   Header
========================= */
const Header = (function () {
    const $win = $(window);

    const ACTIVE_CLASS = "header--open";
    const SEARCH_OPEN_CLASS = "header--search-open";
    const ACTIVE_PANEL_CLASS = "is-active";

    const FOCUSABLE_SELECTOR = ["a[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'].join(",");

    let $wrap = $();
    let $header = $();
    let $headerBox = $();
    let $menuButton = $();
    let $megaMenu = $();

    // Mobile menu
    let $mobileMenu = $();
    let $mobilePages = $();

    // 모바일 메인(1뎁스) 스크롤 위치
    let mobileMainScrollTop = 0;

    // LNB
    let $lnb = $();
    let $lnbMenu = $();
    let $lnbButton = $();
    let $lnbPanel = $();

    // Search
    let $searchButton = $();
    let $searchPanel = $();
    let $searchCloseButton = $();
    let $searchForm = $();
    let $searchInput = $();
    let $searchSuggest = $();
    let $searchSuggestDefault = $();
    let $searchAutocomplete = $();
    let $searchAutocompleteList = $();
    let $searchAutocompleteEmpty = $();
    let $searchRecentList = $();
    let $searchRecentEmpty = $();
    let $searchRecentClear = $();

    const SEARCH_SUGGEST_OPEN_CLASS = "is-open";
    const SEARCH_SUGGEST_ACTIVE_CLASS = "is-active";
    const SEARCH_RECENT_STORAGE_KEY = "headerRecentKeywords";
    const SEARCH_RECENT_MAX_COUNT = 10;

    let preventSearchSuggestOpen = false;

    const autocompleteKeywords = [
        "AI",
        "AI 서비스",
        "AI 에이전트",
        "AX",
        "ChatGPT",
        "ESG",
        "FabriX",
        "Samsung Cloud Platform",
        "기업용 생성형 AI",
        "디지털 전환",
        "물류 자동화",
        "브리티 코파일럿",
        "브리티 오토메이션",
        "생성형 AI",
        "인공지능",
        "첼로스퀘어",
        "클라우드",
        "클라우드 전환",
        "하이브리드 클라우드",
        "팩토리 솔루션",
    ];

    /* =========================
       Common
    ========================= */
    function setExpandedState($button, isOpen) {
        $button.attr("aria-expanded", String(isOpen));
    }

    function setPanelState($panel, isOpen, options = {}) {
        const { useHidden = false } = options;

        if (!$panel.length) return;

        const properties = {
            inert: !isOpen,
        };

        if (useHidden) {
            properties.hidden = !isOpen;
        }

        $panel.prop(properties).attr("aria-hidden", String(!isOpen)).toggleClass(ACTIVE_PANEL_CLASS, isOpen);
    }

    function setHeaderControlState($button, isOpen, labels) {
        const { open, close } = labels;

        $button.toggleClass(ACTIVE_PANEL_CLASS, isOpen).attr({
            "aria-expanded": String(isOpen),
            "aria-label": isOpen ? close : open,
        });
    }

    function getFocusableElements($scope) {
        return $scope
            .find(FOCUSABLE_SELECTOR)
            .filter(":visible")
            .filter(function () {
                const $element = $(this);

                if ($element.closest("[inert]").length) return false;
                if ($element.closest("[hidden]").length) return false;
                if ($element.closest('[aria-hidden="true"]').length) return false;

                return true;
            });
    }

    function focusFirstItem($panel) {
        const $first = getFocusableElements($panel).first();

        if (!$first.length) return;

        $first.trigger("focus");
    }

    function focusMainContent() {
        const $mainContent = $("#mainContent");

        if (!$mainContent.length) return;

        const $firstFocusable = getFocusableElements($mainContent).first();

        if ($firstFocusable.length) {
            $firstFocusable.trigger("focus");
            return;
        }

        const hasTabindex = $mainContent.is("[tabindex]");

        if (!hasTabindex) {
            $mainContent.attr("tabindex", "-1");
        }

        $mainContent.trigger("focus");

        if (!hasTabindex) {
            $mainContent.one("blur.headerMainContent", function () {
                $(this).removeAttr("tabindex");
            });
        }
    }

    /* =========================
       전체 메뉴
    ========================= */
    function open() {
        if ($header.hasClass(ACTIVE_CLASS)) return;

        closeLnb();
        closeSearch();

        $header.addClass(ACTIVE_CLASS);

        setHeaderControlState($menuButton, true, {
            open: "전체 메뉴 열기",
            close: "전체 메뉴 닫기",
        });

        setPanelState($megaMenu, true);

        NonScroll.enable($wrap);
    }

    function close(options = {}) {
        const { returnFocus = false } = options;

        if (!$header.hasClass(ACTIVE_CLASS)) return;

        $header.removeClass(ACTIVE_CLASS);

        setHeaderControlState($menuButton, false, {
            open: "전체 메뉴 열기",
            close: "전체 메뉴 닫기",
        });

        resetDepth();

        // 메뉴를 완전히 닫으면 다음 오픈 시 메인 최상단에서 시작
        mobileMainScrollTop = 0;

        resetMobileMenu({
            focus: false,
            restoreScroll: false,
        });

        setPanelState($megaMenu, false);

        NonScroll.disable();

        if (returnFocus) {
            $menuButton.trigger("focus");
        }
    }

    function toggle() {
        if ($header.hasClass(ACTIVE_CLASS)) {
            close({
                returnFocus: false,
            });
        } else {
            open();
        }

        return false;
    }

    /* =========================
       Mobile menu
    ========================= */
    function getMobilePage(pageName) {
        if (!pageName) return $();

        return $mobilePages.filter(`[data-menu-page="${pageName}"]`).first();
    }

    function hideMobilePage($page) {
        if (!$page.length) return;

        setPanelState($page, false);
    }

    function showMobilePage(pageName, options = {}) {
        const { focus = true, restoreScroll = true } = options;
        const $targetPage = getMobilePage(pageName);

        if (!$targetPage.length) return;

        const $currentPage = $mobilePages.filter(`.${ACTIVE_PANEL_CLASS}`).first();

        // 메인(1뎁스)에서 다른 페이지로 이동하기 직전에
        // 실제 스크롤 영역인 mega-menu의 위치 저장
        if ($currentPage.attr("data-menu-page") === "main") {
            mobileMainScrollTop = $megaMenu.scrollTop();
        }

        $mobilePages.each(function () {
            hideMobilePage($(this));
        });

        setPanelState($targetPage, true);

        const targetScrollTop = pageName === "main" && restoreScroll ? mobileMainScrollTop : 0;

        // 페이지가 바뀌면 하위 페이지는 최상단,
        // 메인으로 돌아오면 저장한 위치로 복원
        $megaMenu.scrollTop(targetScrollTop);

        if (focus) {
            const $focusTarget = $targetPage.find("[data-menu-back], .mobile-menu__section-button, .mobile-menu__link").filter(":visible").first();

            if ($focusTarget.length) {
                const focusTarget = $focusTarget[0];

                try {
                    focusTarget.focus({
                        preventScroll: true,
                    });
                } catch (error) {
                    $focusTarget.trigger("focus");
                }
            }
        }

        // 포커스 이동이나 absolute 패널 전환으로 위치가 바뀌는 경우를 방지
        $megaMenu.scrollTop(targetScrollTop);
    }

    function setMobileSection($section, isOpen) {
        const $button = $section.find("> .mobile-menu__section-button");
        const panelId = $button.attr("aria-controls");
        const $panel = panelId ? $section.find(`#${panelId}`) : $();

        $section.toggleClass("is-open", isOpen);

        setExpandedState($button, isOpen);

        if ($panel.length) {
            $panel.prop("inert", !isOpen).attr("aria-hidden", String(!isOpen));
        }
    }

    function resetMobileMenu(options = {}) {
        const { focus = false, restoreScroll = true } = options;

        if (!$mobileMenu.length || !$mobilePages.length) return;

        showMobilePage("main", {
            focus,
            restoreScroll,
        });
    }

    function bindMobileSectionAccordion() {
        $mobileMenu
            .find(".mobile-menu__section-button")
            .off("click.mobileMenu")
            .on("click.mobileMenu", function (e) {
                e.preventDefault();

                const $button = $(this);
                const $section = $button.closest(".mobile-menu__section");
                const isOpen = $button.attr("aria-expanded") === "true";

                setMobileSection($section, !isOpen);
            });
    }

    function bindMobilePageMove() {
        $mobileMenu
            .find("[data-menu-target]")
            .off("click.mobileMenu")
            .on("click.mobileMenu", function (e) {
                const targetPage = $(this).attr("data-menu-target");

                if (!getMobilePage(targetPage).length) return;

                e.preventDefault();

                showMobilePage(targetPage);
            });
    }

    function bindMobileBack() {
        $mobileMenu
            .find("[data-menu-back]")
            .off("click.mobileMenu")
            .on("click.mobileMenu", function (e) {
                e.preventDefault();

                const $currentPage = $(this).closest(".mobile-menu__page");
                const parentPage = $currentPage.attr("data-parent-page") || "main";

                showMobilePage(parentPage);
            });
    }

    function bindMobileHome() {
        $mobileMenu
            .find("[data-menu-home]")
            .off("click.mobileMenu")
            .on("click.mobileMenu", function (e) {
                e.preventDefault();

                resetMobileMenu({
                    focus: true,
                });
            });
    }

    function bindMobileMenu() {
        if (!$mobileMenu.length) return;

        bindMobileSectionAccordion();
        bindMobilePageMove();
        bindMobileBack();
        bindMobileHome();
    }

    /* =========================
       LNB
    ========================= */
    function openLnb() {
        if (!$lnbButton.length || !$lnbPanel.length) return;

        if ($header.hasClass(ACTIVE_CLASS)) {
            close({
                returnFocus: false,
            });
        }

        closeSearch();

        $lnbMenu.addClass(ACTIVE_PANEL_CLASS);

        setExpandedState($lnbButton, true);
        setPanelState($lnbPanel, true, {
            useHidden: true,
        });
    }

    function closeLnb(options = {}) {
        const { returnFocus = false } = options;

        if (!$lnbButton.length || !$lnbPanel.length) return;

        $lnbMenu.removeClass(ACTIVE_PANEL_CLASS);

        setExpandedState($lnbButton, false);
        setPanelState($lnbPanel, false, {
            useHidden: true,
        });

        if (returnFocus) {
            $lnbButton.trigger("focus");
        }
    }

    function toggleLnb() {
        const isOpen = $lnbButton.attr("aria-expanded") === "true";

        if (isOpen) {
            closeLnb();
            return;
        }

        openLnb();
    }

    /* =========================
       Search
    ========================= */
    function escapeSearchHtml(value) {
        return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function escapeSearchRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function getRecentKeywords() {
        try {
            const keywords = JSON.parse(localStorage.getItem(SEARCH_RECENT_STORAGE_KEY) || "[]");

            return Array.isArray(keywords) ? keywords : [];
        } catch (error) {
            return [];
        }
    }

    function setRecentKeywords(keywords) {
        try {
            localStorage.setItem(SEARCH_RECENT_STORAGE_KEY, JSON.stringify(keywords));
        } catch (error) {
            // localStorage를 사용할 수 없는 환경에서는 저장하지 않음
        }
    }

    function addRecentKeyword(keyword) {
        const value = String(keyword || "").trim();

        if (!value) return;

        const keywords = getRecentKeywords().filter(function (item) {
            return String(item).toLowerCase() !== value.toLowerCase();
        });

        keywords.unshift(value);

        setRecentKeywords(keywords.slice(0, SEARCH_RECENT_MAX_COUNT));
    }

    function removeRecentKeyword(keyword) {
        const value = String(keyword || "").trim();

        const keywords = getRecentKeywords().filter(function (item) {
            return String(item).toLowerCase() !== value.toLowerCase();
        });

        setRecentKeywords(keywords);
        renderRecentKeywords();
    }

    function clearRecentKeywords() {
        try {
            localStorage.removeItem(SEARCH_RECENT_STORAGE_KEY);
        } catch (error) {
            // localStorage를 사용할 수 없는 환경에서는 무시
        }

        renderRecentKeywords();
    }

    function renderRecentKeywords() {
        if (!$searchRecentList.length) return;

        const keywords = getRecentKeywords();

        $searchRecentList.empty();

        if (!keywords.length) {
            $searchRecentEmpty.addClass("is-visible");
            $searchRecentClear.prop("disabled", true);
            return;
        }

        $searchRecentEmpty.removeClass("is-visible");
        $searchRecentClear.prop("disabled", false);

        const html = keywords
            .map(function (keyword) {
                const safeKeyword = escapeSearchHtml(keyword);

                return `
                    <li class="header-search__recent-item">
                        <button
                            type="button"
                            class="header-search__recent-link"
                            data-keyword="${safeKeyword}"
                        >
                            ${safeKeyword}
                        </button>

                        <button
                            type="button"
                            class="header-search__recent-delete"
                            data-keyword="${safeKeyword}"
                            aria-label="${safeKeyword} 최근검색어 삭제"
                        ></button>
                    </li>
                `;
            })
            .join("");

        $searchRecentList.html(html);
    }

    function highlightAutocompleteKeyword(keyword, searchValue) {
        const safeKeyword = escapeSearchHtml(keyword);
        const safeValue = escapeSearchRegExp(escapeSearchHtml(searchValue));

        if (!safeValue) return safeKeyword;

        return safeKeyword.replace(new RegExp(`(${safeValue})`, "gi"), '<span class="header-search__autocomplete-word">$1</span>');
    }

    function renderAutocomplete(value) {
        if (!$searchAutocompleteList.length) return;

        const keyword = String(value || "")
            .trim()
            .toLowerCase();

        $searchAutocompleteList.empty();
        $searchAutocompleteEmpty.removeClass("is-visible");

        if (!keyword) return;

        const matchedKeywords = autocompleteKeywords
            .filter(function (item) {
                return item.toLowerCase().includes(keyword);
            })
            .slice(0, 10);

        if (!matchedKeywords.length) {
            $searchAutocompleteEmpty.addClass("is-visible");
            return;
        }

        const html = matchedKeywords
            .map(function (item, index) {
                const safeItem = escapeSearchHtml(item);

                return `
                    <li
                        class="header-search__autocomplete-item"
                        id="headerSearchOption${index + 1}"
                        role="option"
                    >
                        <button
                            type="button"
                            class="header-search__autocomplete-button"
                            data-keyword="${safeItem}"
                        >
                            ${highlightAutocompleteKeyword(item, value)}
                        </button>
                    </li>
                `;
            })
            .join("");

        $searchAutocompleteList.html(html);
    }

    function showSearchDefault() {
        renderRecentKeywords();

        $searchSuggestDefault.addClass(SEARCH_SUGGEST_ACTIVE_CLASS);
        $searchAutocomplete.removeClass(SEARCH_SUGGEST_ACTIVE_CLASS).attr("aria-hidden", "true");
    }

    function showSearchAutocomplete(value) {
        renderAutocomplete(value);

        $searchSuggestDefault.removeClass(SEARCH_SUGGEST_ACTIVE_CLASS);
        $searchAutocomplete.addClass(SEARCH_SUGGEST_ACTIVE_CLASS).attr("aria-hidden", "false");
    }

    function openSearchSuggest() {
        if (!$searchSuggest.length || !$searchInput.length) return;

        const value = String($searchInput.val() || "").trim();

        $searchSuggest.addClass(SEARCH_SUGGEST_OPEN_CLASS).attr("aria-hidden", "false");
        $searchInput.attr("aria-expanded", "true");

        if (value) {
            showSearchAutocomplete(value);
        } else {
            showSearchDefault();
        }
    }

    function closeSearchSuggest() {
        if (!$searchSuggest.length) return;

        $searchSuggest.removeClass(SEARCH_SUGGEST_OPEN_CLASS).attr("aria-hidden", "true");

        $searchInput.attr("aria-expanded", "false").removeAttr("aria-activedescendant");

        $searchSuggestDefault.removeClass(SEARCH_SUGGEST_ACTIVE_CLASS);
        $searchAutocomplete.removeClass(SEARCH_SUGGEST_ACTIVE_CLASS).attr("aria-hidden", "true");
    }

    function selectSearchKeyword(keyword, options = {}) {
        const { submit = false } = options;
        const value = String(keyword || "").trim();

        if (!value) return;

        $searchInput.val(value);
        addRecentKeyword(value);
        closeSearchSuggest();

        if (submit) {
            $searchForm.trigger("submit");
            return;
        }

        $searchInput.trigger("focus");
    }

    function openSearch() {
        if (!$searchButton.length || !$searchPanel.length) return;
        if ($searchButton.attr("aria-expanded") === "true") return;

        if ($header.hasClass(ACTIVE_CLASS)) {
            close({
                returnFocus: false,
            });
        }

        closeLnb();

        $header.addClass(SEARCH_OPEN_CLASS);

        setHeaderControlState($searchButton, true, {
            open: "검색 열기",
            close: "검색 닫기",
        });

        setPanelState($searchPanel, true);

        $wrap.addClass("is-dimmed");

        NonScroll.enable($wrap);

        const $input = $searchPanel.find(".header-search__input").first();

        // if ($input.length) {
        //     $input.trigger("focus");
        // }
    }

    function closeSearch(options = {}) {
        const { returnFocus = false } = options;

        if (!$searchButton.length || !$searchPanel.length) return;

        const isOpen = $searchButton.attr("aria-expanded") === "true";

        closeSearchSuggest();

        $header.removeClass(SEARCH_OPEN_CLASS);

        setHeaderControlState($searchButton, false, {
            open: "검색 열기",
            close: "검색 닫기",
        });

        setPanelState($searchPanel, false);

        if (isOpen) {
            $wrap.removeClass("is-dimmed");
            NonScroll.disable();
        }

        if (returnFocus) {
            $searchButton.trigger("focus");
        }
    }

    function toggleSearch() {
        const isOpen = $searchButton.attr("aria-expanded") === "true";

        if (isOpen) {
            closeSearch();
            return;
        }

        openSearch();
    }

    function bindSearchLastFocusClose() {
        $searchPanel.off("keydown.headerSearchLastFocus").on("keydown.headerSearchLastFocus", function (e) {
            if ($searchButton.attr("aria-expanded") !== "true") return;
            if (e.key !== "Tab" || e.shiftKey) return;

            const $focusable = getFocusableElements($searchPanel);
            const $last = $focusable.last();

            if (!$last.length) return;
            if (e.target !== $last[0]) return;

            e.preventDefault();

            closeSearch({
                returnFocus: false,
            });

            focusMainContent();
        });
    }

    /* =========================
       Mega menu panel
    ========================= */
    function getPanel($link) {
        const panelId = $link.attr("aria-controls");

        if (!panelId) return $();

        return $megaMenu.find(`#${panelId}`);
    }

    function getController($panel) {
        const panelId = $panel.attr("id");

        if (!panelId) return $();

        return $megaMenu.find(`[aria-controls="${panelId}"]`).first();
    }

    function hidePanel($panel) {
        setPanelState($panel, false);
    }

    function showPanel($link) {
        const $panel = getPanel($link);

        if (!$panel.length) return $();

        setExpandedState($link, true);

        $link.closest(".mega-menu__item, .mega-menu__sub-item").addClass(ACTIVE_PANEL_CLASS);

        setPanelState($panel, true);

        return $panel;
    }

    function resetSubPanels($scope) {
        $scope.find(".mega-menu__sub-link--has-depth").attr("aria-expanded", "false");

        $scope.find(".mega-menu__sub-item").removeClass(ACTIVE_PANEL_CLASS);

        $scope.find(".mega-menu__sub-list[id]").each(function () {
            hidePanel($(this));
        });
    }

    function resetSubDepth($scope) {
        resetSubPanels($scope);
    }

    function resetMainDepth() {
        $megaMenu.find(".mega-menu__link--has-depth").attr("aria-expanded", "false").closest(".mega-menu__item").removeClass(ACTIVE_PANEL_CLASS);

        $megaMenu.find(".mega-menu__main > .mega-menu__inner > .mega-menu__section").removeClass(ACTIVE_PANEL_CLASS);
    }

    function hideSubBoxes() {
        $megaMenu.find(".mega-menu__sub-box").each(function () {
            hidePanel($(this));
        });
    }

    function resetDepth() {
        $megaMenu.find(".mega-menu__link--has-depth, .mega-menu__sub-link--has-depth").attr("aria-expanded", "false");

        $megaMenu.find(".mega-menu__item, .mega-menu__sub-item").removeClass(ACTIVE_PANEL_CLASS);

        $megaMenu.find(".mega-menu__main > .mega-menu__inner > .mega-menu__section").removeClass(ACTIVE_PANEL_CLASS);

        $megaMenu.find(".mega-menu__sub").removeClass(ACTIVE_PANEL_CLASS);

        hideSubBoxes();
        resetSubPanels($megaMenu);
    }

    function closeSubPanel() {
        resetSubPanels($megaMenu);
        hideSubBoxes();

        $megaMenu.find(".mega-menu__sub").removeClass(ACTIVE_PANEL_CLASS);
    }

    function closeMainDepth() {
        resetMainDepth();
    }

    function closeCurrentPanel($panel) {
        const $controller = getController($panel);

        if (!$controller.length) return false;

        hidePanel($panel);

        setExpandedState($controller, false);

        $controller.closest(".mega-menu__item, .mega-menu__sub-item").removeClass(ACTIVE_PANEL_CLASS);

        $controller.trigger("focus");

        return true;
    }

    /* =========================
       Events
    ========================= */
    function bindMenuButton() {
        $menuButton.off("click.header").on("click.header", function (e) {
            e.preventDefault();

            toggle();
        });
    }

    function bindLnb() {
        if (!$lnb.length || !$lnbButton.length || !$lnbPanel.length) {
            return;
        }

        $lnbButton.off("click.lnb").on("click.lnb", function (e) {
            e.preventDefault();
            e.stopPropagation();

            toggleLnb();
        });

        $lnbPanel.off("click.lnb").on("click.lnb", function (e) {
            e.stopPropagation();
        });

        $(document)
            .off("click.lnbOutside")
            .on("click.lnbOutside", function (e) {
                if ($lnbButton.attr("aria-expanded") !== "true") {
                    return;
                }

                const $target = $(e.target);

                if ($target.closest(".lnb-temp__menu").length) {
                    return;
                }

                closeLnb();
            });

        $win.off("keydown.lnb").on("keydown.lnb", function (e) {
            if (e.key !== "Escape") return;
            if ($lnbButton.attr("aria-expanded") !== "true") return;

            e.preventDefault();

            closeLnb({
                returnFocus: true,
            });
        });
    }

    function bindSearch() {
        if (!$searchButton.length || !$searchPanel.length) return;

        $searchButton.off("click.headerSearch").on("click.headerSearch", function (e) {
            e.preventDefault();
            e.stopPropagation();

            toggleSearch();
        });

        $searchCloseButton.off("click.headerSearch").on("click.headerSearch", function (e) {
            e.preventDefault();

            closeSearch({
                returnFocus: true,
            });
        });

        $searchPanel.off("click.headerSearch").on("click.headerSearch", function (e) {
            e.stopPropagation();
        });

        $searchInput
            .off(".headerSearchSuggest")
            .on("focus.headerSearchSuggest", function () {
                if (preventSearchSuggestOpen) {
                    preventSearchSuggestOpen = false;
                    return;
                }

                openSearchSuggest();
            })
            .on("input.headerSearchSuggest", function () {
                const value = String($(this).val() || "");

                if (!$searchSuggest.hasClass(SEARCH_SUGGEST_OPEN_CLASS)) {
                    openSearchSuggest();
                    return;
                }

                if (value.trim()) {
                    showSearchAutocomplete(value);
                } else {
                    showSearchDefault();
                }
            });

        $searchForm.off("submit.headerSearchSuggest").on("submit.headerSearchSuggest", function (e) {
            const keyword = String($searchInput.val() || "").trim();

            if (!keyword) {
                e.preventDefault();
                openSearchSuggest();
                $searchInput.trigger("focus");
                return;
            }

            addRecentKeyword(keyword);
        });

        $searchSuggest
            .off(".headerSearchSuggest")
            .on("click.headerSearchSuggest", ".header-search__recent-link", function () {
                selectSearchKeyword($(this).attr("data-keyword"));
            })
            .on("click.headerSearchSuggest", ".header-search__recent-delete", function (e) {
                e.preventDefault();
                e.stopPropagation();

                removeRecentKeyword($(this).attr("data-keyword"));
            })
            .on("click.headerSearchSuggest", ".header-search__recent-clear", function (e) {
                e.preventDefault();

                clearRecentKeywords();
            })
            .on("click.headerSearchSuggest", ".header-search__autocomplete-button", function () {
                selectSearchKeyword($(this).attr("data-keyword"));
            })
            .on("click.headerSearchSuggest", ".header-search__suggest-link", function () {
                addRecentKeyword($(this).text());
            })
            .on("click.headerSearchSuggest", ".header-search__suggest-close", function (e) {
                e.preventDefault();

                preventSearchSuggestOpen = true;

                closeSearchSuggest();
                $searchInput.trigger("focus");
            })
            .on("keydown.headerSearchSuggest", ".header-search__suggest-close", function (e) {
                if (e.key !== "Tab" || e.shiftKey) return;

                e.preventDefault();

                preventSearchSuggestOpen = true;

                closeSearchSuggest();

                const $firstRecommend = getFocusableElements($searchPanel.find(".header-search__recommend")).first();

                if ($firstRecommend.length) {
                    $firstRecommend.trigger("focus");
                    return;
                }

                closeSearch({
                    returnFocus: false,
                });

                focusMainContent();
            });

        $(document)
            .off("click.headerSearchOutside")
            .on("click.headerSearchOutside", function (e) {
                if ($searchButton.attr("aria-expanded") !== "true") return;

                const $target = $(e.target);

                if ($target.closest(".header__search-button, .header-search").length) {
                    return;
                }

                closeSearch();
            });

        $win.off("keydown.headerSearch").on("keydown.headerSearch", function (e) {
            if (e.key !== "Escape") return;
            if ($searchButton.attr("aria-expanded") !== "true") return;

            e.preventDefault();

            if ($searchSuggest.hasClass(SEARCH_SUGGEST_OPEN_CLASS)) {
                closeSearchSuggest();
                $searchInput.trigger("focus");
                return;
            }

            closeSearch({
                returnFocus: true,
            });
        });
    }

    function bindEsc() {
        $win.off("keydown.header").on("keydown.header", function (e) {
            if (e.key !== "Escape") return;
            if (!$header.hasClass(ACTIVE_CLASS)) return;

            const $focused = $(document.activeElement);

            const $subListPanel = $focused.closest(".mega-menu__sub-list[id].is-active");

            if ($subListPanel.length) {
                e.preventDefault();

                closeCurrentPanel($subListPanel);
                return;
            }

            const $subBoxPanel = $focused.closest(".mega-menu__sub-box.is-active");

            if ($subBoxPanel.length) {
                e.preventDefault();

                const $controller = getController($subBoxPanel);

                resetSubDepth($subBoxPanel);
                hidePanel($subBoxPanel);

                $megaMenu.find(".mega-menu__sub").removeClass(ACTIVE_PANEL_CLASS);

                if ($controller.length) {
                    setExpandedState($controller, false);

                    $controller.closest(".mega-menu__item").removeClass(ACTIVE_PANEL_CLASS);

                    $controller.closest(".mega-menu__section").removeClass(ACTIVE_PANEL_CLASS);

                    $controller.trigger("focus");
                }

                return;
            }

            close({
                returnFocus: true,
            });
        });
    }

    function bindOutsideClick() {
        $(document)
            .off("click.headerOutside")
            .on("click.headerOutside", function (e) {
                if (!$header.hasClass(ACTIVE_CLASS)) return;

                const $target = $(e.target);

                if ($target.closest(".header__menu-button").length) {
                    return;
                }

                if (!$target.closest(".header__box").length) {
                    close({
                        returnFocus: false,
                    });
                }
            });
    }

    function bindMainClickCloseSub() {
        $megaMenu
            .find(".mega-menu__main")
            .off("click.headerMain")
            .on("click.headerMain", function (e) {
                if (!$header.hasClass(ACTIVE_CLASS)) return;

                const $target = $(e.target);

                if ($target.closest(".mega-menu__link--has-depth").length) {
                    return;
                }

                closeSubPanel();
                closeMainDepth();
            });
    }

    function bindDepthHasPanel() {
        $megaMenu
            .find(".mega-menu__link--has-depth")
            .off("click.header")
            .on("click.header", function (e) {
                e.preventDefault();

                const $link = $(this);
                const isOpen = $link.attr("aria-expanded") === "true";
                const $targetPanel = getPanel($link);

                if (!$targetPanel.length) return;

                resetMainDepth();
                hideSubBoxes();

                $megaMenu.find(".mega-menu__sub").removeClass(ACTIVE_PANEL_CLASS);

                resetSubDepth($megaMenu);

                if (isOpen) {
                    $link.trigger("focus");
                    return;
                }

                $megaMenu.find(".mega-menu__sub").addClass(ACTIVE_PANEL_CLASS);

                $link.closest(".mega-menu__section").addClass(ACTIVE_PANEL_CLASS);

                const $openedPanel = showPanel($link);

                focusFirstItem($openedPanel);
            });
    }

    function bindSubDepthHasPanel() {
        $megaMenu
            .find(".mega-menu__sub-link")
            .off("click.header")
            .on("click.header", function (e) {
                const $link = $(this);
                const $currentSection = $link.closest(".mega-menu__sub-section");
                const $currentItem = $link.closest(".mega-menu__sub-item");
                const $nextSections = $currentSection.nextAll(".mega-menu__sub-section");
                const hasDepth = $link.hasClass("mega-menu__sub-link--has-depth");
                const $targetPanel = getPanel($link);

                if (hasDepth) {
                    e.preventDefault();
                }

                $currentSection.find(".mega-menu__sub-link--has-depth").attr("aria-expanded", "false");

                $currentSection.find(".mega-menu__sub-item").removeClass(ACTIVE_PANEL_CLASS);

                $nextSections.find(".mega-menu__sub-link--has-depth").attr("aria-expanded", "false");

                $nextSections.find(".mega-menu__sub-item").removeClass(ACTIVE_PANEL_CLASS);

                $nextSections.find(".mega-menu__sub-list[id]").each(function () {
                    hidePanel($(this));
                });

                $currentItem.addClass(ACTIVE_PANEL_CLASS);

                if (!hasDepth || !$targetPanel.length) {
                    return;
                }

                const $openedPanel = showPanel($link);

                focusFirstItem($openedPanel);
            });
    }

    function bindBackToParentDepth() {
        $megaMenu.off("keydown.headerBackDepth").on("keydown.headerBackDepth", function (e) {
            if (e.key !== "Tab" || !e.shiftKey) return;

            const $focused = $(e.target);

            const $panel = $focused.closest(".mega-menu__sub-box.is-active, .mega-menu__sub-list[id].is-active");

            if (!$panel.length) return;

            const $first = getFocusableElements($panel).first();

            if (!$first.length || e.target !== $first[0]) {
                return;
            }

            const $controller = getController($panel);

            if (!$controller.length) return;

            e.preventDefault();

            $controller.trigger("focus");
        });
    }

    function bindLastFocusClose() {
        $header.off("keydown.headerLastFocus").on("keydown.headerLastFocus", function (e) {
            if (!$header.hasClass(ACTIVE_CLASS)) return;
            if (e.key !== "Tab") return;
            if (e.shiftKey) return;

            const $focusable = getFocusableElements($header);
            const $last = $focusable.last();

            if (!$last.length) return;
            if (e.target !== $last[0]) return;

            e.preventDefault();

            close({
                returnFocus: false,
            });

            focusMainContent();
        });
    }

    function reset() {
        close({
            returnFocus: false,
        });

        closeLnb({
            returnFocus: false,
        });

        closeSearch({
            returnFocus: false,
        });

        $megaMenu.find(".mega-menu__item").removeClass(ACTIVE_PANEL_CLASS);

        $megaMenu.find(".mega-menu__item.is-current").addClass(ACTIVE_PANEL_CLASS);
    }

    function bind() {
        bindMenuButton();
        bindEsc();
        bindOutsideClick();
        bindMainClickCloseSub();
        bindDepthHasPanel();
        bindSubDepthHasPanel();
        bindBackToParentDepth();
        bindLastFocusClose();
        bindMobileMenu();
        bindLnb();
        bindSearch();
        bindSearchLastFocusClose();
    }

    function initMegaMenu() {
        setPanelState($megaMenu, false);

        $megaMenu.find(".mega-menu__sub-box").each(function () {
            hidePanel($(this));
        });

        $megaMenu.find(".mega-menu__sub-list[id]").each(function () {
            hidePanel($(this));
        });
    }

    function initMobileMenu() {
        if (!$mobileMenu.length) return;

        resetMobileMenu({
            focus: false,
        });
    }

    function initLnb() {
        if (!$lnbPanel.length) return;

        $lnbMenu.removeClass(ACTIVE_PANEL_CLASS);

        setExpandedState($lnbButton, false);

        setPanelState($lnbPanel, false, {
            useHidden: true,
        });
    }

    function initSearch() {
        if (!$searchPanel.length) return;

        $header.removeClass(SEARCH_OPEN_CLASS);

        setHeaderControlState($searchButton, false, {
            open: "검색 열기",
            close: "검색 닫기",
        });

        setPanelState($searchPanel, false);

        closeSearchSuggest();
        showSearchDefault();
    }

    function init() {
        $wrap = $("#wrap");
        $header = $(".header");
        $headerBox = $(".header__box");
        $menuButton = $(".header__menu-button");
        $megaMenu = $("#megaMenu");

        // Mobile menu
        $mobileMenu = $megaMenu.find(".mega-menu__mo .mobile-menu");
        $mobilePages = $mobileMenu.find(".mobile-menu__page");

        // LNB
        $lnb = $(".lnb-temp");
        $lnbMenu = $lnb.find(".lnb-temp__menu");
        $lnbButton = $lnb.find(".lnb-temp__button");
        $lnbPanel = $lnb.find(".lnb-temp__panel");

        // Search
        $searchButton = $(".header__search-button");
        $searchPanel = $(".header-search");
        $searchCloseButton = $searchPanel.find(".header-search__close");
        $searchForm = $searchPanel.find(".header-search__box");
        $searchInput = $searchPanel.find(".header-search__input");
        $searchSuggest = $searchPanel.find(".header-search__suggest");
        $searchSuggestDefault = $searchPanel.find(".header-search__suggest-default");
        $searchAutocomplete = $searchPanel.find(".header-search__autocomplete");
        $searchAutocompleteList = $searchPanel.find(".header-search__autocomplete-list");
        $searchAutocompleteEmpty = $searchPanel.find(".header-search__autocomplete-empty");
        $searchRecentList = $searchPanel.find(".header-search__recent-list");
        $searchRecentEmpty = $searchPanel.find(".header-search__recent-empty");
        $searchRecentClear = $searchPanel.find(".header-search__recent-clear");

        if (!$header.length || !$headerBox.length || !$menuButton.length || !$megaMenu.length) {
            return;
        }

        initMegaMenu();
        initMobileMenu();
        initLnb();
        initSearch();

        bind();
    }

    return {
        init,
        open,
        close,
        toggle,
        reset,
        openLnb,
        closeLnb,
        toggleLnb,
        openSearch,
        closeSearch,
        toggleSearch,
    };
})();

/* =========================
   Footer
========================= */
const Footer = (function () {
    const ACTIVE_CLASS = "is-open";
    const EVENT_NAMESPACE = ".footer";

    let $footer = $();

    // footer nav
    let $navGroup = $();
    let $navTitle = $();

    // family
    let $familyGroup = $();
    let $familyTitle = $();

    // PC / MO 공통 드롭다운 팝업
    let $popupGroup = $();
    let $popupButton = $();

    function closeAccordion($group, $button) {
        $group.removeClass(ACTIVE_CLASS);
        $button.attr("aria-expanded", "false");
    }

    function getFocusableElements($container) {
        return $container
            .find(["a[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'].join(","))
            .filter(":visible");
    }

    /**
     * MO footer nav
     * 일반 nav + family가 한 묶음으로 작동
     */
    function enableMobileNav() {
        $navTitle
            .attr("aria-expanded", "false")
            .off(`click${EVENT_NAMESPACE}MobileNav`)
            .on(`click${EVENT_NAMESPACE}MobileNav`, function () {
                const $button = $(this);
                const $group = $button.closest(".footer__nav-group");
                const isOpen = $group.hasClass(ACTIVE_CLASS);

                closeAccordion($navGroup, $navTitle);

                if (!isOpen) {
                    $group.addClass(ACTIVE_CLASS);
                    $button.attr("aria-expanded", "true");
                }
            });
    }

    function disableMobileNav() {
        $navTitle.off(`click${EVENT_NAMESPACE}MobileNav`);

        closeAccordion($navGroup, $navTitle);
    }

    /**
     * PC family
     */
    function closePcFamily() {
        closeAccordion($familyGroup, $familyTitle);

        $(document)
            .off(`click${EVENT_NAMESPACE}PcFamilyOutside`)
            .off(`keydown${EVENT_NAMESPACE}PcFamilyLastFocus`);
    }

    function bindPcFamilyOutsideClick() {
        $(document)
            .off(`click${EVENT_NAMESPACE}PcFamilyOutside`)
            .on(`click${EVENT_NAMESPACE}PcFamilyOutside`, function (e) {
                if ($(e.target).closest(".footer__nav-group--family").length) return;

                closePcFamily();
            });
    }

    function bindPcFamilyLastFocusClose($group) {
        $(document)
            .off(`keydown${EVENT_NAMESPACE}PcFamilyLastFocus`)
            .on(`keydown${EVENT_NAMESPACE}PcFamilyLastFocus`, function (e) {
                if (e.key !== "Tab" || e.shiftKey) return;

                const $focusable = getFocusableElements($group.find(".footer__nav-box"));
                const $last = $focusable.last();

                if (!$last.length) return;
                if (e.target !== $last[0]) return;

                closePcFamily();
            });
    }

    function enablePcFamily() {
        $familyTitle
            .attr("aria-expanded", "false")
            .off(`click${EVENT_NAMESPACE}PcFamily`)
            .on(`click${EVENT_NAMESPACE}PcFamily`, function () {
                const $button = $(this);
                const $group = $button.closest(".footer__nav-group--family");
                const isOpen = $group.hasClass(ACTIVE_CLASS);

                closePcFamily();

                if (!isOpen) {
                    $group.addClass(ACTIVE_CLASS);
                    $button.attr("aria-expanded", "true");

                    bindPcFamilyOutsideClick();
                    bindPcFamilyLastFocusClose($group);
                }
            });
    }

    function disablePcFamily() {
        $familyTitle.off(`click${EVENT_NAMESPACE}PcFamily`);

        closePcFamily();
    }

    /**
     * PC / MO 공통 드롭다운 팝업
     */
    function closePopup() {
        closeAccordion($popupGroup, $popupButton);

        $(document).off(`click${EVENT_NAMESPACE}PopupOutside`).off(`keydown${EVENT_NAMESPACE}PopupLastFocus`);
    }

    function bindPopupOutsideClick() {
        $(document)
            .off(`click${EVENT_NAMESPACE}PopupOutside`)
            .on(`click${EVENT_NAMESPACE}PopupOutside`, function (e) {
                const $target = $(e.target);

                // 닫기 버튼 클릭
                if ($target.closest(".footer__popup-close").length) {
                    closePopup();
                    return;
                }

                // 팝업 버튼 또는 팝업 내부 클릭은 유지
                if ($target.closest(".footer__popup-button, .footer__popup-inner").length) {
                    return;
                }

                // 딤 영역 및 팝업 바깥 클릭
                closePopup();
            });
    }

    function bindPopupLastFocusClose($popup) {
        $(document)
            .off(`keydown${EVENT_NAMESPACE}PopupLastFocus`)
            .on(`keydown${EVENT_NAMESPACE}PopupLastFocus`, function (e) {
                if (e.key !== "Tab" || e.shiftKey) return;

                const $focusable = getFocusableElements($popup.find(".footer__popup-inner"));
                const $last = $focusable.last();

                if (!$last.length) return;
                if (e.target !== $last[0]) return;

                // preventDefault 하지 않음
                // 팝업만 닫고 다음 요소로 자연스럽게 이동
                closePopup();
            });
    }

    function enablePopup() {
        $popupButton
            .attr("aria-expanded", "false")
            .off(`click${EVENT_NAMESPACE}Popup`)
            .on(`click${EVENT_NAMESPACE}Popup`, function () {
                const $button = $(this);
                const $popup = $button.closest(".footer__popup");
                const isOpen = $popup.hasClass(ACTIVE_CLASS);

                closePopup();

                if (!isOpen) {
                    $popup.addClass(ACTIVE_CLASS);
                    $button.attr("aria-expanded", "true");

                    bindPopupOutsideClick();
                    bindPopupLastFocusClose($popup);
                }
            });
    }

    function disablePopup() {
        $popupButton.off(`click${EVENT_NAMESPACE}Popup`);

        closePopup();
    }

    function enableMobile() {
        disablePcFamily();
        enableMobileNav();

        $navTitle.not($familyTitle).removeAttr("tabindex");
    }

    function enablePc() {
        disableMobileNav();
        enablePcFamily();

        $navTitle.not($familyTitle).attr("tabindex", "-1").removeAttr("aria-expanded");
        $familyTitle.removeAttr("tabindex");
    }

    function reset() {
        disableMobileNav();
        disablePcFamily();

        // 공통 팝업 클릭 이벤트는 유지
        closePopup();
    }

    function init() {
        $footer = $(".footer");

        if (!$footer.length) return;

        // MO에서는 family 포함 전체
        $navGroup = $footer.find(".footer__nav-group");
        $navTitle = $navGroup.find(".footer__nav-title");

        // PC에서는 family만
        $familyGroup = $footer.find(".footer__nav-group--family");
        $familyTitle = $familyGroup.find(".footer__nav-title");

        // PC / MO 공통 팝업
        $popupGroup = $footer.find(".footer__popup");
        $popupButton = $footer.find(".footer__popup-button");

        if ($popupGroup.length && $popupButton.length) {
            enablePopup();
        }
    }

    return {
        init,
        reset,
        enableMobile,
        enablePc,
        enablePopup,
        disablePopup,
    };
})();

/* =========================
   countUp
========================= */
const countUp = (() => {
    let observer = null;

    function parseValue(text) {
        const raw = String(text).trim();
        const useComma = raw.includes(",");
        const normalized = raw.replace(/,/g, "");
        const target = Number.parseFloat(normalized);

        if (Number.isNaN(target)) return null;

        const decimals = (normalized.split(".")[1] || "").length;

        return {
            target,
            decimals,
            useComma,
        };
    }

    function formatValue(value, decimals, useComma) {
        const fixedValue = Number(value).toFixed(decimals);

        if (!useComma) return fixedValue;

        const [integer, decimal] = fixedValue.split(".");
        const formattedInteger = Number(integer).toLocaleString();

        return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
    }

    function createDigitTrack(loopCount = 2) {
        let html = "";

        for (let loop = 0; loop <= loopCount; loop++) {
            for (let number = 0; number <= 9; number++) {
                html += `<span class="count-up__number">${number}</span>`;
            }
        }

        return html;
    }

    function render($el) {
        const target = Number($el.data("countUpTarget"));
        const decimals = Number($el.data("countUpDecimals")) || 0;
        const useComma = Boolean($el.data("countUpUseComma"));
        const formattedTarget = formatValue(target, decimals, useComma);
        const loopCount = Number($el.data("countUpLoopCount")) || 2;

        console.log([...formattedTarget]);
        const html = [...formattedTarget]
            .map((character, index) => {
                if (/\d/.test(character)) {
                    return `
                        <span
                            class="count-up__digit"
                            data-digit="${character}"
                            data-index="${index}"
                            aria-hidden="true"
                        >
                            <span class="count-up__track">
                                ${createDigitTrack(loopCount)}
                            </span>
                        </span>
                    `;
                }

                return `
                    <span class="count-up__separator" aria-hidden="true">
                        ${character}
                    </span>
                `;
            })
            .join("");

        $el.attr("aria-label", formattedTarget).html(html);
    }

    function setup($el, settings = {}) {
        if ($el.data("countUpReady")) return;

        const parsed = parseValue($el.text());

        if (!parsed) return;

        $el.data({
            countUpTarget: parsed.target,
            countUpDecimals: parsed.decimals,
            countUpUseComma: parsed.useComma,
            countUpLoopCount: settings.loopCount ?? 2,
            countUpReady: true,
        });

        render($el);
    }

    function setInitialPosition($el) {
        $el.find(".count-up__track").each(function () {
            this.style.transition = "none";
            this.style.transform = "translateY(0)";
        });
        //미리 렌더링
        $el[0]?.offsetHeight;
    }

    function animate($el, options = {}) {
        const settings = {
            duration: 1000,
            stagger: 60,
            loopCount: 2,
            ...options,
        };

        setup($el, settings);

        const animationId = `${Date.now()}-${Math.random()}`;
        const $digits = $el.find(".count-up__digit");

        $el.data("countUpAnimationId", animationId);

        setInitialPosition($el);

        requestAnimationFrame(() => {
            if ($el.data("countUpAnimationId") !== animationId) return;

            $digits.each(function (digitIndex) {
                const $digit = $(this);
                const $track = $digit.find(".count-up__track");
                const targetDigit = Number($digit.data("digit"));

                /*
                 * 숫자 한 칸 높이가 1em이므로
                 * 반복 횟수 × 10 + 목표 숫자만큼 위로 이동
                 */
                const targetIndex = settings.loopCount * 10 + targetDigit;
                const delay = digitIndex * settings.stagger;
                // 오른쪽부터 시작
                // const delay = ($digits.length - digitIndex - 1) * settings.stagger;

                $track.css({
                    transition: `transform ${settings.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                    transform: `translateY(-${targetIndex}em)`,
                });
            });
        });
    }

    function reset($el) {
        setup($el);

        $el.removeData("counted");
        $el.removeData("countUpAnimationId");

        setInitialPosition($el);
    }

    function init($scope, options = {}) {
        const settings = {
            selector: ".count-up",
            duration: 1000,
            stagger: 60,
            threshold: 0.4,
            repeat: true,
            loopCount: 2,
            ...options,
        };

        const $targets = $scope.find(settings.selector).add($scope.filter(settings.selector));

        if (!$targets.length) return;

        destroy();

        $targets.each(function () {
            setup($(this), settings);
        });

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const $el = $(entry.target);

                    if (entry.isIntersecting) {
                        if ($el.data("counted")) return;

                        $el.data("counted", true);

                        animate($el, {
                            duration: settings.duration,
                            stagger: settings.stagger,
                            loopCount: settings.loopCount,
                        });

                        if (!settings.repeat) {
                            observer.unobserve(entry.target);
                        }

                        return;
                    }

                    if (settings.repeat) {
                        reset($el);
                    }
                });
            },
            {
                threshold: settings.threshold,
            },
        );

        $targets.each(function () {
            observer.observe(this);
        });
    }

    function destroy() {
        if (!observer) return;

        observer.disconnect();
        observer = null;
    }

    return {
        init,
        animate,
        reset,
        destroy,
    };
})();

/* =========================
   swiper
========================= */
const createResponsiveSwiper = function (swiperTargets = [], options = {}) {
    const DEFAULT_BREAKPOINT = options.breakpoint ?? 768;
    const EVENT_NAMESPACE = options.namespace || ".responsiveSwiper";

    let resizeTimer = null;
    let orientationTimer = null;

    const swipers = {};

    function isActiveByItem(item) {
        if (item.always === true) {
            return true;
        }

        if (typeof item.breakpoint === "number") {
            return $(window).width() < item.breakpoint;
        }

        if (DEFAULT_BREAKPOINT === null || DEFAULT_BREAKPOINT === false) {
            return true;
        }

        return $(window).width() < DEFAULT_BREAKPOINT;
    }

    function handleSwiper() {
        swiperTargets.forEach((item) => {
            const $el = $(item.selector);

            if (!$el.length) return;

            const $toggleTarget = item.toggleTarget ? $(item.toggleTarget) : $el;

            const isActive = isActiveByItem(item);

            if (!isActive) {
                if (item.noneClass) {
                    $toggleTarget.addClass(item.noneClass);
                }

                if (swipers[item.key]) {
                    swipers[item.key].destroy(true, true);
                    swipers[item.key] = null;
                }

                return;
            }

            if (item.noneClass) {
                $toggleTarget.removeClass(item.noneClass);
            }

            if (!swipers[item.key]) {
                swipers[item.key] = new Swiper($el[0], item.options || {});
            } else {
                swipers[item.key].update();
            }
        });
    }

    function bindEvents() {
        $(window).off(EVENT_NAMESPACE);

        if (typeof isMobile !== "undefined" && isMobile) {
            $(window).on(`orientationchange${EVENT_NAMESPACE}`, function () {
                clearTimeout(orientationTimer);

                orientationTimer = setTimeout(function () {
                    handleSwiper();
                }, 200);
            });
        } else {
            $(window).on(`resize${EVENT_NAMESPACE}`, function () {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function () {
                    handleSwiper();
                }, 150);
            });
        }
    }

    function init() {
        bindEvents();
        handleSwiper();
    }

    function destroy() {
        $(window).off(EVENT_NAMESPACE);

        clearTimeout(resizeTimer);
        clearTimeout(orientationTimer);

        resizeTimer = null;
        orientationTimer = null;

        Object.keys(swipers).forEach((key) => {
            if (swipers[key]) {
                swipers[key].destroy(true, true);
                swipers[key] = null;
            }
        });
    }

    function update() {
        handleSwiper();
    }

    return {
        init,
        destroy,
        update,
        swipers,
    };
};

/* =========================
   selectbox

<!-- 단일 정렬: 선택 후 해제 불가 -->
<div class="custom-selectbox" data-update-title="true">
<!-- 단일 필터: 선택 후 다시 누르면 해제 가능 -->
<div class="custom-selectbox" data-placeholder="선택" data-update-title="true">
<!-- 다중 필터: 선택값을 버튼에 보여줄 때 -->
<div class="custom-selectbox" data-multiple="true" data-placeholder="선택" data-update-title="true">
<!-- 다중 필터: 버튼명 고정 -->
<div class="custom-selectbox" data-multiple="true" data-update-title="false">

========================= */
const CustomSelectbox = (function () {
    const SELECTOR = ".custom-selectbox";
    const SELECTED = ".custom-selectbox__selected";
    const SELECTEDTEXT = ".custom-selectbox__selected-text";
    const LIST = ".custom-selectbox__list";
    const OPTION = ".custom-selectbox__option";
    const CHECKBOX = ".custom-selectbox__checkbox";
    const INPUT = ".custom-selectbox__input";
    const CLOSE = ".custom-selectbox__close";
    const BOX_INNER = ".custom-selectbox__box-inner";

    const ACTIVE_CLASS = "is-active";
    const ALL_OPTION_CLASS = "custom-selectbox__option--all";
    const ALL_OPTION = `.${ALL_OPTION_CLASS}`;

    function isMultiple($select) {
        return $select.attr("data-multiple") === "true";
    }

    function shouldUpdateTitle($select) {
        return $select.attr("data-update-title") !== "false";
    }

    function hasPlaceholder($select) {
        return typeof $select.attr("data-placeholder") !== "undefined";
    }

    function canClear($select) {
        return isMultiple($select) || hasPlaceholder($select);
    }

    function getDefaultText($select) {
        const $selectedText = $select.find(SELECTEDTEXT);

        if ($selectedText.length) {
            return $selectedText.text().trim();
        }

        return $select.find(SELECTED).text().trim();
    }

    function setDefaultText($select) {
        if (typeof $select.data("defaultText") !== "undefined") return;

        $select.data("defaultText", getDefaultText($select));
    }

    function getPlaceholder($select) {
        if (hasPlaceholder($select)) {
            return $select.attr("data-placeholder") || "";
        }

        return $select.data("defaultText") || "";
    }

    function getAllOption($select) {
        return $select.find(ALL_OPTION);
    }

    function getNormalOptions($select) {
        return $select.find(OPTION).not(ALL_OPTION);
    }

    function getSelectedOptions($select) {
        return getNormalOptions($select).filter('[aria-selected="true"]');
    }

    function getOptionValue($option) {
        return $option.find(CHECKBOX).val() || $option.data("value") || "";
    }

    function getOptionText($option) {
        const $text = $option.find(".custom-selectbox__text");

        if ($text.length) {
            return $text.text().trim();
        }

        return $option.text().trim();
    }

    function setOptionSelected($option, selected) {
        const isSelected = selected === true;

        $option.attr("aria-selected", isSelected ? "true" : "false");
        $option.toggleClass("is-selected", isSelected);
        $option.find(CHECKBOX).prop("checked", isSelected);
    }

    function getValue($select) {
        const $selectedOptions = getSelectedOptions($select);

        if (isMultiple($select)) {
            return $selectedOptions
                .map(function () {
                    return getOptionValue($(this));
                })
                .get();
        }

        return getOptionValue($selectedOptions.first());
    }

    function getText($select) {
        const $selectedOptions = getSelectedOptions($select);

        if (!$selectedOptions.length) {
            return getPlaceholder($select);
        }

        if (isMultiple($select)) {
            return $selectedOptions
                .map(function () {
                    return getOptionText($(this));
                })
                .get()
                .join(", ");
        }

        return getOptionText($selectedOptions.first());
    }

    function updateAllOptionState($select) {
        const $allOption = getAllOption($select);

        if (!$allOption.length) return;

        const $normalOptions = getNormalOptions($select);
        const $selectedOptions = getSelectedOptions($select);

        const isAllSelected = $normalOptions.length > 0 && $normalOptions.length === $selectedOptions.length;

        setOptionSelected($allOption, isAllSelected);
    }

    function updateInput($select) {
        const value = getValue($select);
        const inputValue = Array.isArray(value) ? value.join(",") : value;

        $select.find(INPUT).val(inputValue);
    }

    function updateSelectedText($select) {
        if (!shouldUpdateTitle($select)) return;

        const text = getText($select);
        const $selectedText = $select.find(SELECTEDTEXT);

        if ($selectedText.length) {
            $selectedText.text(text);
            return;
        }

        $select.find(SELECTED).text(text);
    }

    function updateValue($select) {
        updateAllOptionState($select);

        const value = getValue($select);
        const text = getText($select);

        updateSelectedText($select);
        updateInput($select);

        if (typeof $select.data("onSelect") === "function") {
            $select.data("onSelect")(value, text);
        }

        $select.trigger("change.customSelect", [value, text]);
    }

    function unselect($select, value) {
        if (!canClear($select)) return;

        const $option = getNormalOptions($select).filter(function () {
            return getOptionValue($(this)) === value;
        });

        if (!$option.length) return;

        setOptionSelected($option, false);
        updateValue($select);
    }

    function close($select) {
        $select.removeClass(ACTIVE_CLASS);
        $select.find(SELECTED).attr("aria-expanded", "false");
    }

    function closeAll($except) {
        $(SELECTOR)
            .not($except || $())
            .each(function () {
                close($(this));
            });
    }

    function open($select) {
        const $selectedOption = getSelectedOptions($select).first();
        const $firstOption = $select.find(OPTION).not("[hidden]").first();
        const $target = $selectedOption.length ? $selectedOption : $firstOption;

        closeAll($select);

        $select.addClass(ACTIVE_CLASS);
        $select.find(SELECTED).attr("aria-expanded", "true");

        $target.focus();
    }

    function toggle($select) {
        const isOpen = $select.find(SELECTED).attr("aria-expanded") === "true";

        if (isOpen) {
            close($select);
        } else {
            open($select);
        }
    }

    function selectOption($select, $option) {
        const multiple = isMultiple($select);
        const isAllOption = $option.hasClass(ALL_OPTION_CLASS);
        const isSelected = $option.attr("aria-selected") === "true";

        if (isAllOption) {
            if (!multiple) return;

            const nextSelected = !isSelected;

            getNormalOptions($select).each(function () {
                setOptionSelected($(this), nextSelected);
            });

            setOptionSelected($option, nextSelected);

            updateValue($select);
            return;
        }

        if (multiple) {
            setOptionSelected($option, !isSelected);
        } else {
            const nextSelected = hasPlaceholder($select) ? !isSelected : true;

            getNormalOptions($select).each(function () {
                setOptionSelected($(this), false);
            });

            setOptionSelected($option, nextSelected);

            close($select);
            $select.find(SELECTED).focus();
        }

        updateValue($select);
    }

    function focusOption($select, direction) {
        const $options = $select.find(OPTION).not("[hidden]");
        const $current = $(document.activeElement);

        let index = $options.index($current);

        if (index < 0) {
            index = 0;
        } else {
            index += direction;
        }

        if (index < 0) {
            index = $options.length - 1;
        }

        if (index >= $options.length) {
            index = 0;
        }

        $options.eq(index).focus();
    }

    function setA11y($select, index) {
        const $selectedBtn = $select.find(SELECTED);
        const $list = $select.find(LIST);
        const $options = $select.find(OPTION);
        const multiple = isMultiple($select);

        setDefaultText($select);

        let listId = $list.attr("id");

        if (!listId) {
            listId = `customSelectList${index + 1}`;
            $list.attr("id", listId);
        }

        $selectedBtn.attr({
            type: "button",
            "aria-haspopup": "listbox",
            "aria-expanded": "false",
            "aria-controls": listId,
        });

        $list.attr({
            role: "listbox",
        });

        if (multiple) {
            $list.attr("aria-multiselectable", "true");
            getAllOption($select).removeAttr("hidden");
        } else {
            $list.removeAttr("aria-multiselectable");
            getAllOption($select).attr("hidden", true);
        }

        const $allOption = getAllOption($select);
        const isAllChecked = multiple && $allOption.find(CHECKBOX).prop("checked") === true;

        let hasInitialSelected = false;

        $options.each(function (optionIndex) {
            const $option = $(this);
            const $checkbox = $option.find(CHECKBOX);
            const isAllOption = $option.hasClass(ALL_OPTION_CLASS);
            const checked = $checkbox.length ? $checkbox.prop("checked") === true : false;

            let selected = $option.attr("aria-selected") === "true" || checked;

            if (!$option.attr("id")) {
                $option.attr("id", `${listId}Option${optionIndex + 1}`);
            }

            $option.attr({
                role: "option",
                tabindex: "-1",
            });

            $checkbox.attr("tabindex", "-1");

            if (multiple) {
                if (isAllChecked && !isAllOption) {
                    selected = true;
                }
            } else {
                if (isAllOption) {
                    selected = false;
                } else if (selected && !hasInitialSelected) {
                    hasInitialSelected = true;
                } else {
                    selected = false;
                }
            }

            setOptionSelected($option, selected);
        });

        updateAllOptionState($select);
        updateSelectedText($select);
        updateInput($select);
    }

    function reset($select) {
        if (!canClear($select)) return;

        getNormalOptions($select).each(function () {
            setOptionSelected($(this), false);
        });

        getAllOption($select).each(function () {
            setOptionSelected($(this), false);
        });

        updateValue($select);
    }

    function bindEvents() {
        $(document)
            .off("click.customSelect")
            .on("click.customSelect", function (e) {
                if ($(e.target).closest(BOX_INNER).length) return;

                closeAll();
            });

        $(document)
            .off("keydown.customSelect")
            .on("keydown.customSelect", function (e) {
                if (e.key === "Escape") {
                    closeAll();
                }
            });

        $(SELECTOR)
            .off("click.customSelect", SELECTED)
            .on("click.customSelect", SELECTED, function (e) {
                e.preventDefault();
                e.stopPropagation();

                toggle($(this).closest(SELECTOR));
            });

        $(SELECTOR)
            .off("click.customSelect", CLOSE)
            .on("click.customSelect", CLOSE, function (e) {
                e.preventDefault();
                e.stopPropagation();

                close($(this).closest(SELECTOR));
                $(this).closest(SELECTOR).find(SELECTED).focus();
            });

        $(SELECTOR)
            .off("keydown.customSelect", SELECTED)
            .on("keydown.customSelect", SELECTED, function (e) {
                const $select = $(this).closest(SELECTOR);

                if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                    e.preventDefault();
                    open($select);
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    close($select);
                }
            });

        $(SELECTOR)
            .off("click.customSelect", OPTION)
            .on("click.customSelect", OPTION, function (e) {
                e.preventDefault();
                e.stopPropagation();

                selectOption($(this).closest(SELECTOR), $(this));
            });

        $(SELECTOR)
            .off("keydown.customSelect", OPTION)
            .on("keydown.customSelect", OPTION, function (e) {
                const $select = $(this).closest(SELECTOR);

                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectOption($select, $(this));
                }

                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    focusOption($select, 1);
                }

                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    focusOption($select, -1);
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    close($select);
                    $select.find(SELECTED).focus();
                }
            });
    }

    function init() {
        const $selects = $(SELECTOR);

        if (!$selects.length) return;

        $selects.each(function (index) {
            setA11y($(this), index);
        });

        bindEvents();
    }

    return {
        init,
        close,
        closeAll,
        unselect,
        reset,
    };
})();

//$select.trigger("change.customSelect", [value, text]);

/* =========================
   Etc
========================= */
function bindSwiperAutoplayToggle() {
    $(document)
        .off("click.swiperAutoplayToggle")
        .on("click.swiperAutoplayToggle", ".swiper-control__button--play", function () {
            const $button = $(this);
            const $swiper = $button.closest(".swiper");

            if (!$swiper.length) return;

            const swiper = $swiper[0].swiper;

            if (!swiper || !swiper.autoplay) return;

            const isPaused = $button.hasClass("is-paused");

            if (isPaused) {
                swiper.autoplay.start();
                $button.removeClass("is-paused").attr("aria-label", "슬라이드 정지");
            } else {
                swiper.autoplay.stop();
                $button.addClass("is-paused").attr("aria-label", "슬라이드 재생");
            }
        });
}

/* =========================
    Scroll Engine
    ========================= */
const scrollEngine = (function () {
    let triggers = [];
    let handler = null;

    function addTrigger(config) {
        triggers.push(config);
    }

    function clear() {
        triggers = [];
        destroy();
    }

    function init() {
        if (handler) return;

        handler = () => {
            const winH = window.innerHeight;
            const scrollTop = $(window).scrollTop();

            triggers.forEach(({ target, activeClass, offsetRatio }) => {
                target.each(function () {
                    const $el = $(this);
                    const top = $el.offset().top;

                    if (scrollTop + winH * offsetRatio > top && !$el.hasClass(activeClass)) {
                        $el.addClass(activeClass);
                    } else if (scrollTop + winH * offsetRatio <= top && $el.hasClass(activeClass)) {
                        $el.removeClass(activeClass);
                    }
                });
            });
        };

        $(window).on("scroll.scrollEngine", handler);
        handler();
    }

    function refresh() {
        handler && handler();
    }

    function destroy() {
        $(window).off("scroll.scrollEngine");
        handler = null;
    }

    return {
        addTrigger,
        clear,
        init,
        refresh,
        destroy,
    };
})();

/* =========================
   Layout Handler
========================= */
const LayoutHandler = createBreakpointHandler({
    breakpoint: 1024,
    namespace: ".layoutHandler",

    onReset: function () {
        $("html").removeClass("layout-pc layout-mo");

        Footer.reset();
    },

    onUnder: function () {
        // 1024 이하
        $("html").removeClass("layout-pc").addClass("layout-mo");

        Footer.enableMobile();
    },

    onOver: function () {
        // 1024 초과
        $("html").removeClass("layout-mo").addClass("layout-pc");

        Footer.enablePc();
    },

    onChange: function () {
        // breakpoint 변경
    },
});

/* =========================
   Footer Modal (Dialog Popup)
========================= */
const FooterModal = (function () {
    const ACTIVE_CLASS = "is-active";
    const LOCK_CLASS = "is-scroll-locked";
    const EVENT_NAMESPACE = ".footerModal";

    let lastFocusedElement = null;
    let $currentModal = null;

    function getFocusableElements($container) {
        return $container
            .find(["a[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[tabindex]:not([tabindex="-1"])'].join(","))
            .filter(":visible");
    }

    function openModal($modal, triggerElement) {
        if (!$modal || !$modal.length) return;

        if ($currentModal && $currentModal.length) {
            closeModal($currentModal, false);
        }

        lastFocusedElement = triggerElement || document.activeElement;
        $currentModal = $modal;

        $modal.addClass(ACTIVE_CLASS).attr("aria-hidden", "false");

        // 브라우저 렌더링 타이밍 보장 후 팝업 내부 첫 번째 요소로 확실하게 포커스 이동
        setTimeout(function () {
            const $focusable = getFocusableElements($modal.find(".footer-modal__dialog"));
            if ($focusable.length) {
                $focusable.first().focus();
            } else {
                $modal.find(".footer-modal__dialog").attr("tabindex", "-1").focus();
            }
        }, 50);

        bindEvents($modal);
    }

    function closeModal($modal, restoreFocus = true) {
        const $targetModal = $modal || $currentModal;
        if (!$targetModal || !$targetModal.length) return;

        $targetModal.removeClass(ACTIVE_CLASS).attr("aria-hidden", "true");

        unbindEvents();

        if (restoreFocus && lastFocusedElement) {
            try {
                lastFocusedElement.focus();
            } catch (e) { }
        }

        $currentModal = null;
    }

    function bindEvents($modal) {
        $(document)
            .off(`keydown${EVENT_NAMESPACE}`)
            .on(`keydown${EVENT_NAMESPACE}`, function (e) {
                // ESC 키로 닫기
                if (e.key === "Escape" || e.key === "Esc") {
                    closeModal($modal);
                    return;
                }

                // Tab 키 포커스 트랩
                if (e.key === "Tab") {
                    const $focusable = getFocusableElements($modal.find(".footer-modal__dialog"));
                    if (!$focusable.length) return;

                    const $first = $focusable.first();
                    const $last = $focusable.last();

                    if (e.shiftKey) {
                        if (document.activeElement === $first[0]) {
                            e.preventDefault();
                            $last.focus();
                        }
                    } else {
                        if (document.activeElement === $last[0]) {
                            e.preventDefault();
                            $first.focus();
                        }
                    }
                }
            });
    }

    function unbindEvents() {
        $(document).off(`keydown${EVENT_NAMESPACE}`);
    }

    function init() {
        $(document).on("click", ".js-footer-modal-trigger", function (e) {
            e.preventDefault();
            const targetSelector = $(this).data("modal-target") || $(this).attr("href");
            const $modal = $(targetSelector);
            openModal($modal, this);
        });

        $(document).on("click", ".js-footer-modal-close", function (e) {
            e.preventDefault();
            const $modal = $(this).closest(".footer-modal");
            closeModal($modal);
        });
    }

    return {
        init,
        open: openModal,
        close: closeModal,
    };
})();

/* =========================
   초기 실행 - 공통
========================= */
$(function () {
    Device.init();
    Header.init();
    Footer.init();
    FooterModal.init();
    LayoutHandler.init(true);

    // 탑버튼
    $(".js-back-to-top").on("click", function () {
        ScrollUtil.scrollTopReset(0.8);
    });

    // 뷰타입 버튼
    $(".view-buttons").each(function () {
        const $view = $(this);
        const targetSelector = $view.data("view-target");
        const $target = $(targetSelector);

        $view.find(".view-button").on("click", function () {
            const $button = $(this);
            const isGrid = $button.hasClass("view-button--grid");

            $button.addClass("is-active").siblings(".view-button").removeClass("is-active");

            $target.removeClass("type-grid type-list").addClass(isGrid ? "type-grid" : "type-list");
        });
    });
});


