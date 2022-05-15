




document.getElementById("login").addEventListener('click', (event)=>{
	prompt();

});


function submitComment(){

	let comments = document.getElementsByTagName('textarea');

	let opt = {comment : comments[0].value};

	let context = {opt};

	const xhr1 = new XMLHttpRequest();
	xhr1.open("GET", "http://localhost:3000/comment.tbs");
	xhr1.responseType = "text";
	xhr1.onreadystatechange = () => {
		if (xhr1.readyState == 4 && xhr1.status == 200) {
			const button = document.getElementById('submit-button');
			const template = Handlebars.compile(xhr1.response);
			const html = template(context);

			document.getElementById('comment-button-container').insertAdjacentHTML("afterend", html);
			comments[0].value = "";
		}
	}
	xhr1.send();



	const xhr2 = new XMLHttpRequest();
	const jsonStr = JSON.stringify(opt);
	console.log(jsonStr);
	xhr2.open('post', 'http://localhost:4020/api/commentsection');

	xhr2.setRequestHeader('Content-Type', 'application/json');
	xhr2.responseType = "json";
	xhr2.onreadystatechange = () => {
		if(xhr2.readyState == 4 && xhr2.status == 200) {
			console.log(xhr2.response);
		}
	}

	xhr2.send(jsonStr);

}

document.getElementById("submit-button").addEventListener('click', () => {
	submitComment();
});


document.getElementById("test").addEventListener('click', () => {
	const xhr = new XMLHttpRequest;
	xhr.open("GET", 'http://localhost:4020/api/commentsection');
	xhr.responseType = 'json';
	xhr.onreadystatechange = () => {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.response);
		}
	}
	xhr.send();
});
