---
title: "[Day 02] CH 3 네이티브 ~ CH 4.4 암시적 강제변환"
metaTitle: "You don't Know JS"
metaDescription: "CH 3 네이티브 ~ CH 4.4 암시적 강제변환"
author: "paryyongwoo"
date: "2022-10-28"
---
# 챕터 3 네이티브

## 네이티브란

특정 환경에 종속되지 않은 ECMAScript 명세의 내장 객체를 의미한다.

ex) String, Number, Boolean, Array, Object, Function, RegExp, Date, Error, Symbol 등

Window, Button 등은 브라우저에 종속된 객체이므로 네이티브라 할 수 없다.

## 내부 [[Class]]

typeof 연산 결과가 “object”인 값에는 [[Class]]라는 내부 프로퍼티가 붙는다. 이 프로퍼티는 직접 접근할 수 없고 Object.prototype.toString()을 통해 확인할 수 있다.

```jsx
Object.prototype.toString.call([1,2,3]); // "[object Array]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call("abc"); // "[object String]"
```

> ES6로 넘어가면서 toString(), [[Class]]의 동작이 변경되었다고 한다.
> 
> ES2015 이전 객체는 내부 슬롯으로 `[[Class]]`를 갖고 있었고, 타입 체크를 위해 `Object.prototype.toString` 을 사용하면 이 내부 슬롯을 이용하여 정보를 출력해 줬었다. 하지만 ES2015부터 `[[Class]]` 내부 슬롯이 사라지고 기존 코드의 호환성을 맞춰주기 위해 `Symbol.toStringTag`를 미리 정의하여 해당 태그 값을 출력해 주도록 변경되었다.
> 
> 아래 코드를 수행시키는 내부 동작에 `Symbol.toStringTag`가 사용된 것이다.
> 

## 래퍼 박싱, 언박싱

자바스크립트는 필요할 때에 원시 값을 알아서 박싱 (래핑) 한다. 이 때 개발자가 직접 객체 형태로 박싱하는 것 보다는 브라우저에서 알아서 원시 값을 박싱하도록 두는 것이 더 효율적이다. (내부적으로 최적화를 한다.)

따라서 직접 객체 형태로 박싱하여 쓸 일은 거의 없다고 볼 수 있다.

객체 래퍼를 사용하는데 있어 주의할 점이 있는데, 다음 코드를 보자.

```jsx
var a = new Boolean(false);

if (!a) {
	console.log("Oops"); // 실행되지 않는다.
}
```

false는 falsy한 값이지만 결국 객체 자체는 truthy한 값이기 때문에 if문의 조건을 만족하지 않는다.

객체 언박싱의 경우 Object.prototype.valueOf() 연산자를 활용한다.

## 네이티브와 생성자

생성자를 사용하여 값을 생성하는 것과 리터럴을 사용하여 값을 생성하는 것은 결과적으로 동일하다. 다만 확실히 필요해서 쓰는게 아니라면 생성자는 쓰지 않는 편이 좋다.

> 길이가 정해진 배열을 정의할 때 ‘new Array(3)’과 같은 형태로 정의하면 배열에는 빈 슬롯이 들어가기 때문에 특정 배열 메소드에서는 각 슬롯을 비어있다고 인지하여 순회하지 않을 수 있다. 명시적으로 undefined가 들어있는 빈 배열을 생성하려면 ‘new Array({ length: 3})’ 형태로 선언하면 된다. 근데 굳이 이렇게..?
> 

Object, Function 등도 굳이 리터럴을 사용하지 않을 이유가 없는데, RegExp는 조금 다르다. 성능 측면에서 `/^a*b+/g` 형태의 리터럴을 사용하는 것이 유리하지만, (자바스크립트 엔진이 실행 전 정규 표현식을 미리 컴파일한 후 캐시한다.) 정규 표현식 패턴을 동적으로 정의할 경우 의미있다.

또한 Date, Error의 경우 리터럴 형식이 없어 유용하게 사용할 수 있다. Date 객체의 getTime() 메소드를 사용하여 타임스탬프 값을 얻을 수 있는데 ES5부터 도입된 Date.now()를 사용하면 더 쉽게 얻을 수 있다.

