package com.lucid.api.auth;

import com.lucid.api.user.Provider;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

public class CreateUser {
    @NotBlank(message = "firstName is required")
    public String firstName;

    @NotBlank(message = "lastName is required")
    public String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    public String email;

    @NotBlank(message = "password is required")
    public String password;

    public Provider provider = Provider.LOCAL;
    public String image;
    public Date dob;
}
