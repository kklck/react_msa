### 11번가는 왜 MSA를 도입했나?

> **시스템 관점**에서
>
> - 초대형 **Monolithic**
> - 낙후된 **S/W Stack**
> - 매우 긴 **공통 모듈** 라인 수
>
> => 트래픽 과부하 
>
> **개발자 관점**에서
>
> - 나쁜 개발문화
>   - 번거로운 코드 **배포**
>   - **새로운 기술** 도입 봉쇄
>   - 공통 코드로 **메모리 부족**

#### 서버 분리

> **Stangler Application Parttern** : 교살자 어플리케이션 패턴 사용
>
> - **넝쿨**이 **나무**를 감싸 성장 => 숙주 **나무** 죽임 => 되려 아름답게 자라는 **넝쿨**
> - 기존 모놀리식을 ***기능별 반복적 분리*** => **점진적**인 마이그레이션 가능
>   - 위험 부담 최소화, 유저에 자연스럽게 발전된 서비스 제공(변화 의식 잘 하지 못함)
> - 레거시는 그대로 두고, 새로운 서비스로 만들어 마이그레이션
>   - 필요에 따라 레거시 호출 필요
> - 기존에도 굉장히 많아 사용된 패턴이지만, MSA를 위해 정의

> **기존 방식**
>
> 하나의 WAS에 프로세스 전 과정이 담겨있는 구조
>
> PC/Mobile/App 용 API는 따로 존재

> **MSA 방식**
>
> 기존 로직 놔둔 채 => 잘게 기능별로 분리한 서비스를 REST API로 빼내 => 새로운 로직 추가
>
> - 마이크로서비스 실행 중 에러 => 해당 로직 가진 레거시 호출
>   - MS 마다 DB flag 두어 점진적 발전 꾀

#### MSA 플랫폼 솔루션

##### Netflix OSS

> 비즈니스 로직을 제외하고 실제 사용중인 코드

**Spring Boot**

> Spring Cloud로 다양한 오픈소스 사용

![img](https://post-phinf.pstatic.net/MjAyMDA2MDVfNjkg/MDAxNTkxMzM1OTE4MTUw.YYRmmSD7j8juCx2M48_ZcFh9JcnTgkLCYDVSm6aaA-Ug.NlLMpB1A-k15OdYlJjR46azI6FTgSKSDvU00kIjHEcYg.JPEG/netflix01.jpg?type=w1200)



##### Hystrix

> **Netflix의 Fault Tolerance Library** : 장애 내성, 고장 허용
>
> - 장애 전파 방지 & 회복
>
> **사용법**
>
> ```java
> // JVM에서 AOP 지원하는 환경에 Annotation을 사용
> @HystrixCommand
> public String anyMethodWithExternalDependency() {
>     // REST API로 다른 서버 호출
> }
> ```
>
> ```java
> // HystrixCommand Class를 상속
> public class SampleCommand extends HystrixCommand<String> {
>     @Override
>     protected String run() {
>       // REST API로 다른 서버 호출
>     } 
> }
> ```
>
> **주요 기능**
>
> - **Circuit Breaker**
>
>   - 메소드 실행 결과(Exception) 기록/통계 를 통해 Circuit Open 여부 결정
>
>     - **Open(호출 차단)** : **일정 시간/일정 수 이상/ 일정 비율 이상** Exception
>     - **Close(호출 허용)** : **일정 시간 경과** => 하나의 요청에 호출 허용 => 성공 시 Close
>     - Default : **10초**간 / **20개** 이상 호출 할 때  / **50%** 이상 에러 발생 시 / **5초**간 **Open** 하고 / 끝나면 **하나**의 요청 호출 허용해 / 성공 시 **Close** 
>
>   - 에러를 가로채 시스템 안정성 추구
>
>     - 서버 한 개의 장애로 다른 서버에 영향을 최소화
>
>   - **CommandKey** 단위로 통계
>
>     - Exception 발생 시점이 유사한 메소드는 CommandKey를 동일하게 하여 Circuit Breaker 동작을 공유
>
>     - 동일 Dependency = 동일 CommandKey  고려하자
>
>     - ```java
>       @HystrixCommand(commandKey = "ExtDep1")
>       public String anyMethodWithExternalDependency1() {
>           // 추천 서버 호출 - 상품 추천 #1
>       }
>       @HystrixCommand(commandKey = "ExtDep1")
>       public String anyMethodWithExternalDependency2() {
>           // 추천 서버 호출 - 상품 추천 #2
>       }
>       ```
>
>       
>
> - **Fallback**
>
>   - 메소드 Exception => 지정된 매소드 대신 실행
>
>   - 특정한 조건에 의해 실행(Circuit Open / Rejection / Timeout ..)
>
>   - **fallbackMethod** 로 대신 실행할 메소드 지정
>
>   - ```java
>     @HystrixCommand(commandKey = "ExtDep1", fallbackMethod="recommendFallback")
>     public String anyMethodWithExternalDependency1() {
>         // 추천 서버 호출
>     }
>     public String recommendFallback() {
>         return "<미리 준비된 상품 목록>";
>     }
>     ```
>
>   - Ex) 추천 서버 Exception => 고정된 리스트 추천
>
>   - 실제 에러사항을 감출 수 있는 가능성 인지
>
>   - Throw **HysrtixBadRequestException**
>
>     - Illegal/Null Exception 같은 파라미터 값의 에러는 개발자의 잘못이니 fallback하거나 통계로 넘기지 말자
>
> - **Thread Isolation**
>
>   - 해당 메소드를 Intercept
>
>   - 1. Thread
>        - ThreadPoolKey 지정하여 Circuit Breaker에 사용할 Thread 지정, 두 개의 CB가 하나의 Thread 공유 가능
>        - 최대 동시 요청 개수 제한 => 이상 적재 시, Rejection 에러 => Fallback 
>        - Caller Tread != 지정한 Thread Pool
>        - 실제 메소드의 실행은 다른 쓰레드에서 실행되므로 Thread Local 사용 시 주의
>        - <img src="https://blog.kakaocdn.net/dn/kOnGt/btqWxfmTxZJ/DTnKZAvhwZTERd2zgKqp40/img.png" alt="img" style="zoom:50%;" />
>
>     2. Semaphore
>        - Circuit Breaker 마다 Semaphore 존재
>        - 세마포 마다 최대 동시 요청 개수 제한 => 이상 적재 시, Rejection 에러 => Fallback 
>        - Caller Thread = 실제 메소드 Thread
>        - Timeout 제 시간에 발생 못함
>        - <img src="https://blog.kakaocdn.net/dn/cz7xWc/btqV37jVjKk/FMKDwKtVQmqaXEGzmvG2N0/img.png" alt="img" style="zoom:50%;" />
>
>   - 요청 수는 Back-End의 트래픽 관리에 중요
>
> - **Timeout**
>
>   - 특정시간 동안 메소드 종료되지 않을 때 => Exception
>   - 다른 타임아웃 라이브러리 많은데?
>     - 지정한 시간으로 Timeout 하지 않을 수도 있음
>     - 많은 라이브러리 사용은 Timeout에 치명적
>   - CommandKey 단위로 Timeout 설정
>     - Defualt : 1초

