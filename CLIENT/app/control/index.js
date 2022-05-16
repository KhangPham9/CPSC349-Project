
// getting the previously made comments
const previousCommentXhr = new XMLHttpRequest();
previousCommentXhr.open("GET", 'http://localhost:4020/api/commentsection');
previousCommentXhr.responseType = 'json';
previousCommentXhr.onreadystatechange = () => {
	if(previousCommentXhr.readyState == 4 && previousCommentXhr.status == 200) {
		let context = {option: previousCommentXhr.response.reverse()};

		// get the template for the comments
		const templateXhr = new XMLHttpRequest();
		templateXhr.open("GET", "http://localhost:3000/prevComment.tbs");
		templateXhr.responseType = "text";
		templateXhr.onreadystatechange = () => {
			if (templateXhr.status == 200 && templateXhr.readyState == 4) {
				const template = Handlebars.compile(templateXhr.response);
				const html = template(context);

				// append template after the submit button
				document.getElementById('comment-button-container').insertAdjacentHTML("afterend", html);

			}
		}
		templateXhr.send();
	}
}
previousCommentXhr.send();



function submitComment(){

	// get the text from the textarea
	let comments = document.getElementsByTagName('textarea');
	let opt = {comment : comments[0].value};

	let context = {opt};


	// get the template
	const xhr1 = new XMLHttpRequest();
	xhr1.open("GET", "http://localhost:3000/comment.tbs");
	xhr1.responseType = "text";
	xhr1.onreadystatechange = () => {
		if (xhr1.readyState == 4 && xhr1.status == 200) {
			const template = Handlebars.compile(xhr1.response);
			const html = template(context);

			// append template after the submit button
			document.getElementById('comment-button-container').insertAdjacentHTML("afterend", html);
			comments[0].value = "";
		}
	}
	xhr1.send();



	// save the comment information into a mongodb database
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

// adding event listener to the submit button
document.getElementById("submit-button").addEventListener('click', submitComment);
