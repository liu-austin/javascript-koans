var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */


      productsICanEat = products.filter(function(pizza) {return !pizza.containsNuts;}).filter(function(remaining){return !_.any(remaining.ingredients, function(ingredient) {return ingredient === 'mushrooms';});});

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

        /* try chaining range() and reduce() */

    var sum = _.chain(_.range(1000)).reduce(function(a,b)
    { if (b % 3 === 0 || b % 5 === 0)
      {return a+b;} else {
        return a;
      }}, 0).value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.chain(products).map(function(line) {return line.ingredients;}).flatten().reduce(function(counts, ingredient) {counts[ingredient] = counts[ingredient] + 1 || 1;
      return counts;}, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var composite = 30;
    var largestPrimeFactor;
    var factor = composite-1;
    var factorIsNonPrime = true;
    var isPrime = function(number) {
      if (number < 2) {
        return false;
      } else {
        for (var i = 2; i < number; i++) {
          if (number % i === 0) {
            return false;
          }
        }
        return true;
      }
    };
    while (composite % factor !== 0 || factorIsNonPrime) {
      factor -= 1;
      if (composite % factor === 0 && isPrime(factor)) {
        factorIsNonPrime = false;
      }
      if (factor < 2) {
        console.log('Not a composite number');
        break;
      }
    }
    largestPrimeFactor = factor;

// FOR COMPOSITE VALUE=30,
    expect(largestPrimeFactor).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var number1 = 315;
    var number2 = 542;
    var product = number1 * number2;
    var productStr = String(product);
    var productArr = productStr.split('');
    var longestPalindrome = '';
    var slice;
    var i = 0;
    var leftIndex = Math.floor(i - 0.5);
    var rightIndex = Math.ceil(i + 0.5);

      while (i < productArr.length) {
        slice = productArr.slice(leftIndex, rightIndex + 1);
        if (slice.join('') === slice.reverse().join('')) {
          longestPalindrome = slice.length > longestPalindrome.length ? slice.join('') : longestPalindrome;
        }
        if (leftIndex < 0 || rightIndex > productArr.length - 1) {
          i += 0.5;
          leftIndex = Math.floor(i - 0.5);
          rightIndex = Math.ceil(i + 0.5);
          continue;
        }
        leftIndex += -1;
        rightIndex += 1;
      }

      // FOR VALUES OF 315 AND 542, the LONGEST PALINDROME
      expect(longestPalindrome).toBe('707');
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var range = [];
    var lowerBound = 1;
    var upperBound = 20;
    for (var i = lowerBound; i <= upperBound; i++) {
      range.push(i);
    }
    var productOfRange = range.reduce(function(a,b){return a*b;});
    var divisibleArr = [];
    var rightPointer = range.length - 1;
    var leftPointer = rightPointer - 1;
    while (leftPointer > - 1) {
      if (range[rightPointer] % range[leftPointer] === 0 && !divisibleArr.includes(range[leftPointer])) {
        productOfRange /= range[leftPointer];
        divisibleArr.push(range[leftPointer]);
      }
      if (leftPointer === 0) {
        rightPointer -= 1;
        leftPointer = rightPointer - 1;
      } else {
        leftPointer -= 1;
      }
    }

    expect(productOfRange).toBe(670442572800);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
// From multiplication rules, we know (a+b)^2 = a^2 + b^2 + 2*a*b
// so b^2 + a^2 - (a+b)^2 = -2*a*b
    var num1 = 7;
    var num2 = 11;
    var difference = -1*2*num1*num2;

    expect(difference).toBe(-154);
  });

  it("should find the 10001st prime", function () {
    var primeNumberArr = [];
    var isPrime = function(integer) {
      for (var i = 2; i < integer; i++) {
        if (integer % i === 0) {
          return false;
        }
      }
      return true;
    }

    var int = 2;
    while (primeNumberArr.length < 1001) {
      if (isPrime(int)) {
        primeNumberArr.push(int);
      }
      int++;
    }
    var prime1k1 = primeNumberArr[1000];

    expect(prime1k1).toBe(7927);
  });

});
