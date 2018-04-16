package com.vote.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.vote.entity.ServerEntity;
import com.vote.service.ServerService;

/**
 * Servlet implementation class ListTribeServlet
 */
public class CommonServerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("okokok");
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		ServerService service = new ServerService();
		List<ServerEntity> servers = service.getCommonServers();
		//首页最多显示30个活动
		Gson gson = new Gson();
		response.getWriter().write(gson.toJson(servers));
		
	}

}
