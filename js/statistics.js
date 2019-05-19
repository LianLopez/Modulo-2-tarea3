var statistics = {
	"number-of-democrats": 0,
	"number-of-republicans": 0,
	"number-of-independents": 0,
	"total": 0,
	"democrats-average-votes-with-party": 0,
	"republicans-average-votes-with-party": 0,
	"independents-average-votes-with-party": 0,
	"total-average": 0,
	"least-engaged": [],
	"most-engaged": [],
	"least-loyal": [],
	"most-loyal": []
};


var members = data.results[0].members
statistics["total"] = members.length

var democrats = members.filter(member => member.party == "D");
var republicans = members.filter(member => member.party == "R")
var independents = members.filter(member => member.party == "I")

statistics["number-of-democrats"] = democrats.length
statistics["number-of-republicans"] = republicans.length
statistics["number-of-independents"] = independents.length

democrats.length > 0? statistics["democrats-average-votes-with-party"] = Math.round(democrats.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / democrats.length) : true
republicans.length > 0? statistics["republicans-average-votes-with-party"] = Math.round(republicans.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / republicans.length) : true
independents.length > 0? statistics["independents-average-votes-with-party"] = Math.round(independents.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / independents.length) : true
members.length > 0? statistics["total-average"] = Math.round(members.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / statistics["total"]) : true

function generarArrayLoyal(ascendente) {
	var limite = Math.round(members.length * 10) / 100
	var sorteredMembers = []
	members.sort((a, b) => ascendente ? b.votes_with_party_pct - a.votes_with_party_pct : a.votes_with_party_pct - b.votes_with_party_pct)
	var i = 0
	while (i < limite || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		sorteredMembers.push(members[i])
		i++
	}

	return sorteredMembers
}

function generarArrayEngaged(ascendente) {
	var limite = Math.round(members.length * 10) / 100
	var sorteredMembers = []
	members.sort((a, b) => ascendente ? b.missed_votes_pct - a.missed_votes_pct : a.missed_votes_pct - b.missed_votes_pct)
	var i = 0
	while (i < limite || members[i].missed_votes_pct == members[i - 1].missed_votes_pct) {
		sorteredMembers.push(members[i])
		i++
	}
	return sorteredMembers

}

statistics["most-loyal"] = generarArrayLoyal(true)
statistics["least-loyal"] = generarArrayLoyal(false)
statistics["most-engaged"] = generarArrayEngaged(true)
statistics["least-engaged"] = generarArrayEngaged(false)


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
        page ? tabla1 += "<td>" + element.missed_votes + "</td><td>" + element.missed_votes_pct + "</td>" : tabla1 += "<td>" + (element.total_votes - element.missed_votes) + "</td><td>" + element.votes_with_party_pct + "</td>"
        return tabla1
    }).join("")
    document.getElementById("tabla1").innerHTML = statistics[key2].map(element => {
        var tabla2 = ""
        tabla2 += "<tr><td>" + element.first_name  
        element.middle_name == null ? tabla2 += " " : tabla2 += " " + element.middle_name + " "
        tabla2 += element.last_name + "</a></td>"
        page ? tabla2 += "<td>" + element.missed_votes + "</td><td>" + element.missed_votes_pct + "</td>" : tabla2 += "<td>" + (element.total_votes - element.missed_votes) + "</td><td>" + element.votes_with_party_pct + "</td>"
        return tabla2
    }).join("")
}
