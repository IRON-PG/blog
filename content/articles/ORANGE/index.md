---
title: "You don't Know JS Day-01 \n@paryyongwoo"
description: "Part1, Part2 정리"
date: "2022-10-22"
banner:
  src: "../../images/you-dont-know.png"
  alt: "You don't know JS"
categories:
  - "ORANGE"
---
# 챕터 1 타입

자바스크립트에서 사용되는 모든 값들은 전부 타입을 가진다. 이 때 ECMAScript 개발자가 ECMAScript 언어를 이용하여 직접 조작하는 값들의 타입이 **ECMAScript 언어 타입**이다.

동적 언어(dynamic)인 자바스크립트 역시 정적 언어(static)와 마찬가지로 타입 개념이 존재한다.

## 내장 타입

자바스크립트에는 7개의 내장 타입이 존재한다.

1. null
2. undefined
3. boolean
4. number
5. string
6. object
7. symbol (ES6 부터 추가)

### typeof 연산자

값의 타입을 알기 위해서는 `typeof` 연산자를 사용하면 되는데, `typeof` 연산자가 항상 위의 7가지 내장 타입 중 하나를 반환하는 것은 아니다. null을 제외하고는 모든 값들에 대해 6가지 타입이 반환이 된다.

```jsx
typeof null === "object"; // true
```

이는 자바스크립트상의 버그이며 특정 값의 타입이 null 인지를 정확히 판단하기 위해서는 다음과 같은 조건을 추가하여 확인할 수 있다.

```jsx
var a = null;
(!a && typeof a === "object"); // true
```

즉, null은 falsy한 유일한 원시 값이지만 (?), 타입은 ‘object’이다.

<aside>
💡 undefined, 0, “” 등도 falsy한 원시값이 아닌가?

</aside>

`typeof` 연산자가 반환하는 6가지 문자열 (undefined, boolean, number, string, object, symbol) 말고도 function 도 있다. 이렇게 보면 function 타입도 최상위 레벨의 내장 타입처럼 보이지만 실제로는 object의 하위 타입이다.

```jsx
typeof function a() {} === "function" // true
```

특이한 케이스가 또 있는데, 배열의 경우 typeof 연산을 해보면 “object” 가 반환된다. 배열은 **숫자 인덱스를 가지며, length 프로퍼티가 자동으로 관리**되는 객체의 하위 타입일 뿐이다.

```jsx
typeof [1,2,3] === "object" // true
```

### 값, 타입, 변수

값에는 타입이 있지만, 변수엔 따로 타입이란 없다. 변수는 언제라도, 어떤 형태의 값이라도 가질 수 있다.

```jsx
var a = 42;
typeof a; // "number"
```

위의 소스에서 a라는 변수에 `typeof` 연산을 한것은 “a라는 변수의 타입은 무엇인가” 라고 묻는 질문처럼 보이지만 실제로 **타입이란 개념은 변수에는 없으므로** “a라는 변수에 들어있는 **값의 타입은 무엇인가**” 라고 묻는 질문이다.

### 값이 없는 vs 선언되지 않은

값이 없는 변수의 값은 undefined 이다. 그렇기에 typeof 의 결과는 “undefined” 이다.

`undefined`는 접근 가능한 스코프에 변수가 선언은 되었으나 현재 할당된 값이 없는 경우를 나타내는데, `undeclared`의 경우 접근 가능한 스코프에 변수 자체가 선언되지 않은 경우를 의미한다.

이 두 개념은 유사해 보이지만 접근 가능한 스코프에 선언된 변수의 유무에 따라 차이를 지닌다.

```jsx
var a;

a; // undefined
b; // Uncaught ReferenceError: b is not defined
```

예제 소스에서 b의 경우 ‘b is not defined’ 라는 문구를 표시해주는데, 이는 undefined라고 착각하기 쉽다. ‘b is not declared’ 라고 이해하면 좋을 것 같다.

그런데 undeclared 변수에 대한 typeof 연산 결과도 특이하다.

```jsx
var a;

typeof a; // "undefined"
typeof b; // "undefined"
```

선언하지 않은 변수인 b에게 typeof 연산을 했을 경우에도 “undefined”가 나오고 에러는 발생하지 않는데, 이는 typeof 만의 안전 가드 (safe guard)라고 볼 수 있다.

자바스크립트 모듈을 사용하지 않고 여러 스크립트 파일들의 변수들이 전역 네임스페이스를 공유할 때 typeof 의 안전 가드는 유용하다. 각 스크립트 파일의 변수들이 다른 스크립트 파일에서 중복되어 선언되지 않았다고 보장할 수 없으므로 특정 변수가 존재하는지 확인을 해야할 필요가 있다.

