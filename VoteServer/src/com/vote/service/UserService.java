package com.vote.service;

import java.util.List;

import com.vote.dao.UserDao;
import com.vote.entity.User;
import com.vote.entity.UserEntity;

public class UserService {

	private UserDao dao = new UserDao();

	// 判断电话与密码是否匹配
	public boolean canLogin(String phone, String password) {
		// 方法，判断学号与密码是否正确

		// 找出sno的学生,判断这个学生的密码与pwd是否相等
		if (dao.getUserByPhone(phone) == null) {
			return false;
		}
		return dao.getUserByPhone(phone).getPassword().equals(password);
	}
	
	//获取所有用户信息
	public List<User> getUsersByPage() {
		return dao.getUsersByPage();
	}
	
	//删除用户
	public Boolean deleteUserByUid(int uid) {
		return dao.deleteUserByUid(uid);
	}

	public User getUserByPhone(String phone) {
		// TODO Auto-generated method stub
		return dao.getUserByPhone(phone);
	}

	// 注册用户
	public boolean saveUserInfo(User user) {
		return dao.saveInfo(user);
	}

	// 修改学生信息
	public boolean updateUserInfo(User user) {
		return dao.update(user);
	}

	// 保存头像
	public boolean saveHead(int userId, String path) {
		return dao.saveHead(userId, path);
	}

}
