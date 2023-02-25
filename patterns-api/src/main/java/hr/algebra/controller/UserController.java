package hr.algebra.controller;

import hr.algebra.dto.LoginUser;
import hr.algebra.mapper.UserSignInUserMapper;
import hr.algebra.model.User;
import hr.algebra.model.UserPackage;
import hr.algebra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/user")
@CrossOrigin
public class UserController {
    private final UserService userService;

    private final UserSignInUserMapper userSignInUserMapper;

    @Autowired
    public UserController(UserService userService, UserSignInUserMapper userSignInUserMapper) {
        this.userService = userService;
        this.userSignInUserMapper = userSignInUserMapper;
    }

    @PostMapping
    public ResponseEntity<User> login(@RequestBody LoginUser loginUser) {
        return new ResponseEntity<>(userService.login(loginUser.getEmail(), loginUser.getPassword()), HttpStatus.OK);
    }

}
