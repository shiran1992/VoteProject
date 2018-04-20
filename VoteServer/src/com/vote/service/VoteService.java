package com.vote.service;

import java.util.List;

import com.vote.dao.VoteDao;
import com.vote.entity.Vote;

public class VoteService {

	VoteDao dao = new VoteDao();

	// 信息保存
	public boolean saveInfo(Vote vote) {
		return dao.saveInfo(vote);
	}

	// 所有投票
	public List<Vote> getAllVote() {
		return dao.getAllVote();
	}

	// uid=>vote
	public List<Vote> getVoteByUid(int uid) {
		return dao.getVoteByUid(uid);
	}
}
