/* -------------------------------------------------------------------------- */
/*                           기본 타입과 커스텀 타입                               */
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

//?/* ------------------------------ 함수 본문 내 타입 선언 ----------------------------- */
// 타입스크립트 함수와 함수 표현식은 자바스크립트와 유사하지만 파라미터 타입과 반환 값을 명시적으로 선언한다.
function calcTax(state, income, dependents) {
  // 함수 파라미터에 타입 표기가 없다.
  if (state === "NY") {
    return income * 0.06 - dependents * 500; // 뉴욕 주의 세금을 계산합니다.
  } else if (state === "NJ") {
    return income * 0.05 - dependents * 300; // 뉴저지 주의 세금을 계산합니다.
  }
}

// 타입을 지정하지 않았지만 추측할 수 있다.
let tax = calcTax("NJ", 50000, 2); // 뉴저지주에 살고 50000달러를 벌고 2명의 부양가족이 있음

// 타입을 유추할 수 없다면 에러가 발생한다.
let tax2 = calcTax("NJ", 50000, "two"); // NaN

// 함수에 타입을 지정해준다.
function typingCalcTax(
  state: string,
  income: number,
  dependents: number
): number {
  if (state === "NY") {
    return income * 0.06 - dependents * 500; // 뉴욕 주의 세금을 계산합니다.
  } else if (state === "NJ") {
    return income * 0.05 - dependents * 300; // 뉴저지 주의 세금을 계산합니다.
  }
}
// 타이핑을 해주면 dependents에 string 값을 전달하는 일은 생기지 않는다.
// 함수의 반환값은 number이다.

// * 위의 함수에 없는 주를 입력하면 undefined를 반환하므로 함수 타입 선언에 number | undefined를 작성해준다.

//?/* --------------------------------- 유니온 타입 --------------------------------- */
// 유니온은 OR 연산자처럼 변수에 저장할 수 있는 타입이 여러 개일 경우 사용한다.
let padding: string | number; // 숫자 또는 문자열만 허용

