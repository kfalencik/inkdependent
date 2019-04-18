/* SmtpJS.com - v3.0.0 */

function emailSend(a) {
	return new Promise(function (n, e) {
		a.nocache = Math.floor(1e6 * Math.random() + 1),
		a.Action = "Send"; var t = JSON.stringify(a);

		emailAjaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
			n(e)
		})
	})
}

function emailAjaxPost(e, n, t) {
	var a = emailCreateCORSRequest("POST", e);
	a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
	a.onload = function () { var e = a.responseText; console.log(e); null != t && t(e)  },
	a.send(n)
}

function emailAjax(e, n) {
	var t = emailCreateCORSRequest("GET", e);
	t.onload = function () {
		var e = t.responseText;
		null != n && n(e)
	}, t.send()
}

function emailCreateCORSRequest(e, n) {
	var t = new XMLHttpRequest;
	return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
}

export {emailSend, emailAjaxPost, emailAjax, emailCreateCORSRequest};