### Symbol

Symbol은 ‘유일 값’을 나타낼 때 사용되는 원시 값 타입이다. 주로 ES6의 특수한 내장 로직에 쓰기 위해 고안되었으나 누구나 Symbol을 정의할 수 있다.

Symbol은 프로퍼티 명으로 사용할 수 있으나 Symbol의 실제 값을 보거나 접근하는 것은 불가능하다.

Symbol을 정의하려면 Symbol 네이티브를 사용해야한다. 앞에 new를 붙이면 에러가 발생한다.

```jsx
var mysym = Symbol("my own symbol");
mysym; // Symbol(my own symbol)
mysym.toString(); // "Symbol(my own symbol)"
typeof mysym; // "symbol"
```

Symbol은 전용 (private) 프로퍼티는 아니지만 본래의 사용 목적에 맞게 private 혹은 특별한 프로퍼티로 사용한다. Object.prototype.getOwnPropertySymbols()로 접근할 수 있기 때문에 private 하다고 하기는 애매하다.

### 네이티브 프로토타입

내장 네이티브 생성자는 각자의 .prototype 객체를 가진다. 각 prototype 객체에는 해당 객체의 하위 타입별로 고유한 로직이 담겨있다.

String.proptype.concat, Array.prototype.concat, Function.prototype.apply 등인데, 프로토타입 위임 덕분에 각 값들은 자신이 속한 네이티브의 메소드들을 함께 사용할 수 있다.

```jsx
var a = " abc ";

a.toUpperCase(); // " ABC "
a.trim(); // "abc"
```

Function, RegExp, Array의 prototype은 특이한데, 각각 빈 함수, 빈 regex, 빈 배열을 가리킨다.

```jsx
Function.prototype(); // 빈 함수이기 때문에 ()로 호출할 수 있다.
RegExp.prototype.toString(); // '/(?:)/'
Array.prototype.toString(); // []
```

이를 이용하여 디폴트 값을 프로토타입으로 설정할 수 있는데 이렇게 되면 성능 측면에서 장점이 있다. 프로토타입들은 이미 생성되어 내장된 상태이므로 다시 생성되지 않는데, 이를 디폴트 값으로 사용하면 이미 생성된 값들을 계속 활용하기 때문에 메모리/CPU 낭비가 없다. 다만 Array.prototype을 디폴트 값으로 사용하는 경우 값이 변경되는 경우 Array.prototype 자체가 변경되기 떄문에 (레퍼런스-복사) 함정에 빠질 수 있다.

## 네이티브란

특정 환경에 종속되지 않은 ECMAScript 명세의 내장 객체를 의미한다.

ex) String, Number, Boolean, Array, Object, Function, RegExp, Date, Error, Symbol 등

Window, Button 등은 브라우저에 종속된 객체이므로 네이티브라 할 수 없다.

## 내부 [[Class]]

typeof 연산 결과가 “object”인 값에는 [[Class]]라는 내부 프로퍼티가 붙는다. 이 프로퍼티는 직접 접근할 수 없고 Object.prototype.toString()을 통해 확인할 수 있다.

```jsx
Object.prototype.toString.call([1,2,3]); // "[object Array]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call("abc"); // "[object String]"
```

<aside>
💡 ES6로 넘어가면서 toString(), [[Class]]의 동작이 변경되었다고 한다.

ES2015 이전 객체는 내부 슬롯으로 `[[Class]]`를 갖고 있었고, 타입 체크를 위해 `Object.prototype.toString` 을 사용하면 이 내부 슬롯을 이용하여 정보를 출력해 줬었다. 하지만 ES2015부터 `[[Class]]` 내부 슬롯이 사라지고 기존 코드의 호환성을 맞춰주기 위해 `Symbol.toStringTag`를 미리 정의하여 해당 태그 값을 출력해 주도록 변경되었다.

아래 코드를 수행시키는 내부 동작에 `Symbol.toStringTag`가 사용된 것이다.

