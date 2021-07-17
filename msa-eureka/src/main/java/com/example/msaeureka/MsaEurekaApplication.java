package com.example.msaeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer // 유레카의 서버가 되겠다.
@SpringBootApplication
public class MsaEurekaApplication {

  public static void main(String[] args) {
    SpringApplication.run(MsaEurekaApplication.class, args);
  }

}
