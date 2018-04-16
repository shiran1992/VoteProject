package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.ServerEntity;
import com.vote.util.Application;
import com.vote.util.DBConnection;

public class ServerDao {

	// 今日推荐的Server
	public ServerEntity getServerByState() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		ServerEntity server = new ServerEntity();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server where state=2";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
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
		return server;
	}

	// 通过sid
	public ServerEntity getServerBySid(int sid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		ServerEntity server = new ServerEntity();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server where sid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, sid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
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
		return server;
	}

	// 获取首页server集合
	public List<ServerEntity> getPagedServers() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<ServerEntity> servers = new ArrayList<ServerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server where state=1 or state=2 order by sid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				ServerEntity server = new ServerEntity();
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
				servers.add(server);
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
		return servers;
	}

	// 获取服务页集合
	public List<ServerEntity> getCommonServer() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<ServerEntity> servers = new ArrayList<ServerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server order by sid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				ServerEntity server = new ServerEntity();
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
				servers.add(server);
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
		return servers;
	}

	// 获取服务页集合
	public List<ServerEntity> getServerByCid(int cid, int page) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<ServerEntity> servers = new ArrayList<ServerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server where cid=? order by sid desc limit ?,?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, cid);
			prep.setInt(2, Application.cleaners_pagecount * page);
			prep.setInt(3, Application.cleaners_pagecount);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				ServerEntity server = new ServerEntity();
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
				servers.add(server);
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
		return servers;
	}

	// 获取所有的server
	public List<ServerEntity> getServersByPage() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<ServerEntity> servers = new ArrayList<ServerEntity>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from server";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				// 对每一条记录，==》转换为一个新的活动对象
				ServerEntity server = new ServerEntity();
				server.setSid(rs.getInt("sid"));
				server.setName(rs.getString("name"));
				server.setImage(rs.getString("image"));
				server.setPrice(rs.getString("price"));
				server.setCleaner(new CleanerDao().getCleanerByID(rs
						.getInt("cid")));
				server.setIntro(rs.getString("intro"));
				server.setState(rs.getInt("state"));
				servers.add(server);
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
		return servers;
	}

	// 创建服务
	public boolean save(ServerEntity server) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into server("
					+ "name,image,price,cid,intro,state) "
					+ " values(?,?,?,?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			System.out.println(prep.toString());
			// 4、设置？的值
			prep.setString(1, server.getName());
			prep.setString(2, server.getImage());
			prep.setString(3, server.getPrice());
			prep.setInt(4, server.getCid());
			prep.setString(5, server.getIntro());
			prep.setInt(6, 0);
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

	// 删除服务
	public Boolean deleteServerBySid(int sid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "delete from server where sid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setInt(1, sid);
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

	// 修改服务信息
	public boolean update(ServerEntity server) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			conn = DBConnection.getConnection();
			String sql = "UPDATE server SET name=?,image=?,price=?,cid=?,intro=?,state=? WHERE sid=?";
			if (server.getImage() == "") {
				sql = "UPDATE server SET name=?,price=?,cid=?,intro=?,state=? WHERE sid=?";
				prep = conn.prepareStatement(sql);
				prep.setString(1, server.getName());
				prep.setString(2, server.getPrice());
				prep.setInt(3, server.getCid());
				prep.setString(4, server.getIntro());
				prep.setInt(5, server.getState());
				prep.setInt(6, server.getSid());
				prep.executeUpdate();
			} else {
				prep = conn.prepareStatement(sql);
				prep.setString(1, server.getName());
				prep.setString(2, server.getImage());
				prep.setString(3, server.getPrice());
				prep.setInt(4, server.getCid());
				prep.setString(5, server.getIntro());
				prep.setInt(6, server.getState());
				prep.setInt(7, server.getSid());
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
