package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    public boolean verify(User user){
        List<User> list = userRepo.findAll();
        User correctUser = list.get(0);
        if(user.getUsername().equals(correctUser.getUsername()) && user.getPassword().equals(correctUser.getPassword())){
            return true;
        }
        else {
            return false;
        }
    }
}
