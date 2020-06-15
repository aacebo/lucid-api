package com.lucid.api.auth;

import com.lucid.api.user.Provider;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class LoginUser {
    @NotEmpty(message = "email is required")
    @Email(message = "email must be valid")
    public String email;

    @NotEmpty(message = "password is required")
    public String password;

    public Provider provider = Provider.LOCAL;
}
