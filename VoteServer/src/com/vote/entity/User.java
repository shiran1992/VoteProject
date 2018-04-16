package com.vote.entity;

public class User {

	private int uid;
	private String name;
	private String password;
	private String phone;
	private int type;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int uid, String name, String password, String phone, int type) {
		super();
		this.uid = uid;
		this.name = name;
		this.password = password;
		this.phone = phone;
		this.type = type;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "User [uid=" + uid + ", name=" + name + ", password=" + password
				+ ", phone=" + phone + ", type=" + type + "]";
	}

}