##### Ribbon

> **Netflix의 S/W Load Balancer 내장한 RPC(REST) Library**
>
> 기존 하드웨어 중심의 로드밸런싱(L4...etc) => Application에서도 로드밸런싱/서버 목록을 Client도 알도록
>
> - API 호출 단에 Ribbon Client 내장
> - End-Point만 알던 기존 REST에서, 하드웨어 인프라 도움 없이 서버 목록 호출/로드밸런싱
> - Zuul에 탑재되어있어 개발자가 별도로 Ribbon 사용 

##### Eureka

> **Netflix의 Dynamic Service Discovery**
>
> 각각의 MS가 유레카에 **이름/IP/Port** 등록 => 목록의 이름으로 조회 (DNS X)
>
> - Spring의 LifeCycle 맞물려 동작
>   - Spring 구동 시, 자동으로 Eureka 서버에 등록(UP)
>   - 주기적 HeartBeat로 Eureka에 자신이 살아있음을 알림
>   - 종료 시, Down 상태로 변경되거나 서버 목록에서 삭제
>
> **Ribbon의 설정 기반 로드밸런싱 기능 포함**
>
> - yaml에 서버 목록 지정 => Eureka로 LookUp
> - 더미동작 하는 Ping => Eureka 등록 확인 

#### 실제 적용

##### API Gateway

> Single End-Point로 제어
>
> **Spring Cloud Zuul**
>
> - API Routing을 Hystrix/Ribbon/Eureka로 구현
> - 실제 서비스 서버가 에러나도  Circuit Breaker/Isolation으로 격리 가능
>   - Semaphore Isolation이 기본값 => Timeout 설정 위해 Thread로 변경 => 모든 서비스가 하나의 Thread Pool로 동작 => **Zuul 사용의 가장 큰 문제점** / 자체적으로 MS 마다 Thread 분리할 필요

##### Server To Server ?

