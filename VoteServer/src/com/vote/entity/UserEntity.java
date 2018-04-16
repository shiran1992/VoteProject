package com.vote.entity;

import java.util.Date;

public class UserEntity {

	private int uid;
	private String nick;
	private String phone;
	private String password;
	private String head;
	private int sex;
	private int age;
	private String birth;
	public UserEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserEntity(int uid, String nick, String phone, String password,
			String head, int sex, int age, String birth) {
		super();
		this.uid = uid;
		this.nick = nick;
		this.phone = phone;
		this.password = password;
		this.head = head;
		this.sex = sex;
		this.age = age;
		this.birth = birth;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getHead() {
		return head;
	}
	public void setHead(String head) {
		this.head = head;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	@Override
	public String toString() {
		return "UserEntity [uid=" + uid + ", nick=" + nick + ", phone=" + phone
				+ ", password=" + password + ", head=" + head + ", sex=" + sex
				+ ", age=" + age + ", birth=" + birth + "]";
	}
	
}
