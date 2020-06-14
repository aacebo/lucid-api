package com.lucid.api.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository _userRepository;

    @GetMapping("/{id}")
    public Optional<User> findOne(@PathVariable String id) {
        return this._userRepository.findById(id);
    }
}
