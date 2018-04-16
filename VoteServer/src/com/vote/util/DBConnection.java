package com.vote.util; 

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
//明天早上
public class DBConnection {
	//配置文件：XML文件,properties文件：key=value
	//方法：通过方法获得Connection
	public static Connection getConnection() 
			throws ClassNotFoundException, SQLException, IOException {
		//三种注册驱动程序方法
		//从属性文件中读出数据库的联接信息
		Properties p = new Properties();
		//p对象与db.properties关联
		p.load(DBConnection.class.getResourceAsStream("db.properties"));
		String driver = p.getProperty("driver");
		//1、注册驱动程序
		Class.forName(driver);
		//Class.forName("com.mysql.jdbc.Driver");
		//创建Driver对象，用DriverManager方法注册
		//Driver driver = new com.mysql.jdbc.Driver();
		//DriverManager.registerDriver(driver);
		//设置系统属性：jdbc.driver
		//System.setProperty("jdbc.driver", "com.mysql.jdbc.Driver");
		//2、准备url、用户名、密码
		//String url = "jdbc:mysql://localhost:3306/student_db";
		//String user = "root";
		//String pwd = "root";
		String url = p.getProperty("url");
		String user = p.getProperty("user");
		String pwd = p.getProperty("pwd");
		//3、获得Connection对象
		return DriverManager.getConnection(
				url, user, pwd);
	}
	public static void main(String[] args) throws ClassNotFoundException, SQLException, IOException {
		System.out.println(getConnection());

	}

	
}
