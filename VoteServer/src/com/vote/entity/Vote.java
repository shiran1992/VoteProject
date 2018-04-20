package com.vote.entity;

public class Vote {

	private int vid;
	private String title;
	private String subtitle;
	private String desc;
	private String cover;
	private User user;

	public Vote() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Vote(int vid, String title, String subtitle, String desc,
			String cover, User user) {
		super();
		this.vid = vid;
		this.title = title;
		this.subtitle = subtitle;
		this.desc = desc;
		this.cover = cover;
		this.user = user;
	}

	public int getVid() {
		return vid;
	}

	public void setVid(int vid) {
		this.vid = vid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Vote [vid=" + vid + ", title=" + title + ", subtitle="
				+ subtitle + ", desc=" + desc + ", cover=" + cover + ", user="
				+ user + "]";
	}

}
