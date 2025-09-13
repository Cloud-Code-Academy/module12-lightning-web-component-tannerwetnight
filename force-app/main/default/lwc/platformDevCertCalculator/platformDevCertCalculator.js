import { LightningElement, track } from 'lwc';
const devFundWeight = 0.23;
const processWeight = 0.30;
const uiWeight = 0.25;
const debugWeight = 0.22;
const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {

    devFundamentalsScore = 50;
    processScore = 50;
    debugScore = 50;
    userInterfaceScore = 50;


    certificationScore = 90;
    numberOfQuestions = 60;

    showResources = false;
    showGoodJob = false;

    currentHistoryId = 0;
    attemptHistory = [{Id: 1, Score: 50},
                      {Id: 2, Score: 67},
                      {Id: 3, Score: 89},];

    calculateScore(){
        let devFundWeightScore = this.devFundamentalsScore * devFundWeight;
        let proccessWeightScore = this.processScore * processWeight;
        let uiWeightScore = this.userInterfaceScore * uiWeight;
        let debugWeightScore = this.debugScore * debugWeight;
        this.certificationScore = devFundWeightScore + proccessWeightScore + uiWeightScore + debugWeightScore;

        this.showResourceIfFalse();
        this.addAttemptHistory(this.certificationScore);
    }

    handleChange(event){
        console.log(event.target.value);
        console.log(event.target.name);
        console.log(event.target.type);
        console.log(event.target.label);
        const inputName= event.target.name;
        let value = Number(event.target.value);
        if(inputName === 'devFundamentals'){
            this.devFundamentalsScore = value;
        } else if (inputName === 'processAuto'){
            this.processScore = value;
        } else if (inputName === 'testDebugDeploy'){
            this.debugScore = value;
        } else if (inputName === 'userInterface'){
            this.userInterfaceScore = value;
        }
    }


    showResourceIfFalse(){
        if(this.certificationScore < passingScore){
            this.showResources = true;
            this.showGoodJob = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }

    addAttemptHistory(Score){
        this.currentHistoryId ++;
        const attempt = 
            {
                Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }
    deleteAttemptHandler(event){
        console.log('this is called form parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history' + this.attemptHistory);
    }
    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
}