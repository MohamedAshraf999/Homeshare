const KEY="homeSharePWA";
const defaults={residents:["محمد أشرف","أحمد","صلاح"],expenses:[],history:[]};
let s=JSON.parse(localStorage.getItem(KEY)||"null")||defaults;
function save(){localStorage.setItem(KEY,JSON.stringify(s))}
function money(n){return Number(n||0).toFixed(2)}
function total(){return s.expenses.reduce((a,e)=>a+Number(e.amount||0),0)}
function share(){return s.residents.length?total()/s.residents.length:0}
function balances(){return s.residents.map(n=>({name:n,paid:s.expenses.filter(e=>e.payer===n).reduce((a,e)=>a+Number(e.amount),0)})).map(x=>({...x,balance:x.paid-share()}))}
function render(){
 const b=balances();
 document.getElementById("app").innerHTML=`<div class="shell">
 <div class="top"><div class="title"><b>HomeShare</b><span class="muted">Apartment expenses</span></div><span class="pill">${s.residents.length} residents</span></div>
 <div class="grid"><div class="card"><span class="muted">Total</span><div class="value">${money(total())}</div></div><div class="card"><span class="muted">Equal share</span><div class="value">${money(share())}</div></div></div>
 <div class="section card"><h2>Add expense</h2>
 <select id="payer" class="input"><option value="">Who paid this bill?</option>${s.residents.map(x=>`<option>${x}</option>`).join("")}</select>
 <div class="row"><input id="amount" class="input" type="number" step="0.01" placeholder="Amount"></div>
 <div class="row"><input id="desc" class="input" placeholder="Description"><input id="cat" class="input" placeholder="Category"></div>
 <button class="btn" id="add">Add expense</button></div>
 <div class="section card"><h2>Current balances</h2>${b.map(x=>`<div class="expense"><span>${x.name}</span><b>${x.balance>=0?"+":""}${money(x.balance)}</b></div>`).join("")}</div>
 <div class="section card"><h2>Expenses</h2>${s.expenses.length?s.expenses.slice().reverse().map(e=>`<div class="expense"><div><b>${e.description||"Expense"}</b><div class="muted">${e.payer} · ${e.category||"Other"}</div></div><b>${money(e.amount)}</b></div>`).join(""):`<span class="muted">No expenses yet.</span>`}</div>
 <div class="section card"><h2>Residents</h2><div class="row"><input id="resident" class="input" placeholder="Add resident"><button class="btn secondary" id="addResident">Add</button></div>${s.residents.map(x=>`<div class="expense"><span>${x}</span></div>`).join("")}</div>
 </div><nav class="nav"><button onclick="window.scrollTo(0,0)">Home</button><button onclick="document.getElementById('payer').focus()">Expense</button><button onclick="document.getElementById('resident').focus()">Residents</button></nav>`;
 document.getElementById("add").onclick=()=>{
   const payer=document.getElementById("payer").value, amount=Number(document.getElementById("amount").value);
   if(!payer||!amount){alert("Select who paid and enter an amount.");return}
   s.expenses.push({id:Date.now(),payer,amount,description:document.getElementById("desc").value,category:document.getElementById("cat").value,date:new Date().toISOString()});save();render();
 };
 document.getElementById("addResident").onclick=()=>{const n=document.getElementById("resident").value.trim();if(n&&!s.residents.includes(n)){s.residents.push(n);save();render()}};
}
render();
