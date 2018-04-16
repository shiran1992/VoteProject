package com.vote.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vote.entity.OrderEntity;
import com.vote.service.OrderService;

/**
 * Servlet implementation class OneOfSchoolInfoServlet
 */
public class ChangeOrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeOrderServlet() {
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
		
		String oid = request.getParameter("oid");
		String state = request.getParameter("state");
		OrderEntity order = new OrderEntity();
		order.setOid(Integer.parseInt(oid));
		order.setState(Integer.parseInt(state));
		OrderService service = new OrderService();
		if (service.update(order)) {
			request.setAttribute("orders",
					new OrderService().getOrdersByPage());
			request.getRequestDispatcher("/list_orders.jsp").forward(
					request, response);
		}
	}

}
