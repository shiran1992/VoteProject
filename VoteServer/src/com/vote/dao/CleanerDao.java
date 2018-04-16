package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.CleanerEntity;
import com.vote.util.Application;
import com.vote.util.DBConnection;

public class CleanerDao {

	// 通过status来搜索cleaner
	public ArrayList<CleanerEntity> getCleanerByState() {
		Connection conn = null;
		PreparedStatement prep = null;
		ArrayList<CleanerEntity> cleaners = new ArrayList<CleanerEntity>();

		try {
			conn = DBConnection.getConnection();
			String sql = "select * from cleaner where state=2";
			prep = conn.prepareStatement(sql);

			ResultSet rs = prep.executeQuery();

			while (rs.next()) {
				CleanerEntity c = new CleanerEntity();
				c.setCid(rs.getInt("cid"));
				c.setHead(rs.getString("head"));
				c.setName(rs.getString("name"));
				c.setPhone(rs.getString("phone"));
				c.setState(rs.getInt("state"));
				c.setSign(rs.getString("sign"));
				c.setIntro(rs.getString("intro"));
				c.setAge(rs.getInt("age"));
				c.setSex(rs.getInt("sex"));
				c.setMarrysta(rs.getInt("marrysta"));
				cleaners.add(c);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			try {
				if (conn != null)
					conn.close();
				if (prep != null)
					prep.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

		}

		return cleaners;
	}

	// 通过id来搜索cleaner
	public CleanerEntity getCleanerByID(int cid) {
		Connection conn = null;
		ResultSet rs = null;
		CleanerEntity c = new CleanerEntity();
		PreparedStatement prep = null;
		try {
			conn = DBConnection.getConnection();
			String sql = "select * from cleaner where cid=?";
			prep = conn.prepareStatement(sql);
			prep.setInt(1, cid);
			rs = prep.executeQuery();

			if (rs.next()) {
				c.setCid(rs.getInt("cid"));
				c.setHead(rs.getString("head"));
				c.setName(rs.getString("name"));
				c.setPhone(rs.getString("phone"));
				c.setState(rs.getInt("state"));
				c.setSign(rs.getString("sign"));
				c.setIntro(rs.getString("intro"));
				c.setAge(rs.getInt("age"));
				c.setSex(rs.getInt("sex"));
				c.setMarrysta(rs.getInt("marrysta"));
			} else {
				return null;
			}
		} catch (Exception e) {

			e.printStackTrace();
		}

		try {
			if (conn != null)
				conn.close();
			if (prep != null)
				prep.close();
			if (rs != null)
				rs.close();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return c;
	}

	// 获取所有的cleaner
	public List<CleanerEntity> getCleanerByPage(int page) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<CleanerEntity> cleaners = new ArrayList<CleanerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from cleaner order by cid desc limit ?,?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, Application.cleaners_pagecount * page);
			prep.setInt(2, Application.cleaners_pagecount);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				CleanerEntity c = new CleanerEntity();
				c.setCid(rs.getInt("cid"));
				c.setHead(rs.getString("head"));
				c.setName(rs.getString("name"));
				c.setPhone(rs.getString("phone"));
				c.setState(rs.getInt("state"));
				c.setSign(rs.getString("sign"));
				c.setIntro(rs.getString("intro"));
				c.setAge(rs.getInt("age"));
				c.setSex(rs.getInt("sex"));
				c.setMarrysta(rs.getInt("marrysta"));
				cleaners.add(c);
			}
		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			throw new RuntimeException(e);
		} finally {
			// 6、关闭资源
			try {
				if (rs != null)
					rs.close();
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return cleaners;
	}

	public List<CleanerEntity> getCleaner() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<CleanerEntity> cleaners = new ArrayList<CleanerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from cleaner";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				CleanerEntity c = new CleanerEntity();
				c.setCid(rs.getInt("cid"));
				c.setHead(rs.getString("head"));
				c.setName(rs.getString("name"));
				c.setPhone(rs.getString("phone"));
				c.setState(rs.getInt("state"));
				c.setSign(rs.getString("sign"));
				c.setIntro(rs.getString("intro"));
				c.setAge(rs.getInt("age"));
				c.setSex(rs.getInt("sex"));
				c.setMarrysta(rs.getInt("marrysta"));
				cleaners.add(c);
			}
		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			throw new RuntimeException(e);
		} finally {
			// 6、关闭资源
			try {
				if (rs != null)
					rs.close();
				if (prep != null)
					prep.close();
				if (conn != null)
					conn.close();
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return cleaners;
	}

	// 创建服务
	public boolean save(CleanerEntity cleaner) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into cleaner("
					+ "name,head,phone,state,sign,intro,age,sex,marrysta) "
					+ " values(?,?,?,?,?,?,?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setString(1, cleaner.getName());
			prep.setString(2, cleaner.getHead());
			prep.setString(3, cleaner.getPhone());
			prep.setInt(4, cleaner.getState());
			prep.setString(5, cleaner.getSign());
			prep.setString(6, cleaner.getIntro());
			prep.setInt(7, cleaner.getAge());
			prep.setInt(8, cleaner.getSex());
			prep.setInt(9, cleaner.getMarrysta());
			// 5、执行SQL语句
			prep.executeUpdate();
		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			return false;
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

	// 删除员工
	public Boolean deleteCleanerByCid(int cid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "delete from cleaner where cid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setInt(1, cid);
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

	// 修改员工信息
	public boolean update(CleanerEntity cleaner) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			conn = DBConnection.getConnection();
			String sql = "UPDATE cleaner SET name=?,phone=?,sex=?,age=?,marrysta=?,head=?,state=?,sign=?,intro=? WHERE cid=?";
			if (cleaner.getHead() == "") {
				sql = "UPDATE cleaner SET name=?,phone=?,sex=?,age=?,marrysta=?,state=?,sign=?,intro=? WHERE cid=?";
				prep = conn.prepareStatement(sql);
				prep.setString(1, cleaner.getName());
				prep.setString(2, cleaner.getPhone());
				prep.setInt(3, cleaner.getSex());
				prep.setInt(4, cleaner.getAge());
				prep.setInt(5, cleaner.getMarrysta());
				prep.setInt(6, cleaner.getState());
				prep.setString(7, cleaner.getSign());
				prep.setString(8, cleaner.getIntro());
				prep.setInt(9, cleaner.getCid());
				prep.executeUpdate();
			} else {
				prep = conn.prepareStatement(sql);
				prep.setString(1, cleaner.getName());
				prep.setString(2, cleaner.getPhone());
				prep.setInt(3, cleaner.getSex());
				prep.setInt(4, cleaner.getAge());
				prep.setInt(5, cleaner.getMarrysta());
				prep.setString(6,cleaner.getHead());
				prep.setInt(7, cleaner.getState());
				prep.setString(8, cleaner.getSign());
				prep.setString(9, cleaner.getIntro());
				prep.setInt(10, cleaner.getCid());
				prep.executeUpdate();
			}

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
