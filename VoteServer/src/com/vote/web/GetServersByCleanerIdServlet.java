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
 * Servlet implementation class GetActivitiesByuserId
 */
public class GetServersByCleanerIdServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetServersByCleanerIdServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

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
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		int cid = Integer.parseInt(request.getParameter("cid"));
		int page = Integer.parseInt(request.getParameter("page"));
		
		ServerService service = new ServerService();
		List<ServerEntity> servers = service.getServerByCid(cid, page);
		System.out.println(servers.toString());
		Gson gson = new Gson();
		response.getWriter().write(gson.toJson(servers));
	}

}
