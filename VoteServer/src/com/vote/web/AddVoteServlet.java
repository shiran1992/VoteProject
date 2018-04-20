package com.vote.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.jspsmart.upload.SmartUpload;
import com.vote.dao.UserDao;
import com.vote.dao.VoteDao;
import com.vote.entity.CleanerEntity;
import com.vote.entity.Vote;
import com.vote.service.CleanerService;
import com.vote.service.VoteService;

/**
 * Servlet implementation class AddVoteServlet
 */
public class AddVoteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddVoteServlet() {
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

		String p = this.getServletContext().getRealPath("VoteServlet");
		System.out.println(p);
		// 用smartupload获得上传文件

		SmartUpload smartUpload = new SmartUpload();
		// 初始化
		smartUpload.initialize(getServletConfig(), request, response);
		try {

			smartUpload.upload();
			// 放图片的文件夹
			String realPath = this.getServletContext().getRealPath(
					"VoteServlet");
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
						"VoteServlet"), poster.getFileName());
				String saveFileName = file.getAbsolutePath();
				// 文件保存路径
//				poster.saveAs(saveFileName);
				poster.saveAs(path + "VoteServlet/" + "vote"
						+ poster.getFileName());
			} // 将头像信息保存到数据库
			String title = smartUpload.getRequest().getParameter("title");
			String subTitle = smartUpload.getRequest().getParameter("subTitle");
			String content = smartUpload.getRequest().getParameter("content");
			String uid = smartUpload.getRequest().getParameter("uid");
			Vote vote = new Vote();
			vote.setTitle(title);
			vote.setSubtitle(subTitle);
			vote.setDesc(content);
			vote.setUser(new UserDao().getUserByUid(Integer.parseInt(uid)));
			vote.setCover("VoteServlet/" + "vote" + poster.getFileName());
			VoteService service = new VoteService();
			if(service.saveInfo(vote)){
				Vote v = new VoteDao().getLastVoteByUid(Integer.parseInt(uid));
				response.getWriter().write(new Gson().toJson(v));
			} else {
				response.getWriter().write("false");
			}
			

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
