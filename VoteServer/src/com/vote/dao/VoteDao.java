package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.ServerEntity;
import com.vote.entity.User;
import com.vote.entity.Vote;
import com.vote.util.DBConnection;

public class VoteDao {

	// 信息保存
	public boolean saveInfo(Vote vote) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into vote("
					+ "title,subtitle,content,cover,uid) "
					+ " values(?,?,?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setString(1, vote.getTitle());
			prep.setString(2, vote.getSubtitle());
			prep.setString(3, vote.getDesc());
			prep.setString(4, vote.getCover());
			prep.setInt(5, vote.getUser().getUid());
			// 5、执行SQL语句
			prep.executeUpdate();

		} catch (Exception e) {
			// 一定要处理异常，异常的信息要存在日志文件
			// 转化为你应用程序的异常，再抛出
			// 抛异常说明注册失败
			// return false;
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
		return true;
	}

	// 通过id来搜索学生
	public Vote getLastVoteByUid(int userId) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、
			conn = DBConnection.getConnection();
			// 2、
			String sql = "select * from vote where uid=? order by vid desc";
			// 3、
			prep = conn.prepareStatement(sql);
			// 4、
			prep.setInt(1, userId);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 创建一个学生对象
			Vote v = new Vote();
			// 取到数据 ==》 装到一个学生对象中
			if (rs.next()) {
				v.setVid(rs.getInt("vid"));
				v.setTitle(rs.getString("title"));
				v.setSubtitle(rs.getString("subtitle"));
				v.setCover(rs.getString("cover"));
				v.setDesc(rs.getString("content"));
				v.setUser(null);
			} else {
				return null;
			}
			return v;
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

	// 通过id来搜索学生
	public Vote getVoteByVid(int vid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、
			conn = DBConnection.getConnection();
			// 2、
			String sql = "select * from vote where vid=?";
			// 3、
			prep = conn.prepareStatement(sql);
			// 4、
			prep.setInt(1, vid);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 创建一个学生对象
			Vote v = new Vote();
			// 取到数据 ==》 装到一个学生对象中
			if (rs.next()) {
				v.setVid(rs.getInt("vid"));
				v.setTitle(rs.getString("title"));
				v.setSubtitle(rs.getString("subtitle"));
				v.setCover(rs.getString("cover"));
				v.setDesc(rs.getString("content"));
				v.setUser(null);
			} else {
				return null;
			}
			return v;
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

	// 所有投票
	public List<Vote> getAllVote() {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<Vote> votes = new ArrayList<Vote>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from vote order by vid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				Vote v = new Vote();
				v.setVid(rs.getInt("vid"));
				v.setTitle(rs.getString("title"));
				v.setSubtitle(rs.getString("subtitle"));
				v.setCover(rs.getString("cover"));
				v.setDesc(rs.getString("content"));
				v.setUser(null);
				votes.add(v);
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
		return votes;
	}

	// uid=>vote
	public List<Vote> getVoteByUid(int uid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<Vote> votes = new ArrayList<Vote>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from vote where uid=? order by vid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, uid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				Vote v = new Vote();
				v.setVid(rs.getInt("vid"));
				v.setTitle(rs.getString("title"));
				v.setSubtitle(rs.getString("subtitle"));
				v.setCover(rs.getString("cover"));
				v.setDesc(rs.getString("content"));
				v.setUser(null);
				votes.add(v);
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
		return votes;
	}

}
