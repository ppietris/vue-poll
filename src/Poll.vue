<template>
    <div class="vue-poll">
        <h3 class="qst" v-html="question"></h3>
        <div class="ans-cnt">
            <div v-for="(a,index) in calcAnswers" :key="index" :class="{ ans: true, '[a.custom_class]': true}">
                
                <template v-if="!finalResults">
                    <div v-if="!visibleResults" class="ans-no-vote" @click.prevent="handleVote(a)" >
                        <span class="txt" v-html="a.text"></span>
                    </div>      
                    <div v-else class="ans-voted" >
                        <span v-if="a.percent" class="percent" v-text="a.percent"></span>                  
                        <span class="txt" v-html="a.text"></span>                                       
                    </div>

                    <span class="bg" :style="{ width: visibleResults ? a.percent : '0%' }"></span>
                </template>
                <template v-else>
                    <div class="ans-voted final">
                        <span v-if="a.percent" class="percent" v-text="a.percent"></span>                  
                        <span class="txt" v-html="a.text"></span>                                       
                    </div>
                    <span :class="{ bg: true, selected: mostVotes == a.votes }" :style="{ width: a.percent }"></span>
                </template>
            </div>
        </div>
        <div class="votes" v-if="showTotalVotes && (visibleResults || finalResults)" v-text="totalVotesFormatted + ' votes'"></div>
    </div>
</template>

<script>

    export default{
        name: 'Poll',
        props: {
            question: {
                type: String,
                required: true
            },
            answers: {
                type: Array,
                required: true
            },
            showResults: {
                type: Boolean,
                default: false
            },
            showTotalVotes: {
                type: Boolean,
                default: true
            },
            finalResults: {
                type: Boolean,
                default: false
            }            
        },
        data(){
            return{
                visibleResults: JSON.parse(this.showResults)
            }
        },
        computed: {           
            totalVotes(){
                let totalVotes = 0
                this.answers.filter(a=>{
                    if (!isNaN(a.votes) && a.votes > 0)
                        totalVotes += parseInt(a.votes)
                })
                return totalVotes
            },  
            totalVotesFormatted(){
                 return this.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            mostVotes(){
                let max = 0
                this.answers.filter(a=>{
                    if (!isNaN(a.votes) && a.votes > 0 && a.votes >= max)
                        max = a.votes
                })
                
                return max
            },
            calcAnswers(){
               
                if (this.totalVotes === 0)
                    return this.answers.map(a=>{
                        a.percent = '0%'
                        return a
                    })                    
                
                //Calculcate percent
                return this.answers.filter(a=>{
                    if (!isNaN(a.votes) && a.votes > 0)
                        a.percent = ( Math.round( (parseInt(a.votes)/this.totalVotes ) * 100) ) + '%'
                    else
                        a.percent =  '0%'
                    return a
                })
            }
        },
        methods: {
            handleVote(a){
                a.votes++
                a.selected = true
                this.visibleResults = true
                
                //Callback
                let obj = { value: a.value, votes: a.votes, totalVotes: this.totalVotes }
                this.$emit('addvote', obj)
            }
        }
    }

</script>

<style>
    .vue-poll{        
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
    .vue-poll .qst{
        font-weight: normal;
    }
    .vue-poll .ans-cnt{
         margin: 20px 0;   
    }
    .vue-poll .ans-cnt .ans{
        position: relative;
        margin-top: 10px;
    }
    .vue-poll .ans-cnt .ans::first-child{
        margin-top: 0;
    }
    
    .vue-poll .ans-cnt .ans-no-vote{
        text-align: center;
        border: 2px solid #77C7F7;
        box-sizing: border-box;
        border-radius: 5px;
        cursor:pointer; 
        padding: 5px 0;        
    }
    
    .vue-poll .ans-cnt .ans-no-vote .txt{
        color: #77C7F7;
    }
    .vue-poll .ans-cnt .ans-voted{
        padding: 5px 0;
    }
    
    .vue-poll .ans-cnt .ans-voted .percent,
    .vue-poll .ans-cnt .ans-voted .txt{
        position: relative;
        z-index: 1;
    }
    .vue-poll .ans-cnt .ans-voted .percent{
        font-weight: bold;
        min-width: 51px;
        display: inline-block;
        margin:0 10px;
    }
           
    .vue-poll .ans-cnt .ans .bg{
        position: absolute;
        width: 0%;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 0;
        background-color: #E1E8ED;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
        -webkit-transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
        -moz-transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
    }
    
    .vue-poll .ans-cnt .ans .bg.selected{
        background-color: #77C7F7;
    }
    
    .vue-poll .votes{
        font-size: 14px;
        color:#8899A6
    }
</style>