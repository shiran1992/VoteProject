package com.vote.service;

import java.util.List;

import com.vote.dao.OptionDao;
import com.vote.entity.Option;
import com.vote.entity.OptionHad;

public class OptionService {

	OptionDao dao = new OptionDao();

	// 信息保存
	public boolean saveInfo(Option option, int vid) {
		return dao.saveInfo(option, vid);
	}

	// 通过Vid获取option
	public List<OptionHad> getOptionsByVid(int vid) {
		return dao.getOptionsByVid(vid);
	}

	// 通过Vid获取option
	public List<Option> getOptions(int vid) {
		return dao.getOptions(vid);
	}
}
