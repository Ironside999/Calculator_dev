

const x = Array(20).fill().map(() => Math.floor(10 * Math.random()   ))
console.log(x);


class Calculator{
    constructor (previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete () {
        console.log(this.currentOperand);

    
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        console.log(this.currentOperand);

    }

    appendNumber (number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation (operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
    }

    compute () {
        let computation;
        const current = parseFloat(this.currentOperand);
        const previous = parseFloat(this.previousOperand);
        if (isNaN(current) || isNaN(previous)) return;
        
        switch (this.operation) {
            case "+":
                computation = current + previous;
                break;

            case "-":
                computation = current - previous;
                break;
            
            case "*":
                computation = current * previous;
                break;

            case "÷":
                computation = current / previous;
                break

            default:
                return;
        }

       this.currentOperand =  computation;
       this.previousOperand = "";
       this.operation = undefined;

    }

    updateDisplay () {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand}  ${this.operation}`;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-output]');
const currentOperandTextElement = document.querySelector('[data-current-output]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach (button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operatorButtons.forEach (button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        console.log(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
                                                                                    
})

currentOperand.addEventListener('click', () => {
    console.log('test the current operand');
})

