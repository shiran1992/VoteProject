package com.vote.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jspsmart.upload.SmartUpload;
import com.vote.entity.ServerEntity;
import com.vote.service.ServerService;

/**
 * Servlet implementation class AddTribeServlet
 */
public class AddServerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");

		String p = this.getServletContext().getRealPath("homemaking");
		System.out.println(p);
		// 用smartupload获得上传文件

		SmartUpload smartUpload = new SmartUpload();
		// 初始化
		smartUpload.initialize(getServletConfig(), request, response);
		try {

			smartUpload.upload();
			// 放图片的文件夹
			String realPath = this.getServletContext()
					.getRealPath("homemaking");
			System.out.println(realPath);
			File dir = new File(realPath);

			if (!dir.exists()) {
				// 创建文件夹
				dir.mkdir();
				System.out.println("创建新文件夹");
			}
			com.jspsmart.upload.File poster = smartUpload.getFiles().getFile(0);
			if (!poster.isMissing()) {
				String path = request.getServletContext().getRealPath("/");
				// poster.getFileName() 原文件名
				File file = new File(getServletContext().getRealPath(
						"homemaking"), poster.getFileName());
				String saveFileName = file.getAbsolutePath();
				// 文件保存路径
				poster.saveAs(saveFileName);
				poster.saveAs(path + "homemaking/" + poster.getFileName());
			}			// 将头像信息保存到数据库
			String name = smartUpload.getRequest().getParameter("name");
			String price = smartUpload.getRequest().getParameter("price");
			String cid = smartUpload.getRequest().getParameter("cid");
			String intro = smartUpload.getRequest().getParameter("intro");

			ServerEntity server = new ServerEntity();
			server.setName(name);
			server.setPrice(price);
			server.setCid(Integer.parseInt(cid));
			server.setImage("homemaking/" + "server"+poster.getFileName());
			server.setIntro(intro);

			ServerService service = new ServerService();
			if (service.save(server)) {
				request.setAttribute("servers",
						new ServerService().getServersByPage());
				request.getRequestDispatcher("/list_servers.jsp").forward(
						request, response);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
