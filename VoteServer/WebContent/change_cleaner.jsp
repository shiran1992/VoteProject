<!--中文编码设置-->
<%@ page language="java" contentType="text/html; charset=gbk"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta charset="utf-8" />
<title>家政服务后台管理系统</title>
<meta name="author" content="DeathGhost" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<!--[if lt IE 9]>
<script src="js/html5.js"></script>
<![endif]-->
<script src="js/jquery.js"></script>
<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
<script>
	function selectAll() {
		var obj = document.getElementsByName("chkAll")[0];
		var checkbox = document.getElementsByName("chkCleaners");
		for (var i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = obj.checked;
		}
	}

	function del() {

		//客户端验证，验证是否选中
		var ch = document.getElementsByName("chkCleaners");
		var checkcount = 0;
		for (var i = 0; i < ch.length; i++) {
			if (ch[i].checked == true) {
				checkcount++;
			}
		}
		if (checkcount == 0) {
			alert("请至少选择一个用户！");

		} else {
			var oForm = document.getElementsByName("frmAction")[0];
			oForm.action = "/HomeMaking/DeleteServerServlet";
			oForm.submit();
		}
	}

	function change() {
		//客户端验证，验证是否选中
		var ch = document.getElementsByName("chkCleaners");
		var checkcount = 0;
		for (var i = 0; i < ch.length; i++) {
			if (ch[i].checked == true) {
				checkcount++;
			}
		}
		if (checkcount == 0 || checkcount > 1) {
			alert("请选择一个用户！");
		}else {
			var oForm = document.getElementsByName("frmAction")[0];
			oForm.action = "/HomeMaking/ShowCleanerServlet";
			oForm.submit();
		}
	}

	(function($) {
		$(window).load(
				function() {

					$("a[rel='load-content']").click(
							function(e) {
								e.preventDefault();
								var url = $(this).attr("href");
								$.get(url, function(data) {
									$(".content .mCSB_container").append(data); //load new content inside .mCSB_container
									//scroll-to appended content 
									$(".content").mCustomScrollbar("scrollTo",
											"h2:last");
								});
							});

					$(".content").delegate(
							"a[href='top']",
							"click",
							function(e) {
								e.preventDefault();
								$(".content").mCustomScrollbar("scrollTo",
										$(this).attr("href"));
							});

				});
	})(jQuery);
</script>
</head>
<body>
	<form name="frmAction" method="post" enctype="multipart/form-data"
		action="/HomeMaking/ChangeCleanerServlet">
		<!--header-->
		<header>
			<h1>
				<img src="images/admin_logo.png" />
			</h1>
			<ul class="rt_nav">
				<li><a href="/HomeMaking/login.html" class="quit_icon">安全退出</a></li>
			</ul>
		</header>
		
		<table width="95%" border="0" cellpadding="3" cellspacing="1"
			class="toolBar" align="center">
			<tr align=left class="colom">
				<td colspan="2" height=35>修改员工</td>
			</tr>
			<input type="hidden" name="cid" value="${cleanerinfo.cid}">
			<tr class=even height=35>
				<td width='100' align='right' nowrap>名字&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="name" value="${cleanerinfo.name}"><font
					color=#ff0000>*</font>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>电话&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="phone" value="${cleanerinfo.phone}"><font
					color=#ff0000>*</font>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>照片&nbsp;</td>
				<td bgcolor='#ffffff'><input type="file" cols=30 rows=5
					name="file">${cleanerinfo.head}</td>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>性别&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="sex" value="${cleanerinfo.sex}"><font
					color=#ff0000>(1:男  0:女)</font>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>年龄&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="age" value="${cleanerinfo.age}">
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>婚姻状况&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="marrysta" value="${cleanerinfo.marrysta}"><font
					color=#ff0000>(1:已婚  0:未婚)</font>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>状态&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="state" value="${cleanerinfo.state}"><font
					color=#ff0000>(0:普通  2:本周之星)</font>
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>签名&nbsp;</td>
				<td bgcolor='#ffffff'><input type="text" name="sign" value="${cleanerinfo.sign}">
			</tr>
			<tr class=even height=35>
				<td width='100' align='right' nowrap>简介&nbsp;</td>
				<td bgcolor='#ffffff'><textarea cols=30 rows=5 name="intro">${cleanerinfo.intro}</textarea>
				</td>
			</tr>


			<tr class=even>
				<td height=35 colspan="2"><input type="submit" value="提交"
					method="post" action="/web/AddServer"> <input
					class="input" type="button" value="返回"
					onclick="javascript:history.go(-1)"></td>
			</tr>
		</table>

	</form>
</body>
</html>
