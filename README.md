# Hukamnama-api


## Overview.
An API that extracts the daily "hukamnama", the daily "royal decree" that instructs followers of the Sikh religion on how to enhance and live their daily lives.

The hukamnama usually consists of various teachings of the Sikh Gurus, that Sikh disciples should incorporate into their daily lives.
The API extracts the official hukamnama of the day from the SGPC website.

## Usage
- hukamnama.js (This provides the latest hukamnama)
- hukamnama.js?date=<day>&month=<month>&year=<year>  
- ex: hukamnama.js?date=11&month=4&year=2021 (This will provide the hukamnama for April 11th 2021)
  
Note: Hukamnamas are released daily at 5:00AM IST (Indian Standard Time). (UTC +5:30)
  
  
The following information is made available through a API request.
- Hukamnama in its Original Form              (windows-1252->utf-8 encoding and requires use of a Gurmukhi Font)
- Punjabi Description of the Hukamnama        (windows-1252->utf-8 encoding and requires use of a Gurmukhi Font)
- English Description of the Hukamnama        (windows-1252->utf-8 encoding)
- Hukamnama in Unicode Gurmukhi
- Punjabi Description of the Hukamnama in Unicode

## Why?

This API was primarily created as I was unable to find one that existed. A few APIs do exist that pull data from SikhNet or other sources, but I was unable to find APIs that pulled the daily hukamnama straight from the source.

The original hukamnama can be found on the Official SGPC website at the following links:
- http://www.sgpc.net/hukamnama.php
- https://old.sgpc.net/hukumnama/index.asp
- https://old.sgpc.net/hukumnama/indexhtml.asp

## How?
The hukamnama is primarily made available in the following formats. (PDF, Word Document, HTML Document, GIF/JPG Image, and Audio File).
Although it is available in HTML format, it is presented using windows-1252 encoding and makes use of a old TrueType font known as WebAkharSlim.ttf.

This makes it difficult for developers to make use of it in applications freely as there is no API that obtains data straight from the source.
As a result, this API allows developers to obtain the daily hukamnama straight from the SGPC website, and provides a Unicode encoded format of the hukamnama that can be easily used. 

Developers can also access previous daily hukamnamas using the API as well, provided they are still stored on the SGPC website. 