</aside>

## 래퍼 박싱, 언박싱

자바스크립트는 필요할 때에 원시 값을 알아서 박싱 (래핑) 한다. 이 때 개발자가 직접 객체 형태로 박싱하는 것 보다는 브라우저에서 알아서 원시 값을 박싱하도록 두는 것이 더 효율적이다. (내부적으로 최적화를 한다.)

따라서 직접 객체 형태로 박싱하여 쓸 일은 거의 없다고 볼 수 있다.

객체 래퍼를 사용하는데 있어 주의할 점이 있는데, 다음 코드를 보자.

```jsx
var a = new Boolean(false);

if (!a) {
	console.log("Oops"); // 실행되지 않는다.
}
```

false는 falsy한 값이지만 결국 객체 자체는 truthy한 값이기 때문에 if문의 조건을 만족하지 않는다.

객체 언박싱의 경우 Object.prototype.valueOf() 연산자를 활용한다.

## 네이티브와 생성자

생성자를 사용하여 값을 생성하는 것과 리터럴을 사용하여 값을 생성하는 것은 결과적으로 동일하다. 다만 확실히 필요해서 쓰는게 아니라면 생성자는 쓰지 않는 편이 좋다.

Object, Function 등도 굳이 리터럴을 사용하지 않을 이유가 없는데, RegExp는 조금 다르다. 성능 측면에서 `/^a*b+/g` 형태의 리터럴을 사용하는 것이 유리하지만, (자바스크립트 엔진이 실행 전 정규 표현식을 미리 컴파일한 후 캐시한다.) 정규 표현식 패턴을 동적으로 정의할 경우 의미있다.

또한 Date, Error의 경우 리터럴 형식이 없어 유용하게 사용할 수 있다. Date 객체의 getTime() 메소드를 사용하여 타임스탬프 값을 얻을 수 있는데 ES5부터 도입된 Date.now()를 사용하면 더 쉽게 얻을 수 있다.

### Symbol

Symbol은 ‘유일 값’을 나타낼 때 사용되는 원시 값 타입이다. 주로 ES6의 특수한 내장 로직에 쓰기 위해 고안되었으나 누구나 Symbol을 정의할 수 있다.

Symbol은 프로퍼티 명으로 사용할 수 있으나 Symbol의 실제 값을 보거나 접근하는 것은 불가능하다.

Symbol을 정의하려면 Symbol 네이티브를 사용해야한다. 앞에 new를 붙이면 에러가 발생한다.

```jsx
var mysym = Symbol("my own symbol");
mysym; // Symbol(my own symbol)
mysym.toString(); // "Symbol(my own symbol)"
typeof mysym; // "symbol"
```

Symbol은 전용 (private) 프로퍼티는 아니지만 본래의 사용 목적에 맞게 private 혹은 특별한 프로퍼티로 사용한다. Object.prototype.getOwnPropertySymbols()로 접근할 수 있기 때문에 private 하다고 하기는 애매하다.

### 네이티브 프로토타입

내장 네이티브 생성자는 각자의 .prototype 객체를 가진다. 각 prototype 객체에는 해당 객체의 하위 타입별로 고유한 로직이 담겨있다.

String.proptype.concat, Array.prototype.concat, Function.prototype.apply 등인데, 프로토타입 위임 덕분에 각 값들은 자신이 속한 네이티브의 메소드들을 함께 사용할 수 있다.

```jsx
var a = " abc ";

a.toUpperCase(); // " ABC "
a.trim(); // "abc"
```

Function, RegExp, Array의 prototype은 특이한데, 각각 빈 함수, 빈 regex, 빈 배열을 가리킨다.

```jsx
Function.prototype(); // 빈 함수이기 때문에 ()로 호출할 수 있다.
RegExp.prototype.toString(); // '/(?:)/'
Array.prototype.toString(); // []
```

