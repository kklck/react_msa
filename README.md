# REACT 청약 프로젝트

> **라이나생명의 GA 모바일 전자서식을 보안할 방법을 탐구하고자 다양한 방법론과 기술을 응용한 마이그레이션 프로젝트**

### 소개

| 프로젝트명 | GA 마이그레이션 프로젝트                |
| ---------- | --------------------------------------- |
| 개발기간   | 2021.07.12~                             |
| 인원       | 2명                                     |
| Front-End  | React, axios, 추가바람..                |
| Back-End   | Java, Spring-Boot, MariaDB, JPA, Gradle |
| Tool       | IntelliJ, VSCode, HeidiSQL              |
| OS         | Window 10                               |

### 개발 환경

> JDK : 11
>
> Spring-Boot : 2.5.2
>
> [MariaDB : 10.6.3(x86_64)](https://mariadb.org/download/)
>
> - 환경 변수 설정 : PATH에 bin 설정
>
> - ```properties
>   # 데이터베이스 이름 "raina"
>   spring.datasource.url=jdbc:mariadb://localhost:3306/raina
>   # 계정
>   spring.datasource.username=root
>   spring.datasource.password=root
>   ```
>
> [Gradle 7.1.1 설치](https://gradle.org/releases/)
>
> - 환경 변수 설정 : PATH에 bin 설정

### 구성

> <img src="C:\Users\Roy\AppData\Roaming\Typora\typora-user-images\image-20210718042642986.png" alt="image-20210718042642986" style="zoom: 150%;" />
>
> **Eureka**
>
> - 서비스의 Discovery 수행
> - 아래 설명 참고
>
> **Gateway**
>
> - 서비스의 주소 통합
> - 아래 설명 참고
>
> **Apply, Payment**
>
> - 청약 신청과 결제 처리 서비스 제공
> - front의 REST API Server
>
> **Frontend**
>
> - 컴포넌트와 라우터로 구성
> - axios로 RESTful

### 서비스

> - 청약 신청
>   1. 금융기관 별 보험상품 제공
>   2. 계약관계자 정보 설정
>   3. 계약 사항 조회
>   4. 합계 보험료 산정
> - 결제 처리
>   1. 다양한 결제 방법 제공
>   2. 기존 결제 방법 저장
>   3. 추가바람..

### REACT?

> **페이스북에서 제공하는 프론트 구축 라이브러리**
>
> SPA : Single Page Application
>
> **JSX**
>
> - JavaScript eXtension : 자바스크립트 확장 버전ES6
> - JavaScript와 html을 혼용하여 작성 => Babel => ES5
> - 속성은 항상 ""
> - 태그는 항상 클로징, 모든 태그 셀프클로징 지원
> - 이어진 형제태그 X
> - render 안에 JavaScript 변수는 {}
>
> **렌더링**
>
> - 어느 컴포넌트 안에서 변경이 있을 때, 전/후의 엘리먼트 비교 => 실제 DOM 업데이트
> - 하지만 모든 변화에 직접 호출하지 않음 => setState() 수행 => 해당 컴포넌트를 변경 대상(Dirty Component)로 등록 => 다음 이벤트 루프에서 배치 작업으로 렌더링
>
> **DOM**
>
> - JavaScript Node 개체의 계층화된 트리로, HTML, XML 문서의 프로그래밍 API
> - 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공

#### 하는 이유

> 1. Component로 UI의 개별적인 View 구성
>    - 하나의 Component를 여러 곳에서 사용하여 생산성/재사용성/유지보수 추구
> 2. JavaScript 형태의 Virtual DOM을 사용하여 어플리케이션 성능 향상
>    - 실제 DOM 보다 빠른 가상 DOM
> 3. Rest API를 이용하는 라이브러리
>    - 다른 프레임워크와 연동 가능
> 4. 동적인 동작에 이점이 많다
>    - 상호작용 UI 쉽게 구현 가능
>
> 추가바람...

#### 단점

> 1. 프론트 기능 외에는 직접 구현해야 함
> 2. 문법이 까다로워 학습에 시간 필요

### MSA?

>추가 바람...

### Build

> **기본 구동 방법**
>
> - 루트 디렉토리에서 여러 터미널을 엶
>
> ```shell
> ## 각각의 마이크로 서비스에 접근
> cd [서비스 디렉토리 이름]
> ## 해당 프로젝트 실행
> Gradle bootRun
> ```
>
> - [Eureka 서버](http://localhost:8761/) 확인
>
> ```shell
> cd frontend
> # npm 보다 효율적인 yarn
> npm install yarn
> # 싱글페이지 이지만 자원을 구분하기 위한 라우터
> npm install react-router-dom --save
> # REST를 비동기로 주고 받기 위한 기능
> npm install axios --save
> # react 시작
> yarn start
> ```

> **Intellij 사용 시**
>
> - 루트 디렉토리에서 View - Tool Windows - Services 클릭
> - 각각의 SpringBoot 서비스를 쉽게 관리
> - react의 의존성이 바뀌면 오른쪽 아래 npm install로 yarn 자동 설치

### CORS

> **Cross Origin Resource Sharing**
>
> - 다른 출처의 자원을 공유할 수 있도록 허용
>   - React(3000) <=> Gateway(8003)
>
> 허용 설정 위치 : react_msa\msa-gateway\src\main\resources\application.yml

### Spring Cloud Eureka

> **넷플릭스에서 공개한 REST 기반 미들웨어 서버, OSS Service Registry**
>
> - 각각의 서비스를 레지스트리로 가지는 Server
> - 동적 탐색 및 로드밸런싱 제공
>   - IP 주소 뿐만 아니라 등록된 서비스 이름으로 호출 가능

### Spring Cloud Gateway

> **API Gateway -> Client 요청별 처리**
>
> - Zuul과 같이 비동기, 논블로킹 방식
> - Netty 런타임 기반 동작
> - Spring WebFlux 기반
> - Servlet 기반 Spring MVC와 호환이 매끄럽지 않음
> - 레거시를 점진적으로 교체하기 용이
>
> **구성**
>
> - Route : predicates/Filter/실제 자원 식별하기 위한 고유 요소, 모두 만족해야 매칭
> - Predicates : 처리 전 로직/헤더/HTTP Method 가 정의된 기준에 맞는지
> - Filter : 모든 호출에 대하여 전/후의 요청/응답 수정으로 모니터링 가능![image-20210718032754211](C:\Users\Roy\AppData\Roaming\Typora\typora-user-images\image-20210718032754211.png)
>
> **zuul과 비교?**
>
> - 초창기 Netflix 오픈소스에 API Gateway는 zuul
>   - 서블릿 프레임워크 기반(동기, 블로킹)
> - 최근들어 비동기, 논블로킹 대세 => zuul2 등장
> - Spring의 취지와 맞지 않아 SCG 개발
> - SCG가 호환에서 압도적

### REST?

> **자원(URI)을 표현(GET, POST)하여 상태(JSON, XML, TEXT) 전달**
>
> **사용하는 이유?**
>
> - 멀티 플랫폼 지원으로 얻을 수 있는 장점이 너무나 많음
>
> **특징**
>
> - Client-Server 간 Stateless 호출
>   - Client : 유저 인증, Context 관리
>   - Server : API 제공, 비즈니스 로직 구현 및 저장
> - Cacheable
>   - HTTP 프로토콜 사용 => 많은 요청 캐시 처리 가능
>   - REST Server 트랜잭션 없음 => 기능 향상
> - 계층화
>   - 보안/로드밸런싱/암호화/인증 단계 구분

#### REST API?

> **REST 기반의 API, MSA의 기본 형식**
>
> **특징**
>
> - 확장성(기술 스택), 재사용성(유지보수)

#### RESTful

> **REST로 구현된 웹 페이지를 나타내는 모든 서비스**
>
> **Restfulish 한 코딩?**
>
> - HTTP Method를 상황에 맞게 사용할 것.
> - 자원(URI)에 정보를 노출하지 말 것.

