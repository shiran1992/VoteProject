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
		var checkbox = document.getElementsByName("chkServers");
		for (var i = 0; i < checkbox.length; i++) {
			checkbox[i].checked = obj.checked;
		}
	}

	function del() {

		//客户端验证，验证是否选中
		var ch = document.getElementsByName("chkServers");
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
		var ch = document.getElementsByName("chkServers");
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
			oForm.action = "/HomeMaking/ShowServerServlet";
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
			<div class="rt_content">

				<section class="loading_area">
					<div class="loading_cont">
						<div class="loading_icon">
							<i></i><i></i><i></i><i></i><i></i>
						</div>
						<div class="loading_txt">
							<mark>数据正在加载，请稍后！</mark>
						</div>
					</div>
				</section>
				<!--结束加载-->
				<!--弹出框效果-->
				<script>
					$(document).ready(function() {
						//弹出文本性提示框
						$("#showPopTxt").click(function() {
							$(".pop_bg").fadeIn();
						});
						//弹出：确认按钮
						$(".trueBtn").click(function() {
							alert("你点击了确认！");//测试
							$(".pop_bg").fadeOut();
						});
						//弹出：取消或关闭按钮
						$(".falseBtn").click(function() {
							alert("你点击了取消/关闭！");//测试
							$(".pop_bg").fadeOut();
						});
					});
				</script>

				<section>
					<button class="link_btn" id="loading" onclick="del()">删除服务</button>
					<button class="link_btn" id="loading"
						onclick="window.location.href='add_server.html'">增加服务</button>
					<button class="link_btn" id="loading" onclick="change()">修改服务</button>
				</section>
				<section></section>
				<section>
					<table class="table">
						<tr align="center" class="colom">
							<td><input type="checkBox" name="chkAll"
								onClick="selectAll()" /></td>
							<td align='center'>id</td>
							<td>名字</td>
							<td>图片</td>
							<td>价格</td>
							<td>人员</td>
							<td>介绍</td>
							<td>状态</td>
						</tr>
						<c:forEach var="server" items="${servers}">
							<tr class='even'>
								<td align='center'><input type='checkbox' name='chkServers'
									value='${server.sid}'></td>
								<td align='center'><c:out value="${server.sid}"></c:out></td>
								<td align=center><c:out value="${server.name}"></c:out></td>
								<td align=center><c:out value="${server.image}"></c:out></td>
								<td align=center><c:out value="${server.price}"></c:out></td>
								<td align=center><c:out value="${server.cleaner.name}"></c:out></td>
								<td align=center><c:out value="${server.intro}"></c:out></td>
								<td align=center><c:out value="${server.state}"></c:out></td>
							</tr>
						</c:forEach>

					</table>
				</section>

				<!--tabStyle-->
				<script>
					$(document).ready(
							function() {
								//tab
								$(".admin_tab li a").click(
										function() {
											var liindex = $(".admin_tab li a")
													.index(this);
											$(this).addClass("active").parent()
													.siblings().find("a")
													.removeClass("active");
											$(".admin_tab_cont").eq(liindex)
													.fadeIn(150).siblings(
															".admin_tab_cont")
													.hide();
										});
							});
				</script>
			</div>
		</section>
	</form>
</body>
</html>
