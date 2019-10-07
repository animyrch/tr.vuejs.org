---
title: �ablon Sentaks�
type: guide
order: 4
---

Vue.js, ekrana yans�t�lan DOM modelini arka plandaki Vue �rne�ine ait verilere beyansal olarak ba�lamay� sa�layan HTML tabanl� bir �ablon sentaks� kullan�r. Her Vue.js �ablonu ge�erli bir HTML kodu olup standartlara uyum g�steren taray�c�lar ve HTML derleyiciler taraf�ndan okunabilir.

Vue, �ablonlar� kendili�inden Sanal DOM modelleme fonksiyonlar� arac�l���yla derler. Otomatik tepki sisteminin de yard�m�yla Vue yeniden modellenmesi gereken minimum say�daki bile�eni ak�ll�ca tespit edebilir ve uygulaman�n durumu de�i�ti�inde m�mk�n olan en az say�da DOM de�i�ikli�ini ger�ekle�tirir.

E�er Sanal DOM kavramlar�na al���ksan�z ve saf JavaScript�in g�c�nden yararlanmay� tercih ederseniz iste�e ba�l� JSX deste�i sayesinde �ablona gerek olmaks�z�n [do�rudan modelleme fonksiyonlar�](render-function.html) yazabilirsiniz.

## De�i�ken de�er takibi

### Metin

Veri ba�laman�n en basit �ekli �B�y�k� sentaks� (iki�er adet s�sl� parantez) ile yaz�lan metin de�erlerinin takibidir.

``` html
<span>Mesaj: {{ msg }}</span>
```

B�y�k etiketiyle �evrili k�s�m ilgili bile�enin veri nesnesi i�erisinde yer alan `msg` �zelli�inin de�eri ile de�i�tirilecektir. S�z konusu veri nesnesinin `msg` �zelli�i ne zaman de�i�irse bu metin de g�ncellenir.