이를 이용하여 디폴트 값을 프로토타입으로 설정할 수 있는데 이렇게 되면 성능 측면에서 장점이 있다. 프로토타입들은 이미 생성되어 내장된 상태이므로 다시 생성되지 않는데, 이를 디폴트 값으로 사용하면 이미 생성된 값들을 계속 활용하기 때문에 메모리/CPU 낭비가 없다. 다만 Array.prototype을 디폴트 값으로 사용하는 경우 값이 변경되는 경우 Array.prototype 자체가 변경되기 떄문에 (레퍼런스-복사) 함정에 빠질 수 있다.

# 챕터 4 강제변환

## 값 변환

어떤 값을 다른 타입의 값으로 바꾸는 과정이 명시적이면 `타입 캐스팅 (Type Casting)`, 암시적이면 `강제변환 (Coercion)`이라고 한다. 타입 캐스팅은 명시적 형변환 이라고 할 수 있고, 강제변환은 암시적 형변환 이라고 할 수 있다.

`타입 캐스팅`은 정적 타입 언어에서 컴파일 시점에, `강제변환`은 동적 타입 언어에서 런타임 시점에 발생한다.

```jsx
var a = 42;
var b = a + ""; // 암시적 형변환
var c = String(a); // 명시적 형변환
```

## 추상 연산 (Abstract Operation)

추상 연산은 내부 전용 연산 (Internal-Only Operation)을 의미하는데, ToString, ToNumber, ToBoolean, ToPrimitive 등이 있다. 자바스크립트 내부에서 수행되는 변환을 수행하는 연산인 것 같다.

### ToString

문자열이 아닌 값을 문자열로 변환한다. 내장 원시 값의 경우는 이미 문자열화 방법이 정해져 있다.

- null → “null”
- undefined → “undefined”
- true → “true”

일반 객체의 경우 기본적으로 Object.prototype.toString() 메서드가 내부 [[Class]]를 반환한다. (예: “[object Object]”)

<aside>
💡 Symbol 도입 이후로 객체를 문자열로 변환할 때 Object.prototype.toString() 메서드는 [[Class]] 대신 Symbol.toStringTag를 정의하여 해당 태그 값을 출력해주도록 수정된 것 같다.

</aside>

**toJSON**

JSON 안전 값은 모두 JSON.stringfy()로 문자열화할 수 있다. undefined, 함수, Symbol, 환형 참조 (Circular References) 객체 등은 JSON 안전 값이 아니다. 그렇기에 인자가 undefined, 함수, Symbol 값이면 자동으로 누락시키며 이런 값들이 배열에 포함되어 있으면 null로 바꾼다. 객체 프로퍼티에 있으면 삭제한다. 또한 환형 참조 객체를 넘기면 에러가 난다.

```jsx
JSON.stringify(undefined); // undefined
JSON.stringify(function() {}); // undefined

JSON.stringify([1, undefined, function() {}]); // "[1, null, null]"
JSON.stringify({ a: 2, b: function() {}}); // "{ a: 2 }"
```

만약 객체 자체에 toJSON() 메서드가 정의되어 있다면, 먼저 이 메서드를 호출하여 직렬화한 값을 반환한다. 이를 이용하여 부적절하거나 직렬화하기 곤란한 객체 값을 문자열화하려면 toJSON() 메서드를 따로 정의하자.

toJSON() 메서드는 JSON.stringify()와 명백히 다른데, toJSON()은 단지 문자열화하기 적당한 JSON 안전 값으로 변환하는 역할을 하는 것이고, JSON.stringify()는 JSON 문자열로 바꾸는 것이다.

### ToNumber

숫자가 아닌 값을 수식 연산이 가능한 숫자로 변환한다.

- true → 1, false → 0
- undefined → NaN
- null → 0

객체의 경우 동등한 원시 값으로 변환 후 그 결괏값을 ToNumber 규칙에 의해 강제변환한다. 이 때, 동등한 원시 값으로 변환하기 위해 ToPrimitive 추상 연산 과정에서 해당 객체가 valueOf() 메서드를 구현했는지 확인하는데, valueOf()를 쓸 수 있고 반환 값이 원시 값이면 강제변한하되, 그렇지 않으면 toString()을 이용해 강제변환한다. 이렇게 해도 원시 값으로 변환할 수 없으면 TypeError 오류를 던진다.