> 많은 API Server끼리 호출할 때, 트래픽은 제곱단위 => Eureka/Ribbon으로 서버끼리 P2P 호출 가능
>
> - HTTP + @LoadBalanced
>
> - Spring Cloud Feign
>
>   - Interface + Spring MVC Annotation 으로 HTTP 호출 가능한 Bean 생성
>
>   - ```java
>     // Eureka 에 등록된 이름으로 호출
>     @FeignClient(name = "product") // Ribbon + Eureka 연동 시, URL 생략
>     public interface FeignProductRemoteService {
>         @RequestMapping(path = "/products/{productId}")
>         String getProductInfo(@PathVariable("productId") String productId);
>     }
>     ```
>
>     ``` properties
>     #Hystrix Classpath에 설정해 연동 가능
>     feign.hystrix.enabled=true
>     #할당된 메소드마다 서버군 name으로 Thread Pool에 있는 Circuit Breaker 동작 가능
>     ```
>
>   - **3가지 플랫폼 솔루션을 쉽게 적용 가능**
>
>     - ![img](https://blog.kakaocdn.net/dn/bCjpdB/btqWn1W5Rqi/FzbNWKiItvLbiqBFSjgt3K/img.png)

##### Config

> **본래 JAR에 묶인 Properties를 Git으로 관리하여 유연한 Config 관리**
>
> 모든 서버에 Config Client 탑재 => Config 서버에서 제공되는 config가 PropertySource로 등록
>
> - 각 MS 마다 다르게 Config 설정 가능
> - SystemProperty 보다 높은 우선순위 갖음 => 우선순위 조정할 수 있음
>   - 보통 Sys - ConfigServer - App.yaml
> - Git 기반이라 코드비교, 롤백 쉬움
> - MS에서 동적으로 config를 동기화 할 수는 있지만, 새로운 패턴의 스코프를 정의하고 가짜 자바빈을 생성하는 등 과정이 복잡하기 때문에, 현재는 정적으로 값을 받는 중

#### 장애 시나리오

##### 하나의 서버군>API Server>인스턴스 장애 시

> **Eureka :  **HeartBeat 송신 중단, 일정 시간 경과 후 목록에서 해당 서버 사라짐
>
> - Default :  60 ~ 90초 후 목록에서 제거, 우리는 넷플릭스가 아니니까 줄일 필요 있음
> - Out Of Service : 다양한 API 활용하여 트래픽 즉시 제거 가능
>
> **Ribbon : **IOException(SocketReadTimeout/Connect) 발생 시, Retry(어떤 서버를 몇 번 호출할 지 지정 가능)
>
> **Hystrix : **50%의 에러 넘지 않는다면 Close 상태, Fallback/timeout은 동작

##### API Server 호출 장애 시

> **Hystrix : ** 서버 호출 시 100% 에러 => Circuit Breaker Open

#### 모니터링

> **거미줄 처럼 뻗어있는 API Server 호출 구조**
>
> - 가장 **앞**에 있는 서버는 **뒤**로 갈 수록 자신의 결과물이 **어디로/어떻게** 사용 되는지 모름
>   - 분산 Tracing
>     - 가장 앞 서버에서 **유효ID/Tracing정보** 생성 => HTTP Header에 저장해 끝까지 연동
>   - Sleuth
>     - 서버 내 모든 분산 정보 생성 => 컴포넌트 끼리 + 다른 서버에 까지 전달 가능
>     - 의존성 주입 시, 로그에 UUID 출력 (어느 서버에서 어느서버로 동작하는 지 추척 가능)
>     - 트위터의 Zipkin으로 각 API서버 동작을 추적 가능, 들여쓰기 관계가 호출 레벨
>     - Chrome Zipkin Plugin으로 가장 처음 호출되는 End-Poing API Server 호출 시, 연결되는 모든 서버 조회 가능
>     - <img src="https://blog.kakaocdn.net/dn/cSIWlu/btqvxWHosWE/KpYEBkKHi0RjvNUcCJZP4K/img.png" alt="img" style="zoom: 50%;" />
>     - 필요하지 않은 정보가 조회되는 것을 확인하여 부하를 줄일 수 있음
>
> **Hystrix 모니터링**
>
> - <img src="https://blog.kakaocdn.net/dn/dvYjyP/btqvybj4nFe/UKgAFZuHScQcJR5wb1jQPK/img.png" alt="img" style="zoom:67%;" />
> - 굉장히 자세하게 대시보드화
> - InfluxDB에 Mertrix 보관
>   - 시계열DB를 사용해 일주일치 저장
>   - Grafana 통해 대시보드 구성
>
> **Spring Boot Admin**
>
> - Spring Boot Actuator : 부트로 구축된 모든 서버 제어

#### 회고

> 오픈소스를 사용할 때
>
> - 버그/문서 부실 => 소스를 리뷰하며 정확한 동작의 원리를 자연스럽게 이해
>   - 실제 비즈니스 하면서 많은 피드백과 경험이 녹아있는 코드이기 때문에 더 가치가 있음
> - SKMS와 연결할 수 있지 않을까??
> - 버그리포트 멋있는데?

#### 각주

> **Spring Cloud의 Netflix OSS 내재화**
>
> - Hystrix : JAR 자체를 서비스
>
> - Eureka : 기존 유레카 + 추가 기능
>
> - Zuul : 소스 단순 복사
>
>   => OSS의 완성도는 Spring이 결정하나??
>
> **스프링 kafka로 Event-Driven 추구**

[누군가의 11번가 MSA 정리](https://freedeveloper.tistory.com/442)

[zuul 대신 SCG?](https://sky-h-kim.tistory.com/67?category=1069192)

[MSA의 API Gateway 프레임워크 선택](https://velog.io/@tlatldms/%EC%84%9C%EB%B2%84%EA%B0%9C%EB%B0%9C%EC%BA%A0%ED%94%84-MSA-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EC%9D%98-API-Gateway-%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC-%EA%B2%B0%EC%A0%95)

[SCG와 Feign 예제](https://velog.io/@dhk22/Spring-Cloud-MSA%EA%B0%84-%ED%86%B5%EC%8B%A0-RestTemplate-Feign-Client)

도커 공부하자