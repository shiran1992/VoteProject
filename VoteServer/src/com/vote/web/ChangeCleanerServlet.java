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
 * Servlet implementation class UploadSchoolInfoImageServlet
 */
public class ChangeCleanerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeCleanerServlet() {
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
			String cid = smartUpload.getRequest().getParameter("cid");
			String name = smartUpload.getRequest().getParameter("name");
			String phone = smartUpload.getRequest().getParameter("phone");
			String sex = smartUpload.getRequest().getParameter("sex");
			String age = smartUpload.getRequest().getParameter("age");
			String marrysta = smartUpload.getRequest().getParameter("marrysta");
			String state = smartUpload.getRequest().getParameter("state");
			String sign = smartUpload.getRequest().getParameter("sign");
			String intro = smartUpload.getRequest().getParameter("intro");

			CleanerEntity cleaner = new CleanerEntity();
			cleaner.setCid(Integer.parseInt(cid));
			cleaner.setName(name);
			cleaner.setPhone(phone);
			cleaner.setSex(Integer.parseInt(sex));
			cleaner.setAge(Integer.parseInt(age));
			cleaner.setMarrysta(Integer.parseInt(marrysta));
			cleaner.setState(Integer.parseInt(state));
			cleaner.setHead(poster.getFileName().length() == 0 ? "":"homemaking/" +"cleaner"+ poster.getFileName());
			cleaner.setSign(sign);
			cleaner.setIntro(intro);

			CleanerService service = new CleanerService();
			if (service.update(cleaner)) {
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
