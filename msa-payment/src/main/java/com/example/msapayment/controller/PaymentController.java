package com.example.msapayment.controller;

import com.example.msapayment.dto.UserDTO;
import com.google.gson.Gson;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.Disposable;
import reactor.core.publisher.Mono;

import java.util.HashMap;

@RestController // 메소드의 모든 return 을 url 매핑이 아닌, rest
@Log4j2 // 로그 파일 관리
@RequestMapping("payment")
public class PaymentController {

  private final WebClient webClient;

  public PaymentController(WebClient.Builder builder) {
    this.webClient = builder.baseUrl("http://localhost:5000").build();
  }

  @GetMapping("test.do")
  public Mono<String> doTest() {

    return webClient.get()
                    .uri("/")
                    .retrieve()
                    .bodyToMono(String.class);
  }


  @PostMapping("calculate.do")
  public UserDTO calculate(@RequestBody UserDTO userDTO, Gson gson){

    System.out.println("userDTO : " + userDTO);
    String json = gson.toJson(userDTO);
    System.out.println("json : " + json);

    Mono<String> monoCal = webClient.post()
            .uri("/payment")
            .contentType(MediaType.APPLICATION_JSON)
//            .body(Mono.just(userDTO), UserDTO.class) // bodyvalue 왜안됌
            .bodyValue(userDTO)
            .retrieve()
            .bodyToMono(String.class)
            .doOnSuccess(s -> System.out.println("성공 : " + s))
            .doOnError(System.out::println);
    monoCal.subscribe();

    System.out.println(monoCal.block());
    userDTO.setResult(Integer.parseInt(String.valueOf(monoCal.block())));
    return userDTO;

//    System.out.println(result.toString());
//    return userDTO;
  }

  @GetMapping("loadBalancedCallee.do")
  public String Callee(){
    System.out.println("payment 콜리 동작");
    return "success";
  }

  @GetMapping("feign.do")
  public String getFeign(){
    System.out.println("콜러 페인 :");
    return "success";
  }

}
