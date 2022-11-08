# Part 3 : 네이티브
### 네이티브

> 브라우저나 node 환경 등에 종속되지 않은, ECMAScript 명세된 내장 객체
>
- String, Number, Boolean, Array, Object, Function, RegExp, Date, Error, Symbol

```tsx
const a = new String('abc');

typeof a // 타입은 'object'

console.log(a); // String {'abc'} primitive 타입이 아니다.
```

- [[Class]] 프로퍼티
    - typeof에서 object인 값은 `Object.prototype.toString()`으로 확인할 수 있다.

        ```jsx
        Object.prototype.toString.call([1,2]) // '[object Array]'
        Object.prototype.toString.call(function() {}) // '[object Function]'
        Object.prototype.toString.call(null) // '[object Null]'
        Object.prototype.toString.call(undefined) // '[object Undefined]'
        Object.prototype.toString.call(1) // '[object Number]' 원시값은 박싱!
        ```

- 래퍼 박싱/언박싱
    - 자바스크립트는 원시값에서 프로퍼티나 메소드에 접근할 수 있게 자동으로 박싱을 해준다.
    - 엔진이 알아서 최적화하여 필요할 때 객체로 박싱을 해준다.

        ```jsx
        const a = new String('abc') => const a = 'abc'; // 더 알아보기 쉽게 표현하자
        const b = Object('abc'); // 수동으로 박싱이 필요하다면 Object() 함수 이용하자
        ```

    - Boolean 객체 래핑시 주의 필요

        ```jsx
        const a = new Boolean(false);
        
        if (!a) { ... } // a는 객체로 truthy값이기 때문에 실행 x
        ```

    - 언박싱은 `valueOf` 메소드로 할 수도 있고, 암묵적으로 강제형변환을 통해 언박싱 처리될 수 있다.
- Array
    - new를 붙여서 생성하는것과 붙이지 않고 생성하는것은 같다.

      `**! c++ 언어와 같은 정적타입언어에서 new를 통해 생성하면 힙 메모리 영역에 생성되는데 자바스크립트도 동일할까?**`

        ```jsx
        const a = new Array(1,2,3); [1,2,3]
        const b = Array(1,2,3); [1,2,3]
        
        const c = new Array(3) // 인자를 숫자하나로 받으면 해당 인자값만큼 채운 빈 배열 생성
        ```

- RegExp
    - 정규식은 리터럴 형식으로 사용하는게 성능상 좋다.
    - 정규 표현식 패턴을 `동적`으로 정의할 때는 RegExp()를 사용하자
- Date, Error
    - 두 네이티브 생성자 모두 리터럴 형식이 없다.
    - new를 사용하지 않고 Date()를 호출하면 현재시간에 대한 문자열을 리턴한다.
    - 반면에 Error 생성자는 Array와 마찬가지로 new 키워드 여부와 상관없이 리턴값이 같다.
- Symbol

  > ES6에서 새로 추가된 원시값으로, 충돌 염려 없이 객체 프로퍼티로 사용할 수 있는 유일값
  >
    - 생성자 앞에 new를 붙이면 에러가난다.
    - 심볼의  실제값을 보거나 접근할 수 없다. 그래서 대부분 전용/특수 프로퍼티로 정의하고자할 때 사용한다.

      `**! Symbol을 현업에서 쓸일이 있을까?**`

- 네이티브 프로토타입
    - 각 생성자 프로토타입은 타입에 맞는 기능이 메소드로 구현되어 있다. (.prototype객체에 정의 되어있다.)
    - 생성자 별로 prototype은 Function은 함수, Array은 배열, RegExp은 정규식이다.
    - 네이티브 프로토타입은 건들지 말자..

### 추상 연산

- `**toString**`
    - 원시값의 경우 정해져 있는 방식대로 문자열을 반환한다.
    - toString을 특별히 지정하지 않는 경우 `Object.prototype.toString`을 반환한다.
- `**JSON.stringify**`
    - JSON 안전값이 아닌 값 (undefined, function, symbol등)이 프로퍼티에 있으면 제거하고, 배열에 있으면 null로 치환한다.
    - 환형참조 객체를 넘기면 에러 발생
    - 첫번째 인자는 타겟 객체, 두번째 인자는 필터링, 세번째 인자는 space를 지정할 수 있다.
    - toJSON : 객체의 프로퍼티로 stringify시 문자열 처리할 직렬화 함수를 정의한다.
