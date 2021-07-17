package com.example.msagateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class MsaGatewayApplication {

  public static void main(String[] args) {
    SpringApplication.run(MsaGatewayApplication.class, args);
  }

}
