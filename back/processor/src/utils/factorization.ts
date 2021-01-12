// Returns true if n is a prime number
function checkPrime(numberToCheck: number) {
  let divider = 2;
  while (divider < numberToCheck) {
    if (numberToCheck % divider == 0) {
      // Factor other then 1 or n, number is composite
      return false;
    }
    divider += 1;
  }

  // Number is prime, while loop terminated without finding factor
  return true;
}

// Finds the next prime after initialNumber
function nextPrime(initialNumber: number) {
  let nextPrimeToFind = initialNumber + 1;
  while (true) {
    // Check if val (n + 1) is a prime
    if (checkPrime(nextPrimeToFind)) {
      return nextPrimeToFind;
    }
    else {
      nextPrimeToFind += 1;
    }
  }
}

// Returns prime factors of n. Returns an empty list if n is prime.
export const factors = (n: number) => {
  let factorList = [];
  let prime = 1;
  while (nextPrime(prime) <= n) {
    while (n % nextPrime(prime) == 0) {
      n = n / nextPrime(prime);
      factorList.push(nextPrime(prime));
    }
    prime = nextPrime(prime);
  }

  return factorList;
}
