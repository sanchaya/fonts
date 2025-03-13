---
title: NLCI Tamil - Font Features
fontversion: 0.900
---

The NLCI Tamil fonts have some optional features that may be useful or required for particular uses or languages. This document lists all the available features.

These OpenType features are primarily specified using four-letter tags (e.g. 'cv01'). For more information on how to access OpenType features in specific environments and applications, see [Using Font Features](http://software.sil.org/fonts/features).

This page uses web fonts (WOFF2) to demonstrate font features and should display correctly in all modern browsers. For a more concise example of how to use the NLCI Tamil fonts as a web font see [ThiruValluvar Webfont Example](../web/ThiruValluvar-webfont-example.html). For detailed information see [Using SIL Fonts on Web Pages](http://software.sil.org/fonts/webfonts).

*If this document is not displaying correctly a PDF version is also provided in the documentation/pdf folder of the release package.*

## Complete feature list

### Character alternates

#### Nuktas

<span class='affects'>Affects: U+0323 U+1133B or U+1133C</span>

Feature | Sample                      | Feature setting
------- | --------------------------- | -------
Standard        | <span class='charis-R normal'>Ɓ</span> | `cv13=0`
Lowercase-style | <span class='charis-R normal' style='font-feature-settings: "cv13" 1'>Ɓ</span> | `cv13=1`

### Language support

*Unlike other features this support is activated by tagging the span of text as being in a particular language, not by turning on an OpenType feature.*

<span class='affects'>Affects: U+0431 U+0433 U+0434 U+043F U+0442</span>

Feature | Sample                      | Feature setting
------- | --------------------------- | -------
Standard | <span class='charis-I normal'>б г д п т</span> | 
Serbian  | <span class='charis-I normal' lang='sr'>б г д п т</span> | `lang='sr'`
