package com.vote.service;

import java.util.ArrayList;
import java.util.List;

import com.vote.dao.CleanerDao;
import com.vote.entity.CleanerEntity;

public class CleanerService {

	CleanerDao dao = new CleanerDao();

	// 通过tStatus来搜索部落
	public ArrayList<CleanerEntity> getCleanerByState() {
		return dao.getCleanerByState();
	}

	// 分页获取活动列表
	public List<CleanerEntity> getCleanerByPage(int page) {
		return dao.getCleanerByPage(page);
	}

	public List<CleanerEntity> getCleaner() {
		return dao.getCleaner();
	}

	// 通过id来搜索cleaner
	public CleanerEntity getCleanerByID(int cid) {
		return dao.getCleanerByID(cid);
	}

	// 创建服务
	public boolean save(CleanerEntity cleaner) {
		return dao.save(cleaner);
	}

	// 删除员工
	public Boolean deleteCleanerByCid(int cid) {
		return dao.deleteCleanerByCid(cid);
	}

	// 修改员工信息
	public boolean update(CleanerEntity cleaner) {
		return dao.update(cleaner);
	}
}
