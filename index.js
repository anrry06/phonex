var apiPhonex = require(__dirname + '/api_phonex.json');
var phonex2 = {
    'alphabet': ['[m]', '[v]', '[f]', '[b]', '[p]', '[d]', '[t]', '[n]', '[g]', '[k]', '[ʒ]',
        '[ʃ]', '[z]', '[s]', '[ʁ]', '[l]', '[j]', '[w]', '[ɥ]', '[i]', '[e]', '[ɛ]',
        '[µ]', '[œ]', '[ə]', '[y]', '[u]', '[o]', '[ɔ]', '[ɑ]', '[a]'
    ],
    'replaceOrder': [
        'extra',
        '[ɛ][k][s][t]',
        '[ɛ][g][z][ɑ]',
        '[d][e][z][ɛ][ʁ]',
        '[a][b][a][k][s][s]',
        '[a][k][s][s]',
        '[ɛ][k][s][s]',
        '[i][k][s][s]',
        '[k][s][s]',
        '[k][s][t]',
        '[a][k][s][i]',
        '[ɑ][n][i][v]',
        '[g][z][e]',
        '[i][g]',
        '[k][s]',
        '[s][ɑ]',
        '[ɛ][l]',
        '[ɛ][n]',
        '[ʒ][e]',
        '[ɛ][ʁ]',
        '[t][i][µ]',
        '[s][i][ɔ]',
        '[ə][m][ɑ]',
        '[a][m][ɑ]',
        '[u][i][t]',
        '[k][ə][i][ə]',
        '[m][ɑ]',
        '[e][k]',
        '[ɛ][f]',
        '[ɛ][k]',
        '[ɛ][d]',
        '[ɛ][b]',
        '[ə][ʁ]',
        '[s][o]',
        '[a]_0',
        '[ɑ]_0',
        '[ɔ]_0',
        '[s]_0',
        '[u]_0',
        '[o]_0',
        '[ə]_0',
        '[əə]_0',
        '[ʁ]_0',
        '[µ]_0',
        '[e][f]',
        '[i][s]',
        '[a][m]',
        '[e][f]',
        '[ɛ][g]',
        '[n][i]',
        '[k][ʁ]',
        '[s][µ]',
        '[e][s]',
        '[ɛ][i]',
        '[a][i]',
        '[g][ʁ][i]',
        '[a][q][u][a]',
        '[f][i]',
        '[i][s]',
        '[ʒ][a]',
        '[ɑ][m]',
        '[g]',
        '[ɔ]',
        '[m]',
        '[ɑ]',
        '[ʒ]',
        '[ə]_01',
        '[µ]',
        '[u]',
        '[ɛ]',
        '[i]_0',
        '[l]',
        '[i]',
        '[e]',
        '[k]_0',
        '[y]_0',
        '[ə]',
        '[əə]',
        '[ʃ]',
        '[s]',
        '[k]',
        '[o]',
        '[y]',
        '[a]',
        '[j]',
        '[ʁ]',
        '[f]',
        '[z]',
        '[d]',
        '[t]',
        '[v]',
        '[b]',
        '[p]',
        '[n]',
        '[f]_1',
        '[p]_1',
        '[b]_1',
        '[m]_1',
        '[l]_1',
        '[n]_1',
        '[v]_1',
        '[d]_1',
        '[t]_1',
        '[k]_1',
        '[s]_1',
        '[ʁ]_1',
        '[g]_1',
        '[əə]_01',
        '[ə]_1',
        '[e]_1',
        '[o][z]',
        '[z]_1',
        '[z]_11',
        '[y]_1',
        '[ɑ]_1',
        '[ʃ]_1',
        '[e][o]',
        '[e][ʒ]',
        '[y]_11',
        '[e]_0',
        '[e][a]',
    ],

    'lettersLeft': '[a-zA-Zçéèêîïôûüùûàäâɲʒʃʁɥɛµœəɔɑ]|[a-zA-Zçéèêîïôûüùûàäâɲʒʃʁɥɛµœəɔɑ]\\]',
    // 'lettersLeft': '[a-zA-Zéèêîïôûüùûàäâ\\]]',
    'lettersRight': '[a-zA-Zçéèêîïôûüùûàäâɲʒʃʁɥɛµœəɔɑ]|\\[[a-zA-Zçéèêîïôûüùûàäâɲʒʃʁɥɛµœəɔɑ]',
    'consonant': 'bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZç',
    'consonantWithoutMN': 'bcdfghjklpqrstvwxzBCDFGHJKLPQRSTVWXZ',
    'vowel': 'aeiouyAEIOUY',
    'accents': 'éèêîïôûüùûàäâ',
    'phonexCode': 'ɲʒʃʁɥɛµœəɔɑ',

    'replaceUniq': function replaceUniq(str, match, replacement) {
        var reg = new RegExp('^' + match + '$');
        
        // if(replacement == '[y]'){
        //     console.log(str, match);
        // }
        
        return str.replace(reg, replacement);
    },

    'replaceFront': function replaceFront(str, match, replacement) {
        var reg = new RegExp('^' + match + '(' + this.lettersRight + ')');

        if (match == 'g' && replacement == '[g]') {
            reg = new RegExp('^' + match + '([' + this.consonant + 'aouôûüùûàäâ]|\\[[' + this.consonant + 'aouôûüùûàäâ])');
        }
        else if (replacement == '[ɑ]') {
            reg = new RegExp('^' + match + '([' + this.consonant + ']|\\[[' + this.consonant + 'ɲʒʃʁ])');
        }
        else if ((match == 'im' || match == 'in') && replacement == '[µ]') {
            reg = new RegExp('^' + match + '([' + this.consonant + ']|\\[[' + this.consonant + 'ɲʒʃʁ])');
        }
        else if (match == 'c' && replacement == '[s]') {
            reg = new RegExp('^' + match + '([ei]|\\[[eiɛə])');
        }
        else if (match == 'c' && replacement == '[k]') {
            reg = new RegExp('^' + match + '([aouôûüùûàäâ' + this.consonant + ']|\\[[aoyɔuɑµ' + this.consonant + 'ɲʒʃʁɥ])');
        }
        else if (match == 'cin' && replacement == '[s][µ]') {
            reg = new RegExp('^' + match + '(['+ this.consonant + ']|\\[[' + this.consonant + 'ɲʒʃʁɥ])');
        }
        else if (replacement == '[ɛ][g]') {
            reg = new RegExp('^' + match + '([' + this.consonant + 'aouôûüùûàäâ]|\\[[' + this.consonant + 'aouôûüùûàäâ])');
        }
        
        // if(replacement == '[y]'){
        //     console.log(str, match);
        // }
        
        return str.replace(reg, replacement + '$1');
    },

    'replaceMiddle': function replaceMiddle(str, match, replacement) {
        var reg = new RegExp('(' + this.lettersLeft + ')' + match + '(' + this.lettersRight + ')', 'g');

        if (match == 'g' && replacement == '[g]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([' + this.consonant + 'aouôûüùûàäâ]|\\[[' + this.consonant + 'aouôûüùûàäâɔ])', 'g');
        }
        else if (replacement == '[ɔ]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([' + this.consonantWithoutMN + ']|\\[[' + this.consonantWithoutMN + '])', 'g');
        }
        else if (replacement == '[ɑ]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([' + this.consonant + ']|\\[[' + this.consonant + 'ʒ])', 'g');
            if(match == 'han'){
                reg = new RegExp('([^pc]|[^pc]\\[)' + match + '([' + this.consonant + ']|\\[[' + this.consonant + '])', 'g');
            }
        }
        else if (match == 'sc' && replacement == '[ʃ]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '(i|\\[i)', 'g');
        }
        else if (match == 'c' && replacement == '[s]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([ei]|\\[[eiɛəµ])', 'g');
        }
        else if (replacement == '[ə]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([^ai]|\\[[^ai])', 'g');
        }
        else if (replacement == '[a]' && match == 'ha') {
            reg = new RegExp('([' + this.vowel + this.accents + 'ɛœə]|[' + this.vowel + this.accents + 'ɛœə]\\])' + match + '(' + this.lettersRight + ')', 'g');
        }
        else if (match == 'cin' && replacement == '[s][µ]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '(['+ this.consonant + ']|\\[[' + this.consonant + 'ɲʒʃʁɥ])');
        }
        else if (['im', 'in', 'ain', 'ym', 'un'].indexOf(match) != -1 && replacement == '[µ]') {
            reg = new RegExp('(' + this.lettersLeft + ')' + match + '([' + this.consonant + ']|\\[[' + this.consonant + 'ɲʒʃʁ])');
        }
        
        // if(replacement == '[y]'){
        //     console.log(str, match);
        // }
        
        return this.replaceAll(str, reg, '$1' + replacement + '$2');
    },

    'replaceEnd': function replaceEnd(str, match, replacement) {
        var reg = new RegExp('(' + this.lettersLeft + ')' + match + '$');
        if (replacement == '[i]' && match.match(/^hi/)) {
            reg = new RegExp('([' + this.vowel + this.accents + 'ɛœə]|[' + this.vowel + this.accents + 'ɛœə]\\])' + match + '$', 'g');
        }
        else if(replacement == '[z]' && match == '\\[s\\]\\[ə\\]') {
            reg = new RegExp('([' + this.vowel + ']|[' + this.vowel + 'ɛ]\\])' + match + '$');
        }
        else if(replacement == '[s]' && ['se', 'ses'].indexOf(match) != -1) {
            reg = new RegExp('([' + this.consonant + ']|[' + this.consonant + 'ʁɔɑ]\\])' + match + '$');
        }
        
        // if(replacement == '[y]'){
        //     console.log(str, match);
        // }
        
        return str.replace(reg, '$1' + replacement);
    },

    'get': function get(str, noBracket) {
        for (var i = 0, l = this.replaceOrder.length; i < l; i++) {
            var symbol = this.replaceOrder[i];
            var data = apiPhonex[symbol];
            symbol = data.symbol || symbol;
            
            var uniq = orderData(data.uniq);
            for (var j = 0, m = uniq.length; j < m; j++) {
                symbol = uniq[j].symbol || symbol;
                str = this.replaceUniq(str, uniq[j].str, symbol);
            }
        }
        for (var i = 0, l = this.replaceOrder.length; i < l; i++) {
            symbol = this.replaceOrder[i];
            data = apiPhonex[symbol];
            symbol = data.symbol || symbol;
            
            var front = orderData(data.front);
            for (var j = 0, m = front.length; j < m; j++) {
                symbol = front[j].symbol || symbol;
                str = this.replaceFront(str, front[j].str, symbol);
            }
            var end = orderData(data.end);
            for (var j = 0, m = end.length; j < m; j++) {
                str = this.replaceEnd(str, end[j].str, symbol);
            }
            var middle = orderData(data.middle);
            for (var j = 0, m = middle.length; j < m; j++) {
                str = this.replaceMiddle(str, middle[j].str, symbol);
            }
        }
        
        str = str.replace(/(\])h(\[)/g, '$1$2');
        str = str.replace(/^h(\[)/g, '$1');
        str = str.replace(/(\])h$/g, '$1');

        noBracket = noBracket || false;
        if(noBracket === false){
            return str;
        } else {
            return str.replace(/[\[\]]/g, '');
        }
    },

    'replaceAll': function replaceAll(str, reg, replacement) {
        while(str.match(reg)){
            str = str.replace(reg, replacement);
        }
        return str
    }
};

var orderData = function(data) {
    data = data.sort(function(a, b) {
        return b.str.length - a.str.length;
    });
    return data;
};

module.exports = phonex2;