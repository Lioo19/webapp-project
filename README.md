Specifikation
-------------------------
Appen UtLED ämnar guida dig bland Umeås olika vandringsleder. Du som användare kan se var de olika vandringslederna ligger och dess information, se en karta för hur du tar dig dit och vilket väder sträckan har. Om du väljer att skapa en användare och logga in i appen kan du även lägga till sträckorna som avklarade och se hur många av de samlade sträckorna som du hittills lyckats klara av. Självklart finns det inget hinder för dig att vandra dem så många gånger du själv vill. För att lättare kunna planera din vandring kan du även se ett översiktligt väder för de närmaste dagarna.

Datakällor
-------------------------
Appen hämtar sin data för de olika vandringslederna från Umeå kommuns [öppna data](https://opendata.umea.se/pages/startsida/) samt väderdata från Sveriges Meteorologiska och Hydrologiska Institut[SMHI](https://www.smhi.se/data/utforskaren-oppna-data/meteorologisk-prognosmodell-pmp3g-2-8-km-upplosning-api). Utöver det stödjer sig appen även på kopplingar till [denna sida](https://auth.emilfolino.se) för skapandet av användare, möjligheten att logga in samt att spara data för användare.

Arkitektur
-------------------------
UtLED bygger på JavaScript, Mithril och Cordova.  
Som i alla Cordova-projekt utgår vår struktur från www-mappen, där ligger majoriteten av all väsentlig kod. index.html är vår basfil där rätt style och CSP anges. Stylen för projektet är skriven i SASS och samlas i base.scss, med basfilerna lokaliserade i style-katalogen.  
I mappen js återfinns den stora delen av koden som skapa applikationen, vilken i sin tur är uppdelade i två huvudsakliga mappar: modules och views. I views hittas alla filer som renderar en sida, de bestämmer helt enkelt hur de olika vyerna ska se ut. Dessa samlas sedan i filen index.js, där de kopplas till rätt route. Varje route kan ha flera vyer som renderas, exempelvis är menyn uppbyggd på detta sätt. 
I modules finns sedan koden som kopplar upp till olika APIer för att hämta data. Dessa funktioner aktiveras sedan av views-modulerna för att kunna användas i appen, men hålls separat från views tills att resultatet är producerat, för att undvika onödiga loopar. I js-katalogen finns även vars.js där hittar vi de mest använda urlerna som variabler och api-nyckeln till verifieringssidan, för att underlätta snygga till koden.  
I mappen res hittas filerna för iconerna och splash-screen för appen.  
I font och css-katalogerna finns basen för vädericonerna som hämtats på nätet.
