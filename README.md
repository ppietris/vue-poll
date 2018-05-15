# Vue-poll

<p align="center">
  <img src="https://github.com/ppietris/vue-poll/blob/master/vue-poll-example.jpg?raw=true" alt="Vue-poll example image"/>
</p>

A Twitter-like poll compoment made with Vue.js 2

[DEMO](https://rawgit.com/ppietris/vue-poll/master/index.html)

## Prerequisites
- [Vue.js 2](https://vuejs.org/)

## Installing

Using npm:

```bash
$ npm install vue-poll
```

Using cdn:

```html
<script src="https://unpkg.com/vue-poll/dist/vue-poll.min.js"></script>
```



### Example (NPM)

Define `vue-poll` component markup inside your custom component.

For example in your `my-poll.vue`:

```html
<template>
    <div>
        <vue-poll v-bind="options" @addvote="addVote"/>
    </div>
</template>

<script> 
    
    import VuePoll from 'vue-poll'
    
    export default: {        
        data() {
            return {
                options: {
                    question: 'What\'s your favourite <strong>JS</strong> framework?',
                    answers: [
                        { value: 1, text: 'Vue', votes: 53 },
                        { value: 2, text: 'React', votes: 35 },
                        { value: 3, text: 'Angular', votes: 30 },
                        { value: 4, text: 'Other', votes: 10 } 
                    ]
                }
            }
        },
        components: {
            VuePoll
        },
        methods: {
            addVote(obj){
                console.log('You voted ' + obj.value + '!');
            }
        }
    }
</script>
```
### Example (CDN)

```html
<body>
    <div id="app">
        <vue-poll v-bind="options" @addvote="addVote"/>
    </div>

    <script src="https://unpkg.com/vue-poll/dist/vue-poll.min.js"></script>
    <script> 

        Vue.use(VuePoll);

        new Vue({
            el: '#app'
            data: function() {
                return {
                    options: {
                        question: 'What\'s your favourite <strong>JS</strong> framework?',
                        answers: [
                            { value: 1, text: 'Vue', votes: 53 },
                            { value: 2, text: 'React', votes: 35 },
                            { value: 3, text: 'Angular', votes: 30 },
                            { value: 4, text: 'Other', votes: 10 } 
                        ]
                    }
                }
            },
            methods: {
                addVote: function(obj){
                    console.log('You voted ' + obj.value + '!');
                }
            }
        });
    </script>
</body>
```
## Options

- #### question (required) (string-html)
  The question of the poll. 

- #### answers (required) (array)
  An array of the answers of the poll. 

  **value (required) (integer)**
  A unique value for each answer
  
  **text (required) (string-html)**
  Answer's text
  
  **votes (required) (integer)**
  Answer's votes
  
  **custom_class (optional) (string)**
  Custom css class for the answer element


- #### showResults (optional) (boolean) (default: false)
  Set this to true to skip the votting and show the results of the poll
  
- #### finalResults (optional) (boolean) (default: false)
  Set this to true to skip the votting and show the results of the poll. Winner will be highlighted

## License
MIT license