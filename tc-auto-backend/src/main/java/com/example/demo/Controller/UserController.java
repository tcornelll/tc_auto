package com.example.demo.Controller;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.http.HttpResponse;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    @CrossOrigin
    public String isAdmin(@RequestBody User user) throws IOException {
        System.out.println(user);
        if(userService.verify(user)){
            return "admin";
        }
        else {
            return "not";
        }
    }


}
