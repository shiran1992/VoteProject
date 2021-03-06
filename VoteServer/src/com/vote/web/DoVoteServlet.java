package com.vote.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vote.entity.User;
import com.vote.service.PollService;
import com.vote.service.UserService;

/**
 * Servlet implementation class DoVoteServlet
 */
public class DoVoteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DoVoteServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String uid = request.getParameter("uid");
		String oid = request.getParameter("oid");
		String vid = request.getParameter("vid");
		PollService service = new PollService();

		boolean saveInfo = service.saveInfo(Integer.parseInt(uid), Integer.parseInt(oid), Integer.parseInt(vid));
		if (saveInfo) {
			response.getWriter().write("true");
		} else {
			response.getWriter().write("false");
		}
	}

}
