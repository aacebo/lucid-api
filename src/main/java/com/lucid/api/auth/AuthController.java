package com.lucid.api.auth;

import com.lucid.api.LucidErrorResponse;
import com.lucid.api.core.md5.MD5;
import com.lucid.api.user.User;
import com.lucid.api.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@SuppressWarnings({ "unchecked", "rawtypes" })
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository _userRepository;

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody CreateUser createUser) {
        final Optional<User> existing = this._userRepository.findByEmail(createUser.email);

        if (existing.isPresent()) {
            return new ResponseEntity(
                    new LucidErrorResponse(HttpStatus.CONFLICT.value(), "email is in use", null),
                    HttpStatus.CONFLICT
            );
        }

        createUser.password = MD5.get(createUser.password);
        final User user = this._userRepository.insert(new User(createUser));
        final String token = JWTHelper.serialize(user);
        return new ResponseEntity(new AuthResponse(token, user), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity update(@Valid @RequestBody LoginUser loginUser) {
        loginUser.password = MD5.get(loginUser.password);
        final Optional<User> existing = this._userRepository.findByEmail(loginUser.email);

        if (existing.isPresent() && existing.get().password.equals(loginUser.password) && loginUser.provider.equals(existing.get().provider)) {
            final User user = existing.get();
            user.lastLoggedInAt = new Date();
            this._userRepository.save(user);
            final String token = JWTHelper.serialize(user);
            return new ResponseEntity(new AuthResponse(token, user), HttpStatus.OK);
        }

        return new ResponseEntity(
                new LucidErrorResponse(HttpStatus.UNAUTHORIZED.value(), "email/password invalid", null),
                HttpStatus.UNAUTHORIZED
        );
    }
}
