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



function generarTabla(key1, key2, page) {
	var htmlTablaCantidad = ""
	htmlTablaCantidad += "<tr>"
	htmlTablaCantidad += "<td>Republicans</td>"
	htmlTablaCantidad += "<td>" + statistics["number-of-republicans"] + "</td>"
	htmlTablaCantidad += "<td>" + statistics["republicans-average-votes-with-party"] + "</td>"
	htmlTablaCantidad += "</tr>"
	htmlTablaCantidad += "<tr>"
	htmlTablaCantidad += "<td>Democrats</td>"
	htmlTablaCantidad += "<td>" + statistics["number-of-democrats"] + "</td>"
	htmlTablaCantidad += "<td>" + statistics["democrats-average-votes-with-party"] + "</td>"
	htmlTablaCantidad += "</tr>"
	htmlTablaCantidad += "<tr>"
	htmlTablaCantidad += "<td>Independents</td>"
	htmlTablaCantidad += "<td>" + statistics["number-of-independents"] + "</td>"
	htmlTablaCantidad += "<td>" + statistics["independents-average-votes-with-party"] + "</td>"
	htmlTablaCantidad += "</tr>"
	htmlTablaCantidad += "<td>Total</td>"
	htmlTablaCantidad += "<td>" + statistics["total"] + "</td>"
	htmlTablaCantidad += "<td>" + statistics["total-average"] + "</td>"
	htmlTablaCantidad += "</tr>"

	document.getElementById("tabla-cantidad").innerHTML = htmlTablaCantidad

	document.getElementById("tabla2").innerHTML = statistics[key1].map(element => {
		var tabla1 = ""
		tabla1 += "<tr><td>" + element.first_name
		element.middle_name == null ? tabla1 += " " : tabla1 += " " + element.middle_name + " "
		tabla1 += element.last_name + "</a></td>"
		page? tabla1 += "<td>" + element.missed_votes + "</td><td>" + element.missed_votes_pct + "</td>" : tabla1 += "<td>" + (element.total_votes - element.missed_votes) + "</td><td>" + element.votes_with_party_pct + "</td>"
		return tabla1
	}).join("")
	document.getElementById("tabla1").innerHTML = statistics[key2].map(element => {
		var tabla2 = ""
		tabla2 += "<tr><td>" + element.first_name
		element.middle_name == null ? tabla2 += " " : tabla2 += " " + element.middle_name + " "
		tabla2 += element.last_name + "</a></td>"
		page? tabla2 += "<td>" + element.missed_votes + "</td><td>" + element.missed_votes_pct + "</td>" : tabla2 += "<td>" + (element.total_votes - element.missed_votes) + "</td><td>" + element.votes_with_party_pct + "</td>"
		return tabla2
	}).join("")
}