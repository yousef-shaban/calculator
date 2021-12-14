class Calculator
{
    constructor(prevData, currentData)
    {
        this.prevDataDisplay = prevData;
        this.currentDataDisplay = currentData;
        this.clear()
    }
    
    clear()
    {
        this.prevOperant = "";
        this.currentOperant = "";
        this.operation = undefined;
    }
    addNumber(num)
    {
        if(num === "." && this.currentOperant.includes(".")){
            return                                  
        }
        if(this.operation === '')
        {
            this.prevOperant = ''
        }
        this.currentOperant += num;
    }
    delete()
    {
        this.currentOperant = this.currentOperant.slice(0, -1)
    }
    updatedisplay()
    {
        this.currentDataDisplay.innerText = this.currentOperant
        this.prevDataDisplay.innerText = this.prevOperant
        if(this.operation != null )
        {
            this.prevDataDisplay.innerText = `${this.prevOperant} ${this.operation}`
        }
    }
    
    selectOperant(op)
    {
        this.operation = op;
        if(this.currentOperant != null && this.prevOperant === '')
        {
            this.prevOperant = `${this.currentOperant}`;
            this.currentOperant = ''
        }
        else if (this.prevOperant != '' && this.currentOperant != '') 
        {
            this.compile()
            this.currentOperant = ''
        }
    }
    compile()
    {
        let result;
        if(this.currentOperant != '' && this.prevOperant != '' && this.currentOperant != '.')
        {
            switch(this.operation){
                case '+':
                    result = parseFloat(this.prevOperant) + parseFloat(this.currentOperant)
                    break;
                
                case '-':
                    result = parseFloat(this.prevOperant) - parseFloat(this.currentOperant)
                    break;
                
                case '*':
                    result = parseFloat(this.prevOperant) * parseFloat(this.currentOperant)
                    break;
    
                case '/':
                    result = parseFloat(this.prevOperant) / parseFloat(this.currentOperant)
                    break;
                
                case '%':
                    result = parseFloat(this.prevOperant) % parseFloat(this.currentOperant)
                    break;
            }
            this.prevOperant = result;
            this.currentOperant = ''
            this.operation = ''
        }

    }
}

// select the HTML element
const prevData = document.querySelector('[data-prev]');
const currentData = document.querySelector('[data-current]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-compile]')


const calculator = new Calculator(prevData , currentData);

numberButtons.forEach(b => {
    b.addEventListener("click",()=>{

        calculator.addNumber(b.innerText)
        calculator.updatedisplay()
    })
})

clearButton.addEventListener("click", ()=>{
        calculator.clear()
        calculator.updatedisplay()
})

deleteButton.addEventListener("click", () =>{
    calculator.delete()
    calculator.updatedisplay()
})


operationButtons.forEach(o => {
    o.addEventListener("click", () =>
    {
        calculator.selectOperant(o.innerText);
        calculator.updatedisplay()
    })
})

equalButton.addEventListener('click', (e)=>{
    calculator.compile();
    calculator.updatedisplay();
})