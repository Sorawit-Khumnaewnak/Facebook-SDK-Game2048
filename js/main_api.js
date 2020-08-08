var bFbStatus = false;
var fbID = "";
var fbName = "";
var fbEmail = "";
var status_login = false;
var id_user;

(function (d, s, id) {
	var js,
		fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = async function () {
	await FB.init({
		appId: "680976952630459",
		cookie: true,
		xfbml: true,
		version: "v8.0",
	});
	await FB.AppEvents.logPageView();

	await FB.getLoginStatus(function (response) {
		console.log(response);
		if (response.status === "connected") {
			getCurrentUserInfo();
			console.log("con");
			id_user = response.authResponse.userID;
			$(".fb-login-button").hide();
			$("#logout").show();
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;

			// รูป name:Sorawit
		} else if (response.status === "not_authorized") {
			console.log("don't login");
			window.location = "../index.html";
		} else {
			console.log("don't login");
			window.location = "../index.html";
		}
	});
};

function Logout() {
	FB.logout(function (response) {
		window.location = "../index.html";
	});
}

function statusChangeCallback(response) {
	if (bFbStatus == false) {
		fbID = response.authResponse.userID;
		if (response.status == "connected") {
			window.location = "game.html";
			getCurrentUserInfo(response);
		} else {
			window.location = "../index.html";
			FB.login(
				function (response) {
					if (response.authResponse) {
						getCurrentUserInfo(response);
					} else {
						console.log("Auth cancelled.");
					}
				},
				{ scope: "email" }
			);
		}
	}

	bFbStatus = true;
}

async function getCurrentUserInfo() {
	FB.api("/me?fields=name,email", function (userInfo) {
		fbName = userInfo.name;
		fbEmail = userInfo.email;
		console.log(fbID);
		console.log(fbName);
		console.log(fbEmail);
		document.getElementById("profile").innerHTML = "<img src='https://graph.facebook.com/" + id_user + "/picture?type=square '>";
		document.getElementById("profile").innerHTML += "&nbsp;&nbsp;:&nbsp;" + fbName + " ";
	});
}

function checkLoginState() {
	FB.getLoginStatus(function (response) {
		statusChangeCallback(response);
	});
}
