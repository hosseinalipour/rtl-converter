# RTL Converter

Simple way to Convert any stylesheet to RTL version

## Installation

`npm install rtl-converter`

## Motivation

Many manual converted RTL frameworks have been used and proved not to be quite flawless, for example, I couldn't find any Bootstrap RTL version that displays radio buttons correctly. This project tries to make the process flawless and automatic.

## Output

Given the following stylesheet

```css
.class {
  margin-left: 10px;
  text-align: left;
  background-color: #fff;
}
```

<br/>
This will output

```css
.class {
  background-color: #fff;
}

.rtl .class {
  margin-right: 10px;
}

.ltr .class {
  margin-left: 10px;
}
```

## Usage

```javascript
const rtlConverter = require('rtl-converter');
let RTLCss = rtlConverter(strCss);
```

##

to add RTL support, add `class="rtl"` to html tag,add direction set to `rtl`, for ltr you have to the the opposite.

RTL

```html
...
<style> html {direction: rtl} </style>
</head>
<html class="rtl">
...
```

LTR

```html
...
<style> html {direction: ltr} </style>
</head>
<html class="ltr">
...
```
