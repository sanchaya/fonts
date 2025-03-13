---
title: NLCI Tamil - Developer Information
fontversion: 0.900
---

## Welcome font developers!

We welcome other developers who wish to get involved in supporting and enhancing these fonts or who want to modify them.

## Permissions granted by the OFL

NLCI’s fonts are licensed according to the terms of the [SIL Open Font License](https://openfontlicense.org). The OFL allows the fonts to be used, studied, modified and redistributed freely as long as they are not sold by themselves. For details see the OFL.txt and OFL-FAQ.txt files in the package.

## Building the fonts from source code

The full source code for the NLCI Tamil fonts is available on [Github](https://github.com/nlci/taml-font-thiruvalluvar)

Font sources are in the [UFO3](http://unifiedfontobject.org/versions/ufo3/) format with font family structures defined using [designspace](https://github.com/fonttools/fonttools/tree/master/Doc/source/designspaceLib).
OpenType source code is stored in the [.fea](https://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html) format in the UFO (features.fea) but is maintained in a separate file using the more efficient and powerful [.feax](https://github.com/silnrsi/pysilfont/blob/master/docs/feaextensions.rawmd) format.

The fonts are built using a completely free and open source workflow using industry-standard tools ([fonttools](https://github.com/fonttools/fonttools)), a package of custom python scripts ([pysilfont](https://github.com/silnrsi/pysilfont)), and a build and packaging system ([Smith](https://github.com/silnrsi/smith)). The whole toolchain is available as a Docker container.

Full instructions for setting up the tools and building SIL fonts are available on a dedicated web site: [SIL Font Development Notes](https://silnrsi.github.io/silfontdev/).

## Contributing to the project

Please create an issue on the project [GitHub issues](https://github.com/nlci/taml-font-thiruvalluvar/issues) page.
