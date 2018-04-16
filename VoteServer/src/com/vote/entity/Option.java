package com.vote.entity;

public class Option {

	private int oid;
	private String title;
	private String img;
	private Vote vote;

	public Option() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Option(int oid, String title, String img, Vote vote) {
		super();
		this.oid = oid;
		this.title = title;
		this.img = img;
		this.vote = vote;
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

	@Override
	public String toString() {
		return "Option [oid=" + oid + ", title=" + title + ", img=" + img
				+ ", vote=" + vote + "]";
	}

}
