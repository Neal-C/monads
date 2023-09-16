interface NumberWithLogs {
	result: number;
	logs: string[];
}

// let's try to add logging of operations

function squareWithoutMonads(n: number): NumberWithLogs {
	const result = n * n;
	const logs = [`Squared ${n} to get ${result}`];
	return { result, logs };
}

function addOneWithoutMonads(n: NumberWithLogs): NumberWithLogs {
	const result = n.result + 1;
	const logs = n.logs.concat([`Added 1 to ${n.result} to get ${result}`]);
	return { result, logs };
}

// calling the functions
console.log(addOneWithoutMonads(squareWithoutMonads(2)));

//! Problem : - we can't do squareWitoutMonads(SquareWithoutMonads(2))
// because squareWithoutMonads takes cannot accept a NumberWithLogs
// - we can't do addoneWithoutMonads(5) because it expects a NumberWithLogs and not a number

// We can fix this with monads, see monads.ts
