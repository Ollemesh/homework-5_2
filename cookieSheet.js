let table = document.createElement('table');
table.innerHTML = ' \
	<tr> \
		<td>Cookies Sheet</td><td></td><td></td> \
	</tr> \
	<tr> \
		<td>Name</td><td>Value</td><td></td> \
	</tr> \
';
table.style.borderCollapse = 'collapse';

let row = document.createElement('tr');
row.innerHTML = ' \
	<td id="name"></td><td id="value"></td><td id="deleteCookie"><button id="deleteButton">Удалить печеню</button></td> \
';

document.body.appendChild(table);

let cookies = getCookies();
cookies.forEach(postToTable());

function postToTable() {

};

function getCookies() {
	if(!document.cookie) return;
	let cooks = document.cookie.split(';');
	let cooksObj = {};
	cooks.forEach((item) => {
		cooksObj[item.split('=')[0]] = item.split('=')[1];
	});
	return cooksObj;
};

