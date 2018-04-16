package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.User;
import com.vote.entity.UserEntity;
import com.vote.util.DBConnection;

public class UserDao {

	// 注册信息保存
	public boolean saveInfo(User user) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into user("
					+ "name,phone,password,type) "
					+ " values(?,?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setString(1, user.getName());
			prep.setString(2, user.getPhone());
			prep.setString(3, user.getPassword());
			prep.setInt(4, 0);
			// 5、执行SQL语句
			prep.executeUpdate();

		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			// 抛异常说明注册失败
			return false;
			// throw new RuntimeException(e);

		} finally {
			// 6、关闭资源
			try {
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return true;
	}
	
	//获取所有用户信息
	public List<User> getUsersByPage() {
		Connection conn = null;
		PreparedStatement prep = null;
		List<User> users = new ArrayList<User>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from user";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 取到数据 ==》 装到一个学生对象中
			while (rs.next()) {
				User u = new User();
				u.setUid(rs.getInt("uid"));
				u.setName(rs.getString("name"));
				u.setPhone(rs.getString("phone"));
				u.setPassword(rs.getString("password"));
				u.setType(rs.getInt("type"));
				users.add(u);
			}
		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			// 抛异常说明注册失败
			 throw new RuntimeException(e);

		} finally {
			// 6、关闭资源
			try {
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return users;
	}
	
	//删除用户
	public Boolean deleteUserByUid(int uid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "delete from user where uid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setInt(1, uid);
			prep.executeUpdate();

		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			// 抛异常说明注册失败
			return false;
			// throw new RuntimeException(e);

		} finally {
			// 6、关闭资源
			try {
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return true;
	}
	
	// 通过id来搜索学生
		public User getUserByUid(int userId) {
			Connection conn =null;
			PreparedStatement prep = null;
			try {
				// 1、
				conn = DBConnection.getConnection();
				// 2、
				String sql = "select * from user where uid=?";
				// 3、
				prep = conn.prepareStatement(sql);
				// 4、
				prep.setInt(1, userId);
				// 5、执行SQL语句
				ResultSet rs = prep.executeQuery();
				// 6、处理查询结果
				// 创建一个学生对象
				User u = new User();
				// 取到数据 ==》 装到一个学生对象中
				if (rs.next()) {
					u.setUid(rs.getInt("uid"));
					u.setName(rs.getString("name"));
					u.setPhone(rs.getString("phone"));
					u.setPassword(rs.getString("password"));
					u.setType(rs.getInt("type"));

				} else {
					return null;
				}
				return u;
			} catch (Exception e) {
				// 一定要处理异常，异常的信息要存在日志文件
				// 转化为你应用程序的异常，再抛出
				throw new RuntimeException(e);
			} finally {
				// 6、关闭资源
				try {
					if (prep != null)
						prep.close();
					if (conn != null)
						conn.close();
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			}
		}
	

	// 保存头像
	public boolean saveHead(int userId, String path) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "UPDATE user SET userPicture=? WHERE userId=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setString(1, path);
			prep.setInt(2, userId);
			// 5、执行SQL语句
			prep.executeUpdate();

		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			// 抛异常说明注册失败
			return false;
			// throw new RuntimeException(e);

		} finally {
			// 6、关闭资源
			try {
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return true;
	}
	
	// 通过phone来搜索学生
	public User getUserByPhone(String phone) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、
			conn = DBConnection.getConnection();
			// 2、
			String sql = "select * from user where phone=?";
			// 3、
			prep = conn.prepareStatement(sql);
			// 4、
			prep.setString(1, phone);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 创建一个学生对象
			User u = new User();
			// 取到数据 ==》 装到一个学生对象中
			if (rs.next()) {
				u.setUid(rs.getInt("uid"));
				u.setName(rs.getString("name"));
				u.setPassword(rs.getString("password"));
				u.setPhone(rs.getString("phone"));
				u.setType(rs.getInt("type"));
			} else {
				return null;
			}
			return u;
		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			throw new RuntimeException(e);
		} finally {
			// 6、关闭资源
			try {
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
	}

	// 修改学生信息
	public boolean update(User user) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			conn = DBConnection.getConnection();
			String sql = "UPDATE user SET name=?,phone=?,password=?,type=? WHERE uid=?";
			prep = conn.prepareStatement(sql);
			prep.setString(1, user.getName());
			prep.setString(2,user.getPhone());
			prep.setString(3, user.getPassword());
			prep.setInt(6, user.getType());
			prep.setInt(8, user.getUid());
			prep.executeUpdate();

		} catch (Exception e) {

			e.printStackTrace();
			return false;
		} finally {

			try {
				if (conn != null)
					conn.close();
				if (prep != null)
					prep.close();
			} catch (SQLException e) {

				e.printStackTrace();
			}
		}
		return true;
	}
}
