package com.vote.web;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.vote.service.CleanerService;
import com.vote.service.OptionService;
import com.vote.service.PollService;

/**
 * Servlet implementation class GetOptionByVidServlet
 */
public class GetOptionByVidServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetOptionByVidServlet() {
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
		response.setContentType("text/html;charset=utf-8");
		int vid = Integer.parseInt(request.getParameter("vid"));
		int uid = Integer.parseInt(request.getParameter("uid"));
		Gson gson = new Gson();
		PollService service = new PollService();
		if (service.isDoVote(vid, uid)) {
			response.getWriter().write(
					gson.toJson(new OptionService().getOptionsByVid(vid)));
			
		} else {
			response.getWriter().write(
					gson.toJson(new OptionService().getOptions(vid)));
		}
	}

}