function pddLeft(value: string, padding: any): string {
  // 리턴 값이 반드시 문자열 이어야 한다.
  if (typeof padding === "number") {
    // padding에 전달된 값이 number이면 공백을 만듭니다.
    return Array(padding + 1).join("") + value;
  }
  if (typeof padding === "string") {
    // padding에 전달된 값이 string이면 value를 이어 붙입니다.
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`); // 파라미터 타입이 string이나 number가 아닐경우 오류가 발생합니다.
}

console.log(pddLeft("Hello world", 4)); // Hello world
console.log(pddLeft("Hello world", "!!")); // Hello world!!

//* 위의 코드를 다음과 같이 유니온으로 수정하면 예외처리를 하지 않아도 된다.
// function pddLeft(value: string, padding: number | string ):string {

// TODO typeof 와 instanceof
// typeof : 타입스크립트 내장 타입에 사용된다.
// instanceof은 사용자가 만든 타입에 사용된다.

// 변수가 두개 이상의 타입을 가질 경우, any 타입을 사용하지 않고 유니온 타입은 사용하는 것이 관습이다.
//* never는 어떤 타입과도 호환되지 않는 타입으로 논리적으로 끝까지 실행될 수 없는 함수의 반환 값은 never 타입이 된다.

//?/* ---------------------------------- 커스텀 타입 --------------------------------- */
// 타입 스크립트는 type, interface, enum 키워드 및 클래스 선언으로 커스텀 타입을 만들 수 있다.

//* Type 키워드
// type 키워드는 새로운 타입을 선언하거나 타입 별칭을 사용해 이미 존재하는 타입에 다른 이름을 붙여 사용할 수 있다.
type Foot = number;
type Pound = number;
// 위의 별칭을 사용해 새로운 타입을 만들 수 있다.
type Patient = {
  name: string;
  height: Foot;
  weight: Pound;
};
// 타입 별칭은 자바스크립트 코드로 컴파일되지 않는다. 따라서 변수에 할당한다.
let patient: Patient = {
  name: "Joe Smith",
  height: 5,
  weight: 100,
};
// 위의 변수에 weight가 빠져있다면 에러가 발생한다. 이때 ?를 붙여주면 조건부 프로퍼티임을 선언한다.
type Patient2 = {
  name: string;
  height: number;
  weight?: number; // weight는 있어도 되고 없어도 된다.
};
let patient2: Patient2 = {
  name: "Joe Smith",
  height: 5,
};

//함수 시그니처에도 type 키워드와 별칭을 사용할 수 있다.
type ValidatorFn = (c: FormControl) => { [key: string]: any } | null;
class FormControl {
  constructor(initialValue: string, validator: ValidatorFn | null) {}
}

//?/* ----------------------------- 클래스 내 커스텀 타입 사용 ---------------------------- */
// 타입스크립트는 다른 객체 지향 언어와 같이 접근 제어자가 있으며 readonly, private, protected, public 키워드가 있다.
class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) {}
}
const p: Person = new Person("An", "ByungHoon", 25);

//* public
// 타입스크립트 클래스 내 각 생성자 파라미터에 public 접근 제어자를 사용할 수 있다.
// 생성된 프로퍼티는 클래스 내부 및 외부에서 접근할 수 있게 된다.

//* read only
// 제한자는 변경 불가능한 상수를 나타내는 const 키워드와 비슷하지만 const는 클래스 프로퍼티에 사용할 수 없다.
class Block {
  readonly nonce: number; // 생성자 내부에 초기화된 프로퍼티
  readonly hash: string;
  constructor(
    readonly index: number, // 초기화 중 프로퍼티 값이 생성자에 전달됨
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine(); // mine() 메서드에서 반환된 객체를 구조 분해 구문으로 상수를 선언
    this.nonce = nonce;
    this.hash = hash;
  }
  mine = () => {
    return { nonce: 1, hash: "one" };
  };
}

//?/* ---------------------------- 인터페이스를 사용한 커스텀 타입 --------------------------- */
// 타입스크립트에는 인터페이스를 지원하는 interface와 implements 키워드가 있다.
// 자바스크립트 코드로 컴파일 되지 않는다.
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
// interface는 자바스크립트 코드에 해당되지 않기 때문에 간결하고 배포하기에도 적합하다.

// 런타임 동안 객체를 인스턴스화한다면 interface 또는 type을 사용하고 그 반대의 경우에는 class를 사용한다.

//?/* ------------------------- 구조적 타입 시스템과 명목적 타입 시스템 ------------------------- */
//* 명목적 타입 시스템
// 명목적 타입 시스템을 사용하는 자바 같은 일부 객체지향 언어는 같은 네임스페이스 안에 같은 이름으로 선언된 클래스를 동일하다고 판단한다.
/* -- 자바 --
class PersonJava {
  String name;
}
class Customer {
  String name;
}
Customer cust = new Person(); // 구문 오류 : 왼쪽과 오른쪽 클래스 이름이 다르다.
*/

// 그러나 타입스크립트와 일부 언어는 구조적 타입 시스템을 사용한다.
class People {
  name: string;
}
class Customer {
  name: string;
}
const cust: Customer = new People(); // 타입 구조가 같으므로 오류가 발생하지 않는다.

//TODO 접근 제어자는 타입 호환성에 영향을 준다. People클래스에 name프로퍼티가 private일 경우 컴파일 되지 않는다.
// 프로퍼티를 추가해도 오류가 나지 않는다.
class People2 {
  name: string;
  age: number;
}
class Customer2 {
  name: string;
}
const cust2: Customer2 = new People2(); // 오류가 발생하지 않는다.
// const cust3: People2 = new Customer2(); // 타입이 일치하지 않는다.

//?/* ------------------------------- 커스텀 타입의 유니온 ------------------------------ */
// 사용자 활동에 응답하는 다양한 액션을 가진 애플리케이션을 개발한다고 가정한다면,
// 각 액션을 다른 이름의 클래스로 만든다.
//* 액션의 타입은 필수이며 옵션 사항으로 검색 쿼리 등을 가진 페이로드를 가진다.

export class SearchAction {
  actionType = "SEARCH";
  constructor(readonly payload: { searchQuery: string }) {}
}

export class SearchSuccessAction {
  [1];
  actionType = "SEARCH_SUCCESS";
  constructor(public payload: { searchResults: string[] }) {}
}

export class SearchFailedAction {
  // 액션 타입은 있지만 페이로드가 없음
  actionType = "SEARCH_FAILED";
}

export type SearchActions =
  | SearchAction
  | SearchSuccessAction
  | SearchFailedAction;