### ToBoolean

**Truthy와 Falsy**

자바스크립트의 모든 값은 둘 중 하나다.

1. 불리언으로 강제변환하면 false가 되는 값
2. 1번을 제외한 나머지 값 (명백히 true인 값)

이 때 1번 케이스에 속하는 값은 이미 명세에 나와있는데 다음과 같다. 즉 아래 값을 제외한 모든 값들은 truthy 값이라고 볼 수 있다.

- undefined
- null
- false
- +0, -0, NaN
- “”

## 명시적 강제변환

### 문자열 ↔ 숫자

문자열과 숫자 사이의 강제변환은 String()과 Number() 함수를 이용한다.

ToString 추상 연산 로직에 따라 String()은 값을 받아 원시 문자열로 강제 변환한다. Number()의 경우 ToNumber 추상 연산 로직에 의해 어떤 값이든 원시 숫자 값으로 강제변환한다.

String(), Number() 함수 이외에도 toString(), + 연산자를 통한 형변환도 가능하지만 가독성 측면에서 좋은 방법은 아닌 것 같다.

### 날짜 ↔ 숫자

Date 객체를 숫자로 강제변환할 때 + 연산자가 사용되기도 한다.

```jsx
var a = new Date("Mon, 18 Aug 2014 08:53:06 CDT");
a; // 1408369986000
```

그러나 ES5에 추가된 정적 함수인 Date.now()를 사용하는게 낫다.

### 틸드 (~)

자바스크립트 비트 연산자는 32비트 연산만 가능하다. 즉, 비트 연산을 하면 피연산자는 32비트 값으로 강제로 맞춰지는데, ToInt32 추상 연산이 이 역할을 수행한다.

ToInt32는 ToNumber 강제변환을 한다. “123”이라면 ToInt32 규칙을 적용하기 전 123으로 바꾼다.

~ 연산자는 먼저 32비트 숫자로 강제변환한 후 NOT 연산을 한다. (비트를 거꾸로 뒤집는다.)

```jsx
~42; // -(42+1) ==> -43
```

**비트 잘라내기**

숫자의 소수점 이상 부분을 잘라내기 위해 더블 틸드 (~~)를 사용할 수 있다. 이렇게 하면 Math.floor()와 같은 결과가 나온다고 생각할 수 있는데, 반드시 그런 것은 아니다.

```jsx
Math.floor(-49.6); // -50
~~-49.6; // -49
```

### 숫자 형태의 문자열 파싱

문자열에 포함된 숫자를 파싱(Parsing)하는 것은 문자열을 숫자로 강제변환 하는 것과 비슷하지만 분명히 다르다.

```jsx
var a = "42";
var b = "42px";

Number(a); // 42
parseInt(a); // 42

Number(b); // NaN
parseInt(b); // 42
```

문자열로부터 숫자 값의 파싱은 비 숫자형 문자를 허용해서 좌에서 우로 가면서 숫자같지 않은 문자를 만나면 즉시 멈춘다. 반면 강제변환은 비 숫자형 문자를 허용하지 않기 때문에 NaN을 반환한다.

파싱과 강제변환은 목적 자체가 다른데, 반드시 대상이 숫자여야만 하는 경우에는 강제변환을 사용해야한다.

ES5 이전에는 parseInt()의 두번째 파라미터에 기수(radix)를 명시해주지 않으면 문자열의 첫 번째 문자만 보고 x나 X면 16진수로, 0이면 8진수로 문자열을 임의로 해석했는데, ES5 이후부터는 “0x”로 시작할떄만 16진수로 처리하고 그 밖에는 두 번째 인자가 없으면 10진수로 처리하도록 변경되었다.

### 비 불리언 → 불리언 명시적 강제변환

Boolean()의 경우 비 불리언 값을 불리언 값으로 강제변환한다. 값을 불리언으로 명시적으로 강제변환하는 연산자로 ! (부정 단항 연산자)도 있는데, 해당 연산자는 truthy, falsy까지 변경시키므로 보통 !! (이중부정 연산자)를 사용한다.

