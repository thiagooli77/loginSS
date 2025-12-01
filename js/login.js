// Pequena demonstração de autenticação do lado do cliente usando localStorage.
// NÃO use esta abordagem para autenticação de produção.

function $id(id) { return document.getElementById(id); }
function safeHtml(el, html) { if (el) el.innerHTML = html; else console.warn('Mensagem:', html); }

const loginForm = $id('loginForm');
const registerForm = $id('registerForm');
const messageArea = $id('messageArea');
const toRegister = $id('toRegister');
const toLogin = $id('toLogin');
const tabLogin = $id('tab-login');
const tabRegister = $id('tab-register');
const forgotLink = $id('forgotLink');

function showMessage(text, type = 'success') {
    const cls = type === 'error' ? 'error' : 'success';
    if (messageArea) {
        messageArea.innerHTML = `<div class="message ${cls}">${text}</div>`;
    } else {
        // fallback: log quando não há área de mensagem no HTML
        console[type === 'error' ? 'error' : 'log'](text);
    }
}

function showTab(name) {
    if (name === 'login') {
        if (tabLogin) tabLogin.classList.add('active');
        if (tabRegister) tabRegister.classList.remove('active');
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    } else {
        if (tabLogin) tabLogin.classList.remove('active');
        if (tabRegister) tabRegister.classList.add('active');
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    }
    if (messageArea) messageArea.innerHTML = '';
}

if (tabLogin) tabLogin.addEventListener('click', () => showTab('login'));
if (tabRegister) tabRegister.addEventListener('click', () => showTab('register'));
if (toRegister) toRegister.addEventListener('click', (e) => { e.preventDefault(); showTab('register'); });
if (toLogin) toLogin.addEventListener('click', (e) => { e.preventDefault(); showTab('login'); });

// usuários armazenados como objeto no localStorage sob a chave 'demo_users'
function getUsers() {
    try { return JSON.parse(localStorage.getItem('demo_users') || '{}'); } catch (e) { return {}; }
}
function saveUsers(u) { localStorage.setItem('demo_users', JSON.stringify(u)); }

function simpleHash(str) { // NÃO seguro — apenas ofuscação para demonstração
    let h = 0;
    for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
    return h.toString(16);
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = $id('regName');
        const emailEl = $id('regEmail');
        const pwEl = $id('regPassword');
        const pw2El = $id('regPassword2');
        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
        const pw = pwEl ? pwEl.value : '';
        const pw2 = pw2El ? pw2El.value : '';

        if (!name || !email || !pw) return showMessage('Por favor preencha todos os campos.', 'error');
        if (pw.length < 6) return showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
        if (pw !== pw2) return showMessage('As senhas não correspondem.', 'error');

        const users = getUsers();
        if (users[email]) return showMessage('Já existe uma conta com esse e-mail.', 'error');

        users[email] = { name, email, pw: simpleHash(pw), createdAt: new Date().toISOString() };
        saveUsers(users);
        showMessage('Conta criada! Agora você pode fazer login.', 'success');
        registerForm.reset();
        showTab('login');
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailEl = $id('loginEmail');
        const pwEl = $id('loginPassword');
        const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
        const pw = pwEl ? pwEl.value : '';
        if (!email || !pw) return showMessage('Digite e-mail e senha.', 'error');

        const users = getUsers();
        const user = users[email];
        if (!user) return showMessage('Nenhuma conta encontrada para esse e-mail. Por favor, registre-se.', 'error');
        if (user.pw !== simpleHash(pw)) return showMessage('Senha Incorreta', 'error');

        showMessage('Login feito com sucesso!', 'success');
        setTimeout(() => { redir(); }, 700);
    });
}

function redir() {
    // mudar para a página real de destino
    window.location.href = './index.html';
}

if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        showMessage('Se você esqueceu sua senha, crie uma nova conta ou limpe o armazenamento para esta demonstração.', 'error');
    });
}

// abrir registro se não houver usuários (amigável) — somente no primeiro carregamento
(function openIfNoUsers() {
    const u = getUsers();
    if (Object.keys(u).length === 0) showTab('register');
})();