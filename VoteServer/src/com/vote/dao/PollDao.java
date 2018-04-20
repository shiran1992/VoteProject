package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.Option;
import com.vote.entity.Poll;
import com.vote.entity.User;
import com.vote.entity.Vote;
import com.vote.util.DBConnection;

public class PollDao {

	// 信息保存
	public boolean saveInfo(int uid, int oid, int vid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into poll(" + "uid,oid,time,vid) "
					+ " values(?,?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setInt(1, uid);
			prep.setInt(2, oid);
			prep.setString(3, System.currentTimeMillis() + "");
			prep.setInt(4, vid);
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

	// 通过id来搜索学生
	public boolean isDoVote(int vid, int uid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、
			conn = DBConnection.getConnection();
			// 2、
			String sql = "select * from poll where vid=? and uid=?";
			// 3、
			prep = conn.prepareStatement(sql);
			// 4、
			prep.setInt(1, vid);
			prep.setInt(2, uid);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 创建一个学生对象
			// 取到数据 ==》 装到一个学生对象中
			if (rs.next()) {
				return true;
			} else {
				return false;
			}
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

	// 投票历史纪录
	public List<Vote> getLastVote(int uid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<Vote> votes = new ArrayList<Vote>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from poll where uid=? order by pid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, uid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				Vote v = new VoteDao().getVoteByVid(rs.getInt("vid"));
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

	// 投票历史纪录
	public List<Poll> getPollByVid(int vid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<Poll> polls = new ArrayList<Poll>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from poll where vid=? order by pid desc";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, vid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				Poll p = new Poll();
				p.setPid(rs.getInt("pid"));
				p.setOption(new OptionDao().getOptionByOid(rs.getInt("oid")));
				polls.add(p);
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
		return polls;
	}

	// 投票历史纪录
	public int getNumInPoll(int oid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		int num = 0;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from poll where oid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, oid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，

			while (rs.next()) {
				num++;
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
		return num;
	}

}
