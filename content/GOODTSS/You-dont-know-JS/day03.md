# Part 4 : 강제변환
### 동등 비교

- == : 느슨한 동등 비교 `(강제변환 허용)`
- === : 엄격한 동등 비교 `(강제변환 허용x)`
- 추상적 동등 비교 알고리즘

  > 느슨한 동등 비교에서 강제변환 규칙 명시
  >
    - 문자열과 숫자 비교 → ToNumber 추상연산 수행
    - boolean 타입이 있는 경우 → boolean을 ToNumber 추상연산 수행 후 비교
    - undefined와 null → 각 타입에 맞춰주기 때문에 true를 반환

        ```tsx
        // true
        undefined == null
        
        // 코드를 간결하게 쓸 수도 있다.
        if (a === undefined || a === null) { ... }
        => if (a == null) { ... }
        ```

    - 객체와 비객체 비교 → 객체를 ToPrimitive 연산을 수행한 후 비교한다.
    - 박싱 객체 비교 → ToPrimitive연산에서 valueOf값을 꺼내와서 비교

        ```tsx
        const a = 'abc';
        const b = Object('abc');
        
        a === b // false
        a == b // true 
        
        const c = null;
        const d = Object(c);
        
        c == d // false (객체 래퍼가 없음)
        
        const e = undefined;
        const f = Object(e);
        
        e == f // false (객체 래퍼가 없음)
        ```

    - `타입이 다른 경우 최종적으로 Number 타입으로 변경한다.`
    - 우리가 자바스크립트가 어려운 이유는 암시적 강제변환시 사용되는 ToPrimitive 연산 때문이다.
    - === 사용하자!
- 객체 동등 비교는 ==와 === 모두 같은 레퍼런스인 경우만 같다.

### 관계 비교

> 피연산자 a < b 에대한 연산 ( a > b 는 b < a 로 바꿔서 처리한다.)
>
- 공통 : `두 피연산자에 ToPimitive 강제변환 수행`
- 두 피연산자 모두 문자열인 경우 → 문자열 알파벳 순서 비교
- 하나라도 문자열 아닌 경우 → ToNumber 연산 후 비교

    ```tsx
    const a = { b: 42 };
    const b = { b: 43 };
    
    a < b // [object Object] < [object Object]
    a == b // 객체 동등비교 = 레퍼런스 비교
    a > b // [object Object] > [object Object]
    a <= b // true 
    a >= b // true
    ```


### 정리

- 명시적 강제변환 : 혼동의 여지를 줄여 코드 가독성 향상 및 유지보수성 증대
- 암시적 강제변환 : 숨겨진 로직에 의한 부수효과가 있지만, 암묵적으로 수행되는 코드들로 인해 필요없는 코드가 줄어들어 코드 가독성을 향상시켜줄 수 있다.

# Part 5 : 문법
### Statement 와 Expression

- statement : 문장
- expression : 어구
- operator : 구두점/접속사
- 문의 완료 값

  > 자바스크립트는 statement가 수행되면 항상 완료값을 리턴한다.
  >
    - console에서 특정 구문을 수행한 후 undefined가 나타나는 것 등이 해당된다.
    - { } 내부 마지막 statement/expression 완료값을 자신의 완료값으로 반환한다.
    - delete 문은 유효하거나 허용된 연산인 경우 true, 그외에 경우에는 false를 반환한다.
    - 할당문에서는 완료값으로 할당 받은 값을 반환한다.
- 선언되는 위치에 따라 달라지는 구문
    - { } : 객체 리터럴, 코드 블록

        ```tsx
        const bar = () => { ... }
        const a = { foo: bar() }; // 객체 리터럴
        
        { foo: bar() }; // 레이블을 품은 코드 블록 (continue나 break문에서 사용 가능)
        { 'a': 42 }    // 레이블에는 '가 포함되면 안되므로 문법적으로 코드블록이 아니다.
        ```

    - else if : 코드는 else와 if 조합으로 파싱된다.
