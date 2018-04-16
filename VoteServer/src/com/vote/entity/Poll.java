package com.vote.entity;

public class Poll {

	private int pid;
	private User user;
	private Option option;
	private String time;

	public Poll() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Poll(int pid, User user, Option option, String time) {
		super();
		this.pid = pid;
		this.user = user;
		this.option = option;
		this.time = time;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Option getOption() {
		return option;
	}

	public void setOption(Option option) {
		this.option = option;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Poll [pid=" + pid + ", user=" + user + ", option=" + option
				+ ", time=" + time + "]";
	}

}
