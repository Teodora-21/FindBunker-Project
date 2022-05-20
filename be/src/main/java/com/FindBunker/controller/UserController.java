package com.FindBunker.controller;

import com.FindBunker.entity.User;
import com.FindBunker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @GetMapping
    public ResponseEntity getById(@RequestParam(name = "userId") int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getById(userId));
    }

    @GetMapping("/identityId")
    public ResponseEntity getByIdentityId(@RequestParam(name = "identifyId") String identifyId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getByIdentityId(identifyId));
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@RequestParam(name = "userId") int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.delete(userId));
    }
}
