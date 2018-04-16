package com.vote.entity;

import java.util.Date;

public class OrderEntity {

	private int oid;
	private UserEntity user;
	private ServerEntity server;
	private String create_time;
	private int state;
	private String all_price;
	private String server_time;
	private String comment;
	public OrderEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderEntity(int oid, UserEntity user, ServerEntity server,
			String create_time, int state, String all_price,
			String server_time, String comment) {
		super();
		this.oid = oid;
		this.user = user;
		this.server = server;
		this.create_time = create_time;
		this.state = state;
		this.all_price = all_price;
		this.server_time = server_time;
		this.comment = comment;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getOid() {
		return oid;
	}
	public void setOid(int oid) {
		this.oid = oid;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}
	public ServerEntity getServer() {
		return server;
	}
	public void setServer(ServerEntity server) {
		this.server = server;
	}
	public String getCreate_time() {
		return create_time;
	}
	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getAll_price() {
		return all_price;
	}
	public void setAll_price(String all_price) {
		this.all_price = all_price;
	}
	public String getServer_time() {
		return server_time;
	}
	public void setServer_time(String server_time) {
		this.server_time = server_time;
	}
	@Override
	public String toString() {
		return "OrderEntity [oid=" + oid + ", user=" + user + ", server="
				+ server + ", create_time=" + create_time + ", state=" + state
				+ ", all_price=" + all_price + ", server_time=" + server_time
				+ ", comment=" + comment + "]";
	}

	
}
