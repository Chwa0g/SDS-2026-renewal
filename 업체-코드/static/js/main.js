// KV 스와이퍼
function createMainSwiper(key, selector, isLoop, duration = 3000, autoplayState = "playing") {
    const options = isLoop
        ? {
              slidesPerView: 1,
              loop: true,
              autoplay: {
                  delay: duration,
                  disableOnInteraction: false,
              },
              pagination: {
                  el: `${selector} .swiper-pagination`,
                  clickable: true,
                  renderBullet(index, className) {
                      return `
                        <button
                            type="button"
                            class="${className}"
                            aria-label="${index + 1}번째 슬라이드로 이동"
                        >
                            <span class="swiper-pagination-bullet__number">
                                ${String(index + 1).padStart(2, "0")}
                            </span>
                            <span class="swiper-pagination-bullet__bar"></span>
                        </button>
                    `;
                  },
              },
              navigation: {
                  prevEl: `${selector} .swiper-control__button--prev`,
                  nextEl: `${selector} .swiper-control__button--next`,
              },
          }
        : {
              slidesPerView: 1,
              watchOverflow: true,
              loop: true,
              pagination: {
                  el: `${selector} .swiper-pagination`,
                  type: "bullets",
              },
              navigation: {
                  prevEl: `${selector} .swiper-control__button--prev`,
                  nextEl: `${selector} .swiper-control__button--next`,
              },
          };

    const mainKVSwiper = createResponsiveSwiper(
        [
            {
                key,
                selector,
                always: true,
                options,
            },
        ],
        {
            breakpoint: null,
            namespace: `.${key}`,
        },
    );

    mainKVSwiper.init();

    if (autoplayState === "paused") {
        const swiperEl = document.querySelector(selector);
        const swiper = swiperEl && swiperEl.swiper;

        if (swiper && swiper.autoplay) {
            swiper.autoplay.stop();

            if ($(selector).find(".swiper-control__button--play").length > 0) $(selector).find(".swiper-control__button--play").addClass("is-paused").attr("aria-label", "슬라이드 재생");
        }
    }

    return mainKVSwiper;
}

