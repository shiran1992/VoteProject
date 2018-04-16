package com.vote.entity;

public class ServerEntity {

	private int sid;
	private String name;
	private String image;
	private String price;
	private CleanerEntity cleaner;
	private int cid;
	private String intro;
	private int state;
	public ServerEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public ServerEntity(int sid, String name, String image, String price,
			CleanerEntity cleaner, int cid, String intro, int state) {
		super();
		this.sid = sid;
		this.name = name;
		this.image = image;
		this.price = price;
		this.cleaner = cleaner;
		this.cid = cid;
		this.intro = intro;
		this.state = state;
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public int getSid() {
		return sid;
	}
	public void setSid(int sid) {
		this.sid = sid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public CleanerEntity getCleaner() {
		return cleaner;
	}
	public void setCleaner(CleanerEntity cleaner) {
		this.cleaner = cleaner;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "ServerEntity [sid=" + sid + ", name=" + name + ", image="
				+ image + ", price=" + price + ", cleaner=" + cleaner
				+ ", cid=" + cid + ", intro=" + intro + ", state=" + state
				+ "]";
	}
	
}
