function bird (){
  this.wings = 2
  this.canFly = true  
}

const bird1 = new bird()

function chicken (){
  this.cockscomb = true
}
chicken.prototype = bird1

const chicken1 = new chicken()

console.log(chicken1)
// { cockscomb: true } 

console.log(chicken1.wings, chicken1.canFly)
// 2 true

chicken1.canFly = false

console.log(chicken1)
// { cockscomb: true, canFly: false }

console.log(chicken1.wings, chicken1.canFly)
// 2 false


console.log(bird1.wings, bird1.canFly)
// 2 true