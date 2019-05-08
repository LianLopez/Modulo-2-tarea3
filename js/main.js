function renderTableFiltered(listaFiltrada) {
	return listaFiltrada.map(function (element) {
		var html = ""
		html += "<tr><td><a href='" + element.url + "'>" + element.first_name
		element.middle_name == null ? html += " " : html += " " + element.middle_name + " "
		html += element.last_name + "</a></td><td>" + element.party + "</td><td>" + element.state + "</td><td>" + element.seniority + "</td><td>" + element.votes_with_party_pct + "%</td></tr>"
		return html
	}).join("")
}

function miFiltro(listacompleta) {
	var chekeados = Array.from(document.querySelectorAll("input[name=party]:checked")).map(input => input.value)
	var selected = document.querySelector("select").value
	listaFiltrada = listacompleta.filter(member => chekeados.includes(member.party) && (selected == "" ? true : selected == member.state))
	return listaFiltrada
}

function obtenerValores() {
	if (document.getElementById("tabla")) {
		var html = renderTableFiltered(miFiltro(data.results[0].members))
		document.getElementById("tabla").innerHTML = html
	}
}

obtenerValores()