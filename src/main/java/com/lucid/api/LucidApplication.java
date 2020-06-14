package com.lucid.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class LucidApplication {
	public static void main(String[] args) {
		SpringApplication.run(LucidApplication.class, args);
	}
}
