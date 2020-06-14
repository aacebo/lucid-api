package com.lucid.api.auth;

import com.lucid.api.user.Provider;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

public class CreateUser {
    public String providerId;
    public Provider provider;
    public String image;

    @NotBlank(message = "firstName is required")
    public String firstName;

    @NotBlank(message = "lastName is required")
    public String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    public String email;

    public Date dob;
    public String password;
}
