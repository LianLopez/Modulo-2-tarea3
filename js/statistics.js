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
}


var members = data.results[0].members
statistics["total"] = members.length

var democrats = members.filter(member => member.party == "D")
var republicans = members.filter(member => member.party == "R")
var independents = members.filter(member => member.party == "I")

statistics["number-of-democrats"] = democrats.length
statistics["number-of-republicans"] = republicans.length
statistics["number-of-independents"] = independents.length

statistics["democrats-average-votes-with-party"] = Math.round(democrats.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / democrats.length)
statistics["republicans-average-votes-with-party"] = Math.round(republicans.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / republicans.length)
statistics["independents-average-votes-with-party"] = Math.round(independents.map(member => member.votes_with_party_pct).reduce((memberAnterior, member) => memberAnterior + member) / independents.length)

function generarArrayLoyal() {
	var limite = Math.round(members.length * 10) / 100
	members.sort(function (a, b) {
		return (a.votes_with_party_pct - b.votes_with_party_pct)
	})
	var i = 0
	while (i < limite || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		statistics["least-loyal"].push(members[i])
		i++
	}
	members.sort(function (a, b) {
		return (b.votes_with_party_pct - a.votes_with_party_pct)
	})
	i = 0
	while (i < limite || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		statistics["most-loyal"].push(members[i])
		i++
	}

}

function generarArrayEngaged() {
	var limite = Math.round(members.length * 10) / 100
	members.sort(function (a, b) {
		return (a.missed_votes_pct - b.missed_votes_pct)
	})
	var i = 0
	while (i < limite || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		statistics["least-engaged"].push(members[i])
		i++
	}
	members.sort(function (a, b) {
		return (b.missed_votes_pct - a.missed_votes_pct)
	})
	i = 0
	while (i < limite || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		statistics["most-engaged"].push(members[i])
		i++
	}

}

generarArrayEngaged()
generarArrayLoyal()