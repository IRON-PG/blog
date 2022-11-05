---
title: "CH4.5 느슨한/엄격한 동등 비교 ~ CH5.1 문과 표현식"
metaTitle: "You don't Know JS Study-03"
metaDescription: "CH4.5 느슨한/엄격한 동등 비교 ~ CH5.1 문과 표현식"
author: "yuuil"
date: "2022-11-05"
---
# 4.5 느슨한/엄격한 동등 비교

- 느슨한 동등 비교는 `==` 연산자, 엄격한 동등 비교는 `===` 연산자를 사용.
- 통상적으로 `==는 값의 동등함을, ===는 값과 타입 모두의 동등함을 비교한다` 라고 알려져 있으나 `**동등 비교 시 ==는 강제변환을 허용하고, ===는 강제변환을 허용하지 않는다`** 가 맞는 표현임.

### 비교 성능

- == 와 === 모두 피연산자의 타입으로 체크하며, 타입이 같은 두 값의 동등 비교일 때는 알고리즘이 동일하고, 타입이 다를 경우 ==는 강제변환을 해야 하므로 수 마이크로 초 정도 소요됨 (성능 차이 크지 않음).

### 추상 동등 비교

문자열 → 숫자

- Type(x)가 string이면 ToNumber(x) == y, Type(y)가 string이면 x == ToNumber(y)

* → 불리언

- Type(x)가 boolean이면 ToNumber(x) == y, Type(y)가 boolean이면 x == ToNumber(y)
- FYI) “42” == true, == false 도 아님.
    - “42”가 불리언으로 강제변환되는 것이 아니라 true가 1로 강제변환되고 “42”가 42로 강제변환됨.

null → undefined

- x가 null이고 y가 undefined이면 true, x가 undefined이고 y가 null이면 true
- 느슨한 동등 비교에서는 서로에게 타입을 맞춤.

객체 → 비객체

- Type(x)가 string 또는 number이고 Type(y)가 object이면 x == ToPrimitive(y), Type(x)가 object이고 Type(y)가 string 또는 number이면 ToPrimitive(x) == y

### 희귀 사례

- 내장 네이티브 프로토타입을 변경할 때 일어날 수 있음

```jsx
Number.prototype.valueOf = function() {
	return 3;
}

new Number(2) == 3; // true, ToPrimitive 강제변환으로 valueOf 호출해서 3 == 3 동등 비교

var i = 2;
Number.prototype.valueOf = function() {
	return i++;
}

var a = new Number(42);
if (a == 2 && a == 3) { // a == 2이 a == 3 보다 먼저 평가되므로 valueOf 두 번 호출됨
	console.log('대참사..');
}
```

- falsy 비교

```jsx
// 긍정 오류
"0" == false    // true
false == 0      // true
false == ""     // true
false == []     // true
"" == 0         // true
"" == []        // true
0 == []         // true
```

- 그 외

```jsx
[] == ![]       // true, ! 단항 연산자가 명시적 강제변환 해서 [] == false 동등 비교
"" == [null]    // true, 배열의 valueOf는 자기 자신을 반환하므로 강제변환에서 배열을 문자열화
                // [null]은 ""이 됨
0 == "\n"       // true, 공백 문자는 ToNumber를 경유해 0으로 강제변환
```

### 암시적 강제변환 안전하게 사용하기

- 피연산자 중 하나가 true/false일 가능성이 있다면 == 연산자 쓰지 말기.
- 피연산자 중 하나가 [], “”, 0이 될 가능성이 있다면 가급적 == 연산자 쓰지 말기.
- 의도하지 않은 강제변환을 잘 차단한다면 강제변환을 이용해 비교 로직을 간결하게 표현할 수 있음.

## 추상 관계 비교

- 추상적 관계 비교 알고리즘은 피연산자 모두 문자열일 때와 그 외의 경우로 나뉨.
    - 💡 명세에는 `a < b` 만 정의되어 있음 → `a > b` 는 `b < a` 로 처리됨.
- 두 피연산자에 대해 ToPrimitive 강제변환을 실시함 → 어느 한쪽이라도 문자열이 아닌 경우 양쪽 모두 ToNumber로 강제변환.
- `<` 비교 대상이 모두 문자열 값이면 단순 어휘 비교.
- 주의
    
    ```jsx
    var a = { b: 42 }
    var b = { b: 43 }
    
    a < b     // false, [object Object]로 변환되어 어휘적인 비교가 불가능
    a == b    // false, 객체는 정확히 같은 값에 대한 레퍼런스인 경우에만 동등
    a > b     // false
    
    a <= b    // true, 💡 a <= b는 b < a 평가 결과를 부정하는 것이 명세
    a >= b    // true
    ```
    
- 엄격한 관계 비교는 없기 때문에 비교할 값을 명시적으로 강제변환해두는 것이 안전.

# 5. 문법

## 문과 표현식

문은 하나 이상의 표현식으로 구성되며, 표현식은 연산자로 연결할 수 있음. 어떤 표현식은 그 자체로 문이 되기도 함. 모든 표현식은 특정 결과값으로 계산됨.

### 문의 완료 값

