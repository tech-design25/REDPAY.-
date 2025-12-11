// Elements
const tabSignup = document.getElementById('tabSignup');
const tabSignin = document.getElementById('tabSignin');
const nameRow = document.getElementById('nameRow');
const countryField = document.getElementById('countryField');
const submitBtn = document.querySelector('.submit');
const formNote = document.getElementById('formNote');

function setMode(mode){
  if(mode === 'signup'){
    tabSignup.classList.add('active');
    tabSignup.setAttribute('aria-selected','true');
    tabSignin.classList.remove('active');
    tabSignin.setAttribute('aria-selected','false');
    nameRow.style.display = 'flex';
    countryField.style.display = 'block';
    submitBtn.textContent = 'Create account';
    formNote.textContent = 'By creating an account you agree to our Terms & Privacy.';
  } else {
    tabSignin.classList.add('active');
    tabSignin.setAttribute('aria-selected','true');
    tabSignup.classList.remove('active');
    tabSignup.setAttribute('aria-selected','false');
    nameRow.style.display = 'none';
    countryField.style.display = 'none';
    submitBtn.textContent = 'Sign in';
    formNote.textContent = '';
  }
}

tabSignup.addEventListener('click',()=>setMode('signup'));
tabSignin.addEventListener('click',()=>setMode('signin'));

// Country dropdown behavior
const countryBtn = document.getElementById('countryBtn');
const countryMenu = document.getElementById('countryMenu');
const countryLabel = document.getElementById('countryLabel');
const phonePrefix = document.querySelector('.phone-prefix');

countryBtn.addEventListener('click', (e)=>{
  const expanded = countryBtn.getAttribute('aria-expanded') === 'true';
  countryBtn.setAttribute('aria-expanded', String(!expanded));
  countryMenu.hidden = expanded;
});

// choose country
countryMenu.addEventListener('click', (e) => {
  const item = e.target.closest('.country-item');
  if(!item) return;
  const name = item.dataset.name;
  const code = item.dataset.code;
  countryLabel.textContent = name;
  phonePrefix.textContent = code;
  countryMenu.hidden = true;
  countryBtn.setAttribute('aria-expanded','false');
});

// allow keyboard selection
countryMenu.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    e.target.click();
  } else if(e.key === 'Escape'){
    countryMenu.hidden = true;
    countryBtn.setAttribute('aria-expanded','false');
    countryBtn.focus();
  }
});

// close dropdown when clicking outside
document.addEventListener('click', (e)=>{
  if(!countryBtn.contains(e.target) && !countryMenu.contains(e.target)){
    countryMenu.hidden = true;
    countryBtn.setAttribute('aria-expanded','false');
  }
});

// basic form submit handler
document.getElementById('authForm').addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const mode = tabSignup.classList.contains('active') ? 'signup' : 'signin';
  const phone = document.querySelector('.phone-prefix').textContent + document.getElementById('phone').value;
  const pwd   = document.getElementById('password').value;

  if(mode === 'signup'){
    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    if(!firstName){ alert('Please enter your first name'); return; }
    // store credentials
    localStorage.setItem('registeredName', firstName);
    localStorage.setItem('rp_phone', phone);
    localStorage.setItem('rp_pwd', pwd);
    localStorage.setItem('rp_balance', '₦160000');
    localStorage.setItem('rp_userId', ''+(Date.now()).toString().slice(-10));
    localStorage.setItem('rp_email', document.getElementById('email').value.trim());
    localStorage.setItem('rp_country', document.getElementById('countryLabel').textContent);
    // loading state
    const btn = ev.target.querySelector('.submit');
    btn.textContent = 'Creating...';
    btn.disabled = true;
    setTimeout(()=> window.location.href = 'welcome.html', 5000);
    return;
  }
  // sign-in path
  const storedPhone = localStorage.getItem('rp_phone');
  const storedPwd   = localStorage.getItem('rp_pwd');
  if(phone === storedPhone && pwd === storedPwd){
    window.location.href = 'dashboard.html';
  } else {
    alert('Incorrect phone or password');
  }
});

// initial state
setMode('signup');