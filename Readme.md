# 원글
https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42

정말 좋은 글에 감사드립니다 🙏🏻

# 들어가기 앞서
자바스크립트의 주요 개념을 정리해보고자 위의 원글을 읽으며 정리한 내용입니다. 원글이 훨씬 더 자세하고 매끄럽게 정리되어있으니, 꼭 한번 읽어보시길 강력하게 추천드립니다.

# Prototype
### 프로토타입이란 뭘까?
이 유튜브 영상에서 프로토타입을 이해하기 위한 좋은 예시를 들어주었다. (감사합니다👍🏻 코딩애플)  
.  
프로토타입은 **유전자**이다.  
.  
우리는 부모님의 유전자를 받았다. 때문에 부모님의 외형이나 체질등을 물려받았다. 그렇다고해서 부모님과 내가 완전이 동일한 외형과 체질을 갖고있는가?  

그렇지 않다. 그저 유사할 뿐 같진 않다. 부모님께 있는 특성이 나에겐 없고, 부모님께 없는 특성이 나에게 있기도 하다. 이것이 프로토타입의 개념과 유사하다.

---

### 1-basicPrototype.js
코드로 직접 prototype을 체험해보자.

> line 11
```js
chicken.prototype = bird1
```

chicken의 원형으로 bird1을 지정한다. 위의 비유에 따르자면, chicken은 bird1의 유전자를 물려받았다.
* 왜 `chicken.prototype = bird`가 아닐까?  
bird는 그저 코드상으로 존재하는 개념할 뿐이지, 존재하는 데이터(instance)가 아니다. 즉, 메모리에 적재되어있지 않다. 따라서 누군가의 원형(prototype)으로 지정할 수 없다.  
  
.  
.  
  
> line 15 - 19
```js
console.log(chicken1)
// { cockscomb: true } 

console.log(chicken1.wings, chicken1.canFly)
// 2 true
```
line15, 16에서 출력값을 보면 분명 chicken1은 wings와 canFly값이 없다. 그런데 어떻게 wings와 canFly값을 출력할 수 있는가?  

그 이유는 line11에서 **bird1을 원형(prototype)으로 지정했기 때문**이다. 찾는 값이 나에게 없다면 물려받은 유전자 즉, 원형(prototype)에서 값을 찾는다는것을 알 수 있다.
.  
.  
>line 21 - 31
```js
chicken1.canFly = false

console.log(chicken1)
// { cockscomb: true, canFly: false }

console.log(chicken1.wings, chicken1.canFly)
// 2 false

console.log(bird1.wings, bird1.canFly)
// 2 true
```

chicken1의 canFly값을 변경한 후 출력했다. chicken1은 이제 canFly값을 갖고 있다. 때문에 wings는 여전히 원형의 값을 출력하지만, canFly는 자신의 값을 출력함을 확인할 수 있다.  

당연한 말이겠지만, bird1의 canFly값은 변하지 않았다. (나의 체질이 바뀐다고해서 부모님의 체질도 변하진 않으니까!)  

.  
.  

---
# Hoisting
### 호이스팅이란 뭘까?
면접볼 때 꼭 나오는 질문 중 하나인 것 같다. 아래처럼 대답하는 것이 일반적일 것이다.

"코드를 읽을 때 선언부를 가장 위로 끌어올리는 것"

하지만, 참고한 글에선 이 대답은 뭔가 아쉽다고 말한다.(ㅜㅜ)  
.  
자바스크립트에서 가장 중요한 것은 문맥(context)이다.   
.  
자주 쓰이는 용어로 말하자면 `"스코프"`이다. 그리고 호이스팅은 동일 스코프(Lexical Scope)에서 선언이 되었다면, 선언보다 호출이 앞설지라도 선언을 끌어다 사용할 수 있는 것이다. (내가 쓰고도 이해가 안된다.)

### 2-hoisting.js
이를 이해하기 위해서 코드를 살펴보자.

> v1
```js
// 전체 정의(name, init) hoisting
let name = 'suhyun'
init() // 내부 정의 (name, displayName) hoisting
  
function init() {

  let name = 'shelly'
  function displayName() {
    console.log(name) // shelly : scope Chain
  }
  displayName() // 내부 정의 hoisting
}

console.log(name) // suhyun
```

원글에서 정말 딱 원했던 정리가 적혀있었다. 
```
- Global Execution // 1
   - Lexical : name, init 
- Execution : init // 2
   - Lexical : name, displayName
   - Outer : global 
- Execution : displayName // 3
   - Lexical : null
   - Outer : init
```
* `init 호출이 선언보다 앞섰는데, 에러가 발생하지 않은 이유?`  
init 함수는 선언되기 전에 실행되었으나, 동일 스코프(Lexical scope)에서 선언되었기 때문에 에러없이 실행이 되었다.

* `displayName의 Lexical scope에는 name이 없는데 출력이 된 이유?`  
내부에 선언된 것이 없을 경우, Scope Chain을 통해 상위 실행(Execution)컨텍스트로 위임한다. 따라서, 상위컨텍스트인 init의 Lexical에 정의된 name를 출력한 것이다.

* `hoisting은 언제되는가?`  
실행문맥(Execution Scope)이 생성될 때, 즉 함수가 호출될 때 내부 정의가 hoisting된다. 전역실행문맥(Global Execution Scope)은 코드가 실행될 때 생성된다. 

> 정리  

앞서 말했듯이, 자바스크립트는 문맥(context)이 중요하다.  

원글에서 이러한 예시를 알려주었다.
```
비트겐슈타인은 ‘벽돌'을 예로 들었습니다. 누군가 벽돌! 이라 외쳤을 때 상황마다 그 의미는 달라집니다.

(벽돌이 필요할 때) : 벽돌을 달라
(벽돌로 보수해야 할 때) : 벽돌을 채우라
(벽돌이 떨어질 때) : 벽돌을 피해라
```

위의 코드에서도 name이 어느 문맥(Scope)에 있느냐에 따라 출력값이 달라졌다. 전역에선 suhyun이 되고, displayName에선 shelly가 되었다. 

그럼 나는 앞으로 hoisting이 무엇이냐고 묻는다면 뭐라고 대답할까...  

"호이스팅은 Lexical Scope의 선언부를 상단으로 끌어올리는 것입니다."

추가로 "실행문맥이 생성될 때 호이스팅되기 때문에, 동일 스코프에서 호출이 선언보다 앞설지라도 에러없이 실행됩니다."  
정도로 정리했다. (여전히 정돈되지 않은 느낌이긴 하지만 이해는 했으니 만족...)  
.  
.  

---

# this
### this란 뭘까?
암기한 this.  
그냥 그렇구나 하면서 넘어간 그 this.  
prototype, hoisting과 마찬가지로 항상 면접질문으로 나오는 바로 그 this.  

이제는 이해해보자 ...  

시작하기 전에, 다시 한번 되새기자. 자바스크립트는 문맥이 중요하다.   
.  
위에서 벽돌을 어떤 상황에서 외치느냐에 따라 의미가 달라지는 예시를 보았다. this도 마찬가지이다. 누가 this를 선언했느냐에 따라 가르키는 값이 달라진다. (원글에선 선언을 발화(실행)라고 설명한다.)  

### 3-this.js
 작성중




.  
.

---

# 느낀점
프로그래밍 언어들이 굉장히 철학적이었구나...  
이래서 만들어진 유래를 알아보라고 했구나...