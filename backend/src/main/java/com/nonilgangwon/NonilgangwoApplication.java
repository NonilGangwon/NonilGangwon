package com.nonilgangwon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class NonilgangwoApplication {
    public static void main(String[] args) {
        SpringApplication.run(NonilgangwoApplication.class, args);
    }
}
