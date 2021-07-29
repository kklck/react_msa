package com.example.msapayment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // 게터 세터 투스티링 이퀄 해시코드 자동생성
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 전체 생성자
@Builder(toBuilder = true)
public class UserDTO {
    private int age;
    private int count;
    private int result;

}
