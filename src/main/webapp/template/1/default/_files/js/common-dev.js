/**
 * 加载更多记录<p/> 调用处需自行实现getOneRecordHTML(jsonObj)方法生成HTML代码
 * 
 * @param targetId
 */
function loadMore(ctx, targetId, type) {
	var url = null;
	switch (type) {
	case 'info':
		url = ctx + "/ajaxInfo/" + targetId + ".jspx";
		break;
	case 'tag':
		url = ctx + "/ajaxTag/" + targetId + ".jspx";
		break;
	case 'search':
		url = ctx + "/ajaxSearch.jspx";
		break;
	case 'course':
		url = ctx + "/ajaxCourse.jspx";
	}
	var loadCount = 4;
	var offset = $("#offset")[0].innerHTML;
	// ajax post method
	$.post(url, {
		q : targetId,
		offset : Number(offset) + 1,
		count : loadCount
	}, function(data, status) {
		var json = eval(data);
		$.each(json, function(index, item) {
			var oldMsg = $("#show_more_list")[0].innerHTML;
			$("#show_more_list")[0].innerHTML = oldMsg + "<br/>"
					+ getOneRecordHTML(json[index]);
			$("#offset")[0].innerHTML = ++offset;
		});
		if (json.length <= 0) {
			//$(".get_more")[0].innerHTML = "--- 到底了 ---";
			$("#more_button").html("--- 到底了 ---");
		}
	});
}

// 生成标签
function genTagHtml(infoObj) {
	if (infoObj.tagIds == null || infoObj.tagIds == undefined
			|| infoObj.tagIds.length == 0) {
		return '';
	}
	var tagHtml = '';
	for ( var i = 0; i < infoObj.tagIds.length; i++) {
		tagHtml += '<a href="../tag/' + infoObj.tagIds[i] + '.jspx">'
				+ infoObj.tagNames[i] + '</a>';
	}
	return '<div class="tags"><span class="icon-tag"></span>' + tagHtml
			+ '</div>';
}