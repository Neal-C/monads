function wrapWithLogs(n: number): NumberWithLogs {
	return {
		result: n,
		logs: [],
	};
}

// the function helps numbers enter the NumberWithLogs ecosystem

function squareWithMonads(n: NumberWithLogs): NumberWithLogs {
	const result = n.result * n.result;
	const logs = n.logs.concat([`Squared ${n.result} to get ${result}`]);
	return { result, logs };
}

//This allows this calling pattern

console.log(squareWithMonads(squareWithMonads(wrapWithLogs(2))));

function addOneWithMonads(n: NumberWithLogs): NumberWithLogs {
	const result = n.result + 1;
	const logs = n.logs.concat([`Added 1 to ${n.result} to get ${result}`]);
	return { result, logs };
}

// We can now call all functions indepentently of order and each others.

console.log(addOneWithMonads(wrapWithLogs(2)));

// Hmmm... There's still some duplicated logic. We can refactor this.
// Both functions do raw concatenation of logs, let's refactor it.

function runWithLogs(input: NumberWithLogs, transformFn: (n: number) => NumberWithLogs): NumberWithLogs {
	const numberWithLogs = transformFn(input.result);
	const logs = input.logs.concat(numberWithLogs.logs);
	return { result: numberWithLogs.result, logs };
}

// This allows a new calling style
// functions don't need to do raw concatenation anymore and become simpler
// functions don't need to take a NumberWithLogs anymore, and take a simple number

function addOneAndReturnNumberWithLogs(n: number): NumberWithLogs {
	const result = n + 1;
	const logs = [`Added 1 to ${n} to get ${result}`];
	return { result, logs };
}

function squareAndReturnNumberWithLogs(n: number): NumberWithLogs {
	const result = n * n;
	const logs = [`Squared ${n} to get ${result}`];
	return { result, logs };
}

runWithLogs(wrapWithLogs(5), addOneAndReturnNumberWithLogs);

// With this setup, we can now call the code with this style:

const a = wrapWithLogs(5);
const b = runWithLogs(a, addOneAndReturnNumberWithLogs);
const c = runWithLogs(b, squareAndReturnNumberWithLogs);
console.log(c); // { result: 25, logs: [
//   'Added 1 to 5 to get 6',
//   'Squared 6 to get 36',
// ]}

// We can now combine arbitrary transformations in any order we like !!!

const interviewMe = wrapWithLogs(42);
const hireMe = runWithLogs(interviewMe, squareAndReturnNumberWithLogs);
const iBringValueToYourTeam = runWithLogs(hireMe, addOneAndReturnNumberWithLogs);
console.log(iBringValueToYourTeam);
console.log("Woaw you made it here ?! You've got to interview me ! ");
console.log("Yes my repositories are mostly boobytraps. And I will not apologize for it. ");

// And easily invent new transformations, by writing a new function and it will work with the NumberWithLogs-ecosystem
// without any additional efforts
// log concatenation is now hidden away (abstracted)

// Our functions now follow the single responsibility principle and don't worry about doing concatenation

function multiplyByThreeAndReturnNumberWithLogs(n: number): NumberWithLogs {
	const result = n * 3;
	const logs = [`Multiplied ${n} by 3 to get ${result}`];
	return { result, logs };
}

const interviewMeAgain = runWithLogs(interviewMe, multiplyByThreeAndReturnNumberWithLogs);

// And we just wrote MONADS !!
// Monads, at the core, allow us to chain operations while secretly managing busy work or other complex things

// Monads have 3 components:
// - a Wrapper Type -> NumberWithLogs
// - a Wrap Function -> wrapWithLogs ; that allows entry into the monad ecosystem
// - a Run Function -> runWithLogs ; that runs transformations on monadic values; also known as 'bind','flatMap' or haskell's >>= (I think it's called a fish)
