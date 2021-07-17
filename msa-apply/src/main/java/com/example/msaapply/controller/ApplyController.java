package com.example.msaapply.controller;

import java.util.HashMap;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // 메소드의 모든 return 을 url 매핑이 아닌, rest
@Log4j2 // 로그 파일 관리
@RequestMapping("apply")
public class ApplyController {

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
}