Ayr�ca [v-once direktifini](../api/#v-once) kullanarak de�i�ken de�erinin yaln�zca bir defa kullan�lmas�n� sa�layabilirsiniz. Fakat bu i�lemin ayn� HTML d���m� �zerindeki t�m ba�lar �zerinde etkili olaca��n� unutmay�n.

``` html
<span v-once>Bu asla de�i�meyecektir: {{ msg }}</span>
```

### Saf HTML

�ift b�y�k sentaks� verileri d�z metin olarak yorumlar. HTML olarak de�il. Ger�ek HTML yazabilmek i�in `v-html` direktifini kullanmal�s�n�z:

``` html
<p>B�y�k ile kullan�m: {{ safHtml }}</p>
<p>v-html direktifi ile kullan�m: <span v-html="safHtml"></span></p>
```

{% raw %}
<div id="example1" class="demo">
  <p>B�y�k ile kullan�m: {{ rawHtml }}</p>
  <p>v-html direktifi ile kullan�m: <span v-html="safHtml"></span></p>
</div>
<script>
new Vue({
  el: '#example1',
  data: function () {
    return {
      safHtml: �<span style="color: red">Bu metnin rengi k�rm�z� olmal�.</span>'
    }
  }
})
</script>
{% endraw %}

`span` i�erisindeki metin `rawHtml` �zelli�inin de�eri ile de�i�tirilecektir ve bu metin saf HTML olarak yorumlanacak olup veri ba�lar� dikkate al�nmayacakt�r. `v-html` direktifi i�erisinde dinamik �ablon olu�turmak m�mk�n de�ildir zira Vue, dizgi tabanl� bir �ablon motoru de�ildir. Bunun yerine kullan�c� aray�z� elemanlar�n�n yeniden kullan�m� ve birlikte kullan�m�na y�nelik temel birim olarak bile�enler kullan�lmaktad�r.

<p class="tip">��eri�i belirsiz HTML girdilerinin internet sitenizde dinamik olarak modellenmesi son derece tehlikeli olabilir zira kolayca [XSS zafiyetleri](https://tr.wikipedia.org/wiki/Siteler_aras%C4%B1_betik_%C3%A7al%C4%B1%C5%9Ft%C4%B1rma) ile sonu�lanabilir. HTML de�erlerinin takibi i�levini yaln�zca g�venilir i�erikler �zerinde kullan�n ve **asla** kullan�c� taraf�ndan temin edilen i�erik �zerinde kullanmay�n.<�p>

### HTML Nitelikleri

HTML nitelikleri i�erisinde b�y�k sentaks� kullan�lamaz. Bunun yerine [v-bind direktifini](../api/#v-bind) kullan�n:

``` html
<div v-bind:id="dinamikId"></div>
```

Mevcut olmalar� `true` anlam�na gelen boole nitelikleri i�in `v-bind` biraz farkl� faaliyet g�stermektedir. A�a��daki �rne�e bakal�m:

``` html
<button v-bind:disabled="butonAktifDegil">Buton</button>
```

E�er `butonAktifDe�il` de�i�keninin de�eri `null`, `undefined` veya `false olursa `disabled` niteli�i, modellenen `<button>` elementine dahil bile edilmeyecektir.

### JavaScript �fadelerinin Kullan�m�

�u ana kadar �ablonlar�m�zda basit �zellik anahtarlar� �zerinde ba� ger�ekle�tirdik. Halbuki Vue.js veri ba�lar� �zerinde JavaScript ifadelerinin sundu�u t�m g�c� kullanmay� m�mk�n k�l�yor:

``` html
{{ sayi + 1 }}

{{ ok ? 'EVET' : 'HAYIR' }}

{{ mesaj.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

Bu ifadeler ba�l� olduklar� Vue �rne�inin veri kapsam� i�erisinde JavaScript olarak de�erlendirilecektir. Bu a��dan tek s�n�rlama her ba� i�erisinde **yaln�zca bir ifadenin** kullan�lma zorunlulu�udur. Yani a�a��daki ifade **�ALI�MAYACAKTIR**:

``` html
<!-- A�a��daki kod bir ifade de�il bir beyand�r: -->
{{ var a = 1 }}

<!-- ak�� kontrol� de �al��mayacakt�r, bunun yerine �� terimli ifadeleri kullan�n -->
{{ if (ok) { return mesaj } }}
```

<p class="tip">�ablon ifadeleri d�� ortamdan ayr�lm�� olup yaln�zca `Math` ve `Date` gibi global de�i�kenleri i�eren s�n�rl� bir listeye eri�im sunar. �ablon ifadeleri i�erisinde kullan�c� taraf�ndan belirlenen global de�i�kenlere eri�im ger�ekle�tirmeye �al��may�n.</p>

## Direktifler

Direktifler `v-` �n ekini kullanan �zel niteliklerdir. Direktif nitelikleri, **tek bir JavaScript ifadesine** kar��l�k gelen bir de�er i�ermelidir (`v-for` bu a��dan bir istisna olup buna a�a��da de�inece�iz). Direktiflerin g�revi, i�erisindeki ifadenin de�eri de�i�ti�inde bunun yan etkilerini DOM modeline reaktif olarak yans�tmakt�r. Giri� b�l�m�nde g�rd���m�z �rne�i yeniden inceleyelim:

``` html
<p v-if="seen">�u an beni g�r�yorsun</p>
```

Burada `v-if` direktifi, `<p>` elementini `seen` ifadesine ait de�erin do�ru olup olmad���n� g�re DOM�a ekler veya kald�r�r.

### Arg�manlar

Baz� direktifler, direktif ad�ndan sonra iki nokta ile i�aret edilen bir �arg�man� alabilir. �rne�in `v-bind` direktifi bir HTML niteli�ini reaktif olarak g�ncellemek �zere kullan�l�r:

``` html
<a v-bind:href="url"> ... </a>
```

Burada `href`, `v-bind`��n arg�man� olarak kullan�l�yor ve s�z konusu elementin `href` niteli�ini `url` ifadesinin de�erine ba�l�yor.

Bir di�er �rnek DOM olaylar�n� dinleyen `v-on` direktifidir:

``` html
<a v-on:click="birSeyYap"> ... </a>
```

Burada arg�man dinlenilecek olan olay�n ad�d�r. Olay y�netimine ileride daha yak�ndan de�inece�iz.

### Dinamik Arg�manlar

> 2.6.0+�dan itibaren

2.6.0 versiyonundan itibaren bir direktif arg�man� i�erisinde JavaScript ifadelerini k��eli bir parantez i�erisinde kullanmak m�mk�n:

``` html
<a v-bind:[nitelikAdi]="url"> ... </a>
```

Burada `nitelikAdi` dinamik bir �ekilde JavaScript ifadesi olarak de�erlendirilecek ve tespit edilen de�er bu arg�man�n nihai de�eri olarak kullan�lacak. �rne�in e�er Vue �rne�iniz `"href"` de�erine sahip `nitelikAdi` �eklindeki bir data niteli�ine sahipse yukar�daki ba� `v-bind:href`e denk olacakt�r.

Ayn� �ekilde dinamik arg�manlar sayesinde bir olay y�neticisini dinamik bir olay ad�na ba�layabilirsiniz:

``` html
<a v-on:[olayAd�]="birSeyYap"> ... </a>
```

Yine yukar�daki gibi `olayAdi`'n�n de�eri `"focus"` ise `v-on:[eventName]` ifadesi `v-on:focus`a kar��l�k gelecektir.

#### Dinamik Arg�man De�eri K�s�tlamalar�

Dinamik arg�manlar `null` d���nda yaln�zca dizgi olarak de�erlendirilmesi beklenir. S�z konusu ba�� kald�rabilmek i�in istinai olarak `null` kullan�lmas�na m�saade edilir. Bunun d���nda dizgi olmayan t�m de�erler bir uyar� verecektir.

#### Dinamik Arg�man �fadesi K�s�tlamalar�

<p class="tip">Dinamik arg�man ifadeleri �zerinde bir tak�m sentaks k�s�tlamalar� mevcuttur zira HTML nitelik isimleri i�erisinde bo�luk veya t�rnak gibi baz� karakterlerin kullan�lmas� m�mk�n de�ildir. Ayr�ca DOM i�erisinde kullan�lan �ablonlarda b�y�k harf kullan�lmamas�na da dikkat etmelisiniz.</p>

�rne�in a�a��daki ifade ge�ersizdir:

``` html
<!-- Bu bir derleyici uyar�s�n� tetikleyecektir. -->
<a v-bind:['foo' + bar]="deger"> ... </a>
```

Bu uyar�n�n ortaya ��kmas�n� engellemek i�in bo�luk veya t�rnak kullanmay�n veya karma��k ifadeleri hesaplanm�� bir nitelik ile de�i�tirin.

Buna ek olarak DOM i�erisinde �ablon kullan�yorsan�z (�ablonunuzu do�rudan bir HTML dosyas� i�erisinde yaz�yorsan�z) taray�c�lar�n nitelik isimlerini k���k harf olarak d�zeltece�ini unutmay�n:

``` html
<!-- A�a��daki ifade DOM i�i �ablonda v-bind:[birnitelik] �eklinde d�n��t�r�lecektir. -->
<a v-bind:[birNitelik]="deger"> ... </a>
```

### De�i�tiriciler

De�i�tiriciler bir nokta ile g�sterilen �zel eklerdir ve bir direktifin �zel bir �ekilde ba�lanmas� gerekti�ini ifade eder. �rne�in `.prevent` de�i�tiricisi `v-on` direktifine tetiklenen olay �zerinde `event.preventDefault()` ifadesini �a��rmas�n� s�yler:

``` html
<form v-on:submit.prevent="onSubmit"> ... </form>
```

S�z konusu b�l�mlere geldi�imizde [`v-on`a](events.html#Event-Modifiers) ve [`v-model`e](forms.html#Modifiers) y�nelik ba�ka de�i�tirici �rneklerini g�receksiniz.

## K�saltmalar

`v-` �n eki �ablonlar�n�zdaki Vue�ye �zg� nitelikleri kolayca tespit edebilmeyi sa�layan g�rsel bir ipucu g�revi g�r�r. Hali haz�rda yaz�lm�� olan bi�imli metinlere dinamik davran��lar eklemek i�in Vue.js�nin kullan�lmas� s�ras�nda yararl� olsa da direktiflerin s�k�a kullan�ld��� durumlarda metin kalabal��� yaratabilir. Ayn� zamanda her �eyin Vue taraf�ndan y�netildi�i bir [SPA](https://tr.wikipedia.org/wiki/Tek_sayfa_uygulamas%C4%B1) geli�tirdi�iniz s�rada `v-` �n eki �nemini kaybeder. Bu nedenle Vue en �ok kullan�lan iki direktif olan `v-bind` ve `v-on` i�in �zel k�saltmalar sunar:

### `v-bind` K�saltmas�

``` html
<!-- uzun sentaks -->
<a v-bind:href="url"> ... </a>

<!-- k�saltma -->
<a :href="url"> ... </a>

<!-- dinamik arg�manl� k�satma (2.6.0+) -->
<a :[key]="url"> ... </a>
```

### `v-on` K�saltmas�

``` html
<!-- uzun sentaks -->
<a v-on:click="birSeyYap"> ... </a>

<!-- k�saltma -->
<a @click="birSeyYap"> ... </a>

<!-- dinamik arg�manl� k�satma (2.6.0+) -->
<a @[olay]="birSeyYap"> ... </a>
```

Bu kullan�m normal HTML�den biraz farkl� g�r�nebilir ama `:` ve `@` karakterleri ge�erli nitelik isimleri aras�ndad�r ve Vue�n�n desteklendi�i t�m taray�c�lar taraf�ndan do�ru bir �ekilde okunabilir. Ayr�ca bunlar ekrana yans�t�lan nihai bi�imli metin i�erisinde g�r�nt�lenmez. K�saltma sentaks� iste�e ba�l� olmakla beraber kullan�m�n� daha yak�ndan ��rendik�e ho�unuza gidece�ini d���n�yoruz.