- 모든 문은 완료 값을 가짐.
- `var` 문 자체의 완료 값은 `undefined`
    - 콘솔에서 문의 실행 결과가 undefined로 표시되는 이유.
- `{ } 블록` 은 내부의 가장 마지막 문/표현식의 완료 값을 자신의 완료 값으로 반환.
- 문의 완료 값을 다른 변수에 할당하는 것은 쉬운 구문으로는 불가능.
    - `eval()` 함수를 사용할 수 있는데.. ~~굳이 사용하지 말자~~
    - 개선책으로 ES7에 `do expression` 이 제안은 됐는데 아직 aprrove 되지는 않은 듯

### 표현식의 부수 효과

- 대부분의 표현식은 부수 효과가 없음.
- 부수 효과를 가진 표현식
    - 증가 연산자(++) / 감소 연산자(--)
        
        ```jsx
        var a = 42
        var b = a++
        
        a // 43
        b // 42
        
        // b에 43을 반환하고 싶다면
        var a = 42, b
        b = (a++, a)  // 양쪽 괄호 빠뜨리면 안 됨, a++ 이후에 a를 평가하기 때문에 b 값이 43
        ```
        
    - FYI) `++a++` 은 `ReferenceError` , 부수 효과를 유발하는 연산자는 부수 효과를 일으킬 변수 레퍼런스가 꼭 필요. `++a++` 에서는 `a++` 부분이 연산자 우선순위 규칙에 의해 먼저 평가되어 증가되기 이전 값을 반환하는데 원시 값에 직접 부수 효과를 일으킬 수 없기 때문.
    - delete 연산자
        
        ```jsx
        var obj = {
        	a: 42
        }
        obj.a // 42
        delete obj.a // true, 유효한 연산일 경우 true / 그 외에 false
        obj.a // undefined
        ```
        
    - = 할당 연산자
        
        ```jsx
        var a
        a = 42 // 42, 문의 완료 값이 막 할당된 값이므로 부수 효과
        a // 42
        ```
        
        - 연쇄 할당문에서 유용
        
        ```jsx
        var a, b, c
        a = b = c = 42
        
        var a = b = 42 // 겉보기에는 위와 같을 것 같지만 b를 선언하지 않은 상태에서 실행하면
                       // b를 직접 선언하지 않기 때문에 strict mode에서는 에러가 나거나
                       // 원치 않는 전역 변수가 생성됨
        ```
        

### 콘텍스트 규칙

- 중괄호
    - 객체 리터럴
    
    ```jsx
    var a = {
    	foo: bar() // bar() 함수는 앞에서 정의된 걸로 가정
    }
    ```
    
    - 레이블
        - `continue` 와 `break` 문은 선택적으로 레이블을 받아 `goto` 와 비슷하게 실행 흐름을 점프시킬 수 있음.
        - 레이블은 비 루프 블록에도 적용할 수 있는데 `break` 만 참조 가능함.
            - 단, `break __` 를 써서 레이블 블록 밖으로 나갈 수만 있고, `continue __` 나 레이블 없는 `break` 는 불가능함
        
        ```jsx
        {
        	foo: bar()
        }
        
        foo: for(var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if(j == i) {
              // foo 레이블이 붙은 루프의 다음 순회를 계속하라
              continue foo;
            }
            if((j * i) % 2 == 1) {
              // 평범한(레이블 없는) 안쪽 루프의 continue
              continue;
            }
            console.log(i, j);
          }
        }
        
        // 1 0
        // 2 0
        // 2 1
        // 3 0
        // 3 2
        
        foo: for(var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if((i * j) >= 3) {
              console.log("그만!", i, j);
        			// foo 레이블이 붙은 바깥쪽 루프로 나가 그 이후부터 계속하라
              break foo;
            }
            console.log(i, j);
          }
        }
        
        // 0 0
        // 0 1
        // 0 2
        // 0 3
        // 1 0
        // 1 1
        // 1 2
        // 그만! 1 3
        ```
        
    - JSON
        - `{"a": 42}` 같은 JSON은 그 자체로 올바른 자바스크립트 문법은 아님.
        - JSON-P (JSON 데이터를 `foo({"a":42})` 같은 함수 호출로 감싸는 패턴) 방식으로 해결할 수 있음. → JSON을 문법에 맞는 자바스크립트 코드로 변환해주는 것
- 블록
    
    ```jsx
    [] + {} // "[object Object]", {}는 빈 객체 값으로 해석
    {} + [] // 0, {} 는 동떨어진 빈 블록으로 간주
    ```
    
- 객체 분해
- else if와 선택적 블록
    - 자바스크립트에는 `else if` 는 없음 ~~충격적.. ㄴㅇㄱ 세상이 나를 상대로 장난을 친다~~
    - if와 else 문은 실행문이 하나밖에 없는 경우 블록을 감싸는 `{}` 를 생략할 수 있는데 else if는 이러한 규칙에 따라 아래와 같이 동작
    
    ```jsx
    if (a) {
      // ...
    }
    else if (b) {       // else 이후의 단일 문으로 판단
      // ...
    }
    else {
      // ...
    }
    
    // 아래와 같이 파싱됨
    
    if (a) {
      // ...
    }
    else {
      if (b) {
        // ...
      } else {
        // ...
      }
    }
    ```