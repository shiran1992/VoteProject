package com.vote.service;

import java.util.List;

import com.vote.dao.ServerDao;
import com.vote.entity.ServerEntity;

public class ServerService {

	ServerDao dao = new ServerDao();

	// 今日推荐的服务
	public ServerEntity getServerByState() {
		return dao.getServerByState();
	}

	// 获取服务列表
	public List<ServerEntity> getServers() {
		return dao.getPagedServers();
	}

	// 普通的服务
	public List<ServerEntity> getCommonServers() {
		return dao.getCommonServer();
	}

	// 根据cid搜索server
	public List<ServerEntity> getServerByCid(int cid, int page) {
		return dao.getServerByCid(cid, page);
	}

	// 通过sid
	public ServerEntity getServerBySid(int sid) {
		return dao.getServerBySid(sid);
	}

	// 获取所有的server
	public List<ServerEntity> getServersByPage() {
		return dao.getServersByPage();
	}

	// 创建服务
	public boolean save(ServerEntity server) {
		return dao.save(server);
	}

	// 删除服务
	public Boolean deleteServerBySid(int sid) {
		return dao.deleteServerBySid(sid);
	}

	// 修改服务信息
	public boolean update(ServerEntity server) {
		return dao.update(server);
	}
}
