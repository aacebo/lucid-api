package com.lucid.api;

import java.util.List;

public class LucidErrorResponse {
    public final int status;
    public final String message;
    public final List<String> errors;

    public LucidErrorResponse(int status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
}
