'use strict'

let layout = document.querySelector('layout');
let avatar = document.querySelector('#post .avatar');
let name = document.querySelector('#post .name');

let url, data;

function get(button) {

	var input = document.querySelector('#get input');
	if(!input.validity.valid) return;

	button.disabled = true;

	var request = function() {

		axios(input.value).then(response => {

			data = response.data;
			url = input.value;

			// Avatar
			var avatar_url = data.avatar ?
			"https://cdn.discordapp.com/avatars/" + data.id + "/" + data.avatar +".png" :
			"https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png";

			avatar.style = 'background: url(' + avatar_url + ')';

			// Name
			name.innerHTML = data.name;

			button.disabled = false;
			layout.setAttribute('view', 'post');

		}).catch(() => button.disabled = false);
	}

	setTimeout(request, 2000);
}

function post(input) {

	if(!input.validity.valid) return;

	input.disabled = true;
	data.content = input.value;

	axios.post(url, data).then(function() {
		input.value = null;
		input.disabled = false;
	}).catch(() => input.disabled = false);
}
