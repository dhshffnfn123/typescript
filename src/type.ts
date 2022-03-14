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

// never 타입은 절대 반환을 하지 않는 함수에 사용한다.
// 절대로 실행이 종료되지 않는 함수나 오류를 발생시키기 위해서만 존재하는 함수를 예로 든다.

// logger의 타입은 'never'이다.
const logger = () => {
  while (true) {
    console.log("서버가 실행 중 입니다.");
  }
};

// void 타입은 변수 선언이 아니라, 값을 반환하지 않는 함수를 선언하는데 사용된다.
function logError(errorMessage: string): void {
  console.error(errorMessage);
}
// never와 다르게 void는 실행을 완료하지만 값을 반환하지는 않는다.

// 타입스크립트 내 타입 표기는 선택 사항이다.
// 타입 표기가 없다면, 타입스크립트의 타입 검사기는 해당 타입을 유추한다.
let name1 = "John Smith";
let name2: string = "John Smith";
// 두번째 행은 문법에 문제는 없지만 변수의 값이 문자열이므로 타입스크립트가 이미 유추했기 때문에 타입을 지정할 필요가 없다.
// 타입스크립트 컴파일러가 유추 가능한 곳에 명시적으로 타입을 추가하는 것을 피해야 한다.

const age1 = 25;
function getTax(income: number): number {
  return income * 0.15;
}
let yourTax = getTax(50000);

// 타입스크립트는 문자열 리터럴을 타입으로 사용할 수 있다.
let name3: "John Smith"; // 이 변수는 John Smith란 값을 가지며 값이 변경되면 오류가 발생한다.
// name3 = "Mary Lau"; // error
