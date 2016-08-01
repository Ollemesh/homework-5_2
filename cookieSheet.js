var cookies = {},
	table;

//Добавим куков для демонстрации работы страницы
document.cookie = 'AreYouReadyKids=YesCaptain';
document.cookie = 'ICantHearYou=YesCaptain';

showTable();
table.addEventListener('click', deleteCookie);
document.body.addEventListener('click', addCookie);

function showTable() {
	table = document.createElement('table');
	table.innerHTML = ' \
	<tr> \
		<td>Cookies Sheet</td><td></td><td></td> \
	</tr> \
	<tr> \
		<td>Name</td><td>Value</td><td></td> \
	</tr> \
	';
	document.body.appendChild(table);
	fillTable();
};

function fillTable() {
	cookies = getCookies() || console.log('There are no cookies');
	for(cookieName in cookies) postToTable(cookieName);
};
function refillTable() {
	rows = document.querySelectorAll('.row');
	for(key in rows) {
		if(typeof rows[key] === 'object')
			rows[key].parentNode.removeChild(rows[key]);
	}
	fillTable();
};

function postToTable(cookieName) {
	var row = document.createElement('tr');
	row.classList.add('row')
	row.innerHTML = ' \
	<td>' + cookieName + '</td> \
	<td>' + cookies[cookieName] + '</td> \
	<td id="deleteCookie"><button id="' + cookieName + '">Удалить печеню</button></td> \
	';
	table.appendChild(row);
};

function deleteCookie(event) {
	if (!event.target.closest("button")) return;
	var cookieName = event.target.getAttribute('id');
	if(!confirm('Удалить cookie с именем ' + cookieName +'?')) return;
	var expires = getExpires(-1);
	document.cookie = cookieName + '=' + cookies[cookieName] + '; expires=' + expires;
	refillTable()
};

function getExpires(daysNumber) {
	var date = new Date;
	date.setDate(date.getDate() + daysNumber);
	return date.toUTCString();
};

function getCookies() {
	if(!document.cookie) return;
	var cooks = document.cookie.split(';');
	var cooksObj = {};
	cooks.forEach((item) => {
		cooksObj[item.split('=')[0]] = item.split('=')[1];
	});
	return cooksObj;
};

function addCookie(event) {
	event.preventDefault();
	if (!event.target.closest("#addCookie")) return;
	var cookieName = document.forms[0].name.value,
		cookieValue = document.forms[0].value.value,
		cookieExpires = document.forms[0].expires.value;
	if(!cookieName || !cookieValue || !cookieExpires || typeof parseInt(cookieExpires) != 'number') {
		alert('Заполните все поля формы');
		return;
	}
	document.cookie = cookieName+'='+cookieValue+'; expires='+getExpires(cookieExpires);
	clearForm();
	refillTable();
}

function clearForm() {
	document.forms[0].name.value = document.forms[0].value.value = document.forms[0].expires.value = '';
};