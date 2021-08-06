package com.example.msaapply.service;

import feign.RetryableException;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "msa-payment")
public interface FeignService {

    @GetMapping("payment/feign.do")
    String getPayment() throws RetryableException;
}
