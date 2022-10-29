---
title: "You don't Know JS Study-01"
metaTitle: "You don't Know JS Study-01"
metaDescription: "Part1, Part2 정리"
date: "2022-10-22"
---
# Part 1 : 타입
### 자바스크립트 타입

> 자바스크립트에서 어떤 값을 다른 값과 분별할 수 있는 고유한 특성 집합
>
- 변수는 타입이 없지만 값은 타입이 있다. (변수의 타입은 동적으로 변동될 수 있다.)
- primitive type: undefined, null, boolean, string, number, symbol
- null : falsy(false와 다름없는) 한 원시값이지만, 타입은 object 이다.

```jsx
const a = null;
typeof a === 'object' // true
```

- function : object 타입의 하위 타입으로 호출가능한 객체이다.
    - function 객체의 length는 인자값의 개수를 의미한다.

      ```jsx
      function a(b, c) { ... }
      a.length // 2
      ```

- typeof
    - 선언되지 않은 변수에 대한 비교에서도 ReferenceError를 일으키지 않고 undefined를 리턴한다. (안전가드)

      ```jsx
      const a = undefined;
      typeof a // "undefined"
      typeof b // "undefined"
      ```


# Part 2 : 값

### 배열 주의할 점

- 배열에 delete 연산을 통해 해당 인덱스값을 제거해도 배열의 length는 줄어들지 않고 슬롯만 비워진다.

    ```tsx
    const a = [ 1, 2 ,3 ];
    delete a[1];
    console.log(a) // // [ 1, 비어있음, 3 ]
    ```

- 배열도 object 타입이기 때문에 프로퍼티를 추가할 수 있으나, 프로퍼티 키값이 10진수 숫자면 인덱스로 인식하게 된다.

    ```tsx
    const a = [ ];
    a[0] = 1;
    a['test'] = 2;
    
    a.length // 1
    a['13'] = 42;
    a.length // 14
    ```


### 문자열 주의할 점

- 문자열은 문자배열과 달리 불변값이다.
- 문자열 메서드는 내용을 변경하지 않고 항상 새로운 문자열을 반환한다.

### 숫자 주의할 점

- 숫자 값은 Number 객체로 래퍼로 박싱될 수 있기 때문에 Number.prototype 메소드 접근가능하다.

    ```tsx
    const a = 43.56;
    
    a.toFixed(1);
    a.toPrecision(2);
    (25).toFixed(1);
    25..toFixed(1);
    0.25.toFixed(1)
    ```

- 정수의 최대 표현 범위 `Number.MIN_SAVE_INTEGER` ~ `Number.MAX_SAVE_INTEGER`는 -9천조 ~ 9천 조이다.

### undefined vs null

- undefined 타입
    - 값은 undefined 만 있음
    - 값이 할당되지 않은 상태
    - typeof undefined  ⇒ “undefined”
- null 타입
    - 값은 null만 있음
    - 값이 있었지만 현재는 없는 상태
    - typeof null ⇒ “object”

### NaN

- Not A Number의 약자로 유효하지 않은 숫자를 의미한다
- 그러나 typeof로 확인해보면 “number” 타입이다..
- Number.isNaN이나 ES6에서부터는 Object.is 내장함수를 통해서 값을 비교할 수 있다.

### 값 vs 레퍼런스

- null, undefined, string, number, bollean, symbol은 값-복사 방식으로 동작, 그 외 object는 공유한 값을 가리키도록 하는 레퍼런스 복사로 동작한다.
- 자바스크립트에서는 포인터의 개념이 없기 때문에 한 변수가 다른 변수를 참조할 수 없다.

    ```tsx
    const a = [1, 2, 3];
    let b = a;
    
    b.push(4);
    b = [4, 5, 6]; // b로 a가 가리키고 있는 값을 바꿀 수 없다.
    
    a // [1, 2, 3, 4]
    b // [4, 5, 6]
    ```
