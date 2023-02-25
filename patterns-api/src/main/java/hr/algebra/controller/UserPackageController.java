package hr.algebra.controller;

import hr.algebra.mapper.UserSignInUserMapper;
import hr.algebra.model.User;
import hr.algebra.model.UserPackage;
import hr.algebra.service.UserPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user-package")
@CrossOrigin
public class UserPackageController {
    private final UserPackageService userPackageService;

    private final UserSignInUserMapper userSignInUserMapper;

    @Autowired
    public UserPackageController(UserPackageService userPackageService, UserSignInUserMapper userSignInUserMapper) {
        this.userPackageService = userPackageService;
        this.userSignInUserMapper = userSignInUserMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<User> signIn(@RequestBody UserPackage user) {
        return new ResponseEntity<>(userPackageService.signIn(user), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Boolean> updateUserPackage(@RequestBody UserPackage user) {
        return new ResponseEntity<>(userPackageService.updatePackage(user), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserPackage>> getAllUsersPackages() {
        return new ResponseEntity<>(userPackageService.getAllUsers(), HttpStatus.OK);
    }
}
