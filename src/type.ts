/* -------------------------------------------------------------------------- */
/*                           기본 타입과 커스텀 타입                            */
/* -------------------------------------------------------------------------- */

// 소프트웨어 개발자는 타입스크립트 컴파일러로 타입을 명시적 또는 암시적(이른바 타입 추론, Type Inference)으로 선언할 수 있다.

//? 기본적인 타입 표기
// 타입스크립트는 변수 선언 후, 타입과 함께 세미콜론을 붙인다.
let firstName: string;
let age: number;

// 타입스크립트에는 다음과 같은 타입 표기가 있다. 대부분 타입은 자기 기술적(Self-descriptive)인 이름을 가지고 있다.
/*
    string - 문자열
    boolean - true/false 값
    number - 숫자
    symbol - Symbol 생성자를 호출해 생성된 고윳값
    any - 모든 타입을 허용하는 타입. 코드를 쓰는 동안 정해지지 않은 변수를 지정할 수 있음
    unknown - any와 비슷하나 먼저 타입을 지정하거나 좁히지 않으면 조작이 허용되지 않음
    never - 도달할 수 없는 코드를 나타냄
    void - 값이 없음
*/

// symbol은 ES6에서 추가된 변경 불가능한 원시타입이다.
const sym1 = Symbol("orderID");
const sym2 = Symbol("orderID");
// sym1과 sym2의 값은 동일하지 않다.
// symbol은 객체 프로퍼티의 고유값을 가진 키를 생성할 때 사용된다.

const ord = Symbol("orderID"); // 새 symbol 생성
const myOrder = {
  ord: "123", // 객체 프로퍼티로 symbol 사용
};
console.log(myOrder["ord"]); // 123

// 타입스크립트 역시 자바스크립트에서 "값이 없음"을 나타내는 null과 undefined 타입을 가지고 있다.
// null과 undefined를 모든 변수에 할당할 수 있지만, 여러타입과 섞어 사용되는 것이 일반적이다.

// 문자열 또는 null을 반환하는 함수
function getName(): string | null {
  return "good";
}
