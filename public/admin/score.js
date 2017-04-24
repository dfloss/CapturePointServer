Vue.component('team-score',{
    name: 'team-score',
    props: ['teamscore','grandTotal'],
    computed: {
        percentage: function(){
            return (this.teamscore.score / this.grandTotal).toFixed(2) * 100
        }
    },
    template: `
        <div :class="teamscore.teamName">
            <span class="team-score-name">Team: {{teamscore.teamName}}</span><br>
            <span class="team-score-score">Score: {{teamscore.score}}</span><br>
            <span class="team-score-percentage">Percentage: {{percentage}}</span><br>
            <br>
        </div>
        `
});

Vue.component('score',{
            name: "score",
            props: ['score'],
            template: `
                <div class="score">
                    <div class="totalscore">
                        <team-score v-for="teamscore of score.totalScores" v-bind:teamscore="teamscore" v-bind:grandTotal="score.grandTotal"></team-score>
                    </div>
                </div>
            `
        });