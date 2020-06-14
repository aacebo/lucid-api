package com.lucid.api.auth;

import com.lucid.api.user.User;

public class AuthResponse {
    public String token;
    public User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
