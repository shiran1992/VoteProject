package com.vote.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vote.entity.User;
import com.vote.entity.UserEntity;
import com.vote.service.UserService;

/**
 * Servlet implementation class RigesterServlet
 */
public class RigesterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RigesterServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String phone = request.getParameter("phone");
		String password = request.getParameter("password");
		UserService service = new UserService();
		// 数据库中不存在这个号码的学生，下面才可以注册

		User user = new User();
		user.setPassword(password);
		user.setPhone(phone);
		boolean saveInfo = service.saveUserInfo(user);
		if (saveInfo) {
			response.getWriter().write("true");
		} else {
			response.getWriter().write("false");
		}
	}

}
