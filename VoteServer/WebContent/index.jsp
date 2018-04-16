<!--中文编码设置-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
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
		var checkbox = document.getElementsByName("chkTribes");
		for (var i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = obj.checked;
		}
	}

	function del() {

		//客户端验证，验证是否选中
		var ch = document.getElementsByName("chkTribes");
		var checkcount = 0;
		for (var i = 0; i < ch.length; i++) {
			if (ch[i].checked == true) {
				checkcount++;
			}
		}
		if (checkcount == 0) {
			alert("请至少选择一个部落！");

		} else {
			var oForm = document.getElementsByName("frmAction")[0];
			oForm.action = "/HomeMaking/DeleteTribeServlet";
			oForm.submit();
			alert("删除成功");
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
	<form name="frmAction" method="post">
		<!--header-->
		<header>
			<h1>
				<img src="images/admin_logo.png" />
			</h1>
			<ul class="rt_nav">
				<li><a href="/HomeMaking/login.html" class="quit_icon">安全退出</a></li>
			</ul>
		</header>

		<!--aside nav-->
		<aside class="lt_aside_nav content mCustomScrollbar">
			<h2>列表项</h2>
			<ul>
				<li>
					<dl>
						<!--当前链接则添加class:active-->
						<dd>
							<a href="/HomeMaking/ListUserServlet" class="active">用户列表</a>
						</dd>
						<dd>
							<a href="/HomeMaking/ListServersServlet" class="active">服务列表</a>
						</dd>
						<dd>
							<a href="/HomeMaking/ListCleanersServlet" class="active">员工列表</a>
						</dd>
						<dd>
							<a href="/HomeMaking/ListOrdersServlet" class="active">订单列表</a>
						</dd>
					</dl>
				</li>

			</ul>
		</aside>
		<section class="rt_wrap content mCustomScrollbar">
			<img src="index.jpg" width="830" height="600"> 
		</section>
	</form>
</body>
</html>
