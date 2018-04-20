package com.vote.entity;

public class OptionHad {

	private int oid;
	private String title;
	private String img;
	private Vote vote;
	private int num;

	public OptionHad(int oid, String title, String img, Vote vote, int num) {
		super();
		this.oid = oid;
		this.title = title;
		this.img = img;
		this.vote = vote;
		this.num = num;
	}

	public OptionHad() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getOid() {
		return oid;
	}

	public void setOid(int oid) {
		this.oid = oid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Vote getVote() {
		return vote;
	}

	public void setVote(Vote vote) {
		this.vote = vote;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	@Override
	public String toString() {
		return "OptionHad [oid=" + oid + ", title=" + title + ", img=" + img
				+ ", vote=" + vote + ", num=" + num + "]";
	}
}