```jsx
if (DEBUG) { // 에러 발생, Uncaught ReferenceError: DEBUG is not defined
  console.log("디버깅 시작");
}

// 안전 가드에 의해 에러가 발생하지 않는다.
if (typeof DEBUG === "undefined") {
  console.log("디버깅 시작");
}
```

혹은 브라우저 내의 모든 전역 변수는 window 객체의 프로퍼티라는 점을 이용하여 다음과 같이 확인할 수 있다.

```jsx
if (window.DEBUG) {}
```

다만 자바스크립트 실행 환경이 브라우저가 아닌 경우도 있기에 위의 방식은 권장되지 않는다.

<aside>
💡 애초에 자바스크립트 모듈 개념 하에서 개발하는 경우에는 그리 유용하지는 않아 보인다.

</aside>

---

# 챕터 2 값

## 배열

- 자바스크립트 배열에는 모든 타입의 값을 담을 수 있다.
- 배열의 크기를 미리 정하지 않고도 선언할 수 있다.
- 배열도 객체이기 때문에 delete 연산을 할 수 있는데, delete 연산을 해도 length 프로퍼티의 값은 변경되지 않는다.

구멍 난 배열을 다룰 때는 조심해야 한다.

```jsx
var a = [];

a[0] = 1;
a[3] = 2;

a[1]; // undefined
a.length = 4;

a; // [1, empty × 2, 2]
```

a[1]의 경우 값을 할당하지 않았기 때문에 undefined라고 나오지만 직접 undefined라는 값을 할당한 것과는 다르다.

또한 배열의 인덱스는 숫자인데 배열 역시 객체이기 때문에 문자열을 key로 하는 프로퍼티를 추가할 수 있다. 다만 이런 경우에는 length는 증가하지 않는다. 그리고 문자열 key가 표준 10진수 숫자로 타입이 변경되는 경우에는 숫자 타입의 key를 사용한 것과 같은 결과를 초래한다.

```jsx
var a = [];

a["1"] = 1;

a.length; // 2
```

<aside>
💡 굳이 배열에 문자열로 key를 지정하지 말자. 위의 케이스가 발생할 일은 적을 것 같다.

</aside>

### 유사배열을 배열로 변환하기

1. Array.prototype.slice() 사용하기
    
    ```jsx
    function foo() {
      var arr = Array.prototype.slice.call(arguments);
      arr.push("bam");
      console.log(arr);
    }
    
    foo("bar", "baz"); // ["bar", "baz", "bam"]
    ```
    
2. Array.from()

## 문자열

문자열과 배열과 생김새는 비슷하지만 문자 배열과 같지는 않다.

```jsx
var a = "foo";
var b = ["f", "o", "o"];

a.length // 3
b.length // 3

a.indexOf("o"); // 1
b.indexOf("o"); // 1
```

문자열과 배열 사이의 가장 큰 차이점은 문자열은 불변 값(Immutable) 이지만 배열은 가변 값(Mutable) 이라는 점이다. 그렇기 때문에 **문자열 메서드는 문자열 값을 바로 변경하는게 아니라 새로운 문자열을 생성한 후 반환한다. 반면에 대부분의 배열 메서드는 현재 값을 바로 수정한다.**

문자열과 배열의 유사성으로인해 문자열을 다룰 때 유용한 `불변` 배열 메서드를 문자열에서 빌려 쓸 수 있다. 문자열 자체가 불변 값이기 때문에 배열의 `가변` 메서드는 빌려쓸 수 없다.

```jsx
var a = "foo";

a.map; // undefined

// 불변 메서드인 map은 빌려 쓸 수 있다.
var c = Array.prototype.map.call(a, function(v) {
  return v.toUpperCase() + ".";
}).join("");

c; // "F.O.O"

// 가변 메서드인 reverse는 빌려 쓸 수 없다.
Array.prototype.reverse.call(a); // Uncaught TypeError: Cannot assign to read only property '0' of object '[object String]'
```

## 숫자

자바스크립트의 숫자 타입은 number가 유일하여 정수, 부동 소수점 숫자를 모두 아우른다.

숫자 리터럴은 10진수로 표시를 하고 소수점 앞 정수가 0이거나 소수점 이하가 0일 경우 생략이 가능하다. 굳이 이렇게 써서 좋을 건 없다.

