#phonex

Transform a text into phonetic alphabet

##Example

```javascript
var phonex = require('./phonex.js');
var tests = {
    'constamment': '[k][ɔ][s][t][a][m][ɑ]',
    'saccharose': '[s][a][k][a][ʁ][o][z]'
};

for(var test in tests){
    if(phonex.get(test) != tests[test]){
        console.log('Error: ' + test + ' = ' + phonex.get(test) + ' != ' + tests[test]);
    }
}
```