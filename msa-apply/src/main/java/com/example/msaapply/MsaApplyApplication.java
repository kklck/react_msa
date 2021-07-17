package com.example.msaapply;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient // 유레카의 클라이언트로 사용하겠다.
@SpringBootApplication
public class MsaApplyApplication {

  public static void main(String[] args) {
    SpringApplication.run(MsaApplyApplication.class, args);
  }

}
