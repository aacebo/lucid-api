package com.lucid.api.user;

import java.util.Date;

import com.lucid.api.auth.CreateUser;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
    @Id
    public String id;

    public Provider provider;
    public String image;
    public String firstName;
    public String lastName;
    public String password;
    public String email;
    public Date dob;
    public Date lastLoggedInAt;
    public Date removedAt;

    @CreatedDate
    public Date createdAt;

    public User() { }

    public User(CreateUser createUser) {
        this.provider = createUser.provider;
        this.image = createUser.image;
        this.firstName = createUser.firstName;
        this.lastName = createUser.lastName;
        this.password = createUser.password;
        this.email = createUser.email;
        this.dob = createUser.dob;
    }
}
