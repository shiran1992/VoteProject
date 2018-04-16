package com.vote.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jspsmart.upload.SmartUpload;
import com.vote.service.UserService;

/**
 * Servlet implementation class SaveHeadServlet
 */
public class SaveHeadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveHeadServlet() {
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
		//用smartupload获得上传文件
		
		SmartUpload smartUpload = new SmartUpload();
		//初始化
		smartUpload.initialize(getServletConfig(), request, response);
		
		try {
			
			smartUpload.upload();
			//放图片的文件夹
			String realPath = this.getServletContext().getRealPath("homemaking");
			System.out.println(realPath);
			File dir = new File(realPath);
			
			if(!dir.exists()){
				//创建文件夹
				dir.mkdir();
				System.out.println("创建新文件夹");
			}
			com.jspsmart.upload.File poster = smartUpload.getFiles().getFile(0);
			if(!poster.isMissing()){	
				String path = request.getServletContext().getRealPath("/");
				//poster.getFileName()    原文件名
				File file = new File(getServletContext().getRealPath("homemaking"),poster.getFileName());
				String saveFileName = file.getAbsolutePath();
				//文件保存路径
				poster.saveAs(saveFileName);
				poster.saveAs(path+"homemaking/"+poster.getFileName());	
//				poster.saveAs("F:\\xuetuGIT\\xuetuCODE\\xuetuWeb\\WebContent\\xuetuImg\\"+poster.getFileName());	
			}
			//将头像信息保存到数据库
			UserService service = new UserService();
			int userId = Integer.parseInt(smartUpload.getRequest().getParameter("uid"));
			if(service.saveHead(userId, "homemaking/"+poster.getFileName())){
				response.getWriter().write("true");
			}else{
				response.getWriter().write("false");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
