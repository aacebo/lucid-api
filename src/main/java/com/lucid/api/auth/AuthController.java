package com.lucid.api.auth;

import com.lucid.api.core.md5.MD5;
import com.lucid.api.user.User;
import com.lucid.api.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository _userRepository;

    @PostMapping
    public AuthResponse create(@Valid @RequestBody CreateUser createUser) {
        if (createUser.password != null) {
            createUser.password = MD5.get(createUser.password);
        }

        final User user = this._userRepository.insert(new User(createUser));
        final String token = JWTHelper.serialize(user);
        return new AuthResponse(token, user);
    }

//    @PatchMapping("/auth")
//    public User login() {
//
//    }
}
