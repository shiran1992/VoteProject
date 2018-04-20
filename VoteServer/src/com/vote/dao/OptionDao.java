package com.vote.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.vote.entity.Option;
import com.vote.entity.OptionHad;
import com.vote.entity.User;
import com.vote.entity.Vote;
import com.vote.util.DBConnection;

public class OptionDao {

	// 信息保存
	public boolean saveInfo(Option option, int vid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "insert into options(" + "title,img,vid) "
					+ " values(?,?,?)";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			// 4、设置？的值
			prep.setString(1, option.getTitle());
			prep.setString(2, option.getImg());
			prep.setInt(3, vid);

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

	// 通过Vid获取option
	public List<OptionHad> getOptionsByVid(int vid) {
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rs = null;
		List<OptionHad> options = new ArrayList<OptionHad>();
		try {
			// 1、联数据库
			conn = DBConnection.getConnection();
			// 2、SQL语句
			String sql = "select * from options where vid=?";
			// 3、获得PreparedStatement对象
			prep = conn.prepareStatement(sql);
			prep.setInt(1, vid);
			// 5、执行SQL语句
			rs = prep.executeQuery();
			// 6、处理查询结果，
			while (rs.next()) {
				OptionHad o = new OptionHad();
				o.setOid(rs.getInt("oid"));
				o.setTitle(rs.getString("title"));
				o.setImg(rs.getString("img"));
				o.setNum(new PollDao().getNumInPoll(rs.getInt("oid")));
				options.add(o);
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
		return options;
	}
	
	// 通过Vid获取option
		public List<Option> getOptions(int vid) {
			Connection conn = null;
			PreparedStatement prep = null;
			ResultSet rs = null;
			List<Option> options = new ArrayList<Option>();
			try {
				// 1、联数据库
				conn = DBConnection.getConnection();
				// 2、SQL语句
				String sql = "select * from options where vid=?";
				// 3、获得PreparedStatement对象
				prep = conn.prepareStatement(sql);
				prep.setInt(1, vid);
				// 5、执行SQL语句
				rs = prep.executeQuery();
				// 6、处理查询结果，
				while (rs.next()) {
					Option o = new Option();
					o.setOid(rs.getInt("oid"));
					o.setTitle(rs.getString("title"));
					o.setImg(rs.getString("img"));
					options.add(o);
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
			return options;
		}


	// 通过oid来搜索Option
	public Option getOptionByOid(int oid) {
		Connection conn = null;
		PreparedStatement prep = null;
		try {
			// 1、
			conn = DBConnection.getConnection();
			// 2、
			String sql = "select * from options where oid=?";
			// 3、
			prep = conn.prepareStatement(sql);
			// 4、
			prep.setInt(1, oid);
			// 5、执行SQL语句
			ResultSet rs = prep.executeQuery();
			// 6、处理查询结果
			// 创建一个学生对象
			Option o = new Option();
			// 取到数据 ==》 装到一个学生对象中
			if (rs.next()) {
				o.setOid(rs.getInt("oid"));
				o.setVote(new VoteDao().getVoteByVid(rs.getInt("vid")));
			} else {
				return null;
			}
			return o;
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

}
