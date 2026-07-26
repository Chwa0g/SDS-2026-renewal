$(function () {
    const $tabs = $(".tab-a a");

    if ($tabs.length) {
        $tabs.on("click", function (e) {
            e.preventDefault();

            const $tab = $(this);
            const type = $tab.index() === 0 ? "pc" : "mo";

            $tabs.removeClass("on");
            $tab.addClass("on");

            markupList(type);
        });

        $tabs.eq(0).trigger("click");
        return;
    }

    markupList("pc");
});

function markupList(type = "pc") {
    const isPc = type === "pc";
    const targetList = isPc ? markupPcList : markupMoList;

    let pageCnt = 0;
    let html = "";

    $(".urlList li:not(.head)").remove();
    $("h2").html(isPc ? "PC" : "MO");

    targetList.forEach((group) => {
        const depth1 = Object.keys(group)[0];
        const list = group[depth1];
        const isGuide = depth1 === "공통";

        html += `<li>`;
        html += `<ul class="sub${isGuide ? " guide" : ""}">`;

        list.forEach((item, index) => {
            if (!isGuide) {
                pageCnt++;
            }

            html += createMarkupItem({
                item,
                depth1,
                showDepth1: index === 0,
            });
        });

        html += `</ul>`;
        html += `</li>`;
    });

    $(".urlList").append(html);

    updateMarkupCount(pageCnt, targetList);
    updateAllEndState();
}

function createMarkupItem({ item, depth1, showDepth1 }) {
    const src = item.src || "";
    const [filePath, queryString] = src.split("?");
    const href = `/${filePath}.html${queryString ? `?${queryString}` : ""}`;

    return `
        <li class="${item.state || ""}">
            <div class="depth_1">${showDepth1 ? depth1 : ""}</div>
            <div class="depth_2">${item.depth2 || ""}</div>
            <div class="depth_3">${item.depth3 || ""}</div>
            <div class="depth_4">${item.depth4 || ""}</div>
            <div class="info">${item.info || ""}</div>
            <div class="fileName">
                <a href="${href}" target="_blank">
                    ${filePath}
                </a>
            </div>
        </li>
    `;
}

function updateMarkupCount(pageCnt, targetList) {
    const endCnt = $(".sub:not(.guide) .end").length;
    const endPercent = pageCnt > 0 ? ((endCnt / pageCnt) * 100).toFixed(1) : "0.0";

    const totalListCnt = targetList.reduce((acc, group) => {
        const depth1 = Object.keys(group)[0];
        const list = group[depth1];

        if (depth1 === "공통") {
            return acc;
        }

        return acc + list.length;
    }, 0);

    $("#totalCnt").html(pageCnt);
    $("#endCnt").html(endCnt);
    $("#endCntP").html(endPercent);
    $("#depth1Cnt").text(totalListCnt);
}

function updateAllEndState() {
    $(".sub").each(function () {
        const $sub = $(this);
        const totalCnt = $sub.find("> li").length;
        const endCnt = $sub.find("> li.end").length;

        $sub.parent().toggleClass("allEnd", totalCnt > 0 && totalCnt === endCnt);
    });
}
