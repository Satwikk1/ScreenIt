const ctx = document.getElementById('myChart').getContext('2d');
const name = document.getElementById('name');
const overall = document.getElementById('final-score').getContext('2d');
const right = document.getElementById('skills');

var fitness, steadyness, wins, certs, confidence, orgProfile; 

function getScore(score, outOff){
    score = score/100
    return (score*outOff)
}


var resume_data = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': './plot_data.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

// set data values from resume json
fitness = resume_data.fitness;
steadyness = resume_data.steadyness;
wins = resume_data.wins;
certs = resume_data.certs;
confidence = resume_data.confidence;
orgProfile = resume_data['org-profile'];

// set fields
name.innerHTML = resume_data.name;

colors = ['#D47AE8', '#7267CB', '#6E3CBC'];
skills_str = ''
for(let i=0; i<resume_data.skill.length; i++){
    skills_str+='<h3 style="background-color:'+colors[(Math.random() * colors.length) | 0]+';">'+resume_data.skill[i]+'</h3>'
}
skills.innerHTML = skills_str;



// progress donut

    // ```
    // weights = {
    //     fitness -> 30
    //     orgProfile -> 20
    //     confidence -> 10
    //     wins -> 10
    //     certs -> 10
    //     steadyness -> 20
    // }

    // ```

  var final_score;
  final_score = ((getScore(fitness, 0.3)+getScore(orgProfile, 0.25)+getScore(confidence, .05)+getScore(wins, .05)+getScore(certs, .05)+getScore(steadyness, .3)))*100;
  final_score = Number((final_score).toFixed(2));
  var xValues = ["total score"];
  var yValues = [final_score, 100-final_score];
  var barColors = [
    "#b91d47",
    '#fff56'
  ];
  
  new Chart("final-score", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Overall Score. = "+final_score+"%"
      }
    }
  });

// polar plot
var myChart = new Chart(ctx, {
    type: "polarArea",
    data: {
        labels: ['fitness', 'organisation profile', 'job steadyness', 'confidence level', 'certifications done', 'wins'],
        datasets: [
            {
                label: 'point',
                backgroundColor: ['#22577E', "#5584AC", "#95D1CC", '#F6F2D4', '#FFAFAF'],
                data: [fitness, orgProfile, steadyness, confidence, certs, wins]
            }
        ]
    },
    options: {}
  });