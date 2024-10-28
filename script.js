let main = document.getElementById('main');
let addUserbtn = document.getElementById('add-user');
let doubleBtn = document.getElementById('double');
let millionaresBtn = document.getElementById('millionares');
let sortBtn = document.getElementById('sort');
let sumBtn = document.getElementById('sum');

let data = [];

async function getUserData(){
    let api = await fetch(`https://randomuser.me/api/`);
    let data1 = await api.json();
    let user = data1.results[0];
    let newUser = {
        name:`${user.name.title} ${user.name.first} ${user.name.last}`,
        balance:Math.floor(Math.random()*1000000)
    }
    addData(newUser);
}

function addData(newUser){
    data.push(newUser);
    updateDom();
}

function updateDom(userData = data){
    main.innerHTML = `<h2><strong>User</strong> Wealth</h2>`;
    userData.forEach( user => {
        let userDiv = document.createElement('div');
        userDiv.classList.add('user')
        userDiv.innerHTML = `<strong>${user.name}</strong> ${user.balance}`
        main.appendChild(userDiv);
    });
}

addUserbtn.addEventListener('click',function addUser(){
    getUserData();
})

doubleBtn.addEventListener('click',function doubleUserBalance(){
    console.log("old user dataa",data);
    
    data = data.map( user => {
        return {...user, balance : user.balance * 2}
    })
    updateDom();
    console.log("new user dataa",data);
});

millionaresBtn.addEventListener('click',function filterMillionares(){
    data = data.filter( user => user.balance >= 1000000);
    updateDom();
});

sortBtn.addEventListener('click',function sortByWealth(){
    data = data.sort( (a,b) => b.balance - a.balance);
    updateDom();
});

sumBtn.addEventListener('click',function sumofAllWealth(user){
    updateDom();
    const balance = data.reduce( (acc,user) => (acc += user.balance), 0)


    let balanceDiv = document.createElement('div');
    balanceDiv.innerHTML = `<h3>Total Wealth = ${parseInt(balance)}</h3>`;
    main.appendChild(balanceDiv);
    console.log(balance);
});