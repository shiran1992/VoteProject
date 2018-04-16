<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改部落</title>
<link rel=stylesheet href="css/demo.css" type="text/css">
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<script src='common/date/date.js'></script>
<script src="jquery-1.11.1.js"></script>
<script>
function isTNameUnique(){
	//alert("ok");
	var req = new XMLHttpRequest();
	//取出输入的学号
	var tname =document.getElementsByName("tName")[0].value;
	//alert(tname);
	req.onreadystatechange = function(){
		
		if(req.readyState ==4 && req.status ==200){
			var flag =req.responseText;
			if(flag == 1){
				alert("可使用");
			}else{
				alert("已存在");
			}
		}
		
	}
	req.open("GET","/Corporation/isTNameUniqueSrevlet?tName="+tname,true);
	req.send(null);
}

function isPresidentExist(){
	//alert("ok");
	var req1 = new XMLHttpRequest();
	//取出输入的学号
	var sno =document.getElementsByName("president")[0].value;
	//alert(sno);
	req1.onreadystatechange = function(){
		
		if(req1.readyState ==4 && req1.status ==200){
			var flag =req1.responseText;
			if(flag == 1){
				alert("该学生不存在");
			}else{
				alert("存在该学生");
			}
		}
		
	}
	req1.open("GET","/Corporation/IsPresidentExist?president="+sno,true);
	req1.send(null);
}

function go()
{
window.history.go(-1);
}

</Script>


<body  topmargin="10" leftmargin="10"  >
	<form name="frmAction"  method="post" action="/Corporation/UpdateTribeServlet" >
<header>
 <h1><img src="images/admin_logo.png"/></h1>
 <ul class="rt_nav">
  <li><a href="/Corporation/ListTribeServlet?curPage=1" target="_blank" class="website_icon">站点首页</a></li>
  <li><a href="/Corporation/login.html" class="quit_icon">安全退出</a></li>
 </ul>
</header>
	<table width="95%" border="0" cellpadding="3" cellspacing="1" class="toolBar" align="center">
      		<tr align=left class="colom">
			<td colspan="2">修改部落</td>
		</tr>
		<tr class=even>
			<td width='100' align='right' nowrap>部落名&nbsp;</td>
			<td bgcolor='#ffffff'><input type="text" name="tName" value="${t.tName }"><font color=#ff0000>*</font>
			<input type="button" onclick="isTNameUnique()" name="isunique" value="检验部落是否唯一">
			<input type="hidden" name="tId" value="${t.tId}"/></td>
			
		</tr>
		<tr class=even>
			<td width='100' align='right' nowrap>主席学号&nbsp;</td>
			<td bgcolor='#ffffff'><input type="text" name="president" value="${t.user.getUserId() }"><font color=#ff0000>*</font>
			<input type="button" onclick="isPresidentExist()" name="isExist" value="检验主席学号是否存在"></td>
		</tr>
		<tr class=even>
			<td width='100' align='right' nowrap>创建时间&nbsp;</td>
			<td bgcolor='#ffffff'>
				<input type="text" name="tTime" >
			</td>
		</tr>
		
		<tr class=even>
			<td width='100' align='right' nowrap>部落类型&nbsp;</td>
			<td bgcolor='#ffffff'><input type="radio" value="1" name="tType" <c:if test="${t.tType==1}" >checked</c:if>>社团
								  <input type="radio" value="0" name="tType" <c:if test="${t.tType==0}" >checked</c:if>>学生组织
			</td>				
		</tr>
		<tr class=even>
			<td width='100' align='right' nowrap>图标&nbsp;</td>
			<td bgcolor='#ffffff'><input type="file" cols=30 rows=5 name="tPicture" value="${t.tPicture }">
			</td>
		</tr>
		<tr class=even>
			<td width='100' align='right' nowrap>简介&nbsp;</td>
			<td bgcolor='#ffffff'><textarea cols=30 rows=5 name="tBrief" value="${t.tBrief }" ></textarea>
			</td>
		</tr>
		

		<tr class=even>
		   	<td  height=35 colspan="2" >
	   			<input type="submit" value="提交" >
				<input class="input" type="button" value="返回" onclick="javascript:history.go(-1)" >
		   </td>
		</tr>        
	</table>
	</form>
	<iframe name='hideFrame' style="display:none"></iframe>
	
	<script language="javascript">
     var now=new Date();
     frmAction.tTime.value=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
     </script>
</body>
</html>