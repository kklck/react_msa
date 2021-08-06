package com.example.msaapply.controller;

import java.util.HashMap;

import com.example.msaapply.service.FeignService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.cloud.client.loadbalancer.reactive.ReactorLoadBalancerExchangeFilterFunction;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController // 메소드의 모든 return 을 url 매핑이 아닌, rest
@Log4j2 // 로그 파일 관리
@RequestMapping("apply")
public class ApplyController {

  @Autowired
  LoadBalancerClient loadBalancerClient;

  @Autowired
  RestTemplate restTemplate;

  private final WebClient.Builder loadBalancedWebClientBuilder;
  private final ReactorLoadBalancerExchangeFilterFunction lbFunction;
  private final FeignService feignService;

  @Autowired
  public ApplyController(WebClient.Builder webClientBuilder,
                         ReactorLoadBalancerExchangeFilterFunction lbFunction, FeignService feignService) {
    this.loadBalancedWebClientBuilder = webClientBuilder;
    this.lbFunction = lbFunction;
    this.feignService = feignService;
  }


  @GetMapping("test.do")
  public String test(){
    System.out.println("테스트 중입니다");
    return "testing..";
  }

  @PostMapping("check.do")
  public HashMap check(@RequestBody HashMap map){
//    System.out.println(infoDTO.toString());
    System.out.println(map.toString());
    HashMap resMap = new HashMap();
    resMap.put("info","success");
    return resMap;
  }

  @GetMapping("error.do")
  @HystrixCommand(commandKey = "LinaThread1", fallbackMethod = "recommendFallback",
    commandProperties = {@HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value = "500")})
  public String error(){

    System.out.println("에러 테스트용");

    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      System.out.println("별도 예외처리를 하지 않아도 됌");
    }

    return "에러가 아님";
  }


  public String recommendFallback(Throwable t){ // Exception 이 발생하면 무조건 실행, 서킷 브레이커 오픈과 무관
    System.out.println("t 는 " + t);
    return "해당 로직이 지연되고 있어 풀백 함수 실행 중...";
  }

  @GetMapping("loadBalancedCaller.do")
  public Mono<String> caller(){
    System.out.println("콜러 실행");
//       return this.restTemplate.getForObject("http://msa-payment/payment/loadBalancedCallee.do", String.class);
    return loadBalancedWebClientBuilder.build()
            .get()
            .uri("http://msa-payment/payment/loadBalancedCallee.do")
            .retrieve()
            .bodyToMono(String.class);
  }

//  @Autowired
//  private FeignService feignService;

  @GetMapping("feign.do")
  public String getFeign(){
    return feignService.getPayment();
  }


}