```jsx
var a = 42;
var b = a ? true : false;
```

a는 42이라는 값을 가지고 이는 truthy한 값이므로 b에는 당연히 true가 할당되겠지만 이러한 표현식에는 암시적 강제변환이 매복되어 있기 때문에 코드를 명시적으로 작성하기 위해 Boolean(), !! 와 같은 방식으로 명시적으로 강제변환하는 편이 더 좋다.

## 암시적 변환

암시적 강제변환은 부수 효과가 명확하지 않게 숨겨지 형태로 일어나는 타입변환이다. 이로 인해 코드는 좀 더 이해하기 어려워지기도 한다. 대다수의 자바스크립트 개발자들 암시적 강제변환을 부정적으로 바라보지만 다른 측면에서 보면 암시적 강제변환은 장황하고 불필요한 상세 구현을 줄여줄 수 있다는 장점을 가지고 있다.

예를 들어 다음 코드를 보자.

```jsx
SomeType x = SomeType(AnotherType(y));
```

위의 코드는 y 변수를 SomeType으로 강제 형변환을 하는 엄격한 타입 언어의 의사 코드이다. 이 언어에서는 y의 타입을 SomeType 타입으로 형변환하기 위해 AnotherType 타입으로 먼저 변환을 한뒤에 SomeType 타입으로 형변환을 할 수 있다.

만약 다음과 같은 형태로 위의 코드와 동일한 결과를 얻을 수 있다고 생각해보자.

```jsx
SomeType x = SomeType(y);
```

위의 코드는 코드의 중간 변환 단계 (불필요한? 코드)를 줄여 좀 더 단순화했다고 볼 수 있다. 내부적으로는 중간 단계를 거쳐 타입의 변환이 일어났을 것이고, 결과적으로 코드 가독성을 높이고 세세한 구현부를 추상화하는데 큰 도움이 된다고 볼 수 있다.

결국 핵심은 자바스크립트의 암시적 강제변환을 제대로 이해만 하고 잘 사용할 수 있다면 오히려 많은 도움이 될 수 있는 기능이라는 점이다.

### 문자열 ↔ 숫자

“+” 연산자는 숫자의 덧셈, 문자열 접합이라는 두 가지 기능을 가진다.

```jsx
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42
```

보통 두 피연산자 중 하나만이라도 문자열인 경우 암시적으로 문자열로 형변환 한다고 알고 있다. 다음 코드를 보자.

```jsx
var a = [1,2];
var b = [3,4];

a + b; // "1,23,4"
```

두 피연산자 모두 문자열이 아닌데도 둘 다 문자열로 강제변환된 후 접합되었다.

ES5 명세에 따르면 “+” 알고리즘은 한쪽 피연산자가 문자열이거나 다음 과정을 통해 문자열 표현형으로 나타낼 수 있으면 문자열 붙이기를 한다. 위의 케이스에서 보면 한 피연산자가 객체(여기선 배열)라면 ToPrimitive 추상 연산을 수행하고 ToPrimitive는 **number 콘텍스트 힌트를 넘겨 [[DefaultValue]] 알고리즘을 호출한다. (?)**

ToPrimitive 추상 연산 과정에서 valueOf() 메서드를 구현했는지 확인하고 valueOf()에 배열을 넘기면 단순 원시 값을 반환할 수 없으므로 toString()으로 흐름이 넘어간다. 그렇게 되면 두 배열의 toString()의 결과는 “1,2”, “3,4”가 되고 “+”는 두 문자열을 붙여 결과적으로 “1,23,4” 라는 값이 반환된다.

**String()과 + “”의 차이점**

변수 a에 42라는 숫자가 들어있을 때, 이를 “42”로 변환하는 두가지 방법이 있다.

1. String(a)
2. a + “”

결과는 같지만 명시적 강제변환 String(a)에 비해 암시적 강제변환 a + “”에는 한가지 유의할 점이 있는데, ToPrimitive 연산 과정에서 a + “”는 a 값을 valueOf() 메서드에 전달하여 호출하고, 그 결과값은 ToString 추상 연산을 하여 문자열이 반환된다. 그러나 String(a)는 toString() 메서드를 호출할 뿐이다.

