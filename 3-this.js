// v1
{
  const greet = 'hello'

  function outerFunc() {
    console.log(this.greet) // hello
    this.innerFunc() // ERROR!
  }

  const obj = {
    greet: 'javascript',
    outerFunc,
    innerFunc : function() {
      console.log("innerFunc's this : ", this) 
    }
  }

outerFunc() // second
}

// v2
{
  const greet = 'hello'

  function outerFunc() {
    console.log(this.greet) // javascript
    this.innerFunc()
  }

  const obj = {
    greet: 'javascript',
    outerFunc,
    innerFunc : function() {
      console.log("innerFunc's this : ", this) // obj
    }
  }

obj.outerFunc() // second
}