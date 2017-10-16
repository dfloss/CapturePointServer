Vue.component('team-score',{
    name: 'team-score',
    props: ['teamscore','grandTotal'],
    computed: {
        percentage: () =>{
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
            props: ['apidata','apiaxios'],
            template: `
                <div class="score">
                <h2>Total Score</h2>
                    <div class="totalscore">
                        <team-score v-for="teamscore of apidata.totalScores" :key="teamscore" v-bind:teamscore="teamscore" v-bind:grandTotal="apidata.grandTotal"></team-score>
                    </div>
                <h2>Game Scores</h2>
                    <div class="gamescores">
                        <template v-for="gamescore of apidata.gameScores">
                        <p>{{gamescore.game}}</p>
                        <team-score v-for="teamscore of gamescore.scores" :key="teamscore" v-bind:teamscore="teamscore" v-bind:grandTotal="gamescore.total"></team-score>
                        </template>
                    </div>
                </div>
            `
        });
