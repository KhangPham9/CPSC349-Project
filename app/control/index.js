




document.getElementById("login").addEventListener('click', (event)=>{
	prompt();

});


function submitComment(){

	let comments = document.getElementsByTagName('input');
	let comment_list = Array.from(comments);
	let len = comment_list.length

	let opt = {comment : comment_list[len - 1].value};

	let context = {opt};

	const xhr1 = new XMLHttpRequest()
	xhr1.open("GET", "http://localhost:3000/comment.tbs")
	xhr1.responseType = "text"
	xhr1.onreadystatechange = () => {
		if (xhr1.readyState == 4 && xhr1.status == 200) {
			const button = document.getElementById('submit-button');
			const template = Handlebars.compile(xhr1.response);
			const html = template(context);
			button.insertAdjacentHTML("afterend", html);
			comment_list[len - 1].value = "";
		}
	}
	xhr1.send();
}

document.getElementById("submit-button").addEventListener('click', submitComment);
