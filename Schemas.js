const taxable = {
	name: 'taxable',
	properties: {
		id: 'int',
		description: 'string',
		amount: 'int',
		date: 'string'
	},
	primaryKey: "id"
};

const nontaxable = {
	name: 'nontaxable',
	properties: {
		id: 'int',
		description: 'string',
		amount: 'int',
		date: 'string'
	},
	primaryKey: "id"
};

const expenses = {
	name: 'expenses',
	properties: {
		id: 'int',
		description: 'string',
		amount: 'int',
		date: 'string'
	},
	primaryKey: "id"
};

const taxRnrw = [
	            "taxable", 
				{
				 id: "int", 
				 description: "string", 
				 amount: "int", 
				 date: "string"
				}
];

const nonTaxRnrw = [
	            "nontaxable", 
				{
				 id: "int", 
				 description: "string", 
				 amount: "int", 
				 date: "string"
				}
];

const expensesRnrw = [
	            "expenses", 
				{
				 id: "int", 
				 description: "string", 
				 amount: "int", 
				 date: "string"
				}
];

export {taxable, nontaxable, expenses, taxRnrw, nonTaxRnrw, expensesRnrw};