import { Modifier } from "../Modifier/Modifier";



export class Dice{


    static rollExpression(expression: Modifier[]): number{

        const result = expression.reduce((previous, current) => {
            const value = current.value

            if(Number.isInteger(value)){
                return Number(value) + previous;
            }

            if(value.includes('d')){
                const [dice, sides] = value.split('d');
                let sum = 0;
                for(let i = 0; i < Number(dice); i++){
                    const result = Math.floor(Math.random() * Number(sides)) + 1;
                    sum += result;
                }
                
                return sum + previous;
            }

            return previous;
        }, 0)

        return result;
    }

    static rollValue(value: string): number {
        if(Number.isInteger(value)){
            return Number(value);
        }

        if(value.includes('d')){
            const [dice, sides] = value.split('d');
            let sum = 0;
            for(let i = 0; i < Number(dice); i++){
                const result = Math.floor(Math.random() * Number(sides)) + 1;
                sum += result;
            }
            return sum;
        }
        
        return 0;
    }
}