숫자 값은 Number 객체 래퍼로 박싱(Boxing)할 수 있기 때문에 Number.prototype으로 접근할 수 있다. 다만 객체 리터럴 표시 방법으로 인해 메서드 호출시 잘못된 호출을 할 수 있어 주의해야 한다.

```jsx
42.toFixed(3); // 42. 까지를 숫자 리터럴로 볼 수 있기 때문에 에러가 발생한다.

(42).toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
42..toFixed(3); // "42.000" -> 오히려 헷갈린다. 이런 방법은 지양하자.
```

다양한 진수를 표현할 때는 0x(16진수), 0b(2진수), 0o(8진수)를 사용한다.

```jsx
0xf3; // 243의 16진수
0o363; // 243의 8진수
0b11110011; // 243의 이진수
```

### 작은 소수 값

다음은 널리 알려진 이진 부동 소수점 숫자의 부작용 문제다. (IEEE 754 표준을 따르는 모든 언어에서 공통적인 문제이다.)

```jsx
0.1 + 0.2 === 0.3; // false
```

보통 이런 경우 미세한 반올림 오차를 허용 공차로 처리하는 방법이 있다. 이렇게 미세한 오차를 머신 입실론 이라고 한다. 자바스크립트에서는 ES6부터 이 값을 `Number.EPSILON`으로 미리 정의해두었다.

```jsx
function numbersCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a, b); // true
```

부동 소수점 숫자의 최댓값은 Number.MAX_VALUE, Number.MIN_VALUE에 정의되어 있다.

또한 자바스크립트 내에서 안전하게 표한할 수 있는 정수는 Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER로 정의되어 있다.

만약 큰 수를 다루어야할 일이 생기면 자바스크립트의 `BigInt`를 사용하는 것이 좋다.

## 특수 값

undefined 타입의 값은 undefined 밖에 없고, null 타입의 값도 null 뿐이다. 즉 이 둘은 타입과 값이 항상 같다.

undefined는 특이하게 식별자로 사용할 수 있다. 그런데 굳이 식별자로 사용하지 말자.. 또한 undefined는 변수명으로 사용이 가능한데 이것도 사용하지 말자.

### void 연산자

표현식 void __는 어떤 값이든 무효로 만들어 항상 결괏값을 undefined로 만든다. 이 때 기존 값은 변경시키지 않는다.

```jsx
var a = 42;

console.log(void a, a); // undefined 42
```

### NaN

Not a Number의 줄임말. 오해의 소지가 다분한 표현이어서 ‘숫자 아님’ 이라는 표현 보다는 ‘유효하지 않은 숫자’ 라고 칭하는게 더 정확할 것 같다.

앞뒤가 마지 않게도 NaN의 경우 typeof 연산 결과는 ‘number’ 이다. 숫자가 아닌 값인데 타입은 number.

또한 특정 값이 NaN인지를 확인하고 싶을 때 단순히 NaN과 같은지를 검사해서는 알 수 없고 Number.isNaN()을 사용해야한다.

```jsx
var a = 2 / "foo"; // NaN
var b = "foo";

Number.isNaN(a); // true
Number.isNaN(b); // false
```

### Object.is()

ES6부터 두 값이 절대적으로 동등한지를 확인하는 새로운 유틸리티인 Object.is()를 지원한다. ==나 ===가 안전하다면 굳이 Object.is()는 사용하지 않는 것이 좋다. 기본 연산자가 더 효율이 좋기 때문이다.

```jsx
var a = 2 / "foo";
var b = -3 * 0; // -0

Object.is(a, NaN);// true
Object.is(b, -0); // true
Object.is(b, 0); // false
```

## 값 vs 레퍼런스

자바스크립트에서는 값의 타입만으로 값-복사, 레퍼런스-복사 둘 중 한쪽이 결정된다.

원시 타입(Primitive type)인 null, undefined, string, number, boolean, symbol 같은 단순 값은 항상 값-복사 방식으로 할당/전달 된다.

이 외의 객체, 함수 등 합성 값(Compound values)는 할당/전달시 반드시 레퍼런스 사본을 생성한다.

합성 값을 값-복사에 의해 효과적으로 전달하려면 값의 사본을 만들어 전달하여 레퍼런스가 원본을 가리키지 않게 하면 된다. (예 - Array.prototype.slice() 등으로 새로운 배열을 만들어 전달하기)

혹은 스칼라 값을 레퍼런스 값처럼 넘기고 싶다면 객체 래퍼를 생성하여 해당 객체의 필드에 스칼라 값을 저장하는 형태로 구현할 수 있다.