그렇기에 a가 다음과 같은 객체라면 결과값이 달라질 수 있다.

```jsx
var a = {
	valueOf: function() { return 42; }
	toString: function() { return 4; }
};

a + ""; // "42"
String(a); // "4"
```

이런 사례만 보더라도 명시적 강제변환 (여기선 String(a))이 암시적 강제변환 (여기선 + “”)보다 좋다, 나쁘다 할 수 없다.

### 비 불리언값을 불리언으로 암시적 강제변환

불리언으로의 암시적 강제변환이 일어나는 표현식은 다음과 같다.

1. if () 문의 조건 표현식
2. for ( ; ; )에서 두 번째 조건 표현식
3. while() 및 do … while() 루프의 조건 표현식
4. ? : 삼항 연산 시 첫 번째 조건 표현식
5. ||(논리 OR) 및 &&(논리 AND)의 좌측 피연산자

위의 콘텍스트에서 불리언 아닌 값이 사용되면, ToBoolean 추상 연산 규칙에 따라 불리언 값으로 암시적 강제변환된다.

### &&와 || 연산자

다른 언어와 다르게 자바스크립트에서 &&와 || 연산자는 결과값이 불리언이 아니다.

```jsx
var a = 42;
var b = "abc";
var c = null;

a || b; // 42
a && b; // "abc"

c || b; // "abc"
c && b; // null
```

|| 연산자의 경우 첫 번째 truthy한 값을 찾으면 그 값을 반환하고 만약 마지막 값의 차례까지 찾지 못하면 마지막 값을 반환한다. 이와 다르게 && 연산자의 경우 첫 번째 falsy한 값을 찾으면 그 값을 반환하고 만약 마지막 값의 차례까지 찾지 못하면 마지막 값을 반환한다.

그렇기에 이 책의 저자는 이 두 연산자를 피연산자 선택 연산자라고 표현한다.

자바스크립트에서는 이러한 특성을 활용하여 다음과 같은 코드를 작성하기도 한다.

```jsx
function foo(a, b) {
	a = a || "hello";
	b = b || "world";

	console.log(a + " " + b);
}

foo(); // "hello world"
foo("오 마이", "갓"); // "오 마이 갓"
```

다만 인자로 “”와 같은 falsy 값을 넘기는 경우 의도치 않게 동작할 수 있으니 주의해야한다.

<aside>
💡 “??” 연산자를 통해 처리하면 undefined,  null 인 경우에 대한 기본값 할당을 할 수 있다.

</aside>

&&의 경우도 첫 번째 피연산자의 결과가 truthy인 경우에만 두 번째 피연산자를 선택한다는 ‘가드 연산자’ 라는 특성 덕에 다음과 같은 코드를 작성할 수 있다.

```jsx
function foo() {
	console.log(a);
}

var a = 42;
a && foo(); // 42
```

하지만 가독성 측면에서 if문을 활용하는 것이 더 좋아보인다.

결과적으로 다른 언어들과 달리 자바스크립트에서 &&, || 연산자의 결과가 불리언값을 반환하는 것은 아니지만, 결과적으로는 연산자로부터 반환된 값이 불리언 타입으로 암시적 강제변환되기 때문에 다른 언어들과 같은 결과를 얻는건 동일하다. 다만 내부적으로는 이렇게 동작한다는 사실을 알고 있어야 한다.

### Symbol의 강제변환

Symbol의 경우 특이한데, Symbol을 문자열로 변환할 때 명시적 강제변환은 허용되나 암시적 강제변환은 금지되어 에러가 발생한다.

```jsx
var s1 = Symbol("좋아");
String(s1); // "Symbol(좋아)"

var s2 = Symbol("구려");
s2 + ""; // TypeError
```

또한 Symbol 값은 절대 숫자로 변환되지 않지만 불리언 값으로는 명시적, 암시적 모두 true로 강제변환이 가능하다.
