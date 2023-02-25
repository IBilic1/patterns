package hr.algebra.controller;

import hr.algebra.model.UserConsumption;
import hr.algebra.model.UserContent;
import hr.algebra.service.UserContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user-content")
@CrossOrigin
public class UserContentController {

    private final UserContentService userContentService;

    @Autowired
    public UserContentController(UserContentService userContentService) {
        this.userContentService = userContentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserContent>> getAllContents() {
        return new ResponseEntity<>(userContentService.getAllUsersContents(), HttpStatus.OK);
    }

    @GetMapping("/content/{id}")
    public ResponseEntity<List<UserContent>> getUsersContents(@PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(userContentService.getUserContents(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserContent> addUserContent(@RequestBody UserContent userContent) {
        return new ResponseEntity<>(userContentService.addUsersContent(userContent), HttpStatus.OK);
    }

    @GetMapping("/consumption")
    public ResponseEntity<List<UserConsumption>> getConsumption() {
        return new ResponseEntity<>(userContentService.getConsumptions(), HttpStatus.OK);
    }

}
