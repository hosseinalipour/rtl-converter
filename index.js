const css = require('css');
const cssjanus = require('cssjanus');

function stringify(cssRule) {
  let rule = {
    type: 'stylesheet',
    stylesheet: { source: undefined, rules: [{ ...cssRule }] }
  };

  return css.stringify(rule);
}

let convertedRules = '';
function convert(cssObj) {
  for (const rule of cssObj.rules) {
    switch (rule.type) {
      case 'rule':
        let strRule = stringify(rule);
        let rtlStrRule = cssjanus.transform(strRule);
        //if css need rtl support find all rules and write on allRtlRuleStr
        if (rtlStrRule !== strRule) {
          let rtlDeclarations = [];
          let ltrDeclarations = [];
          rule.declarations = rule.declarations.filter((dec, i) => {
            let decStr = `${dec.property}: ${dec.value}`;
            let rtlDecRuleStr = cssjanus.transform(decStr);
            if (decStr !== rtlDecRuleStr) {
              rtlDeclarations.push(rtlDecRuleStr);
              ltrDeclarations.push(decStr);
              return false;
            }
            return true;
          });

          let rtlSelectors = rule.selectors.map(selector => {
            return '.rtl ' + selector;
          });

          let ltrSelectors = rule.selectors.map(selector => {
            return '.ltr ' + selector;
          });

          let rtlParsableRule =
            rtlSelectors.join(',') + '{' + rtlDeclarations.join(';') + ';}\n';

          let ltrParsableRule =
            ltrSelectors.join(',') + '{' + ltrDeclarations.join(';') + ';}\n';

          convertedRules += rtlParsableRule + ltrParsableRule;
        }

        break;
      case 'media':
        convert(rule);
        break;
      default:
    }
  }
}

module.exports = cssStr => {
  var cssObj = css.parse(cssStr);
  convert(cssObj.stylesheet);
  return cssRules + '\n' + convertedRules;
};
