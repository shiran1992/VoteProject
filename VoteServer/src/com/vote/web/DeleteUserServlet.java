package com.vote.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vote.service.UserService;

/**
 * Servlet implementation class DeleteTribeServlet
 */
public class DeleteUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] ids =request.getParameterValues("chkUsers");
		UserService service = new UserService();
		if(service.deleteUserByUid(Integer.parseInt(ids[0]))){
			request.setAttribute("users", new UserService().getUsersByPage());
			request.getRequestDispatcher("/list_users.jsp").
			forward(request, response);
		}
	}

}
