
function square(x: number): number {
	return x * x;
}

function addOne(x: number): number {
	return x + 1;
}

console.log(addOne(square(2))); // 5

//Check without-monads.ts next