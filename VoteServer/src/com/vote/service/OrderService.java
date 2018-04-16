package com.vote.service;

import java.util.List;

import com.vote.dao.OrderDao;
import com.vote.entity.OrderEntity;

public class OrderService {

	OrderDao dao = new OrderDao();

	// 创建订单
	public boolean save(int uid, int sid, String allprice, String server_time) {
		return dao.save(uid, sid, allprice, server_time);
	}

	// 我的订单
	public List<OrderEntity> getPageOrders(int uid, int page) {
		return dao.getPageOrders(uid, page);
	}

	// 获取订单集合
	public List<OrderEntity> getOrdersByPage() {
		return dao.getOrdersByPage();
	}

	// 通过oid
	public OrderEntity getOrderByOid(int oid) {
		return dao.getOrderByOid(oid);
	}

	// 删除订单
	public Boolean deleteOrderByOid(int oid) {
		return dao.deleteOrderByOid(oid);
	}

	// 修改订单信息
	public boolean update(OrderEntity order) {
		return dao.update(order);
	}
	
	// 增加评论
	public boolean updateComment(String comment,int oid) {
		return dao.updateComment(comment, oid);
	}
}
