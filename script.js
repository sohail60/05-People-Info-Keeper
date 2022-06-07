const addUser=document.querySelector('#add-user');
const doubleMoney=document.querySelector('#double-money');
const showMillionaires=document.querySelector('#show-millionaires');
const sort=document.querySelector('#sort');
const calculate=document.querySelector('#calculate');
const details=document.querySelector('.details');

let data=[];

// Functions
async function getRandomUser(){
    const res=await fetch('https://randomuser.me/api');
    const data= await res.json();
    const user=data.results[0];

    let newUser={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }
    addData(newUser);
}

function addData(obj){
    data.push(obj);
    updateDOM(data);
}

function updateDOM(dataArray){
    console.log('executing');
    main.innerHTML='<h2><strong>Person</strong>Wealth</h2>';

    data.forEach(function(currItem){
        let element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<h3><strong>${currItem.name}</strong>\$${formatMoney(currItem.money)}</h3>`;
        main.appendChild(element);
    });
}

function formatMoney(num){
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoneyFunc(dataArray=data){
    console.log('This is Exec');
    data=data.map(double);
    updateDOM(data);
}

function double(personObject){
    personObject.money=personObject.money*2;
    return personObject;
}

function showMillionairesFunc(dataArray=data){
    console.log('This is Exec');
    data=data.filter(filterMoney);
    updateDOM(data);
}

function filterMoney(personObject){
    return personObject.money>=1000000;
}

function sortFunc(){
    console.log('This is Exec');
    data.sort(function(a, b){
        return b.money - a.money;
    });

    updateDOM(data);
}

function calculateFunc(personObject= data){
    let element=document.createElement('div');
        element.classList.add('total');
        element.innerHTML=`Total Wealth:<strong>\$${sum(data)}</strong>`;
        main.appendChild(element);
}

function sum(){
    let sumMoney=data.reduce((acc,currObj) => {
        return acc+currObj.money;
    },0 );
    return formatMoney(sumMoney);
}

// Event Listeners
addUser.addEventListener('click',getRandomUser);
doubleMoney.addEventListener('click',doubleMoneyFunc);
showMillionaires.addEventListener('click',showMillionairesFunc);
sort.addEventListener('click',sortFunc);
calculate.addEventListener('click',calculateFunc);