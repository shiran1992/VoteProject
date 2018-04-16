package com.vote.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jspsmart.upload.SmartUpload;
import com.vote.entity.CleanerEntity;
import com.vote.service.CleanerService;

/**
 * Servlet implementation class AddScoreServlet
 */
public class AddCleanerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddCleanerServlet() {
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
				poster.saveAs(path + "homemaking/" + "cleaner"+poster.getFileName());
			}			// 将头像信息保存到数据库
			String name = smartUpload.getRequest().getParameter("name");
			String phone = smartUpload.getRequest().getParameter("phone");
			String sex = smartUpload.getRequest().getParameter("sex");
			String age = smartUpload.getRequest().getParameter("age");
			String marrysta = smartUpload.getRequest().getParameter("marrysta");
			String sign = smartUpload.getRequest().getParameter("sign");
			String intro = smartUpload.getRequest().getParameter("intro");

			CleanerEntity cleaner = new CleanerEntity();
			cleaner.setName(name);
			cleaner.setPhone(phone);
			cleaner.setHead("homemaking/" + "cleaner"+poster.getFileName());
			cleaner.setSex(Integer.parseInt(sex));
			cleaner.setAge(Integer.parseInt(age));
			cleaner.setMarrysta(Integer.parseInt(marrysta));
			cleaner.setSign(sign);
			cleaner.setIntro(intro);
			cleaner.setState(0);

			CleanerService service = new CleanerService();
			if (service.save(cleaner)) {
				request.setAttribute("cleaners",
						new CleanerService().getCleaner());
				request.getRequestDispatcher("/list_cleaners.jsp").forward(
						request, response);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
