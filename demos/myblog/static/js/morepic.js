//加载更多
$('#pageNo').val(1);
function getMoreSortAppInfo() {
	$('#morepic').hide();
	$('#loading').show();
	var pageNo = $('#pageNo').val();
	var pageCnt = $('#pageCnt').val();
	var fid = $('#fid').val();
	var line = $('#line').val(); 
	var order = $('#order').val(); 
	if (eval(pageNo) >= eval(pageCnt)) {
		$('#loading').hide();
		$('#noMore').show();
		return;
	} else {
		pageNo = eval(pageNo) + 1;
	}
	var error = 0;
	var type = $("#type").val();
	var toUrl='/title/morepic/'+pageNo;
	$.ajax({
		url: toUrl,
		type: 'GET',
		cache: false,
		dataType: 'text',
		complete: function() {
			$('#loading').hide();
			if (error == 1) {
				$('#morepic').html('重新加载');
				$('#noMore').show();
				$('#morepic').hide();
			} else {
				$('#morepic').html('点击加载更多内容&nbsp;&nbsp;&darr;');
				if (eval(pageNo) >= eval(pageCnt)) {
					$('#noMore').show();
				} else {
					$('#morepic').show();
				}
			}
		},
		success: function(data) {
			if (data) {
				$('#pic_list').append(data);
				$('#pageNo').val(pageNo);
			} else {
				error = 1;
			}
		},
		error: function() {
			error = 1;
		}
	});

}