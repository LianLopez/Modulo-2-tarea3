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

statistics["democrats-average-votes-with-party"] = democrats.map(member => member.votes_with_party_pct).reduce((total, member) => {
	total = total + member
}) / democrats.length
statistics["republicans-average-votes-with-party"] = republicans.map(member => member.votes_with_party_pct).reduce((total, member) => {
	total = total + member
}) / republicans.length
statistics["independents-average-votes-with-party"] = independents.map(member => member.votes_with_party_pct).reduce((total, member) => {
	total = total + member
}) / independents.length