- **`toNumber`**
    - false → 0
    - true → 1
    - undefined → NaN
    - `null → 0`
    - `ToPrimitive` : 타겟 객체가 valueOf가 구현되어있으면 원시값을 강제변환, 아니면 toString으로 강제변환 그외에 경우는 TypeError발생시킴
- **`toBoolean`**
    - Falsy 값
        - `undefined, null, false, +0/-0, NaN, “”` (외우기)
        - 강제변환시 false
    - Falsy 객체
        - 일반적으로 객체는 truthy하고, document.all와 같은 특이한 객체만 해당된다. (IE를 구분하기 위한 용도..)

            ```jsx
            Boolean(document.all); // false
            ```
# Part 4 : 강제변환

### 명시적 강제변환

> 분명하고 확실한 타입 변환
>

```jsx
const a = 35;
const b = '3.14';

const c = String(a); // '35'
const d = Number(b); // 3.14

const e = a.toString(); // '35'
const f = +b; // 3.14 +단항 연산자는 협업할때는 사용하지 말자! 연산자와 헷갈릴 여지가 있다.. 
const timeStamp = +new Date();

const g = Boolean(a) // true
const h = !!a // true
```

- ~연산자 : 32비트로 강제변환 후 NOT 연산을 한다.
    - 실패시 -1을 리턴하는 메소드 리턴값을 명시적 강제변환처럼 바꿀 수 있다.

        ```jsx
        const someText = 'Hello everyone?';
        
        if(~someText.indexOf('every')) { ... }; // -1 이외에는 truthy
        if(!~someText.indexOf('any')) { ... }; // -1 인경우 falsy
        
        // 음..이게 정말 읽기 좋은 코드인가?
        ```

- parseInt : 왼쪽에서 오른쪽으로 파싱하다가 숫자가 아닌 문자를 만나면 멈춤
    - Number와 다르게 NaN을 바로 뱉지않는다.
    - ES5에서는 두번째 인자로 진법 종류를 명시하지 않으면 자기 멋대로 해석해서 버그를 일으킬 수 있다.
    - 인자값을 강제로 문자열로 바꾼후 연산한다.

        ```jsx
        parseInt(0.0000008) // 8 ("8e-7", "8")
        parseInt(false, 16) // 250 ("false" , "fa");
        parseInt(parseInt, 16) // 15 ("function...", "f");
        parseInt("103", 2) // 2 ("103", "10")
        ```


### 암시적 변환

> 명확하지 않고 숨겨진 형태로 이루어지는 타입 변환
>
- + 연산자
    - 피연산자 중 하나가 문자열이면 문자열 붙이기 연산을 한다.
    - 피연산자가 primitive 타입이 아니면 내부적으로 ToPrimitive 연산을 수행하고 연산을 한다.

    ```tsx
    const a = [1,2];
    const b = [3,4];
    
    a + b // '1,23,4'
    [] + {} // [object Object]
    {} +[] // 0 {}를 빈 블록으로 인식하여 +{}로 인식됨
    ```

- -, /, * 연산자
    - 숫자 연산을 하기 때문에 숫자로 강제변환한다.
    - 피연산자가 primitive 타입이 아니면 마찬가지로 ToPrimitivie 연산 수행 후 숫자로 강제변환하여 연산한다.
- 조건문 표현식
    - 조건문 값이 boolean이 아닌 경우에 강제변환한다.
    - Falsy (`undefined, null, false, +0/-0, NaN, “”`) 값을 제외하고는 모두 true
- || && 연산자 (선택연산자)
    - 두 연산자 모두 피 연산자가 boolean이 아니면 강제변환 후 평가를 한다.
    - || 연산자는 결과가 `true`이면 첫번째 피연산자를, `false`이면 두번째 피연산자를 리턴한다.
    - && 연산자는 결곽 `true`이면 두번째 피연산자를, `false`이면 첫번째 피연산자를 리턴한다.
        - 가드역할로 사용할 수 있다.

  ⇒ 암시적 강제변환은 항상 코드 가독성을 저해한다고 생각했는데, || && 연산자가 암시적 연산자였다는게 놀랍다!

- symbol 강제변환
    - symbol은 명시적 강제변환은 허용되나 암시적 강제변환은 금지되어있다.
    - 그러나 Number로 명시적 강제변환은 에러 발생, boolean타입으로 암시적 강제변환은 항상 true를 리턴한다..
