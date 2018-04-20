package com.vote.service;

import java.util.List;

import com.vote.dao.PollDao;
import com.vote.entity.Poll;
import com.vote.entity.Vote;

public class PollService {
	PollDao dao = new PollDao();

	// 信息保存
	public boolean saveInfo(int uid, int oid, int vid) {
		return dao.saveInfo(uid, oid, vid);
	}

	// 投票历史纪录
	public List<Vote> getLastVote(int uid) {
		return dao.getLastVote(uid);
	}

	public boolean isDoVote(int vid, int uid) {
		return dao.isDoVote(vid, uid);
	}

	public List<Poll> getPollByVid(int vid) {
		return dao.getPollByVid(vid);
	}

}
