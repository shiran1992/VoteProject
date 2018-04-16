package com.vote.entity;

public class CleanerEntity {

	private int cid;
	private String name;
	private String head;
	private String phone;
	private int state;
	private String sign;
	private String intro;
	private int age;
	private int sex;
	private int marrysta;
	public CleanerEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public CleanerEntity(int cid, String name, String head, String phone,
			int state, String sign, String intro, int age, int sex, int marrysta) {
		super();
		this.cid = cid;
		this.name = name;
		this.head = head;
		this.phone = phone;
		this.state = state;
		this.sign = sign;
		this.intro = intro;
		this.age = age;
		this.sex = sex;
		this.marrysta = marrysta;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public int getMarrysta() {
		return marrysta;
	}

	public void setMarrysta(int marrysta) {
		this.marrysta = marrysta;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHead() {
		return head;
	}
	public void setHead(String head) {
		this.head = head;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "CleanerEntity [cid=" + cid + ", name=" + name + ", head="
				+ head + ", phone=" + phone + ", state=" + state + ", sign="
				+ sign + ", intro=" + intro + ", age=" + age + ", sex=" + sex
				+ ", marrysta=" + marrysta + "]";
	}
	
	
}