$(function () {
    countUp.init($(document), {
        duration: 2000,
        stagger: 70, //ms
        threshold: 0.4, //IntersectionObserver 옵션
        repeat: true,
        loopCount: 2, //턴 수
    });

    // KV
    const mainKvSwiperHero = createMainSwiper("mainKvSwiperHero", ".main-kv__swiper--hero", true, 7000);

    const mainKvSwiper01 = createMainSwiper("mainKvSwiper01", ".main-kv__swiper--insight");
    const mainKvSwiper02 = createMainSwiper("mainKvSwiper02", ".main-kv__swiper--resource");
    const mainKvSwiper03 = createMainSwiper("mainKvSwiper03", ".main-kv__swiper--summit");
    const mainKvSwiper04 = createMainSwiper("mainKvSwiper04", ".main-kv__swiper--case", true, 5000, "paused");
    const mainKvSwiper05 = createMainSwiper("mainKvSwiper05", ".main-kv__swiper--news");
    // promotion
    const mainPromotionSwiper01 = createMainSwiper("mainPromotionSwiper01", ".main-promotion__swiper--event", true, 5000, "paused");
    const mainPromotionSwiper02 = createMainSwiper("mainPromotionSwiper02", ".main-promotion__swiper--award", true, 5000, "paused");

    // insight
    const MainInsightSwiper = (function () {
        const SELECTOR = ".main-insight__swiper";

        let swiper = null;

        function init() {
            if (swiper) return;
            if (!$(SELECTOR).length) return;

            swiper = new Swiper(`${SELECTOR} .swiper`, {
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: `${SELECTOR} .swiper-pagination`,
                    clickable: true,
                    renderBullet(index, className) {
                        return `
                        <button
                            type="button"
                            class="${className}"
                            aria-label="${index + 1}번째 슬라이드로 이동"
                        >
                            <span class="swiper-pagination-bullet__number">
                                ${String(index + 1).padStart(2, "0")}
                            </span>
                            <span class="swiper-pagination-bullet__bar"></span>
                        </button>
                    `;
                    },
                },
                navigation: {
                    prevEl: `${SELECTOR} .swiper-control__button--prev`,
                    nextEl: `${SELECTOR} .swiper-control__button--next`,
                },
            });
        }

        function destroy() {
            if (!swiper) return;

            swiper.destroy(true, true);
            swiper = null;
        }

        return {
            init,
            destroy,
        };
    })();

    const MainInsight = (function () {
        const SWIPER_SELECTOR = ".main-insight__swiper";
        const LIST_SELECTOR = ".main-insight__list";
        const ITEM_SELECTOR = ".main-insight__item";
        const BUTTON_SELECTOR = ".main-insight__button";
        const DESCRIPTION_SELECTOR = ".main-insight__description--footer";
        const PAGINATION_SELECTOR = ".swiper-pagination";
        const BULLET_SELECTOR = ".swiper-pagination-bullet";
        const PREV_SELECTOR = ".swiper-control__button--prev";
        const NEXT_SELECTOR = ".swiper-control__button--next";

        const ACTIVE_CLASS = "is-active";
        const CLONE_CLASS = "is-clone";
        const PASSING_CLASS = "is-passing";
        const POS_PREFIX = "is-pos-";

        const WIDTH_RATIOS = [67, 16, 10, 4, 1, 1, 1];

        const SPEED = 600;
        const EASING = "ease";

        let $swiper = $();
        let $list = $();

        let isAnimating = false;
        let isKeyboardAction = false;

        let $focusTarget = $();

        let resizeTimer = null;

        function init() {
            $swiper = $(SWIPER_SELECTOR);
            $list = $(LIST_SELECTOR);

            if (!$list.length) return;

            if (!$swiper.length) {
                $swiper = $list.closest(SWIPER_SELECTOR);
            }

            if (!$swiper.length) {
                $swiper = $list;
            }

            setup();
            bind();
        }

        function setup() {
            removeClones();
            resetTransform(false);
            renderPagination();
            applyNormalState(false);
        }

        function restoreOriginalOrder() {
            const $realItems = getRealItems();

            $(
                $realItems.toArray().sort(function (a, b) {
                    return Number($(a).attr("data-index")) - Number($(b).attr("data-index"));
                }),
            ).appendTo($list);
        }

        function renderPagination() {
            const $pagination = $swiper.find(PAGINATION_SELECTOR).first();
            const itemLength = getRealItems().length;

            if (!$pagination.length) return;

            let html = "";

            for (let index = 0; index < itemLength; index++) {
                html += `
                <button
                    type="button"
                    class="swiper-pagination-bullet"
                    aria-label="${index + 1}번째 슬라이드로 이동"
                    data-index="${index}"
                >
                    <span class="swiper-pagination-bullet__number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>
                    <span class="swiper-pagination-bullet__bar"></span>
                </button>
            `;
            }

            $pagination.html(html);
        }

        function updatePaginationByItem($item) {
            if (!$item || !$item.length) return;

            const activeIndex = Number($item.attr("data-index"));
            const $bullets = $swiper.find(BULLET_SELECTOR);

            if (Number.isNaN(activeIndex) || !$bullets.length) return;

            $bullets.removeClass("swiper-pagination-bullet-active").removeAttr("aria-current");

            $bullets.filter(`[data-index="${activeIndex}"]`).addClass("swiper-pagination-bullet-active").attr("aria-current", "true");
        }

        function slideToOriginalIndex(targetIndex) {
            if (isAnimating) return;

            const $realItems = getRealItems();

            const $targetItem = $realItems.filter(function () {
                return Number($(this).attr("data-index")) === targetIndex;
            });

            if (!$targetItem.length) return;

            const step = $realItems.index($targetItem);

            if (step <= 0) return;

            slideTo(step);
        }

        function bindControl() {
            $swiper.off(".mainInsightControl");

            $swiper.on("click.mainInsightControl", BULLET_SELECTOR, function () {
                const targetIndex = Number($(this).attr("data-index"));

                if (Number.isNaN(targetIndex)) return;

                slideToOriginalIndex(targetIndex);
            });

            $swiper.on("click.mainInsightControl", NEXT_SELECTOR, function () {
                if (isAnimating || getRealItems().length <= 1) return;

                slideTo(1);
            });

            $swiper.on("click.mainInsightControl", PREV_SELECTOR, function () {
                const itemLength = getRealItems().length;

                if (isAnimating || itemLength <= 1) return;

                slideTo(itemLength - 1);
            });
        }

        function bindResize() {
            $(window).off(".mainInsightResize");

            if (Device.isMobile()) {
                $(window).on("orientationchange.mainInsightResize", function () {
                    clearTimeout(resizeTimer);

                    resizeTimer = setTimeout(function () {
                        if (isAnimating) return;

                        setup();
                    }, 300);
                });

                return;
            }

            $(window).on("resize.mainInsightResize", function () {
                clearTimeout(resizeTimer);

                resizeTimer = setTimeout(function () {
                    if (isAnimating) return;

                    setup();
                }, 150);
            });
        }

        function bind() {
            $list.off(".mainInsight");

            $list.on("keydown.mainInsight", BUTTON_SELECTOR, function (e) {
                if (e.key !== "Enter" && e.key !== " ") return;

                isKeyboardAction = true;
                $focusTarget = $(this);
            });

            $list.on("click.mainInsight", BUTTON_SELECTOR, function (e) {
                if (isAnimating) return;

                const $button = $(this);
                const $item = $button.closest(ITEM_SELECTOR);

                if ($item.hasClass(CLONE_CLASS)) return;

                const isMouseClick = e.originalEvent && typeof e.originalEvent.detail === "number" && e.originalEvent.detail > 0;

                if (isMouseClick) {
                    isKeyboardAction = false;
                    $focusTarget = $();
                }

                const $realItems = getRealItems();
                const clickedIndex = $realItems.index($item);

                if (clickedIndex < 0) {
                    clearKeyboardState();
                    return;
                }

                if (clickedIndex === 0) {
                    clearKeyboardState();
                    return;
                }

                slideTo(clickedIndex);
            });

            bindControl();
            bindResize();
        }

        function slideTo(step) {
            const $realItems = getRealItems();

            if (step <= 0) {
                clearKeyboardState();
                return;
            }

            if (step >= $realItems.length) {
                clearKeyboardState();
                return;
            }

            isAnimating = true;

            removeClones();

            const $movingItems = $realItems.slice(0, step);
            const $clones = $movingItems.clone(false);

            $clones.addClass(CLONE_CLASS).removeClass(ACTIVE_CLASS).attr("aria-hidden", "true");

            $clones.find("a, button, input, select, textarea, [tabindex]").attr("tabindex", "-1");

            $list.append($clones);

            resetTransform(false);
            applyNormalStateWithClones(step, false);

            forceReflow();

            requestAnimationFrame(function () {
                const shiftX = getPassWidth(step);

                applyTargetState(step, true);

                $list.css({
                    transition: `transform ${SPEED}ms ${EASING}`,
                    transform: `translateX(${-shiftX}px)`,
                });
            });

            clearTimeout($list.data("mainInsightTimer"));

            const timer = setTimeout(function () {
                finishSlide(step);
            }, SPEED + 40);

            $list.data("mainInsightTimer", timer);
        }

        function finishSlide(step) {
            const $realItems = getRealItems();
            const $movingItems = $realItems.slice(0, step);

            $list.append($movingItems);

            removeClones();

            resetTransform(false);
            applyNormalState(false);

            isAnimating = false;

            if (isKeyboardAction && $focusTarget.length && $.contains(document, $focusTarget[0])) {
                $focusTarget.trigger("focus");
            }

            clearKeyboardState();
        }

        function applyNormalState(animate) {
            const swiperWidth = getSwiperWidth();
            const $realItems = getRealItems();

            setItemTransition(animate);
            clearItemState($realItems);

            $realItems.each(function (index) {
                const $item = $(this);
                const ratio = getNormalRatio(index);

                applyWidth($item, ratio, swiperWidth);
                $item.addClass(`${POS_PREFIX}${index}`);
            });

            $realItems.eq(0).addClass(ACTIVE_CLASS);

            updateDescriptionByItem($realItems.eq(0));
            updatePaginationByItem($realItems.eq(0));
        }

        function applyNormalStateWithClones(step, animate) {
            const swiperWidth = getSwiperWidth();
            const $realItems = getRealItems();
            const $clones = getCloneItems();

            setItemTransition(animate);
            clearItemState($realItems);
            clearItemState($clones);

            $realItems.each(function (index) {
                const $item = $(this);
                const ratio = getNormalRatio(index);

                applyWidth($item, ratio, swiperWidth);
                $item.addClass(`${POS_PREFIX}${index}`);
            });

            $clones.each(function (index) {
                const $clone = $(this);
                const pos = WIDTH_RATIOS.length - step + index;
                const ratio = getNormalRatio(pos);

                applyWidth($clone, ratio, swiperWidth);
                $clone.addClass(`${POS_PREFIX}${pos}`);
            });

            $realItems.eq(0).addClass(ACTIVE_CLASS);
        }

        function applyTargetState(step, animate) {
            const swiperWidth = getSwiperWidth();
            const $realItems = getRealItems();
            const $clones = getCloneItems();

            setItemTransition(animate);
            clearItemState($realItems);
            clearItemState($clones);

            $realItems.each(function (index) {
                const $item = $(this);

                if (index < step) {
                    const pos = WIDTH_RATIOS.length - step + index;
                    const ratio = getNormalRatio(pos);

                    applyWidth($item, ratio, swiperWidth);

                    $item.addClass(PASSING_CLASS).addClass(`${POS_PREFIX}${pos}`);

                    return;
                }

                const pos = index - step;
                const ratio = getNormalRatio(pos);

                applyWidth($item, ratio, swiperWidth);
                $item.addClass(`${POS_PREFIX}${pos}`);
            });

            $clones.each(function (index) {
                const $clone = $(this);
                const pos = WIDTH_RATIOS.length - step + index;
                const ratio = getNormalRatio(pos);

                applyWidth($clone, ratio, swiperWidth);
                $clone.addClass(`${POS_PREFIX}${pos}`);
            });

            $realItems.eq(step).addClass(ACTIVE_CLASS);

            updateDescriptionByItem($realItems.eq(step));
            updatePaginationByItem($realItems.eq(step));
        }

        function updateDescriptionByItem($item) {
            if (!$item || !$item.length) return;

            const descriptionIndex = Number($item.attr("data-index"));

            if (Number.isNaN(descriptionIndex)) return;

            $(DESCRIPTION_SELECTOR).removeClass(ACTIVE_CLASS).eq(descriptionIndex).addClass(ACTIVE_CLASS);
        }

        function getPassWidth(step) {
            const swiperWidth = getSwiperWidth();

            let moveRatio = 0;

            for (let i = 0; i < step; i++) {
                const pos = WIDTH_RATIOS.length - step + i;

                moveRatio += getNormalRatio(pos);
            }

            return getWidthByRatio(swiperWidth, moveRatio);
        }

        function applyWidth($item, ratio, swiperWidth) {
            const width = getWidthByRatio(swiperWidth, ratio);

            $item.css({
                width: `${width}px`,
            });
        }

        function getNormalRatio(index) {
            return WIDTH_RATIOS[index] || WIDTH_RATIOS[WIDTH_RATIOS.length - 1];
        }

        function getWidthByRatio(swiperWidth, ratio) {
            return swiperWidth * (ratio / 100);
        }

        function getSwiperWidth() {
            return $swiper.width();
        }

        function setItemTransition(animate) {
            const $items = getAllItems();

            if (!$items.length) return;

            const transition = animate ? `width ${SPEED}ms ${EASING}` : "none";

            $items.css("transition", transition);

            if (!animate) {
                forceReflow();
                $items.css("transition", "");
            }
        }

        function clearItemState($items) {
            $items.each(function () {
                const $item = $(this);

                $item.removeClass(ACTIVE_CLASS).removeClass(PASSING_CLASS);

                for (let i = 0; i < WIDTH_RATIOS.length; i++) {
                    $item.removeClass(`${POS_PREFIX}${i}`);
                }
            });
        }

        function resetTransform(animate) {
            $list.css({
                transition: animate ? `transform ${SPEED}ms ${EASING}` : "none",
                transform: "translateX(0)",
            });

            if (!animate) {
                forceReflow();

                $list.css({
                    transition: "",
                });
            }
        }

        function clearKeyboardState() {
            isKeyboardAction = false;
            $focusTarget = $();
        }

        function removeClones() {
            $list.children(`.${CLONE_CLASS}`).remove();
        }

        function getRealItems() {
            return $list.children(`${ITEM_SELECTOR}:not(.${CLONE_CLASS})`);
        }

        function getCloneItems() {
            return $list.children(`${ITEM_SELECTOR}.${CLONE_CLASS}`);
        }

        function getAllItems() {
            return $list.children(ITEM_SELECTOR);
        }

        function forceReflow() {
            if (!$list.length) return;

            $list[0].offsetHeight;
        }

        function reset() {
            clearTimeout($list.data("mainInsightTimer"));
            clearTimeout(resizeTimer);

            isAnimating = false;

            clearKeyboardState();

            $(window).off(".mainInsightResize");
            $swiper.off(".mainInsightControl");

            if ($list.length) {
                $list.off(".mainInsight");

                removeClones();
                restoreOriginalOrder();

                resetTransform(false);
                applyNormalState(false);
            }
        }

        return {
            init,
            reset,
        };
    })();

    // service 스와이퍼
    const mainServiceSwiper = createResponsiveSwiper(
        [
            {
                key: "mainService",
                selector: ".main-service__swiper",
                always: true,
                options: {
                    slidesPerView: 1.6,
                    spaceBetween: 15,
                    pagination: {
                        el: ".main-service__swiper .swiper-pagination",
                        clickable: true,
                        renderBullet(index, className) {
                            return `
                        <button
                            type="button"
                            class="${className}"
                            aria-label="${index + 1}번째 슬라이드로 이동"
                        >
                            <span class="swiper-pagination-bullet__number">
                                ${String(index + 1).padStart(2, "0")}
                            </span>
                            <span class="swiper-pagination-bullet__bar"></span>
                        </button>
                    `;
                        },
                    },
                    navigation: {
                        prevEl: ".main-service__swiper .swiper-control__button--prev",
                        nextEl: ".main-service__swiper .swiper-control__button--next",
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2.7,
                            spaceBetween: 15,
                        },
                        1300: {
                            slidesPerView: 3.8,
                            spaceBetween: 24,
                        },
                    },
                },
            },
        ],
        {
            breakpoint: null,
            namespace: ".mainServiceSwiper",
        },
    );
    mainServiceSwiper.init();

    // 자동재생
    bindSwiperAutoplayToggle();

    // 링크
    // $(".js-link-group").each(function () {
    //     const $group = $(this);
    //     const $more = $group.find(".js-link-more");

    //     $more.on("click", function () {
    //         const $activeItem = $group.find(".js-link-item").filter(".swiper-slide-active, .is-active").first();
    //         const href = $activeItem.data("href");
    //         const target = $activeItem.data("target");

    //         if (!href) return;

    //         if (target === "_blank") {
    //             window.open(href, "_blank");
    //             return;
    //         }

    //         window.location.href = href;
    //     });
    // });

    const MainHandler = createBreakpointHandler({
        breakpoint: 1024,
        namespace: ".mainHandler",

        onReset: function () {
            MainInsight.reset();
            MainInsightSwiper.destroy();
        },

        onUnder: function () {
            // 1024 이하
            MainInsight.reset();
            setTimeout(() => {
                MainInsightSwiper.init();
            }, 600);
        },

        onOver: function () {
            // 1024 초과
            MainInsightSwiper.destroy();
            MainInsight.init();
        },
    });

    if ($(".main-insight").length) {
        MainHandler.init(true);
    }
});
