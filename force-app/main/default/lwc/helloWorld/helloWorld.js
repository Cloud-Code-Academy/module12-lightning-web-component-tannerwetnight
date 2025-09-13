import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {

    greeting = 'beautiful person';

    changeHandler(event) {
        console.log(event.target.value);
        this.greeting = event.target.value;
    }
}