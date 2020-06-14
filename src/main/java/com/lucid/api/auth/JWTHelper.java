package com.lucid.api.auth;

import com.lucid.api.user.User;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.JWT;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTHelper {
    private static final ObjectMapper _objectMapper = new ObjectMapper();

    public static String serialize(User user) {
        return JWT.create()
                  .withIssuer("Lucid")
                  .sign(Algorithm.HMAC256("mysecret"));
    }

    public static AuthPayload deserialize(String token) {
        final DecodedJWT jwt = JWT.decode(token);
        AuthPayload payload = null;

        try {
            payload = _objectMapper.readValue(jwt.getPayload(), AuthPayload.class);
        } catch (final JsonProcessingException e) {
            // do something here
        }

        return payload;
    